import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";

const UserProfile = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    profile_image: "",
  });

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch("http://localhost:3000/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch current user");
        }
        const data = await response.json();
        setCurrentUser(data);
        setFormData({
          username: data.username || "",
          password: data.password || "",
          profile_image: data.profile_image || "",
        });
      } catch (error) {
        console.error("Error fetching current user:", error);
        toast.error("Failed to fetch current user");
      }
    };

    fetchCurrentUser();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/api/current_user/${currentUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          profile_image: formData.profile_image,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to update profile");
      }
      const data = await response.json();
      toast.success(data.success);
      setCurrentUser((prevUser) => ({
        ...prevUser,
        username: formData.username || prevUser.username,
        password: formData.password || prevUser.password,
        profile_image: formData.profile_image || prevUser.profile_image,
      }));
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  if (!currentUser) {
    return <div>Log in to view your profile</div>;
  }

  const { username, password, profile_image } = formData;

  return (
    <div>
      <h2>Profile</h2>
      <div className="rounded-full">
        <img src={formData.profile_image} alt="profile" className="size-2 rounded-full" />
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <h5>Username</h5>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <h5>Password</h5>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <h5>Image URL</h5>
        <input
          type="text"
          name="profile_image"
          value={profile_image}
          onChange={handleChange}
          placeholder="Profile Image URL"
        />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default UserProfile;
