


//add comment

export const addComment = async (req, res) => {
  try {
    const comment = await Comment.create(req.body);
    res.status(201).json({ comment, message: "Comment added" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


//delete comment 


export const deleteComment = async (req, res) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete(req.params.id);

    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.json({ message: `Comment ${req.params.id} deleted` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



//get comments for a post


export const getCommentsByPostId = async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


