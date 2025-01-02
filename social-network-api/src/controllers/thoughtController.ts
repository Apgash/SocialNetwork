import { Request, Response } from 'express';
import Thought from '../models/Thought';

class ThoughtController {
    constructor() {
        // Initialization code here
    }

    public async getAllThoughts(req: Request, res: Response): Promise<void> {
        try {
            const thoughts = await Thought.find();
            res.status(200).json(thoughts);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving thoughts', error });
        }
    }

    public async createThought(req: Request, res: Response): Promise<void> {
        try {
            const newThought = new Thought(req.body);
            const savedThought = await newThought.save();
            res.status(201).json(savedThought);
        } catch (error) {
            res.status(500).json({ message: 'Error creating thought', error });
        }
    }

    public async getThoughtById(req: Request, res: Response): Promise<void> {
        try {
            const thought = await Thought.findById(req.params.id);
            if (!thought) {
                res.status(404).json({ message: 'Thought not found' });
                return;
            }
            res.status(200).json(thought);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving thought', error });
        }
    }

    public async updateThought(req: Request, res: Response): Promise<void> {
        try {
            const updatedThought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedThought) {
                res.status(404).json({ message: 'Thought not found' });
                return;
            }
            res.status(200).json(updatedThought);
        } catch (error) {
            res.status(500).json({ message: 'Error updating thought', error });
        }
    }

    public async deleteThought(req: Request, res: Response): Promise<void> {
        try {
            const deletedThought = await Thought.findByIdAndDelete(req.params.id);
            if (!deletedThought) {
                res.status(404).json({ message: 'Thought not found' });
                return;
            }
            res.status(200).json({ message: 'Thought deleted' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting thought', error });
        }
    }

    public async addReaction(req: Request, res: Response): Promise<void> {
        try {
            const thought = await Thought.findById(req.params.thoughtId);
            if (!thought) {
                res.status(404).json({ message: 'Thought not found' });
                return;
            }
            thought.reactions.push(req.body);
            await thought.save();
            res.status(200).json(thought);
        } catch (error) {
            res.status(500).json({ message: 'Error adding reaction', error });
        }
    }

    public async deleteReaction(req: Request, res: Response): Promise<void> {
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
            res.status(500).json({ message: 'Error deleting reaction', error });
        }
    }
}

export default ThoughtController;