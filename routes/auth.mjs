import express from 'express';
import { body } from 'express-validator';
import isAuth from '../middlewares/is-auth.mjs';
import { User } from '../models/user.mjs';
import { login, signup, getUser } from '../controllers/authController.mjs';

const router = express.Router();

router.post(
  '/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject('E-Mail already exists');
          }
        });
      })
      .normalizeEmail(),
    body('password').trim().isLength({ min: 6 }),
    body('confirmPassword')
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Passwords do NOT match');
        }
        return true;
      }),
  ],
  signup
);

router.post(
  '/login',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').trim().isLength({ min: 6 }),
  ],
  login
);

router.get('/user', isAuth, getUser);

export default router;
