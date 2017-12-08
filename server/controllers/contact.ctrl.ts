import { Router } from 'express';
import { sendEmail } from '../services/email.svc';

const router = Router();

router.route('/')
    // send us an email from potential customer
    .post((req, res) => {
        sendEmail(process.env.HOST_EMAIL || '', req.body.fromEmail, req.body.subject, req.body.message)
        .then((response) => {
            res.sendStatus(204);
        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        })
    });

export default router;
