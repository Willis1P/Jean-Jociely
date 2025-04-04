import React from 'react';
import { Button } from "@/components/ui/button";
import { MapPin, MessageCircle, Gift } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const ActionButtons = () => {
  const navigate = useNavigate();
  
  const handleConfirmation = () => {
    navigate('/confirmar-presenca');
  };
  
  const handleMapLocation = () => {
    window.open("https://maps.app.goo.gl/t1PKSNNcze1auS628", "_blank");
  };
  
  const handleGiftList = () => {
    navigate('/lista-presentes');
  };

  return (
    <div className="my-10 grid grid-cols-1 md:grid-cols-3 gap-4 px-4 animate-fade-in" style={{ animationDelay: "1s" }}>
      <Button 
        onClick={handleConfirmation}
        className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white"
      >
        <MessageCircle size={18} />
        <span>Confirmar Presença</span>
      </Button>
      
      <Button 
        onClick={handleMapLocation}
        className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white"
      >
        <MapPin size={18} />
        <span>Ver Localização</span>
      </Button>
      
      <Button 
        onClick={handleGiftList}
        className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white"
      >
        <Gift size={18} />
        <span>Lista de Presentes</span>
      </Button>
    </div>
  );
};

export default ActionButtons;
