import mongoose from 'mongoose'

interface IToken {
    value: string
}

const tokenSchema = new mongoose.Schema<IToken>({
    value: {
        type: String,
        required: true,
        unique: true
    }
})

const token = mongoose.model("Token", tokenSchema)

export default token