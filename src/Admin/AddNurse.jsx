import React, { useState } from "react";

const AddNurse = () => {
  const [nurse, setNurse] = useState({
    name: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setNurse({ ...nurse, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const response = await fetch("http://localhost:3000/api/nurses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nurse),
      });

      if (response.ok) {
        alert("Nurse added successfully!");
        setNurse({ name: "", phone: "" }); // Reset form
      } else {
        alert("Failed to add nurse");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }

    setLoading(false); // Stop loading
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Add Nurse</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Nurse Name</label>
          <input
            type="text"
            name="name"
            value={nurse.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
            placeholder="Enter nurse's name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={nurse.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
            placeholder="Enter phone number"
            required
          />
        </div>
        <button
          type="submit"
          className={`py-2 px-6 rounded-lg transition ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Nurse"}
        </button>
      </form>
    </div>
  );
};

export default AddNurse;
