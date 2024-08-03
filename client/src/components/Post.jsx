import React from 'react';
import { Link } from 'react-router-dom';

const Post = ({ post }) => {
  return (
    <Link to={`/Question/${post.id}`} className="border p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
      <div>
        <img className="rounded-t-lg w-full h-48 object-cover" src="https://images.pexels.com/photos/21273536/pexels-photo-21273536/free-photo-of-beautiful-pink-blossoms-in-spring.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Question Thumbnail" />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
        <p className="text-gray-700 mb-2">{post.content}</p>
        <p className="text-gray-500 text-sm">By <span className="italic">{post.author}</span></p>
      </div>
    </Link>
  );
};

export default Post;
