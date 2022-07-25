// const router = require('express').Router();
import { Router} from 'express'
const router = Router()

// const auth = require('../controllers/auth.controller');
import * as auth from '../controllers/auth.controller.js'

router.post('/', auth.login);
router.post('/registrar', auth.registrar);

export default router;