// Importing necessary libraries
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// Defining the Post interface to type the post data
interface Post {
  id: number;
  title: string;
  content: string;
}

// Defining the Home component
const Home: React.FC = () => {
  // Declaring state variables to store the list of posts and any error message
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetching the list of posts from the API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Fetching the list of posts from the API
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/posts`);
        console.log("API response:", response.data);

        // Checking if the data is an array
        if (Array.isArray(response.data)) {
          // Setting the list of posts in the state
          setPosts(response.data);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      {error ? (
        <div>Error: {error}</div>
      ) : (
        <ul>
          {posts.length > 0 ? (
            posts.map(post => (
              <li key={post.id}>
                <Link to={`/post/${post.id}`}>{post.title}</Link>
              </li>
            ))
          ) : (
            <div>No posts available</div>
          )}
        </ul>
      )}
      <Link to="/add-post">Add Post</Link>
    </div>
  );
}

export default Home;