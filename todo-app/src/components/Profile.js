import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
    // eslint-disable-next-line
  const [profile, setProfile] = useState({ name: '', email: '' });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const fetchProfile = async () => {
    const token = localStorage.getItem('token');
    const { data } = await axios.get('http://localhost:5000/auth/profile', {
      headers: { Authorization: token }
    });
    setProfile(data);
    setName(data.name);
    setEmail(data.email);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await axios.put('http://localhost:5000/auth/profile/update', { name, email, password }, {
      headers: { Authorization: token }
    });
    alert('Profile updated successfully');
    fetchProfile();
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div>
      <h2>Profile</h2>
      <form onSubmit={handleUpdateProfile}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New Password"
          required
        />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
