const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Booking, Spot, User } = require('../../db/models');
const { Op } = require('sequelize');
const router = express.Router();

// Validation middleware for booking creation
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

// Get all Bookings of the Current User
router.get('/current', requireAuth, async (req, res) => {
  const userId = req.user.id;
  const bookings = await Booking.findAll({
    where: { userId },
    include: {
      model: Spot,
      attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
    }
  });

  res.json({ Bookings: bookings });
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

// Edit a Booking
router.put('/:bookingId', requireAuth, validateBooking, async (req, res) => {
  const { bookingId } = req.params;
  const { startDate, endDate } = req.body;

  try {
    const booking = await Booking.findByPk(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking couldn't be found" });
    }

    if (booking.userId !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    if (new Date(endDate) <= new Date()) {
      return res.status(403).json({ message: "Past bookings can't be modified" });
    }

    const conflictingBookings = await Booking.findAll({
      where: {
        spotId: booking.spotId,
        id: { [Op.ne]: bookingId },
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

    await booking.update({ startDate, endDate });
    res.json(booking);
  } catch (error) {
    console.error(error); // Debug statement
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Delete a Booking
router.delete('/:bookingId', requireAuth, async (req, res) => {
  const { bookingId } = req.params;

  try {
    const booking = await Booking.findByPk(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking couldn't be found" });
    }

    if (booking.userId !== req.user.id && booking.Spot.ownerId !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    if (new Date(booking.startDate) <= new Date()) {
      return res.status(403).json({ message: "Bookings that have been started can't be deleted" });
    }

    await booking.destroy();
    res.json({ message: 'Successfully deleted' });
  } catch (error) {
    console.error(error); // Debug statement
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
