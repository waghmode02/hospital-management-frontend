import React, { useState } from "react";

const AddPrescription = () => {
  const [patientName, setPatientName] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [date, setDate] = useState("");
  const [medication, setMedication] = useState({ name: "", dosage: "", frequency: "" });
  const [medications, setMedications] = useState([]);
  const [notes, setNotes] = useState("");

  const handleAddMedication = () => {
    if (medication.name && medication.dosage && medication.frequency) {
      setMedications([...medications, medication]);
      setMedication({ name: "", dosage: "", frequency: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const prescription = {
      patientName,
      doctorName,
      date,
      medications,
      notes,
    };
    console.log("Prescription submitted:", prescription);
    // You can send this data to an API or process it further.
    resetForm();
  };

  const resetForm = () => {
    setPatientName("");
    setDoctorName("");
    setDate("");
    setMedication({ name: "", dosage: "", frequency: "" });
    setMedications([]);
    setNotes("");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h1 className="text-2xl font-bold mb-6 text-center">Add Prescription</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2">Patient Name</label>
            <input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter patient name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Doctor Name</label>
            <input
              type="text"
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter doctor name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Medications</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input
              type="text"
              value={medication.name}
              onChange={(e) => setMedication({ ...medication, name: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Medication Name"
            />
            <input
              type="text"
              value={medication.dosage}
              onChange={(e) => setMedication({ ...medication, dosage: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Dosage (e.g., 500mg)"
            />
            <input
              type="text"
              value={medication.frequency}
              onChange={(e) => setMedication({ ...medication, frequency: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Frequency (e.g., twice a day)"
            />
          </div>
          <button
            type="button"
            onClick={handleAddMedication}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Add Medication
          </button>
        </div>

        {medications.length > 0 && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Medications List</h3>
            <table className="w-full border rounded-lg">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Dosage</th>
                  <th className="px-4 py-2 border">Frequency</th>
                </tr>
              </thead>
              <tbody>
                {medications.map((med, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">{med.name}</td>
                    <td className="px-4 py-2 border">{med.dosage}</td>
                    <td className="px-4 py-2 border">{med.frequency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Additional Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter any additional notes"
            rows="4"
          ></textarea>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={resetForm}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPrescription;
