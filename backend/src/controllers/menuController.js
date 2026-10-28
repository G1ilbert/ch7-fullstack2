const prisma = require('../db/prisma');

// GET /api/menu  และ  /api/menu?keyword=co
const getMenus = async (req, res) => {
    const { keyword } = req.query;
    try {
        let menus;
        if (keyword) {
            menus = await prisma.menu.findMany({
                where: { name: { contains: keyword } },
                include: { type: true }
            });
        } else {
            menus = await prisma.menu.findMany({
                include: { type: true }
            });
        }
        res.json(menus);
    } catch (err) {
        console.error('Error fetching menu:', err);
        res.status(500).json({ error: 'Database error' });
    }
};

// GET /api/menu/:id
const getMenuById = async (req, res) => {
    const { id } = req.params;
    try {
        const menu = await prisma.menu.findUnique({
            where: { menuId: Number(id) },
            include: { type: true }
        });
        if (!menu) {
            return res.status(404).json({ error: 'Menu not found' });
        }
        res.json(menu);
    } catch (err) {
        console.error('Error fetching menu:', err);
        res.status(500).json({ error: 'Database error' });
    }
};

// POST /api/menu
const createMenu = async (req, res) => {
    const { name, price, isBestSeller, typeId } = req.body;
    if (!name || !price) {
        return res.status(400).json({ error: 'Name and price are required' });
    }
    try {
        const newMenu = await prisma.menu.create({
            data: {
                name: name,
                price: Number(price),
                isBestSeller: isBestSeller === true || isBestSeller === 'true',
                typeId: typeId ? Number(typeId) : null
            }
        });
        res.status(201).json(newMenu);
    } catch (err) {
        console.error('Error creating menu:', err);
        res.status(500).json({ error: 'Database error' });
    }
};

// PUT /api/menu/:id
const updateMenu = async (req, res) => {
    const { id } = req.params;
    const { name, price, isBestSeller, typeId } = req.body;
    try {
        const updatedMenu = await prisma.menu.update({
            where: { menuId: Number(id) },
            data: {
                name: name,
                price: Number(price),
                isBestSeller: isBestSeller === true || isBestSeller === 'true',
                typeId: typeId ? Number(typeId) : null
            }
        });
        res.json(updatedMenu);
    } catch (err) {
        console.error('Error updating menu:', err);
        res.status(404).json({ error: 'Menu not found or database error' });
    }
};

// DELETE /api/menu/:id
const deleteMenu = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.menu.delete({
            where: { menuId: Number(id) }
        });
        res.json({ message: 'Menu deleted successfully', id: Number(id) });
    } catch (err) {
        console.error('Error deleting menu:', err);
        res.status(404).json({ error: 'Menu not found' });
    }
};

module.exports = {
    getMenus,
    getMenuById,
    createMenu,
    updateMenu,
    deleteMenu
};
