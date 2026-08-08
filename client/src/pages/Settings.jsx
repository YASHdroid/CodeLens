import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Lock, LogOut, UserRound } from "lucide-react";
import api from "../services/api";

function Settings() {
    const navigate = useNavigate();

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (!currentPassword || !newPassword) {
            alert("Please fill both password fields.");
            return;
        }

        if (newPassword.length < 6) {
            alert("New password must be at least 6 characters.");
            return;
        }

        try {
            setLoading(true);

            const response = await api.put(
                "/users/change-password",
                {
                    currentPassword,
                    newPassword,
                }
            );

            alert(response.data.message);

            setCurrentPassword("");
            setNewPassword("");

        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.error ||
                "Failed to change password"
            );

        } finally {
            setLoading(false);
        }
    };


    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login", { replace: true });
    };


    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white">

            {/* Top Bar */}

            <div className="border-b border-[#2A2A2A] bg-[#171717]">

                <div className="mx-auto flex h-16 max-w-5xl items-center px-6">

                    <button
                        onClick={() => navigate("/home")}
                        className="mr-4 rounded-lg p-2 text-zinc-300 transition hover:bg-[#2A2A2A] hover:text-white"
                    >
                        <ArrowLeft size={20} />
                    </button>

                    <div>
                        <h1 className="text-lg font-semibold">
                            Settings
                        </h1>

                        <p className="text-xs text-zinc-500">
                            Manage your CodeLens account
                        </p>
                    </div>

                </div>

            </div>


            {/* Content */}

            <main className="mx-auto max-w-3xl px-6 py-10">


                {/* Profile */}

                <section className="mb-6 rounded-2xl border border-[#2A2A2A] bg-[#171717] p-6">

                    <div className="mb-6 flex items-center gap-4">

                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#2A2A2A]">
                            <UserRound
                                size={28}
                                className="text-zinc-300"
                            />
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold">
                                Yash Chopra
                            </h2>

                            <p className="text-sm text-zinc-500">
                                Free Plan
                            </p>
                        </div>

                    </div>

                    <div className="border-t border-[#2A2A2A] pt-5">

                        <p className="text-xs uppercase tracking-wide text-zinc-500">
                            Account
                        </p>

                        <p className="mt-2 text-sm text-zinc-300">
                            Manage your account security and preferences.
                        </p>

                    </div>

                </section>


                {/* Change Password */}

                <section className="rounded-2xl border border-[#2A2A2A] bg-[#171717] p-6">

                    <div className="mb-6 flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#6943DE]/15">
                            <Lock
                                size={20}
                                className="text-[#8B6BF2]"
                            />
                        </div>

                        <div>

                            <h2 className="text-lg font-semibold">
                                Change Password
                            </h2>

                            <p className="text-sm text-zinc-500">
                                Update your account password.
                            </p>

                        </div>

                    </div>


                    <form
                        onSubmit={handleChangePassword}
                        className="space-y-5"
                    >

                        {/* Current Password */}

                        <div>

                            <label className="mb-2 block text-sm text-zinc-400">
                                Current Password
                            </label>

                            <input
                                type="password"
                                value={currentPassword}
                                onChange={(e) =>
                                    setCurrentPassword(e.target.value)
                                }
                                placeholder="Enter current password"
                                className="w-full rounded-xl border border-[#3A3A3A] bg-[#101010] px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-[#6943DE]"
                            />

                        </div>


                        {/* New Password */}

                        <div>

                            <label className="mb-2 block text-sm text-zinc-400">
                                New Password
                            </label>

                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) =>
                                    setNewPassword(e.target.value)
                                }
                                placeholder="Enter new password"
                                className="w-full rounded-xl border border-[#3A3A3A] bg-[#101010] px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-[#6943DE]"
                            />

                            <p className="mt-2 text-xs text-zinc-600">
                                Password must be at least 6 characters.
                            </p>

                        </div>


                        {/* Button */}

                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-xl bg-[#6943DE] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#7A52F2] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading
                                ? "Changing Password..."
                                : "Change Password"}
                        </button>

                    </form>

                </section>


                {/* Logout */}

                <section className="mt-6 rounded-2xl border border-red-500/20 bg-[#171717] p-6">

                    <div className="flex items-center justify-between">

                        <div>

                            <h2 className="text-lg font-semibold">
                                Sign out
                            </h2>

                            <p className="mt-1 text-sm text-zinc-500">
                                Sign out from your CodeLens account.
                            </p>

                        </div>


                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 rounded-xl border border-red-500/30 px-4 py-2.5 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
                        >
                            <LogOut size={17} />
                            Logout
                        </button>

                    </div>

                </section>

            </main>

        </div>
    );
}

export default Settings;