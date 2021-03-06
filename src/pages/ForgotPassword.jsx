import { useState } from "react";
import axios from "axios";
//import styles from "./styles.module.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  let [emailError, setEmailError] = useState(null);

  const handleValidation = (field, value) => {
    if (field === "email") {
      setEmailError(
        (emailError =
          value.length === 0
            ? "This field is required"
            : !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
            ? "Not valid email"
            : null)
      );
    }
  };

  const handleChange = (e) => {
    setEmail(e.target.value);

    handleValidation(e.target.id, e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `http://localhost:3333/user/forgotPassword`;
      const { data } = await axios.post(url, { email });
      setMsg(data.message);
      setError("");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
        setMsg("");
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Forgot Password</h1>
        <input
          type="email"
          placeholder="Email"
          name="email"
          id="email"
          onChange={handleChange}
          value={email}
          required
        />
        {error && <div>{error}</div>}
        {msg && <div>{msg}</div>}
        <div className="text-danger mb-2">{emailError}</div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
