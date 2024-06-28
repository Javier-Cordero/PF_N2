import { pool } from '../database/db.js'

// Solo para administradores
export const mostrarCategoria = async (req, res) => {
  try {
    const [categorias] = await pool.query('SELECT * FROM categorias')
    res.status(200).json(categorias)
  } catch (error) {
    console.error('Error al mostrar las categorias: ', error.message)
    res.status(500).json({ message: 'Error al mostrar las categorias' })
  }
}
export const crearCategoria = async (req, res) => {
  const { nombre } = req.body
  try {
    const [categoria] = await pool.query('SELECT * FROM categorias WHERE nombre =?', [nombre])
    if (categoria.length > 0) return res.status(500).json({ message: 'La categoria ya existe' })
    const [resultado] = await pool.query('INSERT INTO categorias (nombre) VALUES (?)', [nombre])
    res.status(201).json({ id: resultado.insertId, nombre })
  } catch (error) {
    console.error('Error al crear la categoria: ', error.message)
    res.status(500).json({ message: 'Error al crear la categoria' })
  }
}
export const editarCategoria = async (req, res) => {
  const id = req.params.id
  const { nombre } = req.body
  try {
    const [categoria] = await pool.query('SELECT * FROM categorias WHERE idCategoria  =?', [id])
    if (categoria.length === 0) return res.status(500).json({ message: 'La categoria no existe' })
    await pool.query('UPDATE categorias SET nombre =? WHERE idCategoria =?', [nombre, id])
    return res.status(200).json({ message: 'categoria actualizada' })
  } catch (error) {
    console.error('Error al editar la categoria: ', error.message)
    res.status(500).json({ message: 'Error al editar la categoria' })
  }
}
export const eliminarCategoria = async (req, res) => {
  const id = req.params.id
  try {
    const [categoria] = await pool.query('SELECT * FROM categorias WHERE idCategoria  =?', [id])
    if (categoria.length === 0) return res.status(500).json({ message: 'La categoria no existe' })
    await pool.query('DELETE FROM categorias WHERE idCategoria =?', [id])
    return res.status(200).json({ message: 'categoria eliminada' })
  } catch (error) {
    console.error('Error al eliminar la categoria: ', error.message)
    res.status(500).json({ message: 'Error al eliminar la categoria' })
  }
}
