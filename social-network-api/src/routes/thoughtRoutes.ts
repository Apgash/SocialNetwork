import { Router } from 'express';
import ThoughtController from '../controllers/thoughtController';

const router = Router();
const thoughtController = new ThoughtController();

// Define routes for thoughts
router.route('/')
    .get(thoughtController.getAllThoughts)
    .post(thoughtController.createThought);

router.route('/:id')
    .get(thoughtController.getThoughtById)
    .put(thoughtController.updateThought)
    .delete(thoughtController.deleteThought);

router.route('/:thoughtId/reactions')
    .post(thoughtController.addReaction)
    .delete('/:reactionId', thoughtController.deleteReaction);

export default router;