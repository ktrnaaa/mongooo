import { Router } from 'express';

const router = Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('main');
});

export default router;
