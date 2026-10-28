const prisma = require('../db/prisma');

// GET /api/type
const getTypes = async (req, res) => {
    try {
        const types = await prisma.type.findMany();
        res.json(types);
    } catch (err) {
        console.error('Error fetching types:', err);
        res.status(500).json({ error: 'Database error' });
    }
};

// GET /api/type/:id
const getTypeById = async (req, res) => {
    const { id } = req.params;
    try {
        const type = await prisma.type.findUnique({
            where: { typeId: Number(id) }
        });
        if (!type) {
            return res.status(404).json({ error: 'Type not found' });
        }
        res.json(type);
    } catch (err) {
        console.error('Error fetching type:', err);
        res.status(500).json({ error: 'Database error' });
    }
};

// POST /api/type
const createType = async (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }
    try {
        const newType = await prisma.type.create({
            data: { name: name }
        });
        res.status(201).json(newType);
    } catch (err) {
        console.error('Error creating type:', err);
        res.status(500).json({ error: 'Database error' });
    }
};

// PUT /api/type/:id
const updateType = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const updatedType = await prisma.type.update({
            where: { typeId: Number(id) },
            data: { name: name }
        });
        res.json(updatedType);
    } catch (err) {
        console.error('Error updating type:', err);
        res.status(404).json({ error: 'Type not found or database error' });
    }
};

// DELETE /api/type/:id  (ลบไม่ได้ถ้ายังมีเมนูใช้ประเภทนี้อยู่)
const deleteType = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.type.delete({
            where: { typeId: Number(id) }
        });
        res.json({ message: 'Type deleted successfully', id: Number(id) });
    } catch (err) {
        console.error('Error deleting type:', err);
        res.status(404).json({ error: 'Type not found or still used by menu' });
    }
};

module.exports = {
    getTypes,
    getTypeById,
    createType,
    updateType,
    deleteType
};
