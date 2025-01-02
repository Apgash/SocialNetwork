"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const thoughtController_1 = __importDefault(require("../controllers/thoughtController"));
const router = (0, express_1.Router)();
const thoughtController = new thoughtController_1.default();
// Define routes for thoughts
router.route('/')
    .get(thoughtController.getAllThoughts)
    .post(thoughtController.createThought);
router.route('/:id')
    .get(thoughtController.getThoughtById)
    .put(thoughtController.updateThought)
    .delete(thoughtController.deleteThought);
router.route('/:thoughtId/reactions')
    .post(thoughtController.addReaction);
router.route('/:thoughtId/reactions/:reactionId')
    .delete(thoughtController.deleteReaction);
exports.default = router;
