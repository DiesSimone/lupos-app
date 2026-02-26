import mongoose from 'mongoose'

interface ITask {
    user_id: string,
    name: string,
    date: Date
}

const taskSchema = new mongoose.Schema<ITask>({
    user_id: {
        type: String,
        required: true,
        unique: false
    },
    name: {
        type: String,
        required: true,
        unique: false
    },
    date: {
        type: Date,
        required: true,
        unique: false
    }
});

const task = mongoose.model("Task", taskSchema);

export default task