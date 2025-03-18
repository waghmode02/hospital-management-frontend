import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaAmbulance, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const VisionMission = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center max-w-2xl mb-8"
    >
      <h1 className="text-3xl font-bold text-blue-700">Our Vision</h1>
      <p className="mt-2 text-gray-700">
        At <span className="font-semibold text-blue-600">Nanded Multispecialist Hospital</span>, we strive to be a center of excellence in healthcare by delivering high-quality medical services with integrity, innovation, and compassion.
      </p>
      <h1 className="text-3xl font-bold text-blue-700 mt-6">Our Mission</h1>
      <p className="mt-2 text-gray-700">
        Our mission is to provide accessible, affordable, and advanced medical care with a patient-centric approach, ensuring the well-being and satisfaction of every individual we serve.
      </p>
    </motion.div>
  );
};

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.includes("@")) newErrors.email = "Valid email is required";
    if (!formData.phone.match(/^\d{10}$/)) newErrors.phone = "Enter a valid 10-digit phone number";
    if (!formData.message.trim()) newErrors.message = "Message cannot be empty";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 px-4 py-10 mt-12">
      {/* Vision & Mission Section */}
      <VisionMission />

      {/* Contact Form */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg bg-white p-8 shadow-lg rounded-lg"
      >
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">Contact Us</h2>

        {submitted && <p className="text-green-600 text-center mb-4">Thank you! We will get back to you soon.</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enter your name"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enter your phone number"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Your Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Write your message here..."
            ></textarea>
            {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Send Message
          </motion.button>
        </form>
      </motion.div>

      {/* Hospital Location & Emergency Contact */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mt-10 bg-white shadow-lg p-6 rounded-lg text-center max-w-lg"
      >
        <h2 className="text-xl font-bold text-blue-700 mb-4">Emergency Contact</h2>

        <div className="flex items-center justify-center space-x-3">
          <FaAmbulance className="text-red-500 text-2xl" />
          <p className="text-gray-700 font-medium">Ambulance: <span className="font-semibold">+91 9876543210</span></p>
        </div>

        <div className="flex items-center justify-center space-x-3 mt-2">
          <FaPhoneAlt className="text-green-500 text-xl" />
          <p className="text-gray-700 font-medium">General Helpline: <span className="font-semibold">+91 9123456789</span></p>
        </div>

        <div className="flex items-center justify-center space-x-3 mt-2">
          <FaMapMarkerAlt className="text-blue-500 text-xl" />
          <p className="text-gray-700 font-medium">Location: <span className="font-semibold">Nanded, Maharashtra</span></p>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactUs;
