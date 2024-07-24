
// backend/routes/api/users.js
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie } = require('../../utils/auth')
const { User } = require('../../db/models');


// Sign up
router.post(
    '/',
    async (req, res) => {
      const { email, password, username } = req.body;
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({ email, username, hashedPassword });
  
      const safeUser = {
        id: user.id,
        email: user.email,
        username: user.username,
      };
  
      await setTokenCookie(res, safeUser);
  
      return res.json({
        user: safeUser
      });
    }
  );

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
      .exists({ checkFalsy: true})
      .withMessage('First Name is required.'),
    check('lastName')
      .exists({checkFalsy: true})
      .withMessage('Last Name is required.'),
    handleValidationErrors
  ];


  // Sign up
router.post(
    '/',
    validateSignup,
    async (req, res, next) => {
      const { email, password, username, firstName, lastName} = req.body;

    try{
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({ email, username, hashedPassword, firstName, lastName });
  
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
    } catch (err){
      if(err.name === 'SequelizeUniqueConstraintError'){
        err.status = 500;
        err.errors = [{message: 'User already exists'}];
      }
      next(err);
    }
  }
  );

  
module.exports = router;