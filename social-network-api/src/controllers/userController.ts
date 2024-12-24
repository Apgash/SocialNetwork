import { Request, Response } from 'express';
import User from '../models/User';

class UserController {
    // Get all users
    public async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await User.find().populate('thoughts').populate('friends');
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving users', error });
        }
    }

    // Get a single user by ID
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

    // Create a new user
    public async createUser(req: Request, res: Response): Promise<void> {
        try {
            const newUser = await User.create(req.body);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(400).json({ message: 'Error creating user', error });
        }
    }

    // Update a user by ID
    public async updateUser(req: Request, res: Response): Promise<void> {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
            if (!updatedUser) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(400).json({ message: 'Error updating user', error });
        }
    }

    // Delete a user by ID
    public async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const deletedUser = await User.findByIdAndDelete(req.params.userId);
            if (!deletedUser) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting user', error });
        }
    }
}

export default new UserController();