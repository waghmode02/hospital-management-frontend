import React, { useEffect, useState } from 'react';

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(null); // Track the deleting process

  useEffect(() => {
    fetchDoctors();
  }, []);

  // Function to fetch doctors
  const fetchDoctors = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3000/api/getadoctors');
      if (!response.ok) {
        throw new Error('Failed to fetch doctors');
      }
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to delete a doctor
  const deleteDoctor = async (id) => {
    setDeleting(id); // Mark the doctor as being deleted
    try {
      const response = await fetch(`http://localhost:3000/api/doctord/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete doctor');
      }

      // Remove the deleted doctor from the state
      setDoctors(doctors.filter((doctor) => doctor._id !== id));
    } catch (error) {
      setError(error.message);
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Doctors in Our Hospital</h2>

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-900 border-b">Name</th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-900 border-b">Specialty</th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-900 border-b">Phone</th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-900 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor) => (
                <tr key={doctor._id}>
                  <td className="py-3 px-6 text-sm text-gray-700 border-b">{doctor.name}</td>
                  <td className="py-3 px-6 text-sm text-gray-700 border-b">{doctor.specialization}</td>
                  <td className="py-3 px-6 text-sm text-gray-700 border-b">{doctor.phone}</td>
                  <td className="py-3 px-6 text-sm text-gray-700 border-b">
                    <button
                      onClick={() => deleteDoctor(doctor._id)}
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                      disabled={deleting === doctor._id}
                    >
                      {deleting === doctor._id ? 'Deleting...' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DoctorsList;
