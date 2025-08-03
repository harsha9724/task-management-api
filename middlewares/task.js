const {body,validationResult} = require("express-validator");

const createTaskSchema=[
    body("title").notEmpty().withMessage("Task title is required"),
    body("description").notEmpty().withMessage("Description is required"),
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
};

module.exports  = {createTaskSchema,validateBodySchema}
