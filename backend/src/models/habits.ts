import mongoose from 'mongoose';

interface IHabit {
    user_id: string,
    name: string,
    type: "boolean" | "numeric",
    goal: number,
    unit: string,
    created_at: Date
}

const habitSchema = new mongoose.Schema<IHabit>({
    user_id: {
        type: String,
        required: true,
        unique: false,
    },
    name: {
        type: String,
        required: true,
        unique: false,
    },
    type: {
        type: String,
        required: true,
        unique: false,
    },
    goal: {
        type: Number,
        required: true,
        unique: false,
    },
    unit: {
        type: String,
        required: true,
        unique: false,
    },
    created_at: {
        type: Date,
        required: true,
        unique: false,
    },
});

const habit = mongoose.model("Habit", habitSchema);

export default habit