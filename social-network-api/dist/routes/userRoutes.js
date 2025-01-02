"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controllers/userController"));
const router = (0, express_1.Router)();
const userController = new userController_1.default();
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
exports.default = router;
