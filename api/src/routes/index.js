const { Router } = require('express');

const dogRouter = require("./dogs")
const temperamentRouter = require("./temperament")
const router = Router();


router.use("/", dogRouter)
router.use("/temperament", temperamentRouter)

module.exports = router;

