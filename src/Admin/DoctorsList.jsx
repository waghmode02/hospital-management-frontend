import React from 'react';

// Dummy Data for Doctors
const doctorsData = [
  {
    id: 1,
    name: 'Dr. John Doe',
    specialty: 'Cardiologist',
    phone: '+1 234 567 890',
    email: 'johndoe@example.com',
  },
  {
    id: 2,
    name: 'Dr. Jane Smith',
    specialty: 'Neurologist',
    phone: '+1 987 654 321',
    email: 'janesmith@example.com',
  },
  {
    id: 3,
    name: 'Dr. Emily Johnson',
    specialty: 'Orthopedic',
    phone: '+1 555 123 456',
    email: 'emilyjohnson@example.com',
  },
  {
    id: 4,
    name: 'Dr. Michael Brown',
    specialty: 'Pediatrician',
    phone: '+1 888 765 432',
    email: 'michaelbrown@example.com',
  },
];

const DoctorsList = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Doctors in Our Hospital</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-900 border-b">Name</th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-900 border-b">Specialty</th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-900 border-b">Phone</th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-900 border-b">Email</th>
            </tr>
          </thead>
          <tbody>
            {doctorsData.map((doctor) => (
              <tr key={doctor.id}>
                <td className="py-3 px-6 text-sm text-gray-700 border-b">{doctor.name}</td>
                <td className="py-3 px-6 text-sm text-gray-700 border-b">{doctor.specialty}</td>
                <td className="py-3 px-6 text-sm text-gray-700 border-b">{doctor.phone}</td>
                <td className="py-3 px-6 text-sm text-gray-700 border-b">{doctor.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorsList;
