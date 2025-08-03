const express = require("express");
const router = express.Router();
const {validateBodySchema,validateLoginSchemaFileds,validateRegisterSchemaFileds} = require("../middlewares/user");
const {register,login} = require("../controllers/user");


router.post("/register",validateRegisterSchemaFileds,validateBodySchema,register);
router.post("/login",validateLoginSchemaFileds,validateBodySchema,login);


module.exports = router;