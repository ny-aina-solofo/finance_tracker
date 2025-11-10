const {db,sequelize} = require('../models/index');
const Todolist = db.todolist;
const { QueryTypes } = require('sequelize');

const getTodolist = async() => {
    try {
        const todos = await Todolist.findAll({order : [['rang', 'ASC']]});
        return todos.map((t) => t.toJSON());    
    } catch (error) {
        console.error("Error fetching todolist data:", error);
        return { message: "Error retrieving todolist data.", error: error.message };
    }
};
const addTodo = async(newLibelle) => {
    try {
        const maxRange = await sequelize.query('select (max(cast(rang as integer))+1) as rang_max from todolist', {
            type: QueryTypes.SELECT,
        });
        const rang = maxRange[0].rang_max || null;        
        await Todolist.create(
            {libelle: newLibelle ,done: 0, rang:`${rang}`}
        )
        return { success: true };    
    } catch (error) {
        console.error("Error inserting todolist data:", error);
        return { message: "Error retrieving todolist data.", error: error.message };
    }
};
const deleteTodo = async(id) => {
    try {
        await Todolist.destroy({ where: { id } });
        return { success: true };    
    } catch (error) {
        console.error("Error deleting todolist data:", error);
        return { message: "Error retrieving todolist data.", error: error.message };
    }
};
const updateDone = async(id,newDone) => {
    try {
        await Todolist.update({ done : newDone  },{ where : { id }});
        return { success: true };    
    } catch (error) {
        console.error("Error deleting todolist data:", error);
        return { message: "Error retrieving todolist data.", error: error.message };
    }
};
const updateOrder = async(updatedList) => {
    try {
        for (const key of updatedList) {
            await Todolist.update({ rang : key.rang },{ where : { id : key.id }});    
        }
        return { success: true };    
    } catch (error) {
        console.error("Error deleting todolist data:", error);
        return { message: "Error retrieving todolist data.", error: error.message };
    }
};


module.exports = {
    getTodolist,
    addTodo,
    deleteTodo,
    updateDone,
    updateOrder
}

