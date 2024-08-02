import React, { useEffect, useState } from 'react';

const Question = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('http://localhost:3000/users');
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Questions</h1>
      <ul>
        {questions.map((question) => (
          <li key={question.id} className="mb-4 p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold">{question.title}</h2>
            <p className="text-gray-700">{question.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;