import React, { useState } from 'react';
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import emailjs from 'emailjs-com'; // Ensure you have emailjs-com installed

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    message: '',
    tnc: false,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { id, value, checked, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    // Define the regex patterns
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;

    // Validate form fields
    if (!formData.name || !formData.email || !formData.mobile || !formData.message || !formData.tnc) {
      setError('Please fill in all fields and accept the terms.');
      setIsLoading(false);
      return;
    }

    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address.');
      setIsLoading(false);
      return;
    }

    if (!phoneRegex.test(formData.mobile)) {
      setError('Please enter a valid phone number.');
      setIsLoading(false);
      return;
    }

    try {
      // Send data to the backend
      const response = await fetch('https://sarvadnyagoc-backend.onrender.com/api/addcontact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          message: formData.message,
          acceptTnC: formData.tnc,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok. Status: ${response.status} - ${errorText}`);
      }

      // Send email using EmailJS
      await emailjs.send('service_30r7j7q', 'template_zhdv0wq', {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        message: formData.message,
      }, 'icEnC8EKfVVeSyDmG');

      // Show success popup
      setShowPopup(true);

      // Reset form and show success message
      setFormData({
        name: '',
        email: '',
        mobile: '',
        message: '',
        tnc: false,
      });
    } catch (error) {
      console.error('Error:', error);
      setError(`There was an error submitting the form: ${error.message}. Please try again later.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="contact-us bg-beige-100 py-16 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-base text-yellow-600 font-semibold tracking-wide uppercase">Talk To Our Expert</h2>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-800 font-medium mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="text-black w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500 transition-colors duration-300"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-800 font-medium mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="text-black w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500 transition-colors duration-300"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="mobile" className="block text-gray-800 font-medium mb-2">Mobile Number</label>
                <input
                  type="text"
                  id="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="text-black w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500 transition-colors duration-300"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-800 font-medium mb-2">Message</label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="text-black w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500 transition-colors duration-300"
                />
              </div>
              <div className="mb-4 flex items-center">
                <input
                  type="checkbox"
                  id="tnc"
                  checked={formData.tnc}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="tnc" className="text-gray-800">I accept the <a href="#terms" className="text-yellow-500 underline">Terms and Conditions</a></label>
              </div>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              {isLoading ? (
                <button type="submit" className="bg-yellow-500 text-white p-3 rounded-lg cursor-not-allowed" disabled>
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin mr-2 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                    Sending...
                  </span>
                </button>
              ) : (
                <button type="submit" className="w-full py-3 px-6 bg-yellow-600 rounded-lg text-white text-lg font-semibold hover:bg-yellow-700 transition-colors duration-300">
                  Send
                </button>
              )}
            </form>
          </div>
        </div>

        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
            <div className="bg-white p-6 rounded-lg text-center">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Thank You!</h2>
              <p className="text-gray-600 mb-4">Your message has been sent successfully.</p>
              <button
                type="button"
                onClick={handleClosePopup}
                className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-800 transition-colors duration-300"
              >
                Close
              </button>
            </div>
          </div>
        )}

<div className="mt-10 flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-20">
  <div className="flex flex-col items-center space-y-2 text-center">
    <a href="tel:+919595250999" className="flex flex-col items-center group">
      <FontAwesomeIcon 
        icon={faPhone} 
        className="text-yellow-600 text-3xl transition-transform duration-300 transform group-hover:scale-110" 
      />
      <p className="text-sm text-gray-600 mt-2 group-hover:text-yellow-600">
        +91 9595250999
      </p>
    </a>
  </div>

  <div className="flex flex-col items-center space-y-2 text-center">
    <a href="mailto:support@sarvadnyagoc.in" className="flex flex-col items-center group">
      <FontAwesomeIcon 
        icon={faEnvelope} 
        className="text-yellow-600 text-3xl transition-transform duration-300 transform group-hover:scale-110" 
      />
      <h2 className="text-lg font-medium text-gray-900 mt-2">Email Us</h2>
      <p className="text-sm text-gray-600 mt-1 group-hover:text-yellow-600">
      balajimungal785@gmail.com
      </p>
    </a>
  </div>

  <div className="flex flex-col items-center space-y-2 text-center">
    <FontAwesomeIcon 
      icon={faMapMarkerAlt} 
      className="text-yellow-600 text-3xl transition-transform duration-300 transform group-hover:scale-110" 
    />
    <h2 className="text-lg font-medium text-gray-900 mt-2">Visit Us</h2>
    <p className="text-sm text-gray-600 mt-1">
      Anand Nagar Nanded , 431601
    </p>
  </div>
</div>

      </div>
    </div>
  );
};

export default ContactUs;
