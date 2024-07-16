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
  // declaring a state variable to store the list of posts
  const [posts, setPosts] = useState<Post[]>([]);

  // Fetching the list of posts from the API
  useEffect(() => {
    axios.get("My API URL here")
      .then(response => {
        // setting the list of posts in the state variable
        setPosts(response.data);
      })
      // Check if response is an array before setting the state
      .then(response => {
        if (Array.isArray(response.data)) {
          // Setting the fetched posts to the state
          setPosts(response.data);
        } else {
          console.error('API response is not an array:', response.data);
        }
      })
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {/* Mapping over the posts to render each post as a list item */}
        {posts.map(post => (
          <li key={post.id}>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
      <Link to="/add-post">Add Post</Link>
    </div>
  );
}

export default Home;