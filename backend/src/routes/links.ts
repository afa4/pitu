import {Router} from 'express';
import linksController from '../controllers/links';

const router = Router();

router.post('/links', (req, res) => {
    linksController.postLink(req, res);
});

router.get('/links/:code', (req, res) => {
    linksController.getLink(req, res, true);
});

router.get('/links/:code/stats', (req, res) => {
    linksController.getLink(req, res, false);
});

export default router;