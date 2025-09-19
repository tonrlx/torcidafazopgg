import React from 'react';
import { agendaData } from '../../data/agendaData';

const AgendaSection: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 fade-in">
      <h1 className="text-3xl font-bold mb-8 text-center text-white">Agenda</h1>
      <div className="bg-black border border-red-600 p-6">
        <div className="space-y-4">
          {agendaData.map((event) => (
            <div key={event.id} className="bg-black border border-red-600 p-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-xl font-bold text-red-600">{event.event}</h3>
                  <p className="text-white">{event.championship}</p>
                  <p className="text-sm text-gray-300 mt-1">
                    <span className="font-semibold">{event.date}</span> às <span className="font-semibold">{event.time}</span>
                  </p>
                </div>
                <div className="mt-3 md:mt-0">
                  <span className="bg-red-600 text-white px-3 py-1 text-sm font-medium">
                    {event.platform}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgendaSection;