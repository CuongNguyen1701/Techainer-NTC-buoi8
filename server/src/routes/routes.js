import express from "express";
const router = express.Router();
import AddCheckin from "../services/AddCheckin";
import CheckinHistory from "../services/CheckinHistory";
import AddCheckOut from "../services/AddCheckOut";

//checkin
router.post("/checkin", AddCheckin);
router.post("/checkout", AddCheckOut);

router.get("/history", CheckinHistory);


export { router };
