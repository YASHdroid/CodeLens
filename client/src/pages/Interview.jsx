import { useState, useRef } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import InterviewResult from "../components/InterviewResult";
import api from "../services/api";

function Interview() {
  const [collapsed, setCollapsed] = useState(false);

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [interview, setInterview] = useState(null);

  const textareaRef = useRef(null);

  // ================= SIDEBAR =================

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };


  // ================= NEW INTERVIEW =================

  const handleNewInterview = () => {
    setInterview(null);
    setCode("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "24px";
    }
  };


  // ================= OPEN INTERVIEW =================

  const openInterview = async (id) => {
    try {
      const response = await api.get(`/prep/${id}`);

      setInterview(response.data.interview);

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.error ||
        "Failed to load interview"
      );
    }
  };


  // ================= INPUT =================

  const handleChange = (e) => {
    setCode(e.target.value);

    const el = textareaRef.current;

    if (!el) return;

    el.style.height = "auto";

    el.style.height =
      Math.min(el.scrollHeight, 300) + "px";
  };


  // ================= GENERATE =================

  const handleGenerate = async () => {

    if (!code.trim()) {
      alert("Please paste your code.");
      return;
    }

    try {

      setLoading(true);

      const response = await api.post("/prep", {
        code,
        language: "javascript",
      });

      setInterview(response.data.interview);

      setCode("");

      if (textareaRef.current) {
        textareaRef.current.style.height = "24px";
        textareaRef.current.focus();
      }

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.error ||
        "Failed to generate interview questions."
      );

    } finally {

      setLoading(false);

    }
  };


  return (
    <div className="flex h-screen overflow-hidden bg-[#0A0A0A] text-white">

      {/* Sidebar */}

      <Sidebar
        collapsed={collapsed}
        toggleSidebar={toggleSidebar}

        mode="interview"

        onSelectInterview={openInterview}
        onNewInterview={handleNewInterview}
      />


      {/* Main */}

      <div className="flex flex-1 flex-col">

        <Navbar />

        <main className="flex flex-1 flex-col h-0">


          {/* ================= CONTENT ================= */}

          <div className="flex-1 overflow-y-auto px-8 py-10 min-h-0">

            <div className="mx-auto w-full max-w-5xl">

              {!interview ? (

                <div className="mt-28 text-center">

                  <h1 className="text-5xl font-bold">
                    Interview Preparation
                  </h1>

                  <p className="mt-5 text-lg text-zinc-400">
                    Paste your code and generate AI interview
                    questions with detailed answers.
                  </p>

                </div>

              ) : (

                <InterviewResult
                  interview={interview}
                />

              )}

            </div>

          </div>


          {/* ================= INPUT ================= */}

          <div className="shrink-0 border-t border-[#2A2A2A] bg-[#0A0A0A] px-8 py-5">

            <div className="mx-auto w-full max-w-4xl">

              <div className="flex items-end gap-3 rounded-[28px] border border-[#3A3A3A] bg-[#2F2F2F] px-4 py-3 shadow-lg">

                <textarea
                  ref={textareaRef}
                  rows={1}
                  value={code}
                  onChange={handleChange}
                  placeholder="Paste your code..."
                  className="max-h-[300px] min-h-[24px] flex-1 resize-none overflow-y-auto bg-transparent py-1.5 text-[15px] leading-relaxed text-white outline-none placeholder:text-zinc-500"
                />


                <button
                  onClick={handleGenerate}
                  disabled={loading}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#6943DE] text-white transition hover:bg-[#7A52F2] disabled:opacity-60"
                >

                  {loading ? (

                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />

                  ) : (

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 19V5M5 12l7-7 7 7" />
                    </svg>

                  )}

                </button>

              </div>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}

export default Interview;