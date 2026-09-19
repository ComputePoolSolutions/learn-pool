import React, { useState } from "react";
import "./Inbox.css";

const Inbox = () => {
  const [messages, setMessages] = useState([]);
  const [filter, setFilter] = useState("All Messages");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const refreshMessages = () => {
    setLoading(true);

    setTimeout(() => {
      setMessages([]);
      setLoading(false);
    }, 500);
  };

  const composeMessage = () => {
    alert("Compose message feature");
  };

  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.subject.toLowerCase().includes(search.toLowerCase()) ||
      message.sender.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All Messages" || message.type === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="inbox-page">

      <div className="inbox-header">
        <h1>Inbox</h1>

        <div className="inbox-actions">
          <button
            className="compose-btn"
            onClick={composeMessage}
          >
            ✎ Compose
          </button>

          <button
            className="inbox-refresh-btn"
            onClick={refreshMessages}
            disabled={loading}
          >
            ↻ {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>

      <div className="inbox-line"></div>

      <div className="message-stats">

        <div className="message-stat-card">
          <div className="stat-icon blue-icon">▰</div>
          <h2>{messages.length}</h2>
          <p>Total Messages</p>
        </div>

        <div className="message-stat-card">
          <div className="stat-icon yellow-icon">✉</div>
          <h2 className="yellow-number">
            {messages.filter((m) => !m.read).length}
          </h2>
          <p>Unread</p>
        </div>

        <div className="message-stat-card">
          <div className="stat-icon green-icon">▣</div>
          <h2 className="green-number">
            {messages.filter((m) => m.type !== "Sent").length}
          </h2>
          <p>Received</p>
        </div>

        <div className="message-stat-card">
          <div className="stat-icon cyan-icon">➤</div>
          <h2 className="cyan-number">
            {messages.filter((m) => m.type === "Sent").length}
          </h2>
          <p>Sent</p>
        </div>

      </div>

      <div className="inbox-main">

        <div className="filters-card">

          <div className="card-title">
            <span>⚑</span>
            <h2>Filters</h2>
          </div>

          <div className="filter-list">

            <button
              className={filter === "All Messages" ? "active-filter" : ""}
              onClick={() => setFilter("All Messages")}
            >
              ▣ <span>All Messages</span>
            </button>

            <button
              className={filter === "Personal Messages" ? "active-filter" : ""}
              onClick={() => setFilter("Personal Messages")}
            >
              ✉ <span>Personal Messages</span>
            </button>

            <button
              className={filter === "Announcements" ? "active-filter" : ""}
              onClick={() => setFilter("Announcements")}
            >
              ⚑ <span>Announcements</span>
            </button>

            <button
              className={filter === "Sent" ? "active-filter" : ""}
              onClick={() => setFilter("Sent")}
            >
              ➤ <span>Sent</span>
            </button>

          </div>

          <div className="filter-divider"></div>

          <label>Search Messages</label>

          <div className="message-search">
            <span>⌕</span>

            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

        </div>

        <div className="messages-card">

          <div className="messages-card-header">

            <div className="messages-title">
              <span>✉</span>
              <h2>Messages</h2>
            </div>

            <button
              className="small-refresh"
              onClick={refreshMessages}
              disabled={loading}
            >
              ↻
            </button>

          </div>

          <div className="messages-content">

            {loading ? (

              <div className="message-loading">
                <div className="message-spinner"></div>
                <h2>Loading messages...</h2>
              </div>

            ) : filteredMessages.length === 0 ? (

              <div className="no-messages">

                <div className="empty-message-icon">
                  ◇
                </div>

                <h2>No Messages Found</h2>

                <p>Your inbox is empty</p>

              </div>

            ) : (

              <div className="message-list">

                {filteredMessages.map((message) => (
                  <div
                    className="message-item"
                    key={message.id}
                  >
                    <div>
                      <h3>{message.subject}</h3>
                      <p>From: {message.sender}</p>
                    </div>

                    <span>{message.type}</span>
                  </div>
                ))}

              </div>

            )}

          </div>

        </div>

      </div>

    </div>
  );
};

export default Inbox;