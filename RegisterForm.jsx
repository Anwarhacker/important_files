import { useState } from "react";
import axios from "axios";
import "./RegisterForm.css";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitMessage("");

    try {
      const response = await axios.post("http://localhost:3000/api/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      setSubmitMessage(
        "Registration successful! You can now login with your credentials."
      );
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      console.log("Registration response:", response.data);
    } catch (error) {
      console.error("Registration error:", error);
      if (error.response && error.response.data) {
        setSubmitMessage(
          `Registration failed: ${
            error.response.data.message || "Unknown error"
          }`
        );
      } else {
        setSubmitMessage("Registration failed: Network error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter your name"
          required
        />
      </div>

      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Enter your email"
          required
        />
      </div>

      <div className="form-group">
        <label>Password:</label>
        <input
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          placeholder="Enter your password"
          minLength="6"
          required
        />
      </div>

      <div className="form-group">
        <label>Confirm Password:</label>
        <input
          type="password"
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
          placeholder="Confirm your password"
          required
        />
      </div>

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Registering..." : "Register"}
      </button>

      {submitMessage && (
        <p
          className={`submit-message ${
            submitMessage.includes("successful") ? "success" : "error"
          }`}
        >
          {submitMessage}
        </p>
      )}
    </form>
  );
}
