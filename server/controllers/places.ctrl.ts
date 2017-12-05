import { Router } from 'express';
import * as places from '../services/places.svc';

const router = Router();

router.route('/:id')
    .get((req, res) => {
        places.getCoords(req.params.id)
        .then(result => {
            console.log(result);
        })
    })
    .post((req, res) => {
        places.getCoords(req.body.address)
        .then(result => {
            console.log(result);
        })
    })

router.route('/')
    .post((req, res) => {
        places.getCoords(req.body.address)
        .then(coords => {
            places.getPlaces(coords.lat, coords.lng, req.body.radius, req.body.type, req.body.keywords)
            .then(placeList => {
                places.getArrayDetails(placeList)
                .then(details => {
                    let response = {
                        places: details
                    }
                    res.send(response);
                })
            })
        })
    })

export default router;