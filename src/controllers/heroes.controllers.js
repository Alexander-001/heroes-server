const Heroes = require("../schema/heroes.schema");
const { validationResult } = require("express-validator");

const STATUS_CODES = {
  ERROR: "ERROR",
  SUCCESS: "SUCCESS",
  INVALID: "INVALID",
};

const getHeroes = async (_, res) => {
  try {
    const heroes = await Heroes.find();
    return res.status(200).json({
      message: "Heroes",
      heroes,
      CodeResult: STATUS_CODES.SUCCESS,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener heroes.",
      CodeResult: STATUS_CODES.ERROR,
    });
  }
};

const getHeroById = async (req, res) => {
  try {
    const heroe = await Heroes.findOne({ _id: req.params.id });
    if (!heroe) {
      return res.status(200).json({
        message: "Heroe no existe.",
        heroe,
        CodeResult: STATUS_CODES.INVALID,
      });
    }
    return res.status(200).json({
      message: "Heroe",
      heroe,
      CodeResult: STATUS_CODES.SUCCESS,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener heroe.",
      CodeResult: STATUS_CODES.ERROR,
    });
  }
};

const getSuggestions = async (req, res) => {
  try {
    const { superhero } = req.query;
    const heroes = await Heroes.find();
    const filterHeroes = heroes.filter((el) =>
      el.superhero.startsWith(superhero)
    );
    return res.status(200).json({
      message: "Heroes",
      heroes: filterHeroes,
      CodeResult: STATUS_CODES.SUCCESS,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener sugerencias.",
      CodeResult: STATUS_CODES.ERROR,
      error,
    });
  }
};

const addHeroes = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return response
        .status(200)
        .json({ errors: errors.array(), CodeResult: STATUS_CODES.INVALID });
    }
    const { superhero } = req.body;
    const existHero = await Heroes.findOne({ superhero });
    if (existHero) {
      return res.status(200).json({
        message: "Heroe ya existe.",
        CodeResult: STATUS_CODES.INVALID,
      });
    }
    const heroes = new Heroes(req.body);
    await heroes.save();
    return res.status(200).json({
      message: "Heroe agregado correctamente",
      CodeResult: STATUS_CODES.SUCCESS,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al añadir heroe.",
      CodeResult: STATUS_CODES.ERROR,
    });
  }
};

const updateHero = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return response
        .status(200)
        .json({ errors: errors.array(), CodeResult: STATUS_CODES.INVALID });
    }
    const {
      superhero,
      publisher,
      alter_ego,
      first_appearance,
      characters,
      alt_img,
    } = req.body;
    let hero = await Heroes.findOne({ _id: req.params.id });
    if (!hero) {
      return res.status(200).json({
        message: "Heroe no existe",
        CodeResult: STATUS_CODES.INVALID,
      });
    }
    hero.superhero = superhero;
    hero.publisher = publisher;
    hero.alter_ego = alter_ego;
    hero.first_appearance = first_appearance;
    hero.characters = characters;
    hero.alt_img = alt_img;
    await hero.save();
    return res.status(200).json({
      message: "Heroe actualizado.",
      CodeResult: STATUS_CODES.SUCCESS,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar heroe.",
      CodeResult: STATUS_CODES.ERROR,
    });
  }
};

const deleteHero = async (req, res) => {
  try {
    const hero = await Heroes.findOne({ _id: req.params.id });
    if (!hero) {
      return res.status(200).json({
        message: "Heroe no existe",
        CodeResult: STATUS_CODES.INVALID,
      });
    }
    await Heroes.deleteOne({ _id: req.params.id });
    res.status(200).json({
      message: "Heroe eliminado correctamente.",
      CodeResult: STATUS_CODES.SUCCESS,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar heroe.",
      CodeResult: STATUS_CODES.ERROR,
    });
  }
};

module.exports = {
  getHeroes,
  getHeroById,
  getSuggestions,
  addHeroes,
  updateHero,
  deleteHero,
};
