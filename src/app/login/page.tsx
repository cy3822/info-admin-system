
"use client";
import { createClient } from '@supabase/supabase-js';
import { useState } from 'react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    await supabase.auth.signInWithPassword({ email, password });
    alert("登入中…");
  };

  return (
    <div className="p-8 flex flex-col gap-4">
      <h1 className="text-xl">登入</h1>
      <input className="border p-2" placeholder="Email" onChange={e=>setEmail(e.target.value)} />
      <input className="border p-2" placeholder="Password" type="password" onChange={e=>setPassword(e.target.value)} />
      <button className="bg-black text-white p-2" onClick={login}>登入</button>
    </div>
  );
}
