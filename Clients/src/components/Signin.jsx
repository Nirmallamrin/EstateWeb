import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LoginSocialGoogle } from "reactjs-social-login";
import { FaGoogle } from "react-icons/fa6";
import { CgSearchLoading } from "react-icons/cg";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!email || !password) {
      alert("Please fill all the fields");
      return;
    }

    setLoading(true); // Set loading to true when form is submitted

    try {
      const { data } = await axios.post(
        "https://estateweb-eues.onrender.com/user/signin",
        {
          email,
          password,
        }
      );

      if (data.message === "Logged in!") {
        alert("Login Successful");
        localStorage.setItem("userInfo", JSON.stringify(data));
        navigate("/menu");
      } else {
        alert(data.message); // Handle error message from backend
      }
    } catch (error) {
      console.error(error); // Log error for debugging
      alert("An error occurred during login.");
    } finally {
      setLoading(false); // Set loading to false after request completes
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 transform scale-95 hover:scale-100 transition-all duration-300 ease-in-out">
        <h2 className="text-2xl font-bold text-center text-black mb-6">
          Welcome Back
        </h2>
        <form className="space-y-4" onSubmit={submitHandler}>
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              disabled={loading} // Disable button during loading
            >
              {loading ?  'Loading...' : "Sign In"}
            </button>
          </div>
        </form>

        <LoginSocialGoogle
          client_id="109894098659-6j52ghhbkjdkth1hrq6f8oa2747nme4k.apps.googleusercontent.com"
          access_type="offline"
          onResolve={({ provider, data }) => {
            console.log("Google Login Success:", data);
            // Handle user data here (e.g., send token to backend or store it)
            localStorage.setItem("userInfo", JSON.stringify(data));
            navigate("/menu"); // Redirect after successful login
          }}
          onReject={(err) => {
            console.error("Google Login Error:", err);
            alert("Google Login Failed");
          }}
        >
          <button
            type="button"
            className="w-full px-4 py-2 text-red-700 rounded-md hover:bg-red-400 flex items-center justify-center"
          >
            <FaGoogle className="mr-2" /> Sign in with Google
          </button>
        </LoginSocialGoogle>
      </div>
    </div>
  );
};

export default Signin;
