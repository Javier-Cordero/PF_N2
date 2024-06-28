import express, { json } from 'express'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import { PORT } from './database/config.js'
import { mostrarUsuario, crearUsuario, editarUsuario, eliminarUsuario } from './controller/usuarios.js'
import { mostrarCategoria, crearCategoria, editarCategoria, eliminarCategoria } from './controller/categorias.js'
import { mostrarComentario, crearComentario, editarComentario, eliminarComentario } from './controller/comentarios.js'
import { mostrarPublicacion, crearPublicacion, editarPublicacion, eliminarPublicacion } from './controller/publicaciones.js'
import jsonDoc from './database/swagger-output.json' assert {type: 'json'}
const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use('/documentation',swaggerUi.serve,swaggerUi.setup(jsonDoc))
// Rutas para la gestión de usuarios
app.get('/usuarios', mostrarUsuario) // solo para administracion
app.post('/usuarios', crearUsuario)
app.put('/usuarios/:id', editarUsuario)
app.delete('/usuarios/:id', eliminarUsuario)

// Rutas para la gestión de publicaciones
app.get('/publicaciones', mostrarPublicacion)
app.post('/publicaciones', crearPublicacion)
app.put('/publicaciones/:id', editarPublicacion)
app.delete('/publicaciones/:id', eliminarPublicacion)

// Rutas para la gestión de categorías
app.get('/categorias', mostrarCategoria) // solo para administracion
app.post('/categorias', crearCategoria) // solo para administracion
app.put('/categorias/:id', editarCategoria) // solo para administracion
app.delete('/categorias/:id', eliminarCategoria) // solo para administracion

// Rutas para la gestión de comentarios
app.get('/comentarios', mostrarComentario)
app.post('/comentarios', crearComentario)
app.put('/comentarios/:id', editarComentario)
app.delete('/comentarios/:id', eliminarComentario)
app.get('*')
app.listen(PORT, () => { console.log(`Servidor levantado en localhost:${PORT}`) })
