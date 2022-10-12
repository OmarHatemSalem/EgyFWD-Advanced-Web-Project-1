import express from 'express';  
import images from './api/images';

const routes = express.Router();

routes.get('/', (req, res) => {
    // console.log(req.url);
    let info = new URL(req.url, `http://${req.headers.host}`);
    console.log(info);
    res.send(req.headers);
    });

routes.use('/images', images);

export default routes;