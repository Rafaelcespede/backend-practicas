import { Router } from 'express'
const router = Router();
import * as tutorcontroller from '../controllers/tutor.controller'

router.get('/', tutorcontroller.getTutorapellidos);
router.post('/create', tutorcontroller.postTutor);
router.put('/:id', tutorcontroller.updateTutor);

export default router;