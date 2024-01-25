import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [userLinks, setUserLinks] = useState([]);
  const authToken = localStorage.getItem('token');

  useEffect(() => {
    getUserProfile();
    getUserLinks();
  }, []);

  const getUserProfile = async () => {
    try {
      const response = await axios.get('http://localhost:3001/users/profile', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      setUser(response.data);
      setNewEmail(response.data.email);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const getUserLinks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/links/users/links', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      setUserLinks(response.data);
    } catch (error) {
      console.error('Error fetching user links:', error);
    }
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setNewEmail(user.email);
    setProfileImage(null);
    setPreviewImage(null);
  };

  const handleSaveEdit = async () => {
    try {
      const formData = new FormData();
      formData.append('email', newEmail);
      if (profileImage) {
        formData.append('profileImage', profileImage);
      }

      const response = await axios.patch('http://localhost:3001/users/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${authToken}`,
        },
      });

      await getUserProfile();

      setEditMode(false);
      setProfileImage(null);
      setPreviewImage(null);
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">User Profile</h1>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <>
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-2">User Details</h2>
            {editMode ? (
              <div className="flex items-center space-x-4">
                <input
                  type="email"
                  className="p-2 border border-gray-300 rounded-md"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {previewImage && (
                  <img
                    src={previewImage}
                    alt="Profile Preview"
                    className="w-12 h-12 rounded-full"
                  />
                )}
                <button
                  className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                  onClick={handleSaveEdit}
                >
                  Save
                </button>
                <button
                  className="text-gray-500 hover:underline"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <p>Email: {user.email}</p>
                {user.profileImage && (
                  <img
                    src={user.profileImage}
                    alt="Profile"
                    className="w-12 h-12 rounded-full"
                  />
                )}
                <button
                  className="text-blue-500 hover:underline"
                  onClick={handleEditClick}
                >
                  Edit
                </button>
              </>
            )}
          </div>

          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-2">User Links</h2>
            <ul>
              {userLinks.map(link => (
                <li key={link._id}>
                  {/* Display link information here */}
                  <p>Title: {link.title}</p>
                  <p>URL: {link.url}</p>
                  <p>Watches: {link.watches}</p>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfile;
