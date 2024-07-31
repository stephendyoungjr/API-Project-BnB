const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Review, ReviewImage, Spot, User } = require('../../db/models');
const router = express.Router();

// Validation middleware for review creation and updates
const validateReview = [
  check('review')
    .exists({ checkFalsy: true })
    .withMessage('Review text is required'),
  check('stars')
    .exists({ checkFalsy: true })
    .isInt({ min: 1, max: 5 })
    .withMessage('Stars must be an integer from 1 to 5'),
  handleValidationErrors
];

// Get all Reviews of the Current User
router.get('/current', requireAuth, async (req, res) => {
  const userId = req.user.id;
  const reviews = await Review.findAll({
    where: { userId },
    include: [
      { model: User, attributes: ['id', 'firstName', 'lastName'] },
      { model: Spot, attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'] },
      { model: ReviewImage, attributes: ['id', 'url'] }
    ]
  });

  res.json({ Reviews: reviews });
});

// Create a Review for a Spot based on the Spot's id
router.post('/spots/:spotId/reviews', requireAuth, validateReview, async (req, res) => {
  const { spotId } = req.params;
  const { review, stars } = req.body;
  const userId = req.user.id;

  const spot = await Spot.findByPk(spotId);

  if (!spot) {
    res.status(404).json({ message: "Spot couldn't be found" });
    return;
  }

  const existingReview = await Review.findOne({ where: { spotId, userId } });

  if (existingReview) {
    res.status(500).json({ message: 'User already has a review for this spot' });
    return;
  }

  const newReview = await Review.create({ userId, spotId, review, stars });
  res.status(201).json(newReview);
});

// Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', requireAuth, async (req, res) => {
  const { reviewId } = req.params;
  const { url } = req.body;

  const review = await Review.findByPk(reviewId);

  if (!review) {
    res.status(404).json({ message: "Review couldn't be found" });
    return;
  }

  if (review.userId !== req.user.id) {
    res.status(403).json({ message: 'Forbidden' });
    return;
  }

  const imagesCount = await ReviewImage.count({ where: { reviewId } });

  if (imagesCount >= 10) {
    res.status(403).json({ message: 'Maximum number of images for this resource was reached' });
    return;
  }

  const image = await ReviewImage.create({ reviewId, url });
  res.json(image);
});

// Edit a Review
router.put('/:reviewId', requireAuth, validateReview, async (req, res) => {
  const { reviewId } = req.params;
  const { review, stars } = req.body;

  const existingReview = await Review.findByPk(reviewId);

  if (!existingReview) {
    res.status(404).json({ message: "Review couldn't be found" });
    return;
  }

  if (existingReview.userId !== req.user.id) {
    res.status(403).json({ message: 'Forbidden' });
    return;
  }

  await existingReview.update({ review, stars });
  res.json(existingReview);
});

// Delete a Review
router.delete('/:reviewId', requireAuth, async (req, res) => {
  const { reviewId } = req.params;

  const review = await Review.findByPk(reviewId);

  if (!review) {
    res.status(404).json({ message: "Review couldn't be found" });
    return;
  }

  if (review.userId !== req.user.id) {
    res.status(403).json({ message: 'Forbidden' });
    return;
  }

  await review.destroy();
  res.json({ message: 'Successfully deleted' });
});

// Get all Reviews for a Spot based on the Spot's id
router.get('/spots/:spotId/reviews', async (req, res) => {
  const { spotId } = req.params;
  const spot = await Spot.findByPk(spotId);

  if (!spot) {
    return res.status(404).json({ message: "Spot couldn't be found" });
  }

  const reviews = await Review.findAll({
    where: { spotId },
    include: [
      { model: User, attributes: ['id', 'firstName', 'lastName'] },
      { model: ReviewImage, attributes: ['id', 'url'] }
    ]
  });

  res.json({ Reviews: reviews });
});

module.exports = router;
