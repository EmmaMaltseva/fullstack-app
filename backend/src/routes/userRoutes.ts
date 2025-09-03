import express from "express";
import { getUsers } from "../userService";

const router = express.Router();

router.get("/users", async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Запрос поиска юзера провалился" });
  }
});

export default router;
