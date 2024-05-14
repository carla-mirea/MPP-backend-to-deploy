import express from "express";
import { addMonitor, deleteMonitor, getMonitorById, getMonitors, updateMonitor } from "../controller/monitorsController";
import { addReview, deleteReview, getReviewById, getReviews, updateReview } from "../controller/reviewsController";
import { registerUser } from "../controller/registrationController";
import { loginUser } from "../controller/logInController";

const router = express.Router();

router.get('/monitors', getMonitors);
router.get('/monitor/:id', getMonitorById);
router.post('/addMonitor', addMonitor);
router.delete('/monitors/:id', deleteMonitor);
router.put('/monitors/:id', updateMonitor);

router.get('/reviews', getReviews);
router.get('/review/:id', getReviewById);
router.post('/addReview', addReview);
router.delete('/reviews/:id', deleteReview);
router.put('/reviews/:id', updateReview);

router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;