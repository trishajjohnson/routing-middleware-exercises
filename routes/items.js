const express = require('express');
const router = new express.Router();
const ExpressError = require('../expressError');
const items = require('../fakeDb');


router.get('/', (req, res) => {
    res.json({ items });
})


router.post('/', (req, res) => {
    const newItem = { name: req.body.name, price: req.body.price };
    items.push(newItem);
    res.status(201).json({ "added": { newItem } });
})


router.get('/:name', (req, res) => {
    const item = items.find(i => i.name === req.params.name);
    
    if(item === undefined) {
        throw new ExpressError("Item Not Found", 404);
    }
    res.json({ item });
})


router.patch('/:name', function(req, res) {
    const item = items.find(i => i.name === req.params.name);

    if(item === undefined) {
        throw new ExpressError("Item Not Found", 404);
    }
    
    item.name = req.body.name;
    item.price = req.body.price;

    res.json({ "updated": { item } });

})

router.delete('/:name', function(req, res) {
    const item = items.find(i => i.name === req.params.name);

    if(item === undefined) {
        throw new ExpressError("Item Not Found", 404);
    }

    const idx = items.indexOf(item);
    items.splice(idx, 1);

    res.json({message: "Deleted"})

})

module.exports = router;