const router = require("express").Router();
const { Post } = require("../models/Post");

router.get("/", (req, res) => {
  Post.find().exec((err, posts) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: posts });
  });
});

router.get("/detail/:id", (req, res) => {
  let id = req.params.id;

  Post.findById(id, function (err, post) {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: post });
  });
});

router.post("/add", (req, res) => {
  const post = new Post(req.body);
  post.save((err, created) => {
    if (err) return res.status(400).json({ success: false, error: err });
    return res.status(200).json({ success: true, data: created });
  });
});

router.put("/update/:id", (req, res) => {
  Post.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true, runValidators: true },
    (err, updated) => {
      if (err) returnres.status(400).json({ success: false, error: err });
      return res.status(200).json({ success: true, data: updated });
    }
  );
});

router.delete("/delete/:id", (req, res) => {
  Post.findByIdAndRemove(req.params.id).exec((error, deleted) => {
    if (error) returnres.status(400).json({ success: false, error: err });
    return res.status(200).json({ success: true, data: deleted });
  });
});

module.exports = router;
