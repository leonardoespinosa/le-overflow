import express from 'express'

const app = express.Router()

const question = {
    _id: 1,
    title: 'Como reutilizo un componente en android',
    description: 'Miren esta es mi pregunta...',
    createdAt: new Date(),
    icon: 'devicon-android-plain',
    answers: [],
    user: {
        firstName: 'Leonardo',
        lastName: 'Espinosa',
        email: 'leonardo@gmail.com',
        password: '123456'
    }
}

const questions = new Array(10).fill(question)

app.get('/', (req, res) => res.status(200).json(questions))

app.get('/:id', (req, res) => res.status(200).json(question))

export default app