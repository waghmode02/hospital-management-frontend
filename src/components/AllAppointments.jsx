import React, { useEffect, useState } from "react";
import axios from "axios";

const AllAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/appointments")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setAppointments(response.data);
        } else {
          console.error("Invalid API response format", response.data);
          setError("Failed to load appointments. Invalid response from server.");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
        setError("Failed to load appointments. Please try again.");
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      try {
        await axios.delete(`http://localhost:3000/api/appointments/${id}`);
        setAppointments((prev) => prev.filter((appointment) => appointment._id !== id));
      } catch (error) {
        console.error("Error deleting appointment:", error);
        alert("Failed to delete appointment. Try again.");
      }
    }
  };

  const filteredAppointments = appointments.filter((appointment) =>
    `${appointment.firstName} ${appointment.lastName} ${appointment.email} ${appointment.doctor?.name || ""} ${appointment.date} ${appointment.mode}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-xl rounded-xl mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">All Appointments</h1>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by Patient Name, Email, Doctor, or Date"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        />
      </div>

      {/* Display API Error */}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Appointments Table */}
      <div className="overflow-x-auto">
        {loading ? (
          <p className="text-center text-gray-500 animate-pulse">Loading...</p>
        ) : filteredAppointments.length > 0 ? (
          <table className="w-full border-collapse border rounded-lg shadow-md">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="px-4 py-3 border">Patient Name</th>
                <th className="px-4 py-3 border">Email</th>
                <th className="px-4 py-3 border">Phone</th>
                <th className="px-4 py-3 border">Gender</th>
                <th className="px-4 py-3 border">City</th>
                <th className="px-4 py-3 border">Speciality</th>
                <th className="px-4 py-3 border">Doctor</th>
                <th className="px-4 py-3 border">Date</th>
                <th className="px-4 py-3 border">Slot</th>
                <th className="px-4 py-3 border">Mode</th>
                <th className="px-4 py-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((appointment, index) => (
                <tr
                  key={appointment._id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100 transition duration-200`}
                >
                  <td className="px-4 py-3 border">{appointment.firstName} {appointment.lastName}</td>
                  <td className="px-4 py-3 border">{appointment.email}</td>
                  <td className="px-4 py-3 border">{appointment.phone || "N/A"}</td>
                  <td className="px-4 py-3 border">{appointment.gender}</td>
                  <td className="px-4 py-3 border">{appointment.city}</td>
                  <td className="px-4 py-3 border">{appointment.speciality}</td>
                  <td className="px-4 py-3 border">{appointment.doctor}</td>
                  <td className="px-4 py-3 border">
                    {appointment.date ? new Date(appointment.date).toLocaleDateString() : "N/A"}
                  </td>
                  <td className="px-4 py-3 border">{appointment.slot || "N/A"}</td>
                  <td className="px-4 py-3 border">{appointment.mode || "N/A"}</td>
                  <td className="px-4 py-3 border text-center">
                    <button
                      onClick={() => handleDelete(appointment._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 transform hover:scale-105"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500">No appointments found.</p>
        )}
      </div>
    </div>
  );
};

export default AllAppointments;
