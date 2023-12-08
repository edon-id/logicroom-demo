"use client";

import React, { useState } from "react";
import { auth } from "../../lib/firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      // console.log(user);
      // console.log(auth.currentUser?.email);
      setEmail("");
      setPassword("");
      router.push("/dashboard");
      console.log("this is dashboard page");
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="formDiv">
      <form onSubmit={handleLogin}>
        <h3>Login Here</h3>
        <label>Email</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(event.target.value);
          }}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(event.target.value);
          }}
        />
        <button type="submit" className="log-in-btn">
          Log in
        </button>
        <div className="errorMsg">
          {error && <span>Wrong email or password</span>}
        </div>
      </form>
    </div>
  );
};

export default Login;
