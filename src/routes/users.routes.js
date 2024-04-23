const { Router } = require("express");
const { check } = require("express-validator");
const {
  authUser,
  getUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
} = require("../controllers/users.controllers");

const router = Router();

const validUser = [
  check("username", "Se debe ingresar usuario.").not().isEmpty(),
  check("password", "Se debe ingresar contraseña.").not().isEmpty(),
];

router.post("/login", validUser, authUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/add", validUser, addUser);
router.patch("/:id", validUser, updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
