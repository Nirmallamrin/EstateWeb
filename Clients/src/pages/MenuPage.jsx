import React, { useState, useEffect } from "react";
import axios from "axios";
import Enquiry from "../components/Enquiry";

const MenuPage = () => {
  const [properties, setProperties] = useState([]);
  const [newProperty, setNewProperty] = useState({
    title: "",
    description: "",
    image: null,
    ownerEmail: "",
  });
  const [loading, setLoading] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

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
        "https://estateweb-eues.onrender.com/property/upload-property",
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
      const res = await axios.get(
        "https://estateweb-eues.onrender.com/property/properties"
      );
      setProperties(res.data); // Update the properties state with the fetched data
    } catch (error) {
      console.error("Failed to fetch properties:", error);
    }
  };


  // Fetch properties on component mount
  useEffect(() => {
    fetchProperties();
  }, []);

    const handleEnquiryClick = (property) => {
      setSelectedProperty(property);
    };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className=" justify-center flex text-3xl font-bold mb-6 text-purple-800">
        Estate Manager
      </h1>

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
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Available Properties
        </h2>
        {properties.length === 0 ? (
          <p className="text-gray-500 text-center">
            No properties available at the moment.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                {/* Property Image */}
                <div className="relative">
                  <img
                    src={property.imageUrl}
                    alt={property.title}
                    className="w-full h-48 object-cover"
                  />
                  <span className="absolute top-2 left-2 bg-green-500 text-white text-sm px-3 py-1 rounded-full">
                    Available
                  </span>
                </div>

                {/* Property Details */}
                <div className="p-4 space-y-3">
                  <h3 className="text-lg font-bold text-gray-800">
                    {property.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {property.description}
                  </p>

                  <button
                    onClick={() => handleEnquiryClick(property)}
                    className="w-full bg-blue-500 text-white text-sm font-medium py-2 rounded hover:bg-blue-600 transition-colors"
                  >
                    Contact Owner
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedProperty && (
          <Enquiry
            property={selectedProperty}
            onClose={() => setSelectedProperty(null)}
          />
        )}
      </div>
    </div>
  );
};

export default MenuPage;
