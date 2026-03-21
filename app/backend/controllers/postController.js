




//getposts
export const getposts = async (req, res) => {
  try {
    
    res.json({text : "getposts (TODO)"});

  } catch (err) {
    res.status(500).json({ message: err.message });
  }

  
};





//delete post
export const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    //need to write code to delete post from database using id
    res.json({ message: `Post ${id} deleted (TODO)` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};