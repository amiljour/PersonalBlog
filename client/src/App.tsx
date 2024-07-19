// Importing necessary libraries and components
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./views/Home.tsx";
import PostDetail from "./views/PostDetail.tsx";
import AddPost from "./views/AddPost.tsx";
import Header from "./components/Header.tsx";

const App: React.FC = () => {
  return (
    // Setting up the routes
    <Router>
      <Header />
        <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />
          {/* Post Detail */}
          <Route path="/post/:id" element={<PostDetail />} />
          {/* Add Post */}
          <Route path="/add-post" element={<AddPost />} />
        </Routes>
    </Router>
  );
}

export default App;