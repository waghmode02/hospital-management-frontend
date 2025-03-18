import React, { useState } from "react";

const AddDoctor = () => {
  const [doctor, setDoctor] = useState({
    name: "",
    specialization: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!doctor.name || !doctor.specialization || !doctor.phone) {
      alert("All fields are required!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/doctors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(doctor),
      });

      const responseData = await response.json(); // Get response data

      if (response.ok) {
        alert("Doctor added successfully!");
        setDoctor({ name: "", specialization: "", phone: "" });
      } else {
        alert(`Failed to add doctor: ${responseData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong! Check the console for details.");
    }

    setLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Add Doctor</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Doctor Name</label>
          <input
            type="text"
            name="name"
            value={doctor.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
            placeholder="Enter doctor's name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Specialization</label>
          <input
            type="text"
            name="specialization"
            value={doctor.specialization}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
            placeholder="Enter specialization"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={doctor.phone}
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
          {loading ? "Adding..." : "Add Doctor"}
        </button>
      </form>
    </div>
  );
};

export default AddDoctor;
