"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setErrorMsg("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen">
      {/* 左側區塊 */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-600 to-purple-600 justify-center items-center text-white px-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Info Admin System</h1>
          <p className="text-lg opacity-90">
            一站式資訊整合管理系統，讓你的工作更輕鬆
          </p>
        </div>
      </div>

      {/* 右側登入 */}
      <div className="flex w-full md:w-1/2 justify-center items-center px-10">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6">登入帳號</h2>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              className="w-full border rounded px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">密碼</label>
            <input
              type="password"
              className="w-full border rounded px-3 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {errorMsg && (
            <p className="text-red-500 text-sm mb-3">{errorMsg}</p>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? "登入中…" : "登入"}
          </button>

          <p className="mt-4 text-center">
            還沒有帳號？{" "}
            <a href="/signup" className="text-blue-600 hover:underline">
              立即註冊
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
