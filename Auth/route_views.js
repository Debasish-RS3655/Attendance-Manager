//creating the router for the view operations
//Debashish Buragohain

const express = require('express');
const router = express.Router();

//creating a get request routing
router.route('/student-login').get((req, res, next) => {
    res.redirect('/views/register-student.html');
})
router.route('/teacher-login').get((req, res, next) => {
    res.redirect('/views/register-teacher.html');
})
router.route('/student-record').get((req, res, next) => {
    res.redirect('/views/student_view.html');
})
router.route('/teacher-record').get((req, res, next) => {
    res.redirect('/views/teacher_view.html');
})
module.exports = router;