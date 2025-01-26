import React, { useState } from "react";

const AllAppointments = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: "John Doe",
      date: "2025-01-25",
      time: "10:30 AM",
      doctor: "Dr. Sarah Johnson",
      status: "Pending",
    },
    {
      id: 2,
      patientName: "Jane Smith",
      date: "2025-01-26",
      time: "02:00 PM",
      doctor: "Dr. Emily Brown",
      status: "Pending",
    },
    {
      id: 3,
      patientName: "Michael Johnson",
      date: "2025-01-27",
      time: "11:15 AM",
      doctor: "Dr. James Williams",
      status: "Pending",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  // Handle status update
  const updateStatus = (id, newStatus) => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment.id === id ? { ...appointment, status: newStatus } : appointment
      )
    );
  };

  // Filter appointments based on the search query
  const filteredAppointments = appointments.filter((appointment) =>
    `${appointment.patientName} ${appointment.doctor} ${appointment.status}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-20">
      <h1 className="text-2xl font-bold mb-6 text-center">All Appointments</h1>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Patient Name, Doctor, or Status"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Appointments Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">Patient Name</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Time</th>
              <th className="px-4 py-2 border">Doctor</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{appointment.patientName}</td>
                  <td className="px-4 py-2 border">{appointment.date}</td>
                  <td className="px-4 py-2 border">{appointment.time}</td>
                  <td className="px-4 py-2 border">{appointment.doctor}</td>
                  <td
                    className={`px-4 py-2 border ${
                      appointment.status === "Confirmed"
                        ? "text-green-500"
                        : appointment.status === "Pending"
                        ? "text-yellow-500"
                        : "text-red-500"
                    }`}
                  >
                    {appointment.status}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    <select
                      value={appointment.status}
                      onChange={(e) => updateStatus(appointment.id, e.target.value)}
                      className="px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="px-4 py-2 border text-center text-gray-500"
                >
                  No appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllAppointments;
