const express = require('express');
const mongoose = require('mongoose');
const assert = require('assert');

const Product = require('../model/product.model');
module.exports = {
    home: (req, res) => {
        // to read all products
        Product.find((err, data) => {
            if (err) {
                assert.equal(null, err)
                ''
            } else {
                //response in json
                res.json(data);
            }
        });
    },
    newProduct: (req, res) => {
        // posting of new product
        let pro = new Product(req.body);
        pro.save().then(
            res.status(200).json({
                //success
                message: 'Product created'
            })
        ).catch(err => {
            res.status(400).json({
                message: 'Unable to save product'
            });
        });
    },
    editProduct: (req, res) => {
        // to get single products
        let id = req.params.id;
        Product.findById({
            _id: id
        }, (err, data) => {
            if (err) {
                assert.equal(null, err);
            } else {
                res.json(data);
            }
        });
    },
    updateProduct: (req, res) => {
        let id = req.params.id;
        Product.findById({
            _id: id
        }, (err, data) => {
            if (err) {
                assert.equal(null, err)
                ''
            } else {
                if (!data) {
                    res.status(400).json({
                        message: "No Data Found"
                    })
                } else {
                    data.title = req.body.title;
                    data.image = req.body.image;
                    data.price = req.body.price;
                    data.category = req.body.category;
                    data.description = req.body.description;

                    data.save().then(response => {
                        res.status(200).json({
                            message: 'Product updated'
                        }).catch(err => {
                            messgae: 'Unable to update'
                        });
                    })
                }
            }
        });
    },
    deleteProduct: (req, res) => {
        let id = req.params.id;
        Product.findByAndDelete({
            _id: id
        }, (err, data) => {
            if (err) {
                assert.equal(null, err);
            } else {
                res.status(200).json({
                    message: 'Product deleted'
                });
            }
        });
    }
}