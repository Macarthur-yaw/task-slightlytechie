import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './Navbar';
import Modal from './Modal';
import Post from './Post';
import PostForm from './PostForm';
import Home from './Home';
import { Data } from './Data';

const App = () => {
  const [posts, setPosts] = useState(() => {
    const storedPosts = localStorage.getItem('posts');
    if (storedPosts) {
      const parsedPosts = JSON.parse(storedPosts);
      // Combine localStorage posts with Data, ensuring no duplicates by ID
      const mergedPosts = [
        ...Data,
        ...parsedPosts.filter(post => !Data.some(dataPost => dataPost.id === post.id)),
      ];
      return mergedPosts;
    }
    return Data;
  });

  const [filteredPosts, setFilteredPosts] = useState(posts); // To store the filtered posts

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  // Persist posts to localStorage when the posts array changes
  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
    setFilteredPosts(posts); // Reset the filtered posts whenever the posts change
  }, [posts]);

  const filterPosts = (category) => {
    if (category === 'All') {
      setFilteredPosts(posts); // Show all posts if 'All' is selected
    } else {
      setFilteredPosts(posts.filter(post => post.category === category)); // Filter posts by category
    }
  };

  const addPost = (post) => {
    setPosts(prevPosts => [...prevPosts, { ...post, id: Date.now() }]);
  };

  const updatePost = (id, updatedPost) => {
    setPosts(prevPosts =>
      prevPosts.map(post => (post.id === id ? { ...post, ...updatedPost } : post))
    );
  };

  const deletePost = (id) => {
    setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
  };

  const openModal = (post = null) => {
    setEditingPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPost(null);
  };

  return (
    <Router>
      <div className="bg-gray-100">
        <Navbar
          openModal={openModal}
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          filterPosts={filterPosts} // Pass filterPosts function to Navbar
        />

        <div className="container mx-auto p-6">
        <Routes>
  <Route path="/" element={<Home posts={filteredPosts} filterPosts={filterPosts} />} /> {/* Pass filteredPosts and filterPosts to Home */}
  <Route path="/post/:id" element={<Post posts={filteredPosts} deletePost={deletePost} />} />
  <Route path="/edit/:id" element={<PostForm updatePost={updatePost} posts={filteredPosts} closeModal={closeModal} />} />
</Routes>

        </div>

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <PostForm
            addPost={addPost}
            updatePost={updatePost}
            posts={posts}
            closeModal={closeModal}
            post={editingPost}
          />
        </Modal>
      </div>
    </Router>
  );
};

export default App;
