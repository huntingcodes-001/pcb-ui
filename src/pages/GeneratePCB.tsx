import React, { useState } from 'react';
import { Layers, Box, Send, Plus, X, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

const GeneratePCB = () => {
  const [mode, setMode] = useState<'specific' | 'independent' | null>(null);
  const [prompt, setPrompt] = useState('');
  const [components, setComponents] = useState<string[]>([]);
  const [newComponent, setNewComponent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedPCB, setGeneratedPCB] = useState<string | null>(null);
  const [generatedComponents, setGeneratedComponents] = useState<string[]>([]);

  const handleAddComponent = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComponent.trim()) {
      setComponents([...components, newComponent.trim()]);
      setNewComponent('');
    }
  };

  const handleRemoveComponent = (index: number) => {
    setComponents(components.filter((_, i) => i !== index));
  };

  const handleSubmit = async (isIndependent: boolean) => {
    setIsLoading(true);
    setGeneratedPCB(null);
    setGeneratedComponents([]);
    
    // Simulate processing time
    setTimeout(() => {
      // For demo purposes, we'll show a sample PCB and components
      setGeneratedPCB('https://images.unsplash.com/photo-1616763355548-1b606f439f86?auto=format&fit=crop&q=80');
      if (isIndependent) {
        setGeneratedComponents([
          'ATmega328P Microcontroller',
          '10kΩ Resistor (x4)',
          '100nF Capacitor (x3)',
          '16MHz Crystal Oscillator',
          'USB-C Connector',
        ]);
      }
      setIsLoading(false);
    }, 12000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-8">
          <Link
            to="/get-started"
            className="flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
        </div>

        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-12">
          Generate New PCB Design
        </h1>

        {isLoading ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 flex justify-center items-center min-h-[400px]">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            {/* Mode Selection */}
            {!mode && !generatedPCB && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <button
                  onClick={() => setMode('specific')}
                  className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 text-center group"
                >
                  <Layers className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white">Component Specific</h3>
                  <p className="mt-2 text-gray-500 dark:text-gray-400">
                    Generate a PCB design with specific components in mind
                  </p>
                </button>

                <button
                  onClick={() => setMode('independent')}
                  className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 text-center group"
                >
                  <Box className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white">Component Independent</h3>
                  <p className="mt-2 text-gray-500 dark:text-gray-400">
                    Generate a PCB design based on functional requirements
                  </p>
                </button>
              </div>
            )}

            {/* Generated PCB Display */}
            {generatedPCB && (
              <div className="space-y-8">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    Generated PCB Design
                  </h2>
                  <div className="w-full rounded-lg overflow-hidden">
                    <img
                      src={generatedPCB}
                      alt="Generated PCB Design"
                      className="w-full h-auto"
                    />
                  </div>
                </div>

                {generatedComponents.length > 0 && (
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                      Recommended Components
                    </h2>
                    <ul className="space-y-2">
                      {generatedComponents.map((component, index) => (
                        <li
                          key={index}
                          className="flex items-center space-x-2 text-gray-700 dark:text-gray-300"
                        >
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          <span>{component}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <button
                  onClick={() => {
                    setMode(null);
                    setGeneratedPCB(null);
                    setGeneratedComponents([]);
                    setPrompt('');
                    setComponents([]);
                  }}
                  className="w-full flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Generate Another Design
                </button>
              </div>
            )}

            {/* Component Specific Form */}
            {mode === 'specific' && !generatedPCB && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Design Requirements
                  </label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={4}
                    className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-4"
                    placeholder="Describe your PCB requirements in detail..."
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Components List
                  </label>
                  <form onSubmit={handleAddComponent} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={newComponent}
                      onChange={(e) => setNewComponent(e.target.value)}
                      className="flex-1 rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-4"
                      placeholder="Add a component (e.g., ATmega328P, 10kΩ resistor)"
                    />
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add
                    </button>
                  </form>
                  <div className="space-y-2">
                    {components.map((component, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-3 rounded-md group hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                      >
                        <span className="text-gray-700 dark:text-gray-300">{component}</span>
                        <button
                          onClick={() => handleRemoveComponent(index)}
                          className="text-gray-400 hover:text-red-600 dark:hover:text-red-400 p-1 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleSubmit(false)}
                  className="w-full flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!prompt.trim() || components.length === 0}
                >
                  Generate PCB Design
                  <Send className="ml-2 h-5 w-5" />
                </button>
              </div>
            )}

            {/* Component Independent Form */}
            {mode === 'independent' && !generatedPCB && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark: text-gray-300 mb-2">
                    Design Requirements
                  </label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={6}
                    className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-4"
                    placeholder="Describe your PCB requirements in detail (e.g., functionality, size constraints, power requirements)..."
                  />
                </div>

                <button
                  onClick={() => handleSubmit(true)}
                  className="w-full flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!prompt.trim()}
                >
                  Generate PCB Design
                  <Send className="ml-2 h-5 w-5" />
                </button>
              </div>
            )}

            {mode && !generatedPCB && (
              <button
                onClick={() => setMode(null)}
                className="mt-4 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors duration-200"
              >
                ← Back to mode selection
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default GeneratePCB;