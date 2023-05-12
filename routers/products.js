/*for every model, there are routers. 
routers are responsible for creating/ storing/ Importing and exporting APIs between the files
*/
const express = require('express');
const { Product } = require('../models/product');
const router = express.Router();

router.get(`/`, async function (req, res) {
    /*sending an object from backend to API/Postman
    const product = {
        id: '1',
        name: 'example',
    };
    res.send(product);*/

    /*read objects from database and display them in the front-end,
    async + await are required since the database wasn't ready when it was called for
    , these keywords urge the system to wait til the database is ready*/
    const prodList = await Product.find();

    //catching errors method #1
    if (!prodList) {
        res.status(500).json({ success: false });
    }
    res.send(prodList);
});
router.post(`/`, function (req, res) {
    const product = new Product({
        id: req.body.id,
        name: req.body.name,
        image: req.body.image,
        images: req.body.images,
        price: req.body.price,
        description: req.body.description,
        material: req.body.material,
        category: req.body.category,
        countInStock: req.body.countInStock,
        featured: req.body.featured,
        date: req.body.date,
    });
    //catching errors method #2
    product
        .save()
        .then((product) => {
            res.status(201).json(product);
        })
        .catch((err) => {
            res.status(500).json({
                error: err,
                success: false,
            });
        });
});

//exporting method #2
module.exports = router;