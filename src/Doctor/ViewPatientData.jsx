import React, { useState } from "react";

const ViewPatientData = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: "John Doe",
      age: 45,
      gender: "Male",
      contact: "123-456-7890",
      medicalHistory: "Diabetes, Hypertension",
    },
    {
      id: 2,
      name: "Jane Smith",
      age: 34,
      gender: "Female",
      contact: "987-654-3210",
      medicalHistory: "Asthma",
    },
    {
      id: 3,
      name: "Michael Johnson",
      age: 29,
      gender: "Male",
      contact: "456-789-1234",
      medicalHistory: "None",
    },
  ]);

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h1 className="text-2xl font-bold mb-6 text-center">View Patient Data</h1>

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

      {/* Patient Data Table */}
      {filteredPatients.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Age</th>
                <th className="px-4 py-2 border">Gender</th>
                <th className="px-4 py-2 border">Contact</th>
                <th className="px-4 py-2 border">Medical History</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{patient.name}</td>
                  <td className="px-4 py-2 border">{patient.age}</td>
                  <td className="px-4 py-2 border">{patient.gender}</td>
                  <td className="px-4 py-2 border">{patient.contact}</td>
                  <td className="px-4 py-2 border">{patient.medicalHistory}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600">No patients found.</p>
      )}
    </div>
  );
};

export default ViewPatientData;
