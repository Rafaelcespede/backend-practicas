import express from 'express'
import morgan from 'morgan'
import personaRoutes from './routes/persona.routes'
import alumnoRoutes from './routes/alumno.routes'
import tutorRoutes from './routes/tutor.routes'
import cursoRoutes from './routes/curso.routes'
import auth from './routes/auth.routes.js'

const app = express();
var cors = require('cors');
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.get('/',(req,res)=>{
    res.send('Bienvenido a Node JS..!');
});


app.use('/api/auth/persona', personaRoutes)
app.use('/api/auth/alumno', alumnoRoutes)
app.use('/api/auth/tutor', tutorRoutes)
app.use('/api/auth/curso', cursoRoutes)
app.use('/api/auth', auth)

export default app;