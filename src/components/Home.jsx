import React, { useState } from "react";
import { motion } from "framer-motion";
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
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white text-white py-16 px-4"
      >
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 text-gray-800">Hospital Dashboard</h1>
        </div>
      </motion.header>

      {/* Counts Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            {[
              { title: "Total Patients", count: "150" },
              { title: "Total Doctors", count: "25" },
              { title: "Total Nurses", count: "40" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white rounded-xl p-8 shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-200"
              >
                <h3 className="text-2xl font-bold text-blue-600 mb-2">{item.title}</h3>
                <p className="text-4xl font-bold text-gray-800 animate-pulse">{item.count}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Book Appointment Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="py-16 bg-gradient-to-r from-blue-500 to-blue-700 text-white"
      >
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Book an Appointment</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-200 transition-transform duration-200"
            onClick={handleModalOpen}
          >
            Book Now
          </motion.button>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-blue-600 text-white py-6 text-center"
      >
        <p className="text-lg">&copy; 2025 Our Hospital. All Rights Reserved.</p>
      </motion.footer>

      {/* Book Appointment Modal */}
      {isModalOpen && <BookAppointment onClose={handleModalClose} />}
    </div>
  );
};

export default Home;
