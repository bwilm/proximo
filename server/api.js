"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const contact_ctrl_1 = require("./controllers/contact.ctrl");
const places_ctrl_1 = require("./controllers/places.ctrl");
let router = express();
router.use('/contact', contact_ctrl_1.default);
router.use('/places', places_ctrl_1.default);
exports.default = router;
