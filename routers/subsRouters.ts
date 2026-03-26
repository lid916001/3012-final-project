// const { ensureAuthenticated } = require("../middleware/checkAuth");
import express from "express";
import * as database from "../controller/postController";
const router = express.Router();

router.get("/list", async (req, res) => {
  const subs = database.getSubs();
  const user = req.user;
  res.render("subs", { subs, user });
});

router.get("/show/:subname", async (req, res) => {
  const subname = req.params.subname;
  const posts = await database.getPosts(20, subname);
  const user = req.user;
  res.render("sub", { posts, subname, user });
});

export default router;
