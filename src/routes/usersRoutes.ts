import { Router } from 'express';
import { body, check } from 'express-validator';
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
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/, "i"
    ),
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
  check("password", 'Password has to include minimum 6 characters, 1 capital, 1 special character and number')
    .exists()
    .isString()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/, "i"
    )
]
// GET /users
router.post('/signup', signUpValidators, usersController.signup);
router.post('/login', loginValidators, usersController.login);
router.get('/getusers', protect, usersController.getUsers);
router.get('/getuserfriends', protect, usersController.getFriends);

export default router;