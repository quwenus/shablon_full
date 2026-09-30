import express from 'express'
import cors from 'cors'
import mysql from 'mysql2/promise'
import 'dotenv/config'

const app = express()

app.use(cors())
app.use(express.json())

const port = 5000

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DB_NAME,
    password: process.env.PASSWORD,
    port: process.env.PORT
})

app.post('/reg', async (req, res) => {
    try {
        const { login, password, fio, phone, email } = req.body;

        const [newUser] = await pool.query('INSERT INTO users (login, password, fio, phone, email) VALUES (?,?,?,?,?)', [login, password, fio, phone, email])
        console.log(newUser);
        return res.status(200).json({message: 'Пользователь успешно создан'})

    } catch(err){
        console.log(err)
        return res.status(401).json({message: `Логин занят`})
    }
})

app.post('/log', async (req, res) => {
    try{
        const {login, password} = req.body;

        const [user] = await pool.query('SELECT login FROM users WHERE login = ? AND password = ?', [login, password])
        console.log(user);
        return res.status(200).json({message: 'Успешно'})
    } catch(err){
        console.log(err)
        return res.status(500).json({message:  `Неверный логин или пароль`})
    }
})

app.listen(port, () => {
    console.log(`Сервер запущен на порту: ${port}`);
})