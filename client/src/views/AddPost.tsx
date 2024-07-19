// Importing necessary libraries and components
import React, { useState } from "react";
import axios from "axios";

// Defining the AddPost component
const AddPost: React.FC = () => {
  // Declaring state variables to store the title and content of the post
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    const newPost = { title, content, author };

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${apiUrl}/posts/`, newPost);
      console.log('New post added:', response.data);
      setIsLoading(false);
      setSuccess(true);
      setTitle("");
      setContent("");
      setAuthor("");
    } catch (error) {
      console.error('Error adding post:', error);
      setIsLoading(false);
      setError('Error adding post');
    }
  };

  return (
    <div>
      <h1 className="text-center text-3xl font-semibold p-5">Add Post</h1>

      {/* Display success message */}
      {success && <p className="text-green-700 text-center font-semibold text-lg pb-3">Post added successfully!</p>}
      {/* Display error message */}
      {error && <p className="text-red-700 text-center font-semibold text-lg pb-3">{error}</p>}
      {/* Display loading message */}
      {isLoading && <p className="text-black text-center font-semibold text-lg pb-3">Loading...</p>}

      {/* Form to add a new post */}
      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
        <input 
          type="text" 
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author"
          required
          className="text-lg p-2 m-2 border border-gray-300 rounded-md w-1/3 mx-auto" />
        <input 
          type="text" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
          className="text-lg p-2 m-2 border border-gray-300 rounded-md w-1/3 mx-auto"
        />
        <textarea 
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          required
          className="text-lg p-2 m-2 border border-gray-300 rounded-md w-1/3 mx-auto"
        />
        <button 
          type="submit" 
          className="border border-black bg-green-600 rounded-md w-1/3 mx-auto text-lg p-2 m-2" 
          disabled={isLoading}
        >
          {isLoading ? "Adding..." : "Add Post"}
        </button>
      </form>
    </div>
  );
}

export default AddPost;