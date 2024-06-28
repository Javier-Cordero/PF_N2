import { pool } from '../database/db.js'
// Configuration de usuarios
export const mostrarUsuario = async (req, res) => {
  try {
    const [usuario] = await pool.query('SELECT * FROM usuario')
    res.json(usuario)
  } catch (error) {
    console.error('Error al mostrar usuarios: ', error.message)
    res.status(500).json({ message: 'Error al mostrar los usuarios' })
  }
}
export const crearUsuario = async (req, res) => {
  const { nombre, apellido, email, password, rol } = req.body
  try {
    const [usuario] = await pool.query('SELECT * FROM usuario WHERE email = ?', [email])
    if (usuario.length > 0) return res.status(500).json({ message: 'El usuario ya existe' })
    const [resultado] = await pool.query('INSERT INTO usuario (nombre, apellido, email, password, rol) VALUES (?,?,?,?,?)', [nombre, apellido, email, password, rol])
    res.status(201).json({ id: resultado.insertId, nombre, apellido, email, password })
  } catch (error) {
    console.log('Error al registar usuario: ', error.message)
    res.status(500).json({ message: 'Error al registrar el usuario' })
  }
}
export const editarUsuario = async (req, res) => {
  const id = req.params.id
  const { nombre, apellido, email, password, rol } = req.body
  try {
    const [usuario] = await pool.query('SELECT * FROM usuario WHERE idUsuario =?', [id])
    if (usuario.length === 0) return res.status(404).json({ message: 'El usuario no existe' })
    await pool.query('UPDATE usuario SET nombre =?, apellido =?, email =?, password =?, rol =? WHERE idUsuario =?', [nombre, apellido, email, password, rol, id])
    return res.status(200).json({ message: 'usuario actualizado' })
  } catch (error) {
    console.error('Error al actualizar usuario: ', error.message)
    res.status(500).json({ message: 'Error al actualizar el usuario' })
  }
}
export const eliminarUsuario = async (req, res) => {
  const id = req.params.id
  try {
    const [usuario] = await pool.query('SELECT * FROM usuario WHERE idUsuario =?', [id])
    if (usuario.length === 0) return res.status(404).json({ message: 'El usuario no existe' })
    await pool.query('DELETE FROM usuario WHERE idUsuario =?', [id])
    return res.status(200).json({ message: 'Usuario eliminado' })
  } catch (error) {
    console.error('Error al eliminar usuario: ', error.message)
    res.status(500).json({ message: 'Error al eliminar el usuario' })
  }
}
