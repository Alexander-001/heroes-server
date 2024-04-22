const { Router } = require("express");
const { check } = require("express-validator");
const {
  getHeroes,
  getSuggestions,
  getHeroById,
  addHeroes,
  updateHero,
  deleteHero,
} = require("../controllers/heroes.controllers");

const router = Router();

router.get("/", getHeroes);
router.get("/suggestions", getSuggestions);
router.get("/:id", getHeroById);
router.post("/:hero", addHeroes);
router.patch("/:id", updateHero);
router.delete("/:id", deleteHero);

module.exports = router;
