import { Router } from 'express';
import UserController from '../controllers/userController';

const router = Router();
const userController = new UserController();

// Define routes for users
router.route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser);

router.route('/:id')
    .get(userController.getUserById)
    .put(userController.updateUser)
    .delete(userController.deleteUser);

// Define routes for adding and removing friends
router.route('/:userId/friends/:friendId')
    .post(userController.addFriend)
    .delete(userController.removeFriend);

export default router;