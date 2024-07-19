import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// Defining the Post interface to type the post data
interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  commentsCount?: number; // Adding an optional commentsCount property
}

// Defining the Home component
const Home: React.FC = () => {
  // Declaring state variables to store the list of posts and any error message
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetching the list of posts and their comments count from the API
  useEffect(() => {
    const fetchPostsAndComments = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;

        // Fetching the list of posts from the API
        const response = await axios.get(`${apiUrl}/posts/`);
        const postsData: Post[] = response.data;

        // Fetching comments count for each post
        const postsWithCommentsCount = await Promise.all(postsData.map(async (post) => {
          try {
            const commentsResponse = await axios.get(`${apiUrl}/posts/${post.id}/comments-list/`);
            return { ...post, commentsCount: commentsResponse.data.length };
          } catch (error) {
            console.error(`Error fetching comments for post ${post.id}:`, error);
            return { ...post, commentsCount: 0 };
          }
        }));

        // Setting the list of posts with comments count in the state
        setPosts(postsWithCommentsCount);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
        console.error('Error fetching posts and comments:', error);
      }
    };

    fetchPostsAndComments();
  }, []);

  return (
    <div className="px-12">
      <h1 className="text-center text-3xl font-semibold pt-5">Posts</h1>

      {/* Display error message */}
      {error ? (
        <div className="text-red-700 text-center font-semibold text-lg pb-3">Error: {error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-5">
          {posts.length > 0 ? (
            posts.map(post => (
              <div key={post.id} className="bg-white shadow-md rounded-lg p-5 border border-gray-200">
                <h2 className="text-xl font-semibold mb-2">
                  <Link to={`/post/${post.id}`} className="text-blue-700 underline">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-gray-700 mb-2">By {post.author}</p>
                <p className="text-gray-700">Comments: {post.commentsCount ?? 0}</p>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center">No posts available</div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;