import React from 'react'

const AddNurse = () => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Add Nurse</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Nurse Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter nurse's name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="tel"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter phone number"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-6 rounded-lg">
            Add Nurse
          </button>
        </form>
      </div>
    );
  };
  
  export default AddNurse;
  