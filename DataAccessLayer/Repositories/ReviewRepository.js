const Review = require("../../DataAccessLayer/Models/Review");
const DoctorRepository = require("../../DataAccessLayer/Repositories/DoctorRepository");
const PatientRepository = require("../../DataAccessLayer/Repositories/PatientRepository");

const createReview = async (patientId, doctorId, reviewData) => {
  
    if (await hadReviewed(patientId, doctorId)) {
        throw new Error("You have already reviewed this doctor");
    }
    const review = new Review({
        doctor: doctorId,
        patient: patientId,
        rating: reviewData.rating,
        comment: reviewData.comment,
    });
    return await review.save();
};

const hadReviewed = async (patientId, doctorId) => {
    const review = await Review.findOne({ doctor: doctorId, patient: patientId });
    return review;
};

const getReviewsByDoctorId = async (doctorId) => {
    return await Review.find({ doctor: doctorId }).populate({
            path: "patient",
            select: "user",
            populate: {
                path: "user",
                select: "name"
            }
        });
}

module.exports = {
    createReview,
    hadReviewed,
    getReviewsByDoctorId
};

