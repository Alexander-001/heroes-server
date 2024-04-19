const { Router } = require("express");
const { check } = require("express-validator");
const { getHeroes } = require("../controllers/heroes");

const router = Router();

router.get("/get", getHeroes);

module.exports = router;
