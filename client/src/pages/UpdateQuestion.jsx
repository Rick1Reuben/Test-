import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateQuestions = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await fetch(`http://localhost:3000/questions/${id}`);
        if (response.ok) {
          const data = await response.json();
          setContent(data.content);
          setAuthor(data.author);
        } else {
          throw new Error('Failed to fetch question');
        }
      } catch (error) {
        console.error('Error fetching question:', error);
      }
    };

    fetchQuestion();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/questions/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          content: content,
          author: author,
        }),
        headers: {
          'Content-type': 'application/json',
        },
      });

      if (response.ok) {
        navigate('/Questions');
        toast.success('Question updated successfully');
      } else {
        throw new Error('Failed to update question');
      }
    } catch (error) {
      console.error('Error updating question:', error);
    }
  };

  return (
    <div className="grid grid-cols-2 h-[80vh] mt-6">
      <div className="bg-gray-800 text-white flex justify-center items-center">
        <h1 className="text-6xl font-bold">Question {id}</h1>
      </div>
      <div className="p-6">
        <h1 className="text-center font-semibold text-2xl">Answer Question</h1>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-blue">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-blue">Author</label>
            <input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateQuestions;
