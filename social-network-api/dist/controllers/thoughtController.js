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
const Thought_1 = __importDefault(require("../models/Thought"));
class ThoughtController {
    constructor() {
        // Initialization code here
    }
    getAllThoughts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const thoughts = yield Thought_1.default.find();
                res.status(200).json(thoughts);
            }
            catch (error) {
                res.status(500).json({ message: 'Error retrieving thoughts', error });
            }
        });
    }
    createThought(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newThought = new Thought_1.default(req.body);
                const savedThought = yield newThought.save();
                res.status(201).json(savedThought);
            }
            catch (error) {
                res.status(500).json({ message: 'Error creating thought', error });
            }
        });
    }
    getThoughtById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const thought = yield Thought_1.default.findById(req.params.id);
                if (!thought) {
                    res.status(404).json({ message: 'Thought not found' });
                    return;
                }
                res.status(200).json(thought);
            }
            catch (error) {
                res.status(500).json({ message: 'Error retrieving thought', error });
            }
        });
    }
    updateThought(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedThought = yield Thought_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
                if (!updatedThought) {
                    res.status(404).json({ message: 'Thought not found' });
                    return;
                }
                res.status(200).json(updatedThought);
            }
            catch (error) {
                res.status(500).json({ message: 'Error updating thought', error });
            }
        });
    }
    deleteThought(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedThought = yield Thought_1.default.findByIdAndDelete(req.params.id);
                if (!deletedThought) {
                    res.status(404).json({ message: 'Thought not found' });
                    return;
                }
                res.status(200).json({ message: 'Thought deleted' });
            }
            catch (error) {
                res.status(500).json({ message: 'Error deleting thought', error });
            }
        });
    }
    addReaction(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const thought = yield Thought_1.default.findById(req.params.thoughtId);
                if (!thought) {
                    res.status(404).json({ message: 'Thought not found' });
                    return;
                }
                thought.reactions.push(req.body);
                yield thought.save();
                res.status(200).json(thought);
            }
            catch (error) {
                res.status(500).json({ message: 'Error adding reaction', error });
            }
        });
    }
    deleteReaction(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const thought = yield Thought_1.default.findById(req.params.thoughtId);
                if (!thought) {
                    res.status(404).json({ message: 'Thought not found' });
                    return;
                }
                thought.reactions.id(req.params.reactionId).remove();
                yield thought.save();
                res.status(200).json(thought);
            }
            catch (error) {
                res.status(500).json({ message: 'Error deleting reaction', error });
            }
        });
    }
}
exports.default = ThoughtController;
