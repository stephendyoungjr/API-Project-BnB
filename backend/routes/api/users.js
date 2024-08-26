
const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = express.Router();


const validateLogin = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors
];


router.post('/login', validateLogin, async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      const err = new Error('Invalid credentials');
      err.status = 401;
      err.title = 'Unauthorized';
      err.errors = { message: 'Invalid credentials' };
      return next(err);
    }
    console.log(user);

    const isPasswordMatch = user.hashedPassword && bcrypt.compareSync(password, user.hashedPassword);

    if (!isPasswordMatch) {
      const err = new Error('Invalid credentials');
      err.status = 401;
      err.title = 'Unauthorized';
      err.errors = { message: 'Invalid credentials' };
      return next(err);
    }

    const safeUser = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    await setTokenCookie(res, safeUser);

    return res.json({
      user: safeUser,
    });
  } catch (err) {
    return next(err);
  }
});


const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('First Name is required.'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Last Name is required.'),
  handleValidationErrors
];


router.post(
  '/',
  validateSignup,
  async (req, res, next) => {
    const { email, password, username, firstName, lastName } = req.body;

    try {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({ email, username, hashedPassword, firstName, lastName });
      console.log(user); 

      const safeUser = {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName
      };

      await setTokenCookie(res, safeUser);

      return res.json({
        user: safeUser
      });
    } catch (err) {
      if (err.name === 'SequelizeUniqueConstraintError') {
        err.status = 500;
        err.errors = [{ message: 'User already exists' }];
      }
      next(err);
    }
  }
);


router.get('/current', requireAuth, async (req, res) => {
  const { id, firstName, lastName, email } = req.user;

  return res.json({
    id,
    firstName,
    lastName,
    email
  });
});

module.exports = router;
