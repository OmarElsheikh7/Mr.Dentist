const ReviewRepository = require("../../DataAccessLayer/Repositories/ReviewRepository");
const patientRepository = require("../../DataAccessLayer/Repositories/PatientRepository");

const createReview = async (req, res) => {
    try {

        const patient = await patientRepository.findPatientByUserId(req.user.id);
        if (!patient) {
            return res.status(404).json({ message: "Patient not found for this user" });
        }

        const patientId = patient._id;
        const doctorId = req.params.id;

        if (!doctorId) {
            return res.status(400).json({ message: "Doctor ID is required" });
        }

        if (await ReviewRepository.hadReviewed(patientId, doctorId)) {
            return res.status(400).json({ message: "You have already reviewed this doctor" });
        }

        const reviewData = {
            rating: req.body.rating,
            comment: req.body.comment,
        };
        
        const review = await ReviewRepository.createReview(patientId, doctorId, reviewData);
        res.status(201).json({ message: "Review created successfully", data: review });
    } 
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createReview
};