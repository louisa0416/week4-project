const Post = require("../models/post");
const User = require("../models/users");
const handleError = require("../service/handleError");
const handleSuccess = require("../service/handleSuccess");

const post = {
  async getPosts(req, res) {
    try {
      //http://127.0.0.1:3000/posts?q=day&sort=desc
      const key =
        req.query.q != undefined ? { content: new RegExp(req.query.q) } : {};

      const sort = req.query.sort == "asc" ? "createdAt" : "-createdAt";
      // asc 遞增(由小到大，由舊到新) createdAt ;
      // desc 遞減(由大到小、由新到舊) "-createdAt"

      const allPosts = await Post.find(key)
        .populate({
          path: "name",
          select: "name",
        })
        .sort(sort);
      handleSuccess(res, allPosts);
    } catch (error) {
      handleError(res, error);
    }
  },
  async createPost(req, res) {
    try {
      const data = req.body;
      if (data.content) {
        const newPost = await Post.create({
          content: data.content,
          image: data.image,
          name: data.name,
          likes: data.likes,
        });

        handleSuccess(res, newPost);
      } else {
        handleError(res);
      }
    } catch (error) {
      handleError(res, error);
    }
  },
  async updatePost(req, res) {
    try {
      const data = req.body;
      const id = req.params.id;
      console.log("id:" + id);

      if (data.content) {
        const updatePost = await Post.findByIdAndUpdate(id, {
          content: data.content,
          image: data.image,
          name: data.name,
          likes: data.likes,
        });
        handleSuccess(res, updatePost);
      } else {
        handleError(res);
      }
    } catch (error) {
      handleError(res, error);
    }
  },
  async deletePost(req, res) {
    try {
      const id = req.params.id;
      console.log(id);
      const deletePost = await Post.findByIdAndDelete(id);

      handleSuccess(res, deletePost);
    } catch (error) {
      handleError(res, error);
    }
  },
};

module.exports = post;
