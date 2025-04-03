import React from 'react';
import ConfirmationForm from '@/components/ConfirmationForm';

const ConfirmationPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-2xl">
        <ConfirmationForm />
      </div>
    </div>
  );
};

export default ConfirmationPage; 