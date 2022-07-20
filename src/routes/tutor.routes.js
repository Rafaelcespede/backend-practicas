import { Router } from 'express'
const router = Router();
import * as tutorcontroller from '../controllers/tutor.controller'

router.get('/', tutorcontroller.getTutor);
router.post('/create', tutorcontroller.postTutor);
router.put('/:id', tutorcontroller.updateTutor);

export default router;