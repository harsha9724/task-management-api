const Task = require("../models/task");

async function createTask(req,res) {
    try{
        const {title,description} = req.body;
        const {user_id} = req;
        
        let data = await Task.insertOne({title,description,user_id});

        return res.status(201).json({
            status:"success",
            message:"Task created successfully",
            data:{
                data
            }
        })

    }catch(error){
        return res.status(500).json({
            status:"Failed",
            message:error?.message
        })
    }
}

async function updateTask(req,res) {
    try{
        const {title,description,completed} = req.body;
        let query={};
        if(title){
            query.title=title
        }
        if(description){
            query.description = description
        }
        if(completed){
            query.completed = completed
        }
        const {user_id} = req;
        const {id} = req.params;
        // checking the owner ship of the task;
        let data = await Task.findOne({_id:id,user_id:user_id});
        if(!data){
            return res.status(401).json({
                status:"Failed",
                message:"Your are not authorized to update this task"
            })
        }

        let updated_data = await Task.updateOne({_id:id},{$set:{...query}});
        return res.status(201).json({
            status:"Success",
            message:"Task updated successfully",
            data:{
                data:updated_data
            }
        })

    }catch(error){
        return res.status(500).json({
            status:"Failed",
            message:error?.message
        })
    }
}

async function fetchTask(req,res) {
    try{
        const {user_id} = req;
        const data = await Task.find({user_id:user_id});
        return res.status(200).json({
            status:"Success",
            message:"Task fetched successfully",
            count:data.length,
            data:{
                data
            }
        })

    }catch(error){
        return res.status(500).json({
            status:"Failed",
            message:error?.message
        })
    }
}


async function deleteTask(req,res) {
    try{

        const {user_id} = req;
        const {id} = req.params;
                // checking the owner ship of the task;
        let data = await Task.findOne({_id:id,user_id:user_id});
        if(!data){
            return res.status(401).json({
                status:"Failed",
                message:"Your are not authorized to delete this task"
            })
        }

        let deleted_data = await Task.deleteOne({_id:id});
        return res.status(201).json({
            status:"Success",
            message:"Task deleted successfully",
            data:{
                data:deleted_data
            }
        })

    }catch(error){
        return res.status(500).json({
            status:"Failed",
            message:error?.message
        })
    }
};

module.exports = {createTask,updateTask,fetchTask,deleteTask}