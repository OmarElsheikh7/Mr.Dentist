const Review = require("../../DataAccessLayer/Models/Review");
const DoctorRepository = require("../../DataAccessLayer/Repositories/DoctorRepository");
const PatientRepository = require("../../DataAccessLayer/Repositories/PatientRepository");

const createReview = async (patientId, doctorId, reviewData) => {
  
    const review = new Review({
        doctor: doctorId,
        patient: patientId,
        rating: reviewData.rating,
        comment: reviewData.comment,
    });
    return await review.save();
};

const updateReview = async (reviewId, reviewData) => {
   return await Review.findByIdAndUpdate(
        reviewId,
        {
            rating: reviewData.rating,
            comment: reviewData.comment,
        },
        { new: true }
    );
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

const getReviewsByPatientId = async (patientId) => {
    return await Review.find({ patient: patientId }).populate({
        path: "doctor",
        select: "user",
        populate: {
            path: "user",
            select: "name"
        }
    });
};

const getReviewById = async (reviewId) => {
    return await Review.findById(reviewId);
};

module.exports = {
    createReview,
    updateReview,
    hadReviewed,
    getReviewsByDoctorId,
    getReviewsByPatientId,
    getReviewById
};

