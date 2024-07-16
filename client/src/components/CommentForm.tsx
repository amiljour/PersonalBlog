// Importing necessary libraries and components
import React, { useState } from "react";
import axios from "axios";

// Defining the CommentForm component
interface CommentFromProps {
  postId: string;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}

// Defining the Comment interface to type the comment data
interface Comment {
  id: number;
  text: string;
}

// Defining the CommentForm component
const CommentForm: React.FC<CommentFromProps> = ({ postId, setComments }) => {
  // Declaring a state variable to store the text of the comment, loading state, and error state
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const newComment = { text, post: postId };
    axios.post(`http://MyAPIURL.com/posts/${postId}/comments`, newComment)
      .then(response => {
        setComments((prevComments) => [...prevComments, response.data]);
        setText("");
        setIsLoading(false);
  })
      .catch(error => {
        console.error('Error adding comment:', error);
        setError('Error adding comment');
        setIsLoading(false);
      });
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
        <button type="submit" disabled={isLoading}>{isLoading ? "Adding..." : "Add Comment"}</button>
      </form>
      {/* Display Error message */}
      {error && <p>{error}</p>}
    </div>
  );
}

export default CommentForm;