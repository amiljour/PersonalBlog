// Importing necessary libraries and components
import React, { useState } from "react";
import axios from "axios";

// Defining the AddPost component
const AddPost: React.FC = () => {
  // Declaring state variables to store the title and content of the post
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    const newPost = { title, content };

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${apiUrl}/posts`, newPost);
      console.log('New post added:', response.data);
      setIsLoading(false);
      setSuccess(true);
      setTitle("");
      setContent("");
    } catch (error) {
      console.error('Error adding post:', error);
      setIsLoading(false);
      setError('Error adding post');
    }
  };

  return (
    <div>
      <h1>Add Post</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea 
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          required
        />
        <button type="submit" disabled={isLoading}>{isLoading ? "Adding..." : "Add Post"}</button>
      </form>
      {/* Display success message */}
      {success && <p>Post added successfully!</p>}
      {/* Display error message */}
      {error && <p>{error}</p>}
      {/* Display loading message */}
      {isLoading && <p>Loading...</p>}
    </div>
  );
}

export default AddPost;