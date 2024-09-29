import { Link } from "react-router-dom";
import { useState } from "react";

const Home = ({ posts, filterPosts }) => {
  const [searchQuery, setSearchQuery] = useState(''); // State to hold the search query
  const [selectedCategory, setSelectedCategory] = useState('All'); // State to hold the selected category

  // Create a unique list of categories from the posts
  const categories = ['All', ...new Set(posts.map(post => post.category))];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory; // Only include posts that match both the search and category
  });

  return (
    <div className="container mx-auto md:px-10">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => {
              const newQuery = e.target.value;
              setSearchQuery(newQuery);
              
              // When the input is cleared, reset to the selected category
              if (newQuery === '') {
                filterPosts(selectedCategory); // Ensure the posts filter is based on the selected category
              }
            }} // Update the search query state
            className="p-2 border border-gray-300 rounded-lg w-1/3"
          />
          
          <select
            id="category"
            value={selectedCategory} // Set value to reflect the selected category
            onChange={(e) => {
              const category = e.target.value;
              setSelectedCategory(category); // Update selected category state
              filterPosts(category); // Call filterPosts with the new category
            }}
            className="p-1 border border-gray-300 ml-2"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {filteredPosts.map((post, index) => {
          if (index === 0) {
            return (
              <div key={post.id} className="lg:col-span-4 bg-white px-2 py-1 ">
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-80 object-cover mb-4"
                  />
                )}
                <h2 className="text-3xl font-semibold mb-2">
                  <Link to={`/post/${post.id}`} className="text-black-500 hover:underline">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-gray-700">{post.content.substring(0, 150)}...</p>
                <p className="text-sm text-gray-500">{post.category}</p>
              </div>
            );
          }

          return (
            <div key={post.id} className="lg:col-span-1 bg-white px-2 py-1">
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover mb-4"
                />
              )}
              <h2 className="text-lg font-semibold mb-2">
                <Link to={`/post/${post.id}`} className="text-black hover:underline">
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-700 text-[14px]">{post.content.substring(0, 100)}...</p>
              <p className="text-sm text-gray-500">{post.category}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
