const express = require('express');
const userRouter = require('./user');
const accountsRouter = require('./accounts');
const app = express();

const router = express.Router();

router.use('/user', userRouter);
router.use('/account',accountsRouter);


module.exports = router;