// Importing necessary libraries and components
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CommentForm from "../components/CommentForm";

// Defining the Post interface to type the post data
interface Post {
  id: number;
  title: string;
  content: string;
  comments: Comment[];
}

// Defining the Comment interface to type the comment data
interface Comment {
  id: number;
  text: string;
}

// Defining the PostDetail component
const PostDetail: React.FC = () => {
  // Getting the post ID from the URL
  const { id } = useParams<{ id: string }>();

  // Declaring state variables to store the post and comments
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  // Fetching the post and comments from the API
  useEffect(() => {
    axios.get(`My API URL here`)
      .then(response => {
        setPost(response.data);
        setComments(response.data.comments);
      })
      .catch(error => console.error('Error fetching post:', error));
  }, [id]);

  // Check if the post is still loading
  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <h3>Comments</h3>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>{comment.text}</li>
        ))}
      </ul>
      <CommentForm postId={id as string} setComments={setComments} />
    </div>
  );
}

export default PostDetail;