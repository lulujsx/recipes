import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import User from '../models/user.js'

export const signin = async (req, res) => {
    const { email, password } = req.body
    try {
        const existingUser = await User.findOne({ email })
        if (!existingUser) {
            return res.status(400).send({ error: 'Usuario incorrecto' })
        }
        const isPasswordValid = bcrypt.compareSync(password, existingUser.password)
        if (!isPasswordValid) {
            return res.status(400).send({ error: 'Contraseña incorrecta' })
        }
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: '1h' })
        res.status(200).send({ result: existingUser, token })
    } catch (error) {
        res.status(500).send({ error })
    }
}

export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body
    try {
        const existingUser = await User.findOne({ email })
        console.log(existingUser)
        if (existingUser) {
            return res.status(400).send({ error: 'El usuario ya existe' })
        }
        if(password != confirmPassword) return res.status(400).send({ error: 'Las contraseñas no coinciden' })
         const hashedPassword = await bcrypt.hashSync(password, 12)
         const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` })
         const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: '1h' })
         res.status(201).json({ result, token })
    } catch (error) {
        res.status(500).send({ error })
        console.log(error)
    }
    
        
    
}