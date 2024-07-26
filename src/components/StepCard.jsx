import React from 'react';

const StepCard = ({ stepNumber, title, description, linkText, linkUrl }) => {
    return (
        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md w-80 h-80">
            <div className="flex items-center justify-center bg-yellow-400 text-white font-bold rounded-full w-12 h-12 mb-4">
                {stepNumber}
            </div>
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <p className="text-gray-600 mb-4 text-center flex-grow">{description}</p>
            <a href={linkUrl} target="_blank" rel="noopener noreferrer" className="text-green-600 underline">
                {linkText}
            </a>
        </div>
    );
};

export default StepCard;
