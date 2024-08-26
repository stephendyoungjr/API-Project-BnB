const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User } = require('../db/models');

const { secret, expiresIn } = jwtConfig;

const setTokenCookie = (res, user) => {
  const safeUser = {
    id: user.id,
    email: user.email,
    username: user.username,
  };

  const token = jwt.sign(
    { data: safeUser },
    secret,
    { expiresIn: Number(expiresIn) } 
  );

  const isProduction = process.env.NODE_ENV === "production";

  res.cookie('token', token, {
    maxAge: Number(expiresIn) * 1000, 
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction && "Lax"
  });

  return token;
};
