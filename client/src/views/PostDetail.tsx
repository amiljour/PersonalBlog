// Importing necessary libraries and components
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
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
  content: string;
  post: number;
}

// Defining the PostDetail component
const PostDetail: React.FC = () => {
  // Getting the post ID from the URL
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Declaring state variables to store the post and comments
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  // New state variables for editing comments
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editCommentContent, setEditCommentContent] = useState("");

  // Fetching the post and comments from the API
  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    axios.get(`${apiUrl}/posts/${id}`)
      .then(response => {
        setPost(response.data);
        setComments(response.data.comments);
        setEditTitle(response.data.title);
        setEditContent(response.data.content);
      })
      .catch(error => console.error('Error fetching post:', error));
  }, [id]);

  // Check if the post is still loading
  if (!post) return <div>Loading...</div>;

  // Function to handle editing the post
  const handleEditPost = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    axios.put(`${apiUrl}/posts/${id}`, { title: editTitle, content: editContent })
      .then(response => {
        setPost(response.data);
        setIsEditing(false);
      })
      .catch(error => console.error('Error editing post:', error));
  };

  // Function to handle deleting the post
  const handleDeletePost = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    axios.delete(`${apiUrl}/posts/${id}`)
      .then(() => navigate("/"))
      .catch(error => console.error('Error deleting post:', error));
  };

  // Handle starting to edit a comment
  const startEditComment = (commentId: number, content: string) => {
    setEditingCommentId(commentId);
    setEditCommentContent(content);
  };

  // Handle saving the edited comment
  const handleEditComment = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    if (editingCommentId !== null) {
      axios.put(`${apiUrl}/comments/${editingCommentId}`, { content: editCommentContent, post: post!.id })
        .then(response => {
          setComments(comments.map(comment => comment.id === editingCommentId ? response.data : comment));
          setEditingCommentId(null);
          setEditCommentContent("");
        })
        .catch(error => console.error('Error editing comment:', error));
    }
  };

  // Handle deleting the comment
  const handleDeleteComment = (commentId: number) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    axios.delete(`${apiUrl}/comments/${commentId}`)
      .then(() => {
        setComments(comments.filter(comment => comment.id !== commentId));
      })
      .catch(error => console.error('Error deleting comment:', error));
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <input 
            type="text" 
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <textarea 
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
          <button onClick={handleEditPost}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
          <button onClick={() => setIsEditing(true)}>Edit Post</button>
          <button onClick={handleDeletePost}>Delete Post</button>
        </div>
      )}
      <h3>Comments</h3>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>
            {editingCommentId === comment.id ? (
              <div>
                <textarea 
                  value={editCommentContent}
                  onChange={(e) => setEditCommentContent(e.target.value)}
                />
                <button onClick={handleEditComment}>Save</button>
                <button onClick={() => setEditingCommentId(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                {comment.content}
                <button onClick={() => startEditComment(comment.id, comment.content)}>Edit</button>
                <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <CommentForm postId={id as string} setComments={setComments} />
    </div>
  );
}

export default PostDetail;