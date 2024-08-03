import React, { useEffect, useState } from 'react';

const Profile = ({ userId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`http://localhost:3000/users`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">User Profile</h1>
      <div className="flex items-center mb-4 bg-white p-6 rounded-lg shadow-md">
        <img src={user.profile_image} alt={`${user.name}'s profile`} className="w-24 h-24 rounded-full mr-6" />
        <div>
          <h2 className="text-2xl font-semibold mb-2">{user.name}</h2>
          <p className="text-gray-700 text-lg">{user.email}</p>
          <p className="text-gray-700 text-lg">{user.phone_number}</p>
          <span className="inline-block bg-blue-500 text-white text-sm px-3 py-1 rounded-full mt-2">{user.badge}</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
