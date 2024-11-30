const ToDoService = require('../services/todo.service');
const ToDoModel = require('../models/todo.model');
const mongoose = require('mongoose');


exports.createToDo =  async (req,res,next)=>{
    console.log('req.body:', req.body);
    try {
        const todo = await ToDoModel.create(req.body);
        res.json(todo);
      } catch (err) {
        next(err);
      }
    console.log(req.body);
}

// exports.getToDoList =  async (req,res,next)=>{
//     try {
//         const { userId } = req.query;
//         let todoList = await ToDoService.getUserToDoList(userId);
//         res.json({status: true,success: todoList.map(item => ({title: item.title, description: item.description}))});
//     } catch (error) {
//         console.log(error, 'err---->');
//         next(error);
//     }
// }

exports.getToDoList = async (req, res, next) => {
    try {
        const { userId } = req.query;
        const todoList = await ToDoService.getUserToDoList(userId);
        res.json({
            status: true,
            success: todoList.map(item => ({
                _id: item._id, // Trả về _id
                title: item.title,
                description: item.description,
            })),
        });
    } catch (error) {
        console.error('Error fetching todo list:', error);
        next(error);
    }
};

// exports.deleteToDo =  async (req,res,next)=>{
//     try {
//         const { id } = req.body;
//         let deletedData = await ToDoService.deleteToDo(id);
//         res.json({status: true,success:deletedData});
//     } catch (error) {
//         console.log(error, 'err---->');
//         next(error);
//     }
// }

exports.deleteToDo = async (req, res, next) => {
    try {
        const { id } = req.body;

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ 
                status: false,
                message: 'Invalid ID' 
            });
        }

        const deletedData = await ToDoService.deleteToDo(id);
        if (!deletedData) {
            return res.status(404).json({ 
                status: false, 
                message: 'Todo not found' 
            });
        }

        res.json({ status: true, success: deletedData });
    } catch (error) {
        console.error('Error deleting todo:', error);
        next(error);
    }
};

