const mongoose = require("mongoose");

const HeroesSchema = mongoose.Schema({
  superhero: {
    type: String,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
  alter_ego: {
    type: String,
    required: true,
  },
  first_appearance: {
    type: String,
    required: true,
  },
  characters: {
    type: String,
    required: true,
  },
  alt_img: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("heroes", HeroesSchema);
