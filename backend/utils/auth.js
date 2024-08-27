const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User } = require('../db/models');

const { secret, expiresIn } = jwtConfig;

//Sends a JWT Cookie
const setTokenCookie = (res, user) => {
    // Create the token
    const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username
    };
    const token = jwt.sign(
        { data: safeUser },
        secret,
        { expiresIn: parseInt(expiresIn)}
    );

    const isProduction = process.env.NODE_ENV === 'production';

    // Set the token cookie
    res.cookie('token', token, {
        maxAge: expiresIn * 1000,
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction && 'Lax'
    });

    return token;
}

const restoreUser = (req, res, next) => {
    //token parsed from cookies
    const { token } = req.cookies;
    req.user = null;

    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
        if (err) {
            return next();
        }

        try {
            const { id } = jwtPayload.data;
            req.user = await User.findByPk(id, {
                attributes: {
                    include: ['email', 'createdAt', 'updatedAt']
                }
            });
        } catch (err) {
            res.clearCookie('token');
            return next();
        }

        if (!req.user) res.clearCookie('token');

        return next();
    })
}

// If there is no current user, return an error
const requireAuth = (req, _res, next) => {
    if (req.user) return next();

    const err = new Error('Authentication required');
    // err.title = 'Authentication required';
    // err.errors = { message: 'Authentication required' };
    err.status = 401;
    return next(err);
}

const authorization = (req, ownerId) => {
    if (req.user.id !== ownerId) {
        const err = new Error('Forbidden');
        // err.title = 'Forbidden';
        err.status = 403
        // err.errors = {
        //     'message': 'Not authorized'
        // }
        return err;
    }
    return true
}

module.exports = { setTokenCookie, restoreUser, requireAuth, authorization};