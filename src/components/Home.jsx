import React, { useState } from "react";
import BookAppointment from "../Admin/BookAppointment.jsx";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 mt-20">
      {/* Hero Section */}
      <header className="bg-white text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 text-gray-800">Hospital Dashboard</h1>
        </div>
      </header>

      {/* Counts Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            {/* Patient Count */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-200">
              <h3 className="text-2xl font-bold text-blue-600 mb-2">Total Patients</h3>
              <p className="text-4xl font-bold text-gray-800 animate-pulse">150</p>
            </div>
            {/* Doctor Count */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-200">
              <h3 className="text-2xl font-bold text-blue-600 mb-2">Total Doctors</h3>
              <p className="text-4xl font-bold text-gray-800 animate-pulse">25</p>
            </div>
            {/* Nurse Count */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-200">
              <h3 className="text-2xl font-bold text-blue-600 mb-2">Total Nurses</h3>
              <p className="text-4xl font-bold text-gray-800 animate-pulse">40</p>
            </div>
          </div>
        </div>
      </section>

      {/* Book Appointment Section */}
      <section className="py-16 bg-gradient-to-r from-blue-500 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Book an Appointment</h2>
          <button
            className="px-10 py-4 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-200 hover:scale-105 transition-transform duration-200"
            onClick={handleModalOpen}
          >
            Book Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-6 text-center">
        <p className="text-lg">&copy; 2025 Our Hospital. All Rights Reserved.</p>
      </footer>

      {/* Book Appointment Modal */}
      {isModalOpen && <BookAppointment onClose={handleModalClose} />}
    </div>
  );
};

export default Home;
