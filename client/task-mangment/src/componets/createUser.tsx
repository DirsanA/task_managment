import { useState } from "react";
import axios from "axios";

const createUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // handle form submit for task

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const userResponse = await axios.post("http://localhost:3000/postUser", {
        name,
        email,
        password,
      });
      console.log(userResponse);
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={function (e) {
            setName(e.target.value);
          }}
          type="text"
          required
          placeholder="Name "
        />{" "}
        <br />
        {/* email form  */}
        <br />
        <input
          onChange={function (e) {
            setEmail(e.target.value);
          }}
          value={email}
          type="email"
          required
          placeholder="Email "
        />{" "}
        <br />
        <br />
        {/* password form */}
        <input
          onChange={function (e) {
            setPassword(e.target.value);
          }}
          type="password"
          required
          value={password}
          placeholder="password"
        />{" "}
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default createUser;
