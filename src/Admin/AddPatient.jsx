import React, { useState } from "react";

const AddPatient = () => {
  const [patient, setPatient] = useState({
    name: "",
    age: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const response = await fetch("http://localhost:3000/api/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patient),
      });

      if (response.ok) {
        alert("Patient added successfully!");
        setPatient({ name: "", age: "", phone: "" }); // Reset form
      } else {
        alert("Failed to add patient");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }

    setLoading(false); // Stop loading
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto overflow-auto">
      <h2 className="text-2xl font-semibold mb-4">Add Patient</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Patient Name</label>
          <input
            type="text"
            name="name"
            value={patient.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Enter patient's name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Age</label>
          <input
            type="number"
            name="age"
            value={patient.age}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Enter age"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={patient.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Enter phone number"
            required
          />
        </div>
        <button
          type="submit"
          className={`py-2 px-6 rounded-lg ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 text-white"
          }`}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Patient"}
        </button>
      </form>
    </div>
  );
};

export default AddPatient;
