const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Category = require('../models/Category');
const auth = require('../middleware/auth');

// @route    POST /api/categories
// @desc     Create a category
// @access   Private
router.post(
    '/',
    auth,
    [
        check('name', 'Name is required').not().isEmpty(),
        check('description', 'Description is required').not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
        }
    
        const { name, description } = req.body;
    
        try {
        const newCategory = new Category({
            name,
            description,
        });
    
        const category = await newCategory.save();
        res.json(category);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
        }
    }
);

// @route    GET /api/categories
// @desc     Get all categories
// @access   Public
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    GET /api/categories/:id
// @desc     Get category by ID
// @access   Public
router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ msg: 'Category not found' });
        }
        res.json(category);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Category not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @route    PUT /api/categories/:id
// @desc     Update category by ID
// @access   Private
router.put('/:id', auth, async (req, res) => {
    const { name, description } = req.body;
    const categoryFields = {};
    if (name) categoryFields.name = name;
    if (description) categoryFields.description = description;
    try {
        let category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ msg: 'Category not found' });
        }
        category = await Category.findByIdAndUpdate(
            req.params.id,
            { $set: categoryFields },
            { new: true }
        );
        res.json(category);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    DELETE /api/categories/:id
// @desc     Delete category by ID
// @access   Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ msg: 'Category not found' });
        }

        await Category.findByIdAndDelete(req.params.id);

        res.json({ msg: 'Category removed' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Category not found' });
        }
        res.status(500).send('Server Error');
    }
});

module.exports = router;

