const Todo = require('../models/todo');

class TodoController {
    async createTodo(req, res) {
        const { day, title, description } = req.body;
        const userId = req.user.id;

        try {
            const newTodo = new Todo({
                day,
                title,
                description,
                userId,
            });
            await newTodo.save();
            res.status(201).json({ message: 'Todo created successfully', data: newTodo });
        } catch (error) {
            if (error.name === 'ValidationError') {
                const messages = Object.values(error.errors).map((val) => val.message);
                return res.status(400).json({ message: 'Validation error', error: messages });
            } else {
                res.status(500).json({ message: 'Server error', error: error.message });
            }
        }
    }

    async getTodos(req, res) {
        const userId = req.user.id;
        try {
            const todos = await Todo.find({ userId });
            res.status(200).json({ data: todos });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }

    async updateTodoById(req, res) {
        const { id } = req.params;
        const { day, title, description } = req.body;
        const userId = req.user.id;

        try {
            const updatedTodo = await Todo.findOneAndUpdate(
                { _id: id, userId },
                { day, title, description },
                { new: true }
            );
            if (!updatedTodo) {
                return res.status(404).json({ message: 'Todo not found' });
            }
            res.status(200).json({ message: 'Todo updated successfully', data: updatedTodo });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }

    async deleteTodoById(req, res) {
        const { id } = req.params;
        const userId = req.user.id;

        try {
            const deletedTodo = await Todo.findOneAndDelete({ _id: id, userId });
            if (!deletedTodo) {
                return res.status(404).json({ message: 'Todo not found' });
            }
            res.status(200).json({ message: 'Todo deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
}

module.exports = new TodoController();