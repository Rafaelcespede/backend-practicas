import { Router } from 'express'
const router = Router();
import * as cursocontroller from '../controllers/curso.controller'

router.get('/', cursocontroller.getCurso);
router.post('/create', cursocontroller.postCurso);
router.put('/:id', cursocontroller.updateCurso);
router.delete('/:id', cursocontroller.deleteCurso);

export default router;