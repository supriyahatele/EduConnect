const mongoose = require('mongoose');

const EnrollmentSchema = mongoose.Schema({
    studentID: { type: [mongoose.Schema.Types.ObjectId], ref: "User" },
    courseID: { type: [mongoose.Schema.Types.ObjectId], ref: "Course" },
    price  : { type : Number , default: 0 },
    enrollmentDate: { type: Date, default: Date.now },
    paymentMethod:{type:"String", required : true, enum:['debit card','credit card',"upi ID"]},
    status:{type:"String", required : true, enum:['true','false',], default:false}
},{
    versionKey : false,
    timestamps: true,
})

const EnrollmentModel = mongoose.model('Enrollment', EnrollmentSchema);

module.exports = {
    EnrollmentModel
}