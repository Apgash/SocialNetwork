"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
class UserController {
    constructor() {
        // Initialize any properties if needed
    }
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield User_1.default.find().populate('thoughts').populate('friends');
                res.status(200).json(users);
            }
            catch (error) {
                res.status(500).json({ message: 'Error retrieving users', error });
            }
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = new User_1.default(req.body);
                const savedUser = yield newUser.save();
                res.status(201).json(savedUser);
            }
            catch (error) {
                res.status(500).json({ message: 'Error creating user', error });
            }
        });
    }
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.default.findById(req.params.userId).populate('thoughts').populate('friends');
                if (!user) {
                    res.status(404).json({ message: 'User not found' });
                    return;
                }
                res.status(200).json(user);
            }
            catch (error) {
                res.status(500).json({ message: 'Error retrieving user', error });
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedUser = yield User_1.default.findByIdAndUpdate(req.params.userId, req.body, { new: true });
                if (!updatedUser) {
                    res.status(404).json({ message: 'User not found' });
                    return;
                }
                res.status(200).json(updatedUser);
            }
            catch (error) {
                res.status(500).json({ message: 'Error updating user', error });
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedUser = yield User_1.default.findByIdAndDelete(req.params.userId);
                if (!deletedUser) {
                    res.status(404).json({ message: 'User not found' });
                    return;
                }
                res.status(200).json({ message: 'User deleted' });
            }
            catch (error) {
                res.status(500).json({ message: 'Error deleting user', error });
            }
        });
    }
    addFriend(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.default.findById(req.params.userId);
                if (!user) {
                    res.status(404).json({ message: 'User not found' });
                    return;
                }
                const friend = yield User_1.default.findById(req.params.friendId);
                if (!friend) {
                    res.status(404).json({ message: 'Friend not found' });
                    return;
                }
                user.friends.push(friend);
                yield user.save();
                res.status(200).json(user);
            }
            catch (error) {
                res.status(500).json({ message: 'Error adding friend', error });
            }
        });
    }
    removeFriend(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.default.findById(req.params.userId);
                if (!user) {
                    res.status(404).json({ message: 'User not found' });
                    return;
                }
                user.friends = user.friends.filter(friend => friend.toString() !== req.params.friendId);
                yield user.save();
                res.status(200).json(user);
            }
            catch (error) {
                res.status(500).json({ message: 'Error removing friend', error });
            }
        });
    }
}
exports.default = UserController;
