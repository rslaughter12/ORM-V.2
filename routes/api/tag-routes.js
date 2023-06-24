const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    // Find all tags and include associated Product data
    const tags = await Tag.findAll({ include: Product });
    res.json(tags);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    // Find a single tag by its `id` and include associated Product data
    const tag = await Tag.findByPk(req.params.id, { include: Product });
    if (!tag) {
      res.status(404).json({ message: 'Tag not found' });
    } else {
      res.json(tag);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  try {
    // Create a new tag
    const tag = await Tag.create(req.body);
    res.status(201).json(tag);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    // Update a tag's name by its `id` value
    const tag = await Tag.update(req.body, {
      where: { id: req.params.id }
    });
    if (tag[0] === 0) {
      res.status(404).json({ message: 'Tag not found' });
    } else {
      res.json({ message: 'Tag updated successfully' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    // Delete a tag by its `id` value
    const tag = await Tag.destroy({ where: { id: req.params.id } });
    if (!tag) {
      res.status(404).json({ message: 'Tag not found' });
    } else {
      res.json({ message: 'Tag deleted successfully' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;

