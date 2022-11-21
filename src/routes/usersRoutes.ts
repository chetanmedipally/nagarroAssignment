import { Router } from 'express';
import { body } from 'express-validator';
import * as usersController from "../controllers/usersController";
import protect from '../middleware/authMiddleware';
const router = Router();


const signUpValidators = [
  body("email")
    .exists()
    .isEmail()
    .withMessage('Please enter a valid email address.')
    .normalizeEmail(),
  body("password", 'Password has to include minimum 6 digits, 1 capital, 1 special character and number')
    .exists()
    .isString()
    .isLength({ min: 6 })
    .not()
    .isLowercase()
    .not()
    .isUppercase()
    .not()
    .isNumeric()
    .not()
    .isAlpha()
    .trim(),
  body('confirmPassword')
    .exists()
    .withMessage('You must type a confirmation password')
    .custom((value, { req }) => value === req.body.password)
    .withMessage("The passwords do not match"),
]

const loginValidators = [
  body("email")
    .exists()
    .isEmail()
    .withMessage('Please enter a valid email address.')
    .normalizeEmail(),
  body("password", 'Password has to include minimum 6 characters, 1 capital, 1 special character and number')
    .exists()
    .isString()
    .isLength({ min: 6 })
    .not()
    .isLowercase()
    .not()
    .isUppercase()
    .not()
    .isNumeric()
    .not()
    .isAlpha()
    .trim()
]
// GET /users
router.post('/signup', signUpValidators, usersController.signup);
router.post('/login', loginValidators, usersController.login);
router.get('/getusers', protect, usersController.getUsers);
router.get('/getuserfriends', protect, usersController.getFriends);

export default router;