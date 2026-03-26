// @ts-nocheck
import express from "express";
import * as database from "../controller/postController";
const router = express.Router();
import { ensureAuthenticated } from "../middleware/checkAuth";

router.get("/", async (req, res) => {
  const posts = await database.getPosts(20);
  const user = req.user;
  res.render("posts", { posts, user });
});

router.get("/create", ensureAuthenticated, (req, res) => {
  const subs = database.getSubs();
  const user = req.user;
  res.render("createPosts", { user, subs });
});

router.post("/create", ensureAuthenticated, async (req, res) => {
  const { title, link, description, subgroup } = req.body;
  const user = req.user as any;
  database.addPost(title, link, user.id, description, subgroup);
  res.redirect("/posts");
});

router.get("/show/:postid", async (req, res) => {
  const post = database.getPost(Number(req.params.postid));
  if (!post) return res.redirect("/posts");
  const user = req.user;
  res.render("individualPost", { post, user });
});

router.get("/edit/:postid", ensureAuthenticated, (req, res) => {
  const post = database.getPost(Number(req.params.postid));
  const subs = database.getSubs();
  const user = req.user;
  res.render("editPost", { post, subs, user });
});

router.post("/edit/:postid", ensureAuthenticated, (req, res) => {
  const { title, link, description, subgroup } = req.body;
  const postId = Number(req.params.postid);
  database.editPost(postId, { title, link, description, subgroup });
  res.redirect("/posts/show/" + postId);
});

router.get("/deleteconfirm/:postid", ensureAuthenticated, (req, res) => {
  const post = database.getPost(Number(req.params.postid));
  const user = req.user;
  res.render("deleteConfirm", { post, user });
});

router.post("/delete/:postid", ensureAuthenticated, (req, res) => {
  database.deletePost(Number(req.params.postid));
  res.redirect("/posts");
});

router.post("/vote/:postid", ensureAuthenticated, (req, res) => {
  const user = req.user as any;
  const postId = Number(req.params.postid);
  const value = Number(req.body.setvoteto);
  database.setVote(postId, user.id, value);
  res.redirect("back");
});

router.post("/comment-create/:postid", ensureAuthenticated, (req, res) => {
  const { description } = req.body;
  const user = req.user as any;
  database.addComment(Number(req.params.postid), user.id, description);
  res.redirect("/posts/show/" + req.params.postid);
});

export default router;
