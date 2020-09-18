const express = require('express');
const router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')

function success(res, payload) {
  return res.status(200).json(payload)
}
function error(res, error) {
  return res.status(error.status).json(error)
}

// проверка токена, который приходит с фронта

router.post('/token', async (req, res) => {
const token = req.headers.token
  jwt.verify(token, keys.jwt, function(err, decoded) {
    if (decoded) {
      res.send(decoded)
    }
  });

})

// Регистрация юзеров в БД в Монго

router.post('/register', async (req, res) => {


  try {
    const { body: { name, email, password } } = req

    console.log('_____________ req.body', req.body);


    const user = new User({
      name: name,
      email: email,
      // шИфРоВкА пароля
      password:  bcrypt.hashSync(password, 10)
    });
    console.log('_____________ user', user);
    const newUser = await user.save();
    console.log('_____________ newUser', newUser);
    return success (res, newUser)
  }

  catch (err) {
    return error(res, { status: 400, message: "failed to create user" })
  }

})

// Авторизация зарегистрированных пользователей
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

      // монгус использует поиск по юзерам, метод findOne
    const user = await User.findOne({email: email})

    const checkPassword = bcrypt.compareSync(password, user.password)
    console.log('_____________ user', user);


    // Если пользователь существует, проверка пароля:
    if (checkPassword) {

      const token = jwt.sign({
        userId: user._id,
        email: user.email,
        isAdmin: user.isAdmin
      }, keys.jwt, {expiresIn: '24h'})

      res.send({
        userId: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
        token: token
      })
    } else {
      return error(res, { status: 400, message: "failed to login user" })
    }
  }
  catch (err) {
    return error(res, { status: 400, message: "failed data" })
  }

})




module.exports = router