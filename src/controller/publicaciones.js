import { pool } from '../database/db.js'
// Configuracion para la publicacion
export const mostrarPublicacion = async (req, res) => {
  // Buscar la publicacion por su titulo
  try {
    const [resultado] = await pool.query('SELECT p.idPublicidad, c.nombre as categorias, u.nombre as usuario, p.titulo, p.descripcion FROM publicacion p INNER JOIN categorias c ON p.idCategoria = c.idCategoria INNER JOIN usuario u ON p.idUsuario = u.idUsuario')
    res.json(resultado)
  } catch (error) {
    console.error('Error al mostrar publicaciones: ', error.message)
    res.status(500).json({ message: 'Error al mostrar las publicaciones' })
  }
}
export const crearPublicacion = async (req, res) => {
  const { idCategoria, idUsuario, titulo, descripcion } = req.body
  try {
    const [publicacion] = await pool.query('SELECT * FROM publicacion WHERE titulo =?', [titulo])
    if (publicacion.length > 0) return res.status(500).json({ message: 'La publicacion ya existe' })
    const [resultado] = await pool.query('INSERT INTO publicacion (idCategoria, idUsuario, titulo, descripcion) VALUES (?,?,?,?)', [idCategoria, idUsuario, titulo, descripcion])
    res.status(201).json({ id: resultado.insertId, idCategoria, idUsuario, titulo, descripcion })
  } catch (error) {
    console.log('Error al registar publicacion: ', error.message)
    res.status(500).json({ message: 'Error al registrar la publicacion' })
  }
}
export const editarPublicacion = async (req, res) => {
  const id = req.params.id
  const { idCategoria, idUsuario, titulo, descripcion } = req.body
  try {
    const [publicacion] = await pool.query('SELECT * FROM publicacion WHERE idPublicidad =?', [id])
    if (publicacion.length === 0) return res.status(404).json({ message: 'La publicacion no existe' })
    await pool.query('UPDATE publicacion SET idCategoria =?, idUsuario=?, titulo =?, descripcion =? WHERE idPublicidad =?', [idCategoria, idUsuario, titulo, descripcion, id])
    return res.status(200).json({ message: 'Publicacion actualizada' })
  } catch (error) {
    console.error('Error al actualizar publicacion: ', error.message)
    res.status(500).json({ message: 'Error al actualizar la publicacion' })
  }
}
export const eliminarPublicacion = async (req, res) => {
  const id = req.params.id
  try {
    const [publicacion] = await pool.query('SELECT * FROM publicacion WHERE idPublicidad =?', [id])
    if (publicacion.length === 0) return res.status(404).json({ message: 'La publicacion no existe' })
    await pool.query('DELETE FROM publicacion WHERE idPublicidad =?', [id])
    return res.status(200).json({ message: 'Publicacion eliminada' })
  } catch (error) {
    console.error('Error al eliminar publicacion: ', error.message)
    res.status(500).json({ message: 'Error al eliminar la publicacion' })
  }
}
