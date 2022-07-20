import { Router } from 'express'
const router = Router();
import * as personacontroller from '../controllers/persona.controller'

router.get('/', personacontroller.getPersona);
router.post('/create', personacontroller.postPersona);
router.put('/:id', personacontroller.updatePersona);
router.delete('/:id', personacontroller.deletePersona);

export default router;