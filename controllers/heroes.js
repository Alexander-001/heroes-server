const STATUS_CODES = {
  ERROR: "ERROR",
  SUCCESS: "SUCCESS",
  INVALID: "INVALID",
};

const getHeroes = async (request, response) => {
  try {
    console.log(request.body);
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: "Error al obtener heroes.",
      CodeResult: STATUS_CODES.ERROR,
    });
  }
};

module.exports = {
  getHeroes,
};
