// * Imports
const express = require('express');
const { Sequelize, Op } = require('sequelize');

const {requireAuth, authorization} = require('../../utils/auth');
const { Spot, Review, SpotImage, User, ReviewImage } = require('../../db/models')
const { makeSpotObj, makeReviewObj } = require('../../utils/helpers')

const { check, body } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateReview = [
    check("review")
        .exists({ checkFalsy: true })
        .withMessage('Review text is required'),
    check('stars')
        .exists({ checkFalsy: true })
        .isInt({ min: 1, max: 5})
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
]

const router = express.Router();

// Get
// Get all Reviews of the Current User
router.get('/current', requireAuth, async (req, res) => {
    const reviews = await Review.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            {
                model: User,
                attributes:  ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                attributes: {
                    exclude: ['updatedAt', 'createdAt', 'description']
                }
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    });


    const Reviews = []
    await Promise.all(reviews.map(async review => {
        const reviewObj = await makeReviewObj(review);
        reviewObj.User = review.User
        const spot = review.dataValues.Spot.dataValues;
        const spotObj = await makeSpotObj(spot);

        const previewImg = await SpotImage.findOne( {
            where: {
                spotId: review.spotId,
                preview: true
            }
        });

        spotObj.previewImage = previewImg !== null? previewImg.url : 'No preview image available'

        reviewObj.Spot = spotObj;

        reviewObj.ReviewImages = review.ReviewImages;
        Reviews.push(reviewObj)
    }))

    const result = { Reviews: Reviews}

    res.json(result)
});

//Post
// Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
    const review = await Review.findByPk(req.params.reviewId);

    // Check that review exists
    if (!review ) {
        const err = new Error("Review couldn't be found");
        err.title = 'Not found'
        err.status = 404;
        return next(err);
    }

    // check user is authorized
    const authorized = authorization(req, review.userId);
    if (authorized !== true) return next(authorized);

    // check max
    const imageCount = await ReviewImage.count({
        where: {
            reviewId: review.id
        }
    });

    if (imageCount === 10) {
        const err = new Error("Maximum number of images for this resource was reached");
        err.title = 'Maximum number of images reached'
        err.status = 403;
        return next(err);
    };

    const newImage = await review.createReviewImage(req.body);
    res.json({ id: newImage.id, url: newImage.url})
});

// Put
// Edit a Review
router.put('/:reviewId', requireAuth, validateReview, async (req, res, next) => {
    const review = await Review.findByPk(req.params.reviewId);

    // Checking if review exists
    if (!review) {
        const err = new Error("Review couldn't be found");
        err.title = 'Not found'
        err.status = 404;
        return next(err);
    }

    // check user is authorized
    const authorized = authorization(req, review.userId);
    if (authorized !== true) return next(authorized);

    // edit review
    await review.update(req.body);

    const reviewObj = await makeReviewObj(review)

    res.json(reviewObj)
})

// Delete
// Delete a Review
router.delete('/:reviewId', requireAuth, async (req, res, next) => {
    const review = await Review.findByPk(req.params.reviewId);

    // Checking if review exists
    if (!review) {
        const err = new Error("Review couldn't be found");
        err.title = 'Not found'
        err.status = 404;
        return next(err);
    }

    // check user is authorized
    const authorized = authorization(req, review.userId);
    if (authorized !== true) return next(authorized);

    await review.destroy();

    res.json({ message: 'Successfully deleted'});
})

module.exports = router;