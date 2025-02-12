import React from 'react';
import { Link } from 'react-router-dom';
import { CircuitBoard, Zap, DollarSign, Cpu } from 'lucide-react';

const Landing = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1616763355548-1b606f439f86?auto=format&fit=crop&q=80"
            alt="PCB Background"
          />
          <div className="absolute inset-0 bg-gray-900 opacity-75" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            AI-Powered PCB Design
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl">
            Transform your PCB design process with our advanced AI. Generate optimized PCB layouts, improve existing designs, and streamline your development workflow.
          </p>
          <div className="mt-10">
            <Link
              to="/get-started"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Get Started
              <Zap className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Why Choose PCB AI?
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-blue-600">
                <CircuitBoard className="h-8 w-8" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Smart Layout Generation</h3>
              <p className="mt-2 text-gray-500">
                Generate optimized PCB layouts based on your requirements and constraints.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-blue-600">
                <Cpu className="h-8 w-8" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Performance Optimization</h3>
              <p className="mt-2 text-gray-500">
                Improve existing PCB designs for better performance and reliability.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-blue-600">
                <DollarSign className="h-8 w-8" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Cost Efficiency</h3>
              <p className="mt-2 text-gray-500">
                Optimize component placement and routing for cost-effective manufacturing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;