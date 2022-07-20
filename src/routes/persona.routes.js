import { Router } from 'express'
const router = Router();
import * as personacontroller from '../controllers/persona.controller'

router.get('/', personacontroller.getPersona);

export default router;