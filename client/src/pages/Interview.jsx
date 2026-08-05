import { useState, useRef } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import InterviewResult from "../components/InterviewResult";
import api from "../services/api";

function Interview() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [interview, setInterview] = useState(null);

  const textareaRef = useRef(null);

  const handleChange = (e) => {
    setCode(e.target.value);

    const el = textareaRef.current;

    if (!el) return;

    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 300) + "px";
  };

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

      setInterview(response.data);

      setCode("");

      if (textareaRef.current) {
        textareaRef.current.style.height = "24px";
        textareaRef.current.focus();
      }
    } catch (err) {
      console.error(err);
      alert("Failed to generate interview questions.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#0A0A0A] text-white">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Navbar />

       <main className="flex flex-1 flex-col overflow-hidden">

          {/* Scrollable Area */}
         <div className="flex-1 overflow-y-auto min-h-0">

            {!interview ? (
              <div className="flex h-full items-center justify-center px-8">
                <div className="w-full max-w-2xl text-center">

                  <h1 className="text-5xl font-bold">
                    Interview Preparation
                  </h1>

                  <p className="mt-5 text-lg text-zinc-400">
                    Paste your code and generate AI interview questions with
                    detailed answers.
                  </p>

                </div>
              </div>
            ) : (
              <div className="mx-auto w-full max-w-5xl px-8 py-10">
                <InterviewResult interview={interview} />
              </div>
            )}

          </div>

          {/* Fixed Bottom Input */}
          <div className="border-t border-[#2A2A2A] bg-[#0A0A0A] px-8 py-6">

            <div className="mx-auto flex max-w-4xl items-end gap-3 rounded-[28px] border border-[#3A3A3A] bg-[#2F2F2F] px-5 py-3">

              <textarea
                ref={textareaRef}
                rows={1}
                value={code}
                onChange={handleChange}
                placeholder="Paste your code..."
                className="max-h-[300px] min-h-[24px] flex-1 resize-none overflow-y-auto bg-transparent py-1 text-[15px] text-white outline-none placeholder:text-zinc-500"
              />

              <button
                onClick={handleGenerate}
                disabled={loading}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#6943DE] transition hover:bg-[#7A52F2] disabled:opacity-50"
              >
                {loading ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
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

        </main>

      </div>
    </div>
  );
}

export default Interview;