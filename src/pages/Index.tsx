import React from 'react';
import MonogramHeader from '@/components/MonogramHeader';
import InvitationMessage from '@/components/InvitationMessage';
import ParentsNames from '@/components/ParentsNames';
import EventDetails from '@/components/EventDetails';
import BibleVerse from '@/components/BibleVerse';
import GiftMessage from '@/components/GiftMessage';
import AdditionalInstructions from '@/components/AdditionalInstructions';
import ActionButtons from '@/components/ActionButtons';
import BackgroundVideo from '@/components/BackgroundVideo';

const Index = () => {
  return (
    <>
      <BackgroundVideo />
      <div className="min-h-screen flex flex-col items-center justify-center py-10 invitation-container relative">
        <div className="max-w-4xl w-full mx-auto px-4 md:px-6 lg:px-8">
          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-6 md:p-10 border border-wedding-medium-green/30">
            <MonogramHeader />
            <InvitationMessage />
            <ParentsNames />
            <div className="h-px w-full bg-wedding-medium-green/30 my-8"></div>
            <EventDetails />
            <div className="h-px w-full bg-wedding-medium-green/30 my-8"></div>
            <BibleVerse />
            <div className="h-px w-full bg-wedding-medium-green/30 my-8"></div>
            <GiftMessage />
            <div className="h-px w-full bg-wedding-medium-green/30 my-8"></div>
            <AdditionalInstructions />
            <ActionButtons />
            <p className="text-center text-sm text-wedding-dark-gray/60 mt-8 animate-fade-in" style={{ animationDelay: "1.1s" }}>
              Jean & Jociely | 16 de Agosto de 2025
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
