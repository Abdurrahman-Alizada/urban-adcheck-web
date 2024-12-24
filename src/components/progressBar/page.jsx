import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faClipboardList,  // Step 1 icon
  faFileAlt,         // Step 2 icon
  faMapMarkerAlt,    // Step 3 icon
  faCheck            // Completed step icon
} from '@fortawesome/free-solid-svg-icons';

const ProgressBar = ({ currentStep }) => {
  // Define the steps with title, subtitle, and icons
  const steps = [
    { 
      number: 1, 
      title: 'Step 01', 
      subtitle: 'Jobs Information',
      icon: faClipboardList,
      completedIcon: faCheck 
    },
    { 
      number: 2, 
      title: 'Step 02',
      subtitle: 'Description, Features, Images', 
      icon: faFileAlt,
      completedIcon: faCheck 
    },
    { 
      number: 3, 
      title: 'Step 03', 
      subtitle: 'Post Jobs',
      icon: faMapMarkerAlt,
      completedIcon: faCheck 
    }
  ];

  return (
    <div className="relative flex items-center justify-between mb-6">
      {/* Render all steps */}
      {steps.map((step, index) => (
        <div 
          key={step.number} 
          className={`flex items-center gap-3 w-1/3`}
        >
          {/* Step Circle */}
          <div 
            className={`w-12 h-12 rounded-full flex items-center justify-center
              ${currentStep === step.number 
                ? 'bg-primary text-white'  // Current Step (active)
                : currentStep > step.number 
                  ? 'bg-green-500 text-white'  // Completed Step
                  : 'bg-gray-200 text-gray-500'  // Future Step
              }
            `}
            aria-current={currentStep === step.number ? 'step' : undefined}
          >
            <FontAwesomeIcon 
              icon={currentStep > step.number ? step.completedIcon : step.icon} 
              className="text-xl" 
            />
          </div>

          {/* Step Text */}
          <div className="flex flex-col">
            <span 
              className={`text-sm font-medium
                ${currentStep === step.number 
                  ? 'text-primary'  // Current Step
                  : currentStep > step.number 
                    ? 'text-green-500'  // Completed Step
                    : 'text-gray-500'  // Future Step
                }
              `}
            >
              {step.title}
            </span>
            <span className="text-grayColor text-[14.03px]">
              {step.subtitle}
            </span>
          </div>

          {/* Connector Line */}
          {index < steps.length - 1 && (
            <div 
              className={`flex-grow h-[2px] 
                ${currentStep > step.number ? 'bg-green-500' : 'bg-gray-200'}
              `}
            />
          )}
        </div>
      ))}

      {/* Progress Bar Line */}
      <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gray-200 z-[-1]">
        <div 
          className="h-full bg-primary transition-all duration-300" 
          style={{ 
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` 
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
