import React, { useState } from "react";
import "./Files.css";

const Files = () => {
  const [files, setFiles] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [sort, setSort] = useState("Newest First");
  const [loading, setLoading] = useState(false);

  const loadFiles = () => {
    setLoading(true);

    setTimeout(() => {
      setFiles([]);
      setLoading(false);
    }, 500);
  };

  const uploadFile = () => {
    alert("File upload feature");
  };

  const filteredFiles = files
    .filter((file) =>
      file.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter(
      (file) =>
        category === "All Categories" || file.category === category
    );

  return (
    <div className="files-page">

      <div className="files-top">
        <h1>File Storage</h1>

        <div className="files-actions">
          <button className="upload-btn" onClick={uploadFile}>
            ⇧ Upload File
          </button>

          <button
            className="file-refresh-btn"
            onClick={loadFiles}
            disabled={loading}
          >
            ↻ {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>

      <div className="files-line"></div>

      <div className="storage-stats">

        <div className="storage-card">
          <div className="storage-icon blue">📄</div>
          <h2>{files.length}</h2>
          <p>Total Files</p>
        </div>

        <div className="storage-card">
          <div className="storage-icon green">🛢</div>
          <h2 className="green-text">0 B</h2>
          <p>Storage Used</p>
        </div>

        <div className="storage-card">
          <div className="storage-icon cyan">🔗</div>
          <h2 className="cyan-text">0</h2>
          <p>Shared Files</p>
        </div>

        <div className="storage-card">
          <div className="storage-icon yellow">🏷</div>
          <h2 className="yellow-text">0</h2>
          <p>Categories</p>
        </div>

      </div>

      <div className="file-search-box">

        <div className="search-input-wrapper">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search files..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>All Categories</option>
          <option>Documents</option>
          <option>Assignments</option>
          <option>Projects</option>
          <option>Certificates</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option>Newest First</option>
          <option>Oldest First</option>
          <option>Name A-Z</option>
          <option>Name Z-A</option>
        </select>

      </div>

      <div className="my-files-card">

        <div className="my-files-title">
          <span>📁</span>
          <h2>My Files</h2>
        </div>

        <div className="my-files-content">

          {loading ? (
            <div className="file-loading">
              <div className="file-spinner"></div>
              <h3>Loading files...</h3>
            </div>
          ) : filteredFiles.length === 0 ? (

            <div className="no-files">

              <div className="empty-folder">
                📂
              </div>

              <h2>No Files Found</h2>

              <p>Upload your first file to get started!</p>

              <button
                className="empty-upload-btn"
                onClick={uploadFile}
              >
                + Upload Your First File
              </button>

            </div>

          ) : (

            <div className="file-list">

              {filteredFiles.map((file) => (
                <div className="file-item" key={file.id}>

                  <div>
                    <strong>{file.name}</strong>
                    <p>{file.category}</p>
                  </div>

                  <button
                    onClick={() =>
                      alert(`Opening ${file.name}`)
                    }
                  >
                    Open
                  </button>

                </div>
              ))}

            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default Files;