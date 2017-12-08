"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const places = require("../services/places.svc");
const router = express_1.Router();
router.route('/:id')
    .get((req, res) => {
    places.getImage(req.params.id)
        .then(result => {
        res.status(200).send(result);
    }, err => {
        console.log(err);
        res.sendStatus(500);
    });
});
router.route('/')
    .post((req, res) => {
    if (req.body.address) {
        places.getCoords(req.body)
            .then(placeList => {
            let response = {
                photos: placeList
            };
            res.send(response);
        }, err => {
            console.log(err);
            res.sendStatus(500);
        });
    }
    else {
        places.hasCoords(req.body)
            .then(placeList => {
            let response = {
                photos: placeList
            };
            res.send(response);
        }, err => {
            console.log(err);
            res.sendStatus(500);
        });
    }
});
exports.default = router;
