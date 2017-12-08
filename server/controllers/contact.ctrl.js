"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const email_svc_1 = require("../Services/email.svc");
const router = express_1.Router();
router.route('/')
    .post((req, res) => {
    email_svc_1.sendEmail(process.env.HOST_EMAIL || '', req.body.fromEmail, req.body.subject, req.body.message)
        .then((response) => {
        res.sendStatus(204);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
});
exports.default = router;
