const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

router.get('/', menuController.getMenus);          // getAll + search (?keyword=)
router.get('/:id', menuController.getMenuById);    // getById
router.post('/', menuController.createMenu);       // Create
router.put('/:id', menuController.updateMenu);     // Update
router.delete('/:id', menuController.deleteMenu);  // Delete

module.exports = router;
