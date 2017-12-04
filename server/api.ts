import * as express from 'express';
import contact from './controllers/contact.ctrl';

let router = express();

router.use('/contact', contact);

export default router;
