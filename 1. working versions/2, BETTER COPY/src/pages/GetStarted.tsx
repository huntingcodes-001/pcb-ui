import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, PlusCircle } from 'lucide-react';

const GetStarted = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
          Choose Your PCB Design Path
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Improve PCB Card */}
          <Link
            to="/improve-pcb"
            className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white mx-auto">
              <Cpu className="h-6 w-6" />
            </div>
            <div className="mt-6 text-center">
              <h3 className="text-xl font-medium text-gray-900">Improve PCB</h3>
              <p className="mt-2 text-gray-500">
                Optimize your existing PCB design for better performance, power efficiency, and cost-effectiveness.
              </p>
            </div>
          </Link>

          {/* Generate PCB Card */}
          <Link
            to="/generate-pcb"
            className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white mx-auto">
              <PlusCircle className="h-6 w-6" />
            </div>
            <div className="mt-6 text-center">
              <h3 className="text-xl font-medium text-gray-900">Generate PCB</h3>
              <p className="mt-2 text-gray-500">
                Create a new PCB design from scratch using our AI-powered generation tools.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;