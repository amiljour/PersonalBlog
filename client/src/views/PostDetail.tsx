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
  author: string;
  comments: Comment[];
}

// Defining the Comment interface to type the comment data
interface Comment {
  id: number;
  content: string;
  post: number;
  author: string;
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
    axios.get(`${apiUrl}/posts/${id}/`)
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
    axios.put(`${apiUrl}/posts/${id}/`, { title: editTitle, content: editContent })
      .then(response => {
        setPost(response.data);
        setIsEditing(false);
      })
      .catch(error => console.error('Error editing post:', error));
  };

  // Function to handle deleting the post
  const handleDeletePost = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    axios.delete(`${apiUrl}/posts/${id}/`)
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
      axios.put(`${apiUrl}/comments/${editingCommentId}/`, { content: editCommentContent, post: post!.id })
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
    axios.delete(`${apiUrl}/comments/${commentId}/`)
      .then(() => {
        setComments(comments.filter(comment => comment.id !== commentId));
      })
      .catch(error => console.error('Error deleting comment:', error));
  };

  return (
    <div className="px-12 text-center">
      <h1 className="text-center text-3xl font-semibold pt-5">{post.title}</h1>
      <p className="pb-5 text-lg">by: {post.author}</p>

      {isEditing ? (
        <div className="flex flex-col items-center justify-center">
          <label htmlFor="Title">Editing Title:</label>
          <input 
            type="text" 
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="text-lg p-2 m-2 border border-gray-300 rounded-md w-1/3 mx-auto"
          />
          <label htmlFor="Content">Editing Content:</label>
          <textarea 
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="text-lg p-2 m-2 border border-gray-300 rounded-md w-2/3 mx-auto"
          />
          <div className="flex justify-around w-2/3">
            <button onClick={handleEditPost} className="border border-black bg-green-600 rounded-md w-auto mx-auto text-lg p-2 m-2">Save Changes</button>
            <button className="border border-black bg-red-500 rounded-md w-auto mx-auto text-lg p-2 m-2" onClick={handleDeletePost}>Delete Post</button>
          </div>
        </div>
      ) : (
        <div>
          <p className="text-xl  underling w-auto">{post.content}</p>
          <div className="flex justify-around my-5">
            <button className="border border-black bg-yellow-300 rounded-md w-auto mx-auto text-sm p-2 m-2" onClick={() => setIsEditing(true)}>Edit Post</button>
          </div>
        </div>
      )}
      <h3 className="text-xl font-bold">Comments</h3>
      <ul>
        {comments.map(comment => (
          <li key={comment.id} className="my-3 text-lg text-start">
            {editingCommentId === comment.id ? (
              <div className="flex flex-col items-center justify-center">
                <p>Comment Author: {comment.author}</p>
                <label htmlFor="Content">Editing Comment:</label>
                <textarea 
                  value={editCommentContent}
                  onChange={(e) => setEditCommentContent(e.target.value)}
                  className="text-md p-2 m-2 border border-gray-300 rounded-md w-2/3 mx-auto"
                />
                <div className="flex justify-around w-2/3">
                  <button onClick={handleEditComment} className="border border-black bg-green-600 rounded-md w-auto h-10 text-sm p-2 m-2">Save</button>
                  <button onClick={() => setEditingCommentId(null)} className="border border-black bg-yellow-300 rounded-md w-auto h-10 text-sm p-2 m-2">Cancel</button>
                  <button className="border border-black bg-red-500 rounded-md w-auto h-10 text-sm p-2 m-2" onClick={() => handleDeleteComment(comment.id)}>Delete Comment</button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center my-5">
                <div className="flex-grow flex items-center">
                  <h3 className="font-semibold pr-5">{comment.author}:</h3>
                  <p className="px-10">{comment.content}</p>
                </div>
                <button className="border border-black bg-yellow-300 rounded-md w-auto h-10 text-sm p-2 m-2" onClick={() => startEditComment(comment.id, comment.content)}>Edit</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="pt-10 pb-20">
        <CommentForm postId={id as string} setComments={setComments} />
      </div>
    </div>
  );
}

export default PostDetail;