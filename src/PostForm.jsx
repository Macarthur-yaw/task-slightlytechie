import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const PostForm = ({ addPost, updatePost, posts, closeModal }) => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState(''); // Start with an empty category for placeholder
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      const post = posts.find(p => p.id === parseInt(id));
      if (post) {
        setTitle(post.title);
        setContent(post.content);
        setImage(post.image || '');
        setCategory(post.category || ''); // Set category from existing post
      }
    }
  }, [id, posts]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content || !category) {
      setError("Title, content, and category are required.");
      return;
    }
    setError(''); // Clear the error message if fields are filled
    const newPost = { title, content, image, category };

    if (id) {
      updatePost(parseInt(id), newPost);
    } else {
      addPost(newPost);
    }
    setTitle('');
    setContent('');
    setImage(null);
    setCategory(''); // Reset category
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 ">
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        className="w-full p-2 border border-gray-300 rounded-lg h-32 focus:outline-none focus:border-blue-500"
        required
      />
      <input
        type="file"
        onChange={handleImageUpload}
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
      />
      {image && <img src={image} alt="Selected" className="w-full h-32 object-cover mt-2" />}

    
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-2 bg-white text-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:bg-white hover:bg-white"
        required
      >
        <option value="" disabled>
          Select news category
        </option>
        <option value="Business">Business</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Technology">Tech</option>
        <option value="Sport">Sport</option>
      </select>

      <button
        type="submit"
        className="bg-[#FF4500] border-[#FF4500] text-white px-4 py-2 rounded-lg hover:bg-opacity-90 w-full"
      >
        {id ? 'Update' : 'Create'} Post
      </button>
    </form>
  );
};

export default PostForm;
