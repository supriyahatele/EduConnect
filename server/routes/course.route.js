const express = require('express');

const courseRouter = express.Router();

const { auth } = require('../middlewares/auth.middleware');
const { access } = require('../middlewares/access.middleware');
const { createCourse, allCourse, courseById, updateCourse, deleteCourse } = require('../controllers/course.controller');

// to create course 
courseRouter.post('/Course',createCourse )

// to get all the users -- access to admin only
courseRouter.get('/', allCourse)

// to get profile of the user -- user details
courseRouter.get('/:id',courseById )

// to update the user details

courseRouter.patch('/:id', updateCourse )

// to delete the user
courseRouter.delete('/:id', deleteCourse)

module.exports = {
    courseRouter
}