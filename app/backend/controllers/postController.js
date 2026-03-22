




//getposts
export const getposts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } 
   
  catch (err) {
    res.status(500).json({ message: err.message });
  }

};


export const createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json({ post, message: "Post created" });
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};
  





//delete post
export const deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json({ message: `Post ${req.params.id} deleted` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};