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

const validHero = [
  check("superhero", "Se debe ingresar superheroe.").not().isEmpty(),
  check("publisher", "Se debe ingresar creador.").not().isEmpty(),
  check("alter_ego", "Se debe ingresar alter ego.").not().isEmpty(),
  check("first_appearance", "Se debe ingresar primera aparición.")
    .not()
    .isEmpty(),
  check("characters", "Se debe ingresar personajes.").not().isEmpty(),
];

router.get("/", getHeroes);
router.get("/suggestions", getSuggestions);
router.get("/:id", getHeroById);
router.post("/add", validHero, addHeroes);
router.patch("/:id", validHero, updateHero);
router.delete("/:id", deleteHero);

module.exports = router;
