import { Router } from 'express'
const router = Router();
import * as alumnocontroller from '../controllers/alumno.controller'

router.get('/', alumnocontroller.getAlumno);
router.post('/create', alumnocontroller.postAlumno);
router.put('/:id', alumnocontroller.updateAlumno);
/* router.delete('/:id', alumnocontroller.deleteAlumno); */

export default router;