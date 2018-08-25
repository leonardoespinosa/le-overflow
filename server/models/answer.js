import mongoose, { Schema } from 'mongoose'

const { ObjectId } = Schema.Types

const AnswerSchema = Schema({
    question: { type: ObjectId, ref: 'Question' },
    description: { type: String, required: true },
    createdAt: { type: Date, defult: Date.now, required: true },
    user: { type: ObjectId, ref: 'User', required: true },
})

export default mongoose.model('Answer', AnswerSchema)
