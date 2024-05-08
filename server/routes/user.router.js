const express = require('express');

const userRouter = express.Router();
const { allUsers, userProfile, loginUser, registerUser, logoutUser, updateUser, deleteUser } = require('../controllers/user.controller');

// to get all the users -- access to admin only
userRouter.get('/',  allUsers)

// to get profile of the user -- user details
userRouter.get('/profile/:id', userProfile)

// to login the user
userRouter.post('/login', loginUser)

// to register the user
userRouter.post('/register', registerUser)

// to logout the user
userRouter.post('/logout', logoutUser)

// to update the user details
userRouter.patch('/:id',  updateUser)

// to delete the user
userRouter.delete('/:id', deleteUser)

module.exports = {
    userRouter
}