import React, { useState } from "react";
import Signup from "../components/Signup";
import Signin from "../components/Signin";

const HomePage = () => {
  const [showSignup, setShowSignup] = useState(true); // State to toggle between Signup and Signin

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-11/12 max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4 text-purple-800">
          Estate Website
        </h1>

        <div className="flex justify-center mb-6">
          <button
            id="signup-btn"
            onClick={() => setShowSignup(true)}
            className={`px-4 py-2 mx-2 font-semibold text-sm rounded-md ${
              showSignup ? "bg-purple-800 text-black" : "bg-gray-200 text-black"
            }`}
          >
            Signup
          </button>
          <button
            id="signin-btn"
            onClick={() => setShowSignup(false)}
            className={`px-4 py-2 mx-2 font-semibold text-sm rounded-md ${
              !showSignup
                ? "bg-purple-800 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Signin
          </button>
        </div>

        {showSignup ? <Signup /> : <Signin />}
      </div>
    </div>
  );
};

export default HomePage;
