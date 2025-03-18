import React, { useState, useEffect } from "react";

const BookAppointment = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    city: "",
    speciality: "",
    doctor: "", // Storing doctor's name instead of ObjectId
    date: "",
    slot: "",
    mode: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch doctors from correct API
  useEffect(() => {
    fetch("http://localhost:3000/api/getadoctors")
      .then((res) => res.json())
      .then((data) => setDoctors(data))
      .catch((err) => console.error("Error fetching doctors:", err));
  }, []);

  const closeModal = () => setIsModalOpen(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // If changing the doctor dropdown, store the selected doctor's name
    if (name === "doctor") {
      const selectedDoctor = doctors.find((doc) => doc.name === value);
      setFormData({ ...formData, doctor: selectedDoctor ? selectedDoctor.name : "" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:3000/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Appointment booked successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          gender: "",
          city: "",
          speciality: "",
          doctor: "",
          date: "",
          slot: "",
          mode: "",
        });
      } else {
        setMessage(data.message || "Failed to book appointment");
      }
    } catch (error) {
      setMessage("Something went wrong, please try again.");
    }
    setLoading(false);
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-4xl p-6 rounded-xl shadow-xl relative overflow-y-auto max-h-[90vh]">
        <button className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-2xl" onClick={closeModal}>
          &#x2715;
        </button>
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Book an Appointment</h2>
        
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto max-h-[60vh] px-2" onSubmit={handleSubmit}>
          <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required className="border p-4 rounded-lg" />
          <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required className="border p-4 rounded-lg" />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="border p-4 rounded-lg" />
          <input type="text" name="phone" placeholder="Phone No." value={formData.phone} onChange={handleChange} required className="border p-4 rounded-lg" />
          
          <select name="gender" value={formData.gender} onChange={handleChange} required className="border p-4 rounded-lg">
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <select name="city" value={formData.city} onChange={handleChange} required className="border p-4 rounded-lg">
            <option value="">Select City</option>
            <option>Pune</option>
            <option>Mumbai</option>
            <option>Nanded</option>
          </select>

          <select name="speciality" value={formData.speciality} onChange={handleChange} required className="border p-4 rounded-lg">
            <option value="">Select Speciality</option>
            <option>Cardiology</option>
            <option>Orthopedics</option>
          </select>

          {/* Doctor Dropdown (Fetched dynamically) */}
          <select name="doctor" value={formData.doctor} onChange={handleChange} required className="border p-4 rounded-lg">
            <option value="">Select Doctor</option>
            {doctors.map((doc) => (
              <option key={doc.name} value={doc.name}>
                {doc.name}
              </option>
            ))}
          </select>

          <input type="date" name="date" value={formData.date} onChange={handleChange} required className="border p-4 rounded-lg" />

          <select name="slot" value={formData.slot} onChange={handleChange} required className="border p-4 rounded-lg">
            <option value="">Select Slot</option>
            <option>Morning</option>
            <option>Afternoon</option>
          </select>

          <select name="mode" value={formData.mode} onChange={handleChange} required className="border p-4 rounded-lg">
            <option value="">Select Mode</option>
            <option>Online</option>
            <option>Offline</option>
          </select>

          <button type="submit" className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-all duration-300" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>

        {message && <p className="text-center text-lg font-medium mt-4 text-green-600">{message}</p>}
      </div>
    </div>
  );
};

export default BookAppointment;
