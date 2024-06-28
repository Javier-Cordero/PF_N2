import { pool } from '../database/db.js'

// Configuracion de comentarios
export const mostrarComentario = async (req, res) => {
  try {
    const [comentario] = await pool.query('SELECT c.idComentario, p.titulo AS publicacion, u.nombre AS usuario, c.descripcion FROM comentario c INNER JOIN publicacion p ON c.idPublicidad = p.idPublicidad INNER JOIN usuario u ON c.idUsuario = u.idUsuario')
    res.status(200).json(comentario)
  } catch (error) {
    console.error('Error al mostrar los comentarios', error.message)
    res.status(500).json({ message: 'Error al mostrar los comentarios' })
  }
}
export const crearComentario = async (req, res) => {
  const { idPublicidad, idUsuario, descripcion } = req.body
  try {
    const [resultado] = await pool.query('INSERT INTO comentario (idPublicidad, idUsuario, descripcion) VALUES (?,?,?)', [idPublicidad, idUsuario, descripcion])
    res.status(201).json({ id: resultado.insertId, idPublicidad, idUsuario, descripcion })
  } catch (error) {
    console.error('Error al comentar', error.message)
    res.status(500).json({ message: 'Error al crear el comentario' })
  }
}
export const editarComentario = async (req, res) => {
  const id = req.params.id
  const { idPublicidad, idUsuario, descripcion } = req.body
  try {
    await pool.query('UPDATE comentario SET idPublicidad=?, idUsuario =?, descripcion =? WHERE idComentario =?', [idPublicidad, idUsuario, descripcion, id])
    res.status(200).json({ message: 'comentario editado' })
  } catch (error) {
    console.error('Error al editar el comentario', error.message)
    res.status(500).json({ message: 'Error al editar el comentario' })
  }
}
export const eliminarComentario = async (req, res) => {
  const id = req.params.id
  try {
    await pool.query('DELETE FROM comentario WHERE idComentario =?', [id])
    res.status(200).json({ message: 'comentario eliminado' })
  } catch (error) {
    console.error('Error al eliminar el comentario', error.message)
    res.status(500).json({ message: 'Error al eliminar el comentario' })
  }
}
