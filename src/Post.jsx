import { useParams, Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // Importing icons

const Post = ({ posts, deletePost }) => {
  const { id } = useParams();
  const post = posts.find(p => p.id === parseInt(id));

  if (!post) return <div className="container mx-auto p-4 h-screen">Post can not be found</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="">
        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-96 object-cover mb-4"
          />
        )}
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-lg text-gray-700 mb-6">{post.content}</p>
        <div className="flex space-x-4">
          <Link
            to={`/edit/${post.id}`}
            className="bg-yellow-500 text-white p-3 rounded-full hover:bg-yellow-600 flex items-center justify-center"
            title="Edit"
          >
            <FaEdit className="text-xl" />
          </Link>
          <button
            onClick={() => deletePost(post.id)}
            className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 flex items-center justify-center"
            title="Delete"
          >
            <FaTrashAlt className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
