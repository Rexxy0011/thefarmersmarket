import express from "express";
import authSeller from "../middlewares/authSeller.js";
import {
  createMessage,
  getAllMessages,
  markAsRead,
} from "../controllers/contactController.js";

const contactRouter = express.Router();

contactRouter.post("/", createMessage);
contactRouter.get("/", authSeller, getAllMessages);
contactRouter.patch("/:id/read", authSeller, markAsRead);

export default contactRouter;
