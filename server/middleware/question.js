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

export const questions = new Array(10).fill(question)

export const questionsMiddleware = (req, res, next) => {
    req.questions = questions
    next()
}

export const questionMiddleware = (req, res, next) => {
    // get id from request params
    const { id } = req.params
    // when get id from params, that is String, with +id we transform to Number
    req.question = questions.find(question => question._id === +id)
    next()
}
