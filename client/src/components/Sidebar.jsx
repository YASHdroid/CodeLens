import {
  PanelLeft,
  Search,
  SquarePen,
  MessageSquare,
  CircleUserRound,
  ChevronDown,
  X,
  Trash2,
} from "lucide-react";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Sidebar({
  collapsed,
  toggleSidebar,

  // Review
  onSelectReview,
  onNewReview,

  // Interview
  onSelectInterview,
  onNewInterview,

  // Which history to show
  mode = "review",
}) {
  const [history, setHistory] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  // ================= FETCH HISTORY =================

  useEffect(() => {
    fetchHistory();
  }, [mode]);

  const fetchHistory = async () => {
    try {
      const endpoint =
        mode === "interview"
          ? "/prep/history"
          : "/review/history";

      const response = await api.get(endpoint);

      setHistory(response.data);
    } catch (error) {
      console.error("History Error:", error);
      setHistory([]);
    }
  };

  // ================= SEARCH =================

  const filteredHistory = history.filter((chat) =>
    chat.title
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const handleSearch = () => {
    setSearchOpen((prev) => !prev);

    if (searchOpen) {
      setSearchQuery("");
    }
  };

  // ================= NEW =================

  const handleNew = () => {
    if (mode === "interview") {
      if (onNewInterview) {
        onNewInterview();
      }

      navigate("/prep");
    } else {
      if (onNewReview) {
        onNewReview();
      }

      navigate("/home");
    }
  };

  // ================= OPEN =================

  const handleOpen = (id) => {
    if (mode === "interview") {
      if (onSelectInterview) {
        onSelectInterview(id);
      }
    } else {
      if (onSelectReview) {
        onSelectReview(id);
      }
    }
  };

  // ================= DELETE =================

  const handleDelete = async (id, e) => {
    e.stopPropagation();

    const confirmed = window.confirm(
      mode === "interview"
        ? "Are you sure you want to delete this interview?"
        : "Are you sure you want to delete this review?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const endpoint =
        mode === "interview"
          ? `/prep/${id}`
          : `/review/${id}`;

      await api.delete(endpoint);

      setHistory((prev) =>
        prev.filter((chat) => chat._id !== id)
      );

    } catch (error) {
      console.error("Delete Error:", error);

      alert(
        error.response?.data?.error ||
        "Failed to delete"
      );
    }
  };

  // ================= PROFILE =================

  const handleProfile = () => {
    navigate("/settings");
  };

  return (
    <aside
      className={`${
        collapsed ? "w-16" : "w-66"
      } flex h-screen flex-col border-r border-[#2A2A2A] bg-[#171717] transition-all duration-300`}
    >

      {/* ================= TOP ================= */}

      <div className="px-3 pt-3">

        <div className="flex items-center justify-between">

          {/* Toggle */}

          <button
            onClick={toggleSidebar}
            className="rounded-lg p-2 text-[#ECECEC] transition hover:bg-[#2A2A2A]"
            title="Toggle sidebar"
          >
            <PanelLeft size={20} />
          </button>


          {/* Search */}

          {!collapsed && (
            <button
              onClick={handleSearch}
              className="rounded-lg p-2 text-[#ECECEC] transition hover:bg-[#2A2A2A]"
              title="Search history"
            >
              {searchOpen ? (
                <X size={20} />
              ) : (
                <Search size={20} />
              )}
            </button>
          )}

        </div>


        {/* Search Input */}

        {!collapsed && searchOpen && (
          <div className="mt-4">

            <div className="flex items-center gap-2 rounded-lg border border-[#3A3A3A] bg-[#101010] px-3">

              <Search
                size={16}
                className="shrink-0 text-zinc-500"
              />

              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) =>
                  setSearchQuery(e.target.value)
                }
                placeholder={
                  mode === "interview"
                    ? "Search interviews..."
                    : "Search reviews..."
                }
                className="h-10 w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-600"
              />

            </div>

          </div>
        )}


        {/* New */}

        {!collapsed && (
          <button
            onClick={handleNew}
            className="mt-5 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-[#ECECEC] transition hover:bg-[#2A2A2A]"
          >
            <SquarePen size={18} />

            <span>
              {mode === "interview"
                ? "New Interview"
                : "New Review"}
            </span>
          </button>
        )}

      </div>


      {/* ================= HISTORY ================= */}

      <div className="mt-4 flex-1 overflow-y-auto px-2">

        {!collapsed && (
          <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-[#8E8EA0]">
            {mode === "interview"
              ? "Interview History"
              : "Review History"}
          </h3>
        )}


        {filteredHistory.length === 0 && !collapsed ? (

          <p className="px-3 py-3 text-sm text-zinc-600">
            {searchQuery
              ? "No results found."
              : "No history yet."}
          </p>

        ) : (

          filteredHistory.map((chat) => (

            <div
              key={chat._id}
              className="group mb-1 flex w-full items-center rounded-lg transition hover:bg-[#2A2A2A]"
            >

              {/* History Item */}

              <button
                onClick={() => handleOpen(chat._id)}
                className="flex min-w-0 flex-1 items-center gap-3 px-3 py-2.5 text-left text-[14px] text-[#ECECEC]"
                title={chat.title}
              >

                <MessageSquare
                  size={17}
                  className="shrink-0 text-[#D4D4D4]"
                />

                {!collapsed && (
                  <span className="truncate">
                    {chat.title}
                  </span>
                )}

              </button>


              {/* Delete */}

              {!collapsed && (
                <button
                  onClick={(e) =>
                    handleDelete(chat._id, e)
                  }
                  className="mr-2 rounded-md p-1.5 text-zinc-500 opacity-0 transition group-hover:opacity-100 hover:bg-red-500/10 hover:text-red-400"
                  title="Delete"
                >
                  <Trash2 size={15} />
                </button>
              )}

            </div>

          ))

        )}

      </div>


      {/* ================= PROFILE ================= */}

      <div className="border-t border-[#2A2A2A] p-3">

        <button
          onClick={handleProfile}
          className="flex w-full items-center gap-3 rounded-xl p-2 transition hover:bg-[#2A2A2A]"
        >

          <CircleUserRound
            size={36}
            className="text-[#ECECEC]"
          />

          {!collapsed && (
            <>

              <div className="flex flex-1 flex-col text-left">

                <span className="text-sm font-medium text-white">
                  Yash Chopra
                </span>

                <span className="text-xs text-[#8E8EA0]">
                  Free Plan
                </span>

              </div>

              <ChevronDown
                size={16}
                className="text-[#8E8EA0]"
              />

            </>
          )}

        </button>

      </div>

    </aside>
  );
}

export default Sidebar;