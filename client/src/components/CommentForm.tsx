import React, { useState } from "react";
import axios from "axios";

interface CommentFromProps {
  postId: string;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}

interface Comment {
  id: number;
  text: string;
}

const CommentForm: React.FC<CommentFromProps> = ({ postId, setComments }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newComment = { text, post: postId };
    axios.post(`http://MyAPIURL.com/posts/${postId}/comments`, newComment)
      .then(response => setComments(prevComments => [...prevComments, response.data]))
      .catch(error => console.error('Error adding comment:', error));
  };

  return (
    <div>
      <h1>Add Post</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your comment here"
          required
        />
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
}

export default CommentForm;