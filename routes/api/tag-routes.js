const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({})
  .then(dbShopData => res.json(dbShopData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
});


router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    include: [{
        model: Product,
      }],
    where: {
      id: req.params.id
    },
  }).then(dbShopData => {
    if (!dbShopData[0]) {
      res.status(404).json({ message: "Invalid ID: No Tag found."});
      return;
    }
    res.json(dbShopData);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    id:req.body.id,
    tag_name: req.body.tag_name
  }).then(dbShopData => res.json(dbShopData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  }).then(dbShopData => {
    if (!dbShopData[0]) {
      res.status(404).json({ message: "Invalid ID: No Tag found."});
      return;
    }
    res.json(dbShopData);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
Tag.destroy({
  where: {
    id: req.params.id
  }
}).then(dbShopData => {
  if (!dbShopData[0]) {
    res.status(404).json({ message: "Invalid ID: No Tag found."});
    return;
  }
  res.json(dbShopData);
}).catch(err => {
  console.log(err);
  res.status(500).json(err);
});
});

/* .then(dbShopData => res.json(dbShopData))
 .catch(err => {
    console.log(err);
  res.status(500).json(err);

.then(dbShopData => {
  if (!dbShopData[0]) {
    res.status(404).json({ message: "Invalid ID: No Tag found."});
    return;
  }
  res.json(dbShopData);
}).catch(err => {
  console.log(err);
  res.status(500).json(err);
*/

module.exports = router;