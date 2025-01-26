import React, { useState } from 'react';
import AddPatient from "../Admin/AddPatient.jsx"; // Retained relevant imports
import DoctorsList from "../Admin/DoctorsList.jsx";
import AddNurse from "../Admin/AddNurse.jsx";
import AddDoctor from '../Admin/AddDoctor.jsx'
const Admin = () => {
  const [selectedTab, setSelectedTab] = useState('AddPatient');

  const renderComponent = () => {
    switch (selectedTab) {
      case 'AddPatient':
        return <AddPatient />;
      case 'DoctorsList':
        return <DoctorsList />;  
      case 'addNurse' :
        return <AddNurse/>
      case 'AddDoctor':
        return <AddDoctor/>  
      default:
        return <AddPatient />;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row mt-20">
      <div className="lg:w-1/4 bg-gray-800 text-white p-4 rounded-lg shadow-lg mb-4 lg:mb-0">
        <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
        <div className="mt-6">
          <ul>
            <li
              className="mb-4 cursor-pointer hover:bg-gray-700 p-2 rounded transition-all duration-300"
              onClick={() => setSelectedTab('AddPatient')}
            >
              Add Patient
            </li>
            
            <li
              className="mb-4 cursor-pointer hover:bg-gray-700 p-2 rounded transition-all duration-300"
              onClick={() => setSelectedTab('AddDoctor')}
            >
              Add Doctor
            </li>
            <li
              className="mb-4 cursor-pointer hover:bg-gray-700 p-2 rounded transition-all duration-300"
              onClick={() => setSelectedTab('addNurse')}
            >
              Add Nurse
            </li>
            <li
              className="mb-4 cursor-pointer hover:bg-gray-700 p-2 rounded transition-all duration-300"
              onClick={() => setSelectedTab('DoctorsList')}
            >
              Doctors List
            </li>
            {/* Other menu items */}
          </ul>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="lg:w-3/4 p-6 bg-gray-100 rounded-lg shadow-lg overflow-hidden">
        {renderComponent()}
      </div>
    </div>
  );
};

export default Admin;
