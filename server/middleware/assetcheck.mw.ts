import * as path from 'path';
import * as express from 'express';

let router = express.Router();

let clientPath = path.join(__dirname, '../../client');

export default function check(req: any, res: any, next: any) {
    if (isAsset(req.url)) {
       return next();
    } else {
        res.sendFile(path.join(clientPath, 'index.html'));
    }
};

function isAsset(path: any) {
    let pieces = path.split('/');
    if (pieces.length===0) {
        return false;
    }
    let last = pieces[pieces.length-1];
    if (path.indexOf('/api') !==-1|| path.indexOf('/?') !==-1) {
        return true;
    } else if (last.indexOf('.') !==-1) {
        return true;
    } else {
        return false;
    }
}
