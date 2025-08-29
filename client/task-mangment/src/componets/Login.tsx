import axios from "axios";
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={function (e) {
            setEmail(e.target.value);
          }}
          type="email"
          placeholder="email"
          required
          value={email}
        />{" "}
        <br />
        <br />
        <input
          onChange={function (e) {
            setPassword(e.target.value);
          }}
          type="password"
          placeholder="password"
          value={password}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
