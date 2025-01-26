import React, { useState } from "react";

const ViewPrescription = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [prescriptions, setPrescriptions] = useState([
    {
      id: 1,
      patientName: "John Doe",
      doctorName: "Dr. Smith",
      date: "2025-01-20",
      medications: [
        { name: "Paracetamol", dosage: "500mg", frequency: "Twice a day" },
        { name: "Ibuprofen", dosage: "200mg", frequency: "Once a day" },
      ],
      notes: "Take medications after meals.",
    },
    {
      id: 2,
      patientName: "Jane Smith",
      doctorName: "Dr. Brown",
      date: "2025-01-22",
      medications: [
        { name: "Amoxicillin", dosage: "250mg", frequency: "Three times a day" },
      ],
      notes: "Finish the course of antibiotics.",
    },
  ]);

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

      {/* Prescription List */}
      {filteredPrescriptions.length > 0 ? (
        filteredPrescriptions.map((prescription) => (
          <div
            key={prescription.id}
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
          </div>
        ))
      ) : (
        <p className="text-center text-gray-600">No prescriptions found.</p>
      )}
    </div>
  );
};

export default ViewPrescription;
