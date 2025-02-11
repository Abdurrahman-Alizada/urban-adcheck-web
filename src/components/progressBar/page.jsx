import React from 'react';
import { 
  MdAssignment,      
  MdDescription,     
  MdContactMail,     
  MdCheck           
} from 'react-icons/md';

const ProgressBar = ({ currentStep }) => {
  const steps = [
    { 
      number: 1, 
      title: 'Basic Info', 
      subtitle: 'Job Details',
      icon: MdAssignment,
      completedIcon: MdCheck 
    },
    { 
      number: 2, 
      title: 'Content',
      subtitle: 'Description & Media', 
      icon: MdDescription,
      completedIcon: MdCheck 
    },
    { 
      number: 3, 
      title: 'Contact', 
      subtitle: 'Final Details',
      icon: MdContactMail,
      completedIcon: MdCheck 
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      <div className="relative">
        {/* Desktop View */}
        <div className="hidden sm:flex items-center justify-between w-full">
          {steps.map((step, index) => (
            <div key={step.number} className="relative flex items-center flex-1">
              {/* Step Circle */}
              <div 
                className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-md transition-all duration-300
                  ${currentStep === step.number 
                    ? 'bg-blue-600 scale-110' 
                    : currentStep > step.number 
                      ? 'bg-green-500' 
                      : 'bg-gray-300 text-gray-500'
                  }`}
              >
                {React.createElement(
                  currentStep > step.number ? step.completedIcon : step.icon,
                  { className: "text-2xl" }
                )}
              </div>

              {/* Step Text */}
              <div className="ml-4">
                <p className={`text-sm font-semibold ${
                  currentStep === step.number 
                    ? 'text-blue-600' 
                    : currentStep > step.number 
                      ? 'text-green-500' 
                      : 'text-gray-500'
                }`}>
                  {step.title}
                </p>
                <p className="text-xs text-gray-400">{step.subtitle}</p>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="flex-1 mx-4">
                  <div className="h-1 bg-gray-300 relative">
                    <div 
                      className="absolute inset-0 bg-blue-600 transition-all duration-300"
                      style={{
                        width: currentStep > step.number ? '100%' : '0%',
                        backgroundColor: currentStep > step.number ? '#22c55e' : '#2563eb'
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile View */}
        <div className="sm:hidden flex flex-col space-y-6">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-start relative">
              {/* Vertical Line */}
              {index !== steps.length - 1 && (
                <div className="absolute left-6 top-12 h-full w-1 bg-gray-300"></div>
              )}

              {/* Step Circle */}
              <div 
                className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-md z-10
                  ${currentStep === step.number 
                    ? 'bg-blue-600 scale-110' 
                    : currentStep > step.number 
                      ? 'bg-green-500' 
                      : 'bg-gray-300 text-gray-500'
                  }`}
              >
                {React.createElement(
                  currentStep > step.number ? step.completedIcon : step.icon,
                  { className: "text-xl" }
                )}
              </div>

              {/* Step Text */}
              <div className="ml-4">
                <p className={`text-base font-semibold ${
                  currentStep === step.number 
                    ? 'text-blue-600' 
                    : currentStep > step.number 
                      ? 'text-green-500' 
                      : 'text-gray-500'
                }`}>
                  {step.title}
                </p>
                <p className="text-sm text-gray-400">{step.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ProgressBar;
