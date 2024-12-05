import React, { useState } from "react";
import axios from "axios";

const Enquiry = ({ property, onClose }) => {
  const [userName, setUserName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  const handleSendEnquiry = async () => {
    setLoading(true); // Start loading
    try {
      await axios.post(
        "https://estateweb-eues.onrender.com/property/send-email",
        {
          ownerEmail: property.ownerEmail,
          message,
          userName,
        }
      );
      alert("Enquiry sent successfully!");
      onClose(); // Close the modal
    } catch (error) {
      alert("Failed to send enquiry. Please try again.");
      console.error(error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Send Enquiry</h2>
        <p className="mb-4">Property: {property.title}</p>
        <input
          type="text"
          placeholder="Your Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />
        <textarea
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />
        <div className="flex justify-end items-center">
          <button
            onClick={onClose}
            disabled={loading} // Disable button while loading
            className={`${
              loading ? "bg-gray-400" : "bg-gray-300"
            } text-gray-700 px-4 py-2 rounded mr-2`}
          >
            Cancel
          </button>
          <button
            onClick={handleSendEnquiry}
            disabled={loading} // Disable button while loading
            className={`${
              loading ? "bg-green-400" : "bg-green-500"
            } text-white px-4 py-2 rounded hover:bg-green-600`}
          >
            {loading ? (
              <div className="animate-spin h-5 w-5 border-t-2 border-white rounded-full"></div>
            ) : (
              "Send"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Enquiry;
