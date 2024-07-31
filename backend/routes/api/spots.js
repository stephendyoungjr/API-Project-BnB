const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, User, Booking, ReviewImage } = require('../../db/models');
const sequelize = require('sequelize');
const { Op } = require('sequelize');
const router = express.Router();

// Validation middleware for spot creation and updates
const validateSpot = [
  check('address')
    .exists({ checkFalsy: true })
    .withMessage('Street address is required'),
  check('city')
    .exists({ checkFalsy: true })
    .withMessage('City is required'),
  check('state')
    .exists({ checkFalsy: true })
    .withMessage('State is required'),
  check('country')
    .exists({ checkFalsy: true })
    .withMessage('Country is required'),
  check('lat')
    .exists({ checkFalsy: true })
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude must be within -90 and 90'),
  check('lng')
    .exists({ checkFalsy: true })
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitude must be within -180 and 180'),
  check('name')
    .exists({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage('Name must be less than 50 characters'),
  check('description')
    .exists({ checkFalsy: true })
    .withMessage('Description is required'),
  check('price')
    .exists({ checkFalsy: true })
    .isFloat({ min: 0 })
    .withMessage('Price per day must be a positive number'),
  handleValidationErrors
];

// Validation middleware for review creation
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

// Get all Spots
router.get('/', async (req, res) => {
  const spots = await Spot.findAll({
    include: [{ model: SpotImage, attributes: ['url', 'preview'] }]
  });

  res.json({ Spots: spots });
});

// Get all Spots owned by the current user
router.get('/current', requireAuth, async (req, res) => {
  const userId = req.user.id;
  const spots = await Spot.findAll({
    where: { ownerId: userId },
    include: [{ model: SpotImage, attributes: ['url', 'preview'] }]
  });

  res.json({ Spots: spots });
});

// Get details of a Spot by ID
router.get('/:spotId', async (req, res) => {
  const spotId = req.params.spotId;
  const spot = await Spot.findByPk(spotId, {
    include: [
      { model: SpotImage, attributes: ['id', 'url', 'preview'] },
      { model: User, as: 'Owner', attributes: ['id', 'firstName', 'lastName'] }
    ]
  });

  if (!spot) {
    res.status(404).json({ message: "Spot couldn't be found" });
    return;
  }

  const numReviews = await Review.count({ where: { spotId } });
  const avgStarRating = await Review.findAll({
    where: { spotId },
    attributes: [[sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']],
    raw: true
  });

  res.json({
    ...spot.toJSON(),
    numReviews,
    avgStarRating: avgStarRating[0].avgRating
  });
});

// Get all Reviews for a Spot based on the Spot's id
router.get('/:spotId/reviews', async (req, res) => {
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

// Create a new Spot
router.post('/', requireAuth, validateSpot, async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } = req.body;
  const ownerId = req.user.id;
  const spot = await Spot.create({ ownerId, address, city, state, country, lat, lng, name, description, price });

  res.status(201).json(spot);
});

// Add an Image to a Spot by ID
router.post('/:spotId/images', requireAuth, async (req, res) => {
  const { spotId } = req.params;
  const { url, preview } = req.body;
  const spot = await Spot.findByPk(spotId);

  if (!spot) {
    res.status(404).json({ message: "Spot couldn't be found" });
    return;
  }

  if (spot.ownerId !== req.user.id) {
    res.status(403).json({ message: 'Forbidden' });
    return;
  }

  const image = await SpotImage.create({ spotId, url, preview });
  res.json(image);
});

// Edit a Spot
router.put('/:spotId', requireAuth, validateSpot, async (req, res) => {
  const { spotId } = req.params;
  const { address, city, state, country, lat, lng, name, description, price } = req.body;
  const spot = await Spot.findByPk(spotId);

  if (!spot) {
    res.status(404).json({ message: "Spot couldn't be found" });
    return;
  }

  if (spot.ownerId !== req.user.id) {
    res.status(403).json({ message: 'Forbidden' });
    return;
  }

  await spot.update({ address, city, state, country, lat, lng, name, description, price });
  res.json(spot);
});

// Delete a Spot
router.delete('/:spotId', requireAuth, async (req, res) => {
  const { spotId } = req.params;
  const spot = await Spot.findByPk(spotId);

  if (!spot) {
    res.status(404).json({ message: "Spot couldn't be found" });
    return;
  }

  if (spot.ownerId !== req.user.id) {
    res.status(403).json({ message: 'Forbidden' });
    return;
  }

  await spot.destroy();
  res.json({ message: 'Successfully deleted' });
});

// Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
  const spotId = req.params.spotId;
  console.log(`Fetching bookings for spotId: ${spotId}`); // Debug statement

  try {
    const spot = await Spot.findByPk(spotId);
    console.log('Found spot:', spot); // Debug statement
    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    let bookings;
    if (req.user.id === spot.ownerId) {
      bookings = await Booking.findAll({
        where: { spotId },
        include: { model: User, attributes: ['id', 'firstName', 'lastName'] }
      });
    } else {
      bookings = await Booking.findAll({
        where: { spotId },
        attributes: ['spotId', 'startDate', 'endDate']
      });
    }

    console.log('Found bookings:', bookings); // Debug statement
    res.json({ Bookings: bookings });
  } catch (error) {
    console.error(error); // Debug statement
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Create a Booking from a Spot based on the Spot's id
const validateBooking = [
  check('startDate')
    .exists({ checkFalsy: true })
    .isISO8601()
    .withMessage('startDate must be a valid date'),
  check('endDate')
    .exists({ checkFalsy: true })
    .isISO8601()
    .withMessage('endDate must be a valid date')
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.startDate)) {
        throw new Error('endDate cannot be on or before startDate');
      }
      return true;
    }),
  handleValidationErrors
];

router.post('/:spotId/bookings', requireAuth, validateBooking, async (req, res) => {
  const { spotId } = req.params;
  const { startDate, endDate } = req.body;
  const userId = req.user.id;
  console.log('Creating booking for spotId:', spotId); // Debug statement

  try {
    const spot = await Spot.findByPk(spotId);
    console.log('Found spot:', spot); // Debug statement

    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    if (spot.ownerId === userId) {
      return res.status(403).json({ message: "Cannot book your own spot" });
    }

    const conflictingBookings = await Booking.findAll({
      where: {
        spotId,
        [Op.or]: [
          {
            startDate: {
              [Op.between]: [startDate, endDate]
            }
          },
          {
            endDate: {
              [Op.between]: [startDate, endDate]
            }
          },
          {
            [Op.and]: [
              {
                startDate: {
                  [Op.lte]: startDate
                }
              },
              {
                endDate: {
                  [Op.gte]: endDate
                }
              }
            ]
          }
        ]
      }
    });

    if (conflictingBookings.length) {
      return res.status(403).json({
        message: "Sorry, this spot is already booked for the specified dates",
        errors: {
          startDate: "Start date conflicts with an existing booking",
          endDate: "End date conflicts with an existing booking"
        }
      });
    }

    const booking = await Booking.create({ userId, spotId, startDate, endDate });

    res.status(201).json(booking);
  } catch (error) {
    console.error(error); // Debug statement
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Add a Review to a Spot based on the Spot's id
router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res) => {
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

module.exports = router;
