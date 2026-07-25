import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Logo from "../assets/logo.png";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/users/login", {
        email: formData.email,
        password: formData.password,
      });

      alert(response.data.message);

      navigate("/Home");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090B] flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-5xl overflow-hidden rounded-[32px] border border-zinc-800 bg-[#111216] shadow-[0_0_60px_rgba(0,0,0,0.45)]">

        <div className="grid lg:grid-cols-2">

          {/* LEFT SECTION */}

          <div className="hidden lg:flex flex-col items-center justify-center bg-gradient-to-br from-[#111216] via-[#13141A] to-[#161720] p-12">

            <img
              src={Logo}
              alt="CodeLens"
              className="w-56"
            />

            <h2 className="mt-10 text-center text-5xl font-bold leading-tight">
              <span className="text-white">
                Catch Bugs
              </span>

              <br />

              <span className="text-violet-500">
                Code Smarter
              </span>
            </h2>

            <p className="mt-5 text-center text-lg text-zinc-300">
              AI-Powered Code Intelligence
            </p>

          </div>

          {/* RIGHT SECTION */}

          <div className="bg-[#111216] p-8 lg:p-12">

            <div className="mx-auto max-w-md">

              <div className="text-center">

                <h2 className="text-3xl font-bold text-white">
                  Welcome Back
                </h2>

                <p className="mt-2 text-zinc-400">
                  Login to continue reviewing code.
                </p>

              </div>

              {/* GOOGLE */}

              <button
                type="button"
                className="mt-8 flex h-12 w-full items-center justify-center gap-3 rounded-2xl border border-zinc-700 bg-[#18181B] text-white transition hover:border-violet-500 hover:bg-zinc-800"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="h-5 w-5"
                />

                Continue with Google
              </button>

              <div className="my-7 flex items-center">

                <div className="h-px flex-1 bg-zinc-800"></div>

                <span className="mx-4 text-sm text-zinc-500">
                  OR
                </span>

                <div className="h-px flex-1 bg-zinc-800"></div>

              </div>

              <form onSubmit={handleSubmit}>

                <div className="space-y-4">

                  {/* Email */}
                  <div>
                    <label className="mb-2 block text-sm text-zinc-300">
                      Email
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter email"
                      className="h-12 w-full rounded-2xl border border-zinc-700 bg-[#18181B] px-4 text-white outline-none transition focus:border-violet-500"
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label className="mb-2 block text-sm text-zinc-300">
                      Password
                    </label>

                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter password"
                        className="h-12 w-full rounded-2xl border border-zinc-700 bg-[#18181B] px-4 pr-12 text-white outline-none transition focus:border-violet-500"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>

                </div>

                {error && (
                  <p className="mt-4 text-center text-sm text-red-500">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-6 h-12 w-full rounded-2xl bg-gradient-to-r from-[#6d40de] to-[#8b5cf6] font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:from-[#5a2fc2] hover:to-[#7c4ceb] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Logging in..." : "Login"}
                </button>

              </form>

              <p className="mt-6 text-center text-sm text-zinc-400">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-semibold text-violet-400 transition hover:text-violet-300"
                >
                  Sign Up
                </Link>
              </p>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;