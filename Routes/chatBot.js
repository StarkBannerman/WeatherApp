import Router from "express";
import { getResponsefromAI } from "../Services/chatBotServices.js";
const router = Router();

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const question = req?.body?.question;
    const response = await getResponsefromAI(question);
    response && res.status(200).json({ response: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

export default router;
