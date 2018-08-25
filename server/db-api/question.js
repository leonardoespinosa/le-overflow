import Debug from 'debug'
import { Question, Answer } from '../models'

const debug = new Debug('le-overflow:db-api:question')

export default {
    findAll: () => {
        debug('Finding all questions')
        return Question.find().populate('answers')
    },

    findById: (id) => {
        debug(`Find question with id -> ${id}`)
        return Question
            .findOne({ _id: id })
            .populate('user')
            .populate({
                path: 'answers',
                options: { sort: '-createdAt' },
                populate: {
                    path: 'user',
                    model: 'User'
                }
            })
    },

    create: (q) => {
        debug('Creating new question')
        const question = new Question(q)
        return question.save()
    },

    createAnswer: async (q, a) => {
        debug('Inserting answer in question')
        const answer = new Answer(a)
        const savedAnswer = await answer.save()
        q.answers.push(savedAnswer)
        await q.save();
        return savedAnswer
    }
}