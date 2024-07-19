// Importing necessary libraries and components
import React, { useState } from "react";
import axios from "axios";

// Defining the CommentForm component
interface CommentFormProps {
  postId: string;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}

// Defining the Comment interface to type the comment data
interface Comment {
  id: number;
  content: string;
  post: number;
  author: string;
}

// Defining the CommentForm component
const CommentForm: React.FC<CommentFormProps> = ({ postId, setComments }) => {
  // Declaring a state variable to store the text of the comment, loading state, and error state
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const newComment = { content: text, post: Number(postId), author };
    const apiUrl = import.meta.env.VITE_API_URL;
    axios.post(`${apiUrl}/posts/${postId}/comments/`, newComment)
      .then(response => {
        setComments((prevComments) => [...prevComments, response.data]);
        setText("");
        setAuthor("");
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
      <h1 className="text-xl font-semibold">Add Comment</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author"
          required
          className="text-lg p-2 m-2 border border-gray-300 rounded-md w-1/3 mx-auto" />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your comment here"
          required
          className="text-lg p-2 m-2 border border-gray-300 rounded-md w-1/3 mx-auto"
        />
        <button className="border border-black bg-green-600 rounded-md w-1/3 mx-auto text-lg p-2 m-2"  type="submit" disabled={isLoading}>{isLoading ? "Adding..." : "Add Comment"}</button>
      </form>
      {/* Display Error message */}
      {error && <p>{error}</p>}
    </div>
  );
}

export default CommentForm;