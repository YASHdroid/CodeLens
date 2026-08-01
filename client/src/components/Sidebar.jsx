import {
  PanelLeft,
  Search,
  SquarePen,
  MessageSquare,
  CircleUserRound,
  ChevronDown,
} from "lucide-react";

function Sidebar({ collapsed, toggleSidebar }) {

  const history = {
    Today: [
      "Login Authentication",
      "React API Error",
      "JWT Validation",
    ],

    Yesterday: [
      "DFS Traversal",
      "Merge Sort Review",
    ],

    Recent: [
      "Binary Tree Review",
      "React Hooks",
      "Dynamic Programming",
      "Code Refactor",
    ],
  };

  return (
    <aside
      className={`${
        collapsed ? "w-16" : "w-66"
      } flex h-screen flex-col border-r border-[#2A2A2A] bg-[#171717] transition-all duration-300`}
    >

      {/* Top */}

      <div className="px-3 pt-3">

        <div className="flex items-center justify-between">

          <button
            onClick={toggleSidebar}
            className="rounded-lg p-2 text-[#ECECEC] transition hover:bg-[#2A2A2A]"
          >
            <PanelLeft size={20} />
          </button>

          {!collapsed && (
            <button
              className="rounded-lg p-2 text-[#ECECEC] transition hover:bg-[#2A2A2A]"
            >
              <Search size={20} />
            </button>
          )}

        </div>

        {!collapsed && (
          <button
            className="mt-5 flex w-full items-center gap-3 rounded-lg
            px-3 py-2.5 text-left text-sm font-medium
            text-[#ECECEC] transition hover:bg-[#2A2A2A]"
          >
           <SquarePen size={18} />

            <span>New Review</span>

          </button>
        )}

      </div>

      {/* History */}

      <div className="mt-4 flex-1 overflow-y-auto px-2">
                {Object.entries(history).map(([section, chats]) => (
          <div
            key={section}
            className="mb-6"
          >
            {!collapsed && (
              <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-[#8E8EA0]">
                {section}
              </h3>
            )}

            {chats.map((chat) => (
              <button
                key={chat}
                className="group mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[14px] text-[#ECECEC] transition-all duration-200 hover:bg-[#2A2A2A]"
              >
                <MessageSquare
                  size={17}
                  className="shrink-0 text-[#D4D4D4]"
                />

                {!collapsed && (
                  <span className="truncate">
                    {chat}
                  </span>
                )}
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Bottom Profile */}

      <div className="border-t border-[#2A2A2A] p-3">

        <button
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