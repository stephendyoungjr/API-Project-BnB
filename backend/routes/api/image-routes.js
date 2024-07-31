const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { SpotImage, ReviewImage, Spot, Review } = require('../../db/models');
const router = express.Router();

// Delete a Spot Image
router.delete('/spot-images/:imageId', requireAuth, async (req, res) => {
  const { imageId } = req.params;
  const image = await SpotImage.findByPk(imageId);

  if (!image) {
    res.status(404).json({ message: "Spot Image couldn't be found" });
    return;
  }

  const spot = await Spot.findByPk(image.spotId);

  if (spot.ownerId !== req.user.id) {
    res.status(403).json({ message: "Forbidden" });
    return;
  }

  await image.destroy();
  res.json({ message: 'Successfully deleted' });
});

// Delete a Review Image
router.delete('/review-images/:imageId', requireAuth, async (req, res) => {
  const { imageId } = req.params;
  const image = await ReviewImage.findByPk(imageId);

  if (!image) {
    res.status(404).json({ message: "Review Image couldn't be found" });
    return;
  }

  const review = await Review.findByPk(image.reviewId);

  if (review.userId !== req.user.id) {
    res.status(403).json({ message: "Forbidden" });
    return;
  }

  await image.destroy();
  res.json({ message: 'Successfully deleted' });
});

module.exports = router;
