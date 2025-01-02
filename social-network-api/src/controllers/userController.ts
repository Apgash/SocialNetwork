import { Request, Response } from 'express';
import User from '../models/User';

class UserController {
    constructor() {
        // Initialize any properties if needed
    }

    public async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await User.find().populate('thoughts').populate('friends');
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving users', error });
        }
    }

    public async createUser(req: Request, res: Response): Promise<void> {
        try {
            const newUser = new User(req.body);
            const savedUser = await newUser.save();
            res.status(201).json(savedUser);
        } catch (error) {
            res.status(500).json({ message: 'Error creating user', error });
        }
    }

    public async getUserById(req: Request, res: Response): Promise<void> {
        try {
            const user = await User.findById(req.params.userId).populate('thoughts').populate('friends');
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving user', error });
        }
    }

    public async updateUser(req: Request, res: Response): Promise<void> {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
            if (!updatedUser) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json({ message: 'Error updating user', error });
        }
    }

    public async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const deletedUser = await User.findByIdAndDelete(req.params.userId);
            if (!deletedUser) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.status(200).json({ message: 'User deleted' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting user', error });
        }
    }

    public async addFriend(req: Request, res: Response): Promise<void> {
        try {
            const user = await User.findById(req.params.userId);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            const friend = await User.findById(req.params.friendId);
            if (!friend) {
                res.status(404).json({ message: 'Friend not found' });
                return;
            }
            user.friends.push(friend);
            await user.save();
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error adding friend', error });
        }
    }

    public async removeFriend(req: Request, res: Response): Promise<void> {
        try {
            const user = await User.findById(req.params.userId);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            user.friends = user.friends.filter(friend => friend.toString() !== req.params.friendId);
            await user.save();
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error removing friend', error });
        }
    }
}

export default UserController;