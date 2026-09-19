import React, { useState } from "react";
import "./Settings.css";

const Settings = () => {
  const [profile, setProfile] = useState({
    fullName: "Demo User",
    username: "demo",
    email: "",
    phone: "",
    bio: "",
    location: "",
    website: "https://your-website.com",
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const saveProfile = () => {
    alert("Profile saved successfully!");
  };

  const changePhoto = () => {
    alert("Change photo feature");
  };

  const exportData = () => {
    alert("Your data is being exported...");
  };

  return (
    <div className="settings-page">

      <div className="settings-header">
        <h1>Settings</h1>

        <button className="export-btn" onClick={exportData}>
          ⇩ Export Data
        </button>
      </div>

      <div className="settings-line"></div>

      <div className="settings-content">

        <div className="settings-menu">

          <div className="settings-menu-title">
            Settings Menu
          </div>

          <div className="settings-menu-item active">
            <span>♟</span>
            Profile
          </div>

          <div className="settings-menu-item">
            <span>◐</span>
            Privacy
          </div>

          <div className="settings-menu-item">
            <span>♟</span>
            Notifications
          </div>

          <div className="settings-menu-item">
            <span>⚙</span>
            Account
          </div>

        </div>

        <div className="profile-settings">

          <div className="profile-settings-title">
            <span>♟</span>
            Profile Settings
          </div>

          <div className="profile-settings-body">

            <div className="profile-photo-section">

              <div className="profile-photo">
                <img
                  src="/images/profile.png"
                  alt="Profile"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />

                <div className="profile-placeholder">
                  👤
                </div>
              </div>

              <button
                className="change-photo-btn"
                onClick={changePhoto}
              >
                📷 Change Photo
              </button>

            </div>

            <div className="profile-form">

              <div className="form-row">

                <div className="form-group">
                  <label>Full Name</label>

                  <input
                    type="text"
                    name="fullName"
                    value={profile.fullName}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Username</label>

                  <input
                    type="text"
                    name="username"
                    value={profile.username}
                    onChange={handleChange}
                    className="disabled-input"
                  />
                </div>

              </div>

              <div className="form-row">

                <div className="form-group">
                  <label>Email</label>

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    value={profile.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Phone</label>

                  <input
                    type="text"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={profile.phone}
                    onChange={handleChange}
                  />
                </div>

              </div>

              <div className="form-group full-width">
                <label>Bio</label>

                <textarea
                  name="bio"
                  placeholder="Tell us about yourself..."
                  value={profile.bio}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="form-row">

                <div className="form-group">
                  <label>Location</label>

                  <input
                    type="text"
                    name="location"
                    placeholder="Enter your location"
                    value={profile.location}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Website</label>

                  <input
                    type="text"
                    name="website"
                    placeholder="https://your-website.com"
                    value={profile.website}
                    onChange={handleChange}
                  />
                </div>

              </div>

              <div className="save-profile-container">

                <button
                  className="save-profile-btn"
                  onClick={saveProfile}
                >
                  ▣ Save Profile
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Settings;