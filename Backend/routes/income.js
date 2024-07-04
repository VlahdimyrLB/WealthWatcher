const express = require("express");
const router = express.Router();

const { addIncome, updateIncome } = require("../controllers/incomeController");

router.route("/").get().post(addIncome);

router.route("/:incomeId").patch(updateIncome).delete();

module.exports = router;
