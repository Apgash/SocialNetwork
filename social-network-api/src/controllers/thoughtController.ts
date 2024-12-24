import { Request, Response } from 'express';
import Thought from '../models/Thought';

class ThoughtController {
    // Get all thoughts
    public async getAllThoughts(req: Request, res: Response): Promise<void> {
        try {
            const thoughts = await Thought.find().populate('username');
            res.status(200).json(thoughts);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving thoughts', error });
        }
    }

    // Get a single thought by ID
    public async getThoughtById(req: Request, res: Response): Promise<void> {
        try {
            const thought = await Thought.findById(req.params.thoughtId).populate('username');
            if (!thought) {
                res.status(404).json({ message: 'Thought not found' });
                return;
            }
            res.status(200).json(thought);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving thought', error });
        }
    }

    // Create a new thought
    public async createThought(req: Request, res: Response): Promise<void> {
        try {
            const newThought = await Thought.create(req.body);
            res.status(201).json(newThought);
        } catch (error) {
            res.status(400).json({ message: 'Error creating thought', error });
        }
    }

    // Update a thought by ID
    public async updateThought(req: Request, res: Response): Promise<void> {
        try {
            const updatedThought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });
            if (!updatedThought) {
                res.status(404).json({ message: 'Thought not found' });
                return;
            }
            res.status(200).json(updatedThought);
        } catch (error) {
            res.status(400).json({ message: 'Error updating thought', error });
        }
    }

    // Delete a thought by ID
    public async deleteThought(req: Request, res: Response): Promise<void> {
        try {
            const deletedThought = await Thought.findByIdAndDelete(req.params.thoughtId);
            if (!deletedThought) {
                res.status(404).json({ message: 'Thought not found' });
                return;
            }
            res.status(200).json({ message: 'Thought deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting thought', error });
        }
    }

    // Add a reaction to a thought
    public async addReaction(req: Request, res: Response): Promise<void> {
        try {
            const thought = await Thought.findById(req.params.thoughtId);
            if (!thought) {
                res.status(404).json({ message: 'Thought not found' });
                return;
            }
            thought.reactions.push(req.body);
            await thought.save();
            res.status(201).json(thought);
        } catch (error) {
            res.status(400).json({ message: 'Error adding reaction', error });
        }
    }

    // Remove a reaction from a thought
    public async removeReaction(req: Request, res: Response): Promise<void> {
        try {
            const thought = await Thought.findById(req.params.thoughtId);
            if (!thought) {
                res.status(404).json({ message: 'Thought not found' });
                return;
            }
            thought.reactions.id(req.params.reactionId).remove();
            await thought.save();
            res.status(200).json(thought);
        } catch (error) {
            res.status(400).json({ message: 'Error removing reaction', error });
        }
    }
}

export default new ThoughtController();