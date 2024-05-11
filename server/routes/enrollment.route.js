// Import necessary modules and models
const express = require('express');
const { EnrollmentModel } = require('../models/enrollment.model');
const EnrollmentRouter = express.Router();


// Make Payment (Enroll in a Course)
EnrollmentRouter.post('/enroll', async (req, res) => {
    try {
        const { studentID, courseID, paymentMethod,price,status } = req.body;
        const checkEnrollment= EnrollmentModel.findOne({studentID, courseID})
        if(checkEnrollment){
          return   res.status(201).json({ message: 'you have already enrolled for this ' });  
        }
        const enroll = new EnrollmentModel({
            studentID,
            courseID,
            paymentMethod,
            price,
            status  
        });
        await enroll.save();

       return res.status(201).json({ message: 'Payment successful. Enrolled in course.' });
    } catch (error) {
        console.error('Error making payment:', error);
       return res.status(500).json({ message: 'Failed to make payment' });
    }
});

EnrollmentRouter.get('/:studentID', async (req, res) => {
    try {
        const { studentID } = req.params;

        // Find all enrollments for the student
        const enrollments = await EnrollmentModel.find({ studentID }).populate('courseID');

       return  res.status(200).json(enrollments);
    } catch (error) {
        console.error('Error getting enrolled courses:', error);
        res.status(500).json({ message: 'Failed to get enrolled courses' });
    }
});

EnrollmentRouter.delete('/:enrollmentID', async (req, res) => {
    try {
        const { enrollmentID } = req.params;
        // Find the enrollment record by ID and delete it
        await EnrollmentModel.findByIdAndDelete(enrollmentID);
        res.status(200).json({ message: 'Enrollment canceled successfully' });
    } catch (error) {
        console.error('Error canceling enrollment:', error);
        res.status(500).json({ message: 'Failed to cancel enrollment' });
    }
});


// Get Payment Details (for Enrollment)
EnrollmentRouter.get('/:studentID/:courseID', async (req, res) => {
    try {
        const { studentID, courseID } = req.params;

        // Find the payment details for the specified enrollment
        const enrollmentDetails = await EnrollmentModel.findOne({ studentID, courseID }).populate('courseID').populate('studentID');

        if (enrollmentDetails) {
            res.status(200).json(enrollmentDetails);
        } else {
            res.status(404).json({ message: 'enrollmentDetails  not found for this enrollment' });
        }
    } catch (error) {
        console.error('Error getting enrollmentDetails:', error);
        res.status(500).json({ message: 'Failed to get enrollmentDetails' });
    }
});

module.exports = {EnrollmentRouter};
