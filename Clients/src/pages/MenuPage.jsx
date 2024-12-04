import React, { useState, useEffect } from "react";
import axios from "axios";

const MenuPage = () => {
  const [properties, setProperties] = useState([]);
  const [newProperty, setNewProperty] = useState({
    title: "",
    description: "",
    image: null,
    ownerEmail: "",
  });
  const [loading, setLoading] = useState(false);

  // Handle input changes for property form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProperty((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload
  const handleImageChange = (e) => {
    setNewProperty((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleAddProperty = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", newProperty.image); // Append the file
      formData.append("title", newProperty.title); // Append the title
      formData.append("description", newProperty.description); // Append the description
      formData.append("ownerEmail", newProperty.ownerEmail); // Append the owner's email

      const response = await axios.post(
        "http://localhost:3000/property/upload-property",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Property added successfully:", response.data);
      setProperties((prev) => [...prev, response.data]); // Add new property to the list

      alert("Property added successfully!");

      setNewProperty({
        title: "",
        description: "",
        image: null,
        ownerEmail: "",
      });
    } catch (error) {
      console.error("There was an error adding the property:", error);
      alert("Failed to add property.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch all properties when the component mounts
  const fetchProperties = async () => {
    try {
      const res = await axios.get("http://localhost:3000/property/properties");
      setProperties(res.data); // Update the properties state with the fetched data
    } catch (error) {
      console.error("Failed to fetch properties:", error);
    }
  };

  // Send an email to the property owner
  const sendEmail = (email, title) => {
    const emailLink = `mailto:${email}?subject=Inquiry about ${title}&body=Hi, I am interested in your property.`;
    window.location.href = emailLink;
  };

  // Fetch properties on component mount
  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Estate Manager</h1>

      {/* Property Upload Form */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Add Your Property</h2>
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            name="title"
            value={newProperty.title}
            onChange={handleInputChange}
            placeholder="Property Title"
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="email"
            name="ownerEmail"
            value={newProperty.ownerEmail}
            onChange={handleInputChange}
            placeholder="Owner's Email"
            className="p-2 border border-gray-300 rounded"
            required
          />
          <textarea
            name="description"
            value={newProperty.description}
            onChange={handleInputChange}
            placeholder="Property Description"
            className="p-2 border border-gray-300 rounded col-span-2"
            required
          ></textarea>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="p-2 border border-gray-300 rounded"
            required
          />
          <button
            type="button"
            onClick={handleAddProperty}
            className="col-span-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Add Property
          </button>
        </form>
        {loading && (
          <div className="flex justify-center items-center my-4">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
          </div>
        )}
      </div>

      {/* Property List */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">List of Properties</h2>
        {properties.length === 0 ? (
          <p className="text-gray-600">No properties added yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {properties.map((property, index) => (
              <div
                key={index}
                className="border border-gray-300 rounded-lg overflow-hidden shadow-sm"
              >
                <img
                  src={property.imageUrl} // Make sure this points to the correct image URL
                  alt={property.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold">{property.title}</h3>
                  <p className="text-gray-700 mb-2">{property.description}</p>
                  <button
                    onClick={() =>
                      sendEmail(property.ownerEmail, property.title)
                    }
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Send Enquiry
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuPage;
