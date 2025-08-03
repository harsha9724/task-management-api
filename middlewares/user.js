const {body,validationResult} = require("express-validator");

const validateRegisterSchemaFileds = [
    body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Provide the valid email"),

    body("password").notEmpty().withMessage("Password is required").isLength({min:6}).withMessage("Password must contain atleast 6 characters").isLength({max:12}).withMessage("Password must not exceed 12 characters").isAlphanumeric().withMessage("Password should not contain special characters")

]

const validateLoginSchemaFileds = [
    body("email").notEmpty().withMessage("Email is required"),
    body("password").notEmpty().withMessage("Password is required")
]

function validateBodySchema(req,res,next){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        let results = errors.array();
        return res.status(400).json({
            status:"Failed",
            message:results[0].msg
        })
    }else{
        next()
    }
}

module.exports = {validateBodySchema,validateLoginSchemaFileds,validateRegisterSchemaFileds}