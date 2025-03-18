import React, { useState, useEffect } from "react";

const ViewPrescription = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch prescriptions from API
  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/prescriptions");
        if (!response.ok) {
          throw new Error("Failed to fetch prescriptions");
        }
        const data = await response.json();
        setPrescriptions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPrescriptions();
  }, []);

  // Handle prescription deletion
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this prescription?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:3000/api/prescriptions/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete prescription");
      }

      // Remove deleted prescription from state
      setPrescriptions(prescriptions.filter((prescription) => prescription._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  // Filter prescriptions based on search term
  const filteredPrescriptions = prescriptions.filter((prescription) =>
    prescription.patientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h1 className="text-2xl font-bold mb-6 text-center">View Prescriptions</h1>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search by Patient Name"
        />
      </div>

      {/* Display loading and error messages */}
      {loading && <p className="text-center text-gray-600">Loading prescriptions...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      {/* Prescription List */}
      {!loading && !error && filteredPrescriptions.length > 0 ? (
        filteredPrescriptions.map((prescription) => (
          <div
            key={prescription._id}
            className="mb-6 p-4 border rounded-lg shadow-sm hover:shadow-md"
          >
            <h2 className="text-lg font-bold mb-2">
              Patient: {prescription.patientName}
            </h2>
            <p className="text-sm text-gray-700 mb-2">
              Doctor: {prescription.doctorName}
            </p>
            <p className="text-sm text-gray-700 mb-2">Date: {prescription.date}</p>
            <h3 className="text-md font-semibold mb-2">Medications:</h3>
            <table className="w-full border rounded-lg mb-4">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Dosage</th>
                  <th className="px-4 py-2 border">Frequency</th>
                </tr>
              </thead>
              <tbody>
                {prescription.medications.map((med, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">{med.name}</td>
                    <td className="px-4 py-2 border">{med.dosage}</td>
                    <td className="px-4 py-2 border">{med.frequency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h3 className="text-md font-semibold mb-2">Notes:</h3>
            <p className="text-sm text-gray-700">{prescription.notes}</p>

            {/* Delete Button */}
            <button
              onClick={() => handleDelete(prescription._id)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition"
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        !loading && !error && <p className="text-center text-gray-600">No prescriptions found.</p>
      )}
    </div>
  );
};

export default ViewPrescription;
