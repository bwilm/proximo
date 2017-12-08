import * as express from 'express';
import contact from './controllers/contact.ctrl';
import places from './controllers/places.ctrl';

let router = express();

router.use('/contact', contact);
router.use('/places', places);

export default router;
