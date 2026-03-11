import mongoose from 'mongoose';

interface IHabitLogs{
    habit_id: string,
    value: number,
    date: Date,
}

const habitLogsSchema = new mongoose.Schema<IHabitLogs>({
    habit_id: {
        type: String,
        required: true,
        unique: false
    },
    value: {
        type: Number,
        required: true,
        unique: false
    },
    date: {
        type: Date,
        required: true,
        unique: false
    },
});

const habitLogs = mongoose.model("HabitLogs", habitLogsSchema);

export default habitLogs