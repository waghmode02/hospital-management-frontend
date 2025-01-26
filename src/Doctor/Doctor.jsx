import React ,{ useState } from 'react'
import AddPrescription from "../Doctor/AddPrescription.jsx"
import ViewPrescription from "../Doctor/ViewPrescription.jsx"
import ViewPatientData from "../Doctor/ViewPatientData.jsx"
const Doctor = () => {
    const [selectedTab, setSelectedTab] = useState('AddPrescription');
  
    const renderComponent = () => {
      switch (selectedTab) {
        case 'AddPrescription':
          return <AddPrescription />;
        case 'ViewPrescription':
          return <ViewPrescription/>;   
        case 'ViewPatientData':
            return <ViewPatientData/>   
        default:
          return <AddPrescription />;
      }
    };
  
    return (
      <div className="flex flex-col lg:flex-row mt-20">
        <div className="lg:w-1/4 bg-gray-800 text-white p-4 rounded-lg shadow-lg mb-4 lg:mb-0">
          <h2 className="text-2xl font-bold mb-4">Doctor Panel</h2>
          <div className="mt-6">
            <ul>
              <li
                className="mb-4 cursor-pointer hover:bg-gray-700 p-2 rounded transition-all duration-300"
                onClick={() => setSelectedTab('AddPrescription')}
              >
                Add Prescription
              </li>
              
              <li
                className="mb-4 cursor-pointer hover:bg-gray-700 p-2 rounded transition-all duration-300"
                onClick={() => setSelectedTab('ViewPrescription')}
              >
                View Prescription
              </li>
              <li
                className="mb-4 cursor-pointer hover:bg-gray-700 p-2 rounded transition-all duration-300"
                onClick={() => setSelectedTab('ViewPatientData')}
              >
                View Patient Data
              </li>
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
  
  export default Doctor;
  
