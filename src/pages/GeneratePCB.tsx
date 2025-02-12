import React, { useState } from 'react';
import { Layers, Box, Send, Plus, X } from 'lucide-react';

const GeneratePCB = () => {
  const [mode, setMode] = useState<'specific' | 'independent' | null>(null);
  const [prompt, setPrompt] = useState('');
  const [components, setComponents] = useState<string[]>([]);
  const [newComponent, setNewComponent] = useState('');

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

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
          Generate New PCB Design
        </h1>

        {/* Mode Selection */}
        {!mode && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <button
              onClick={() => setMode('specific')}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 text-center group"
            >
              <Layers className="h-12 w-12 text-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-medium text-gray-900">Component Specific</h3>
              <p className="mt-2 text-gray-500">
                Generate a PCB design with specific components in mind
              </p>
            </button>

            <button
              onClick={() => setMode('independent')}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 text-center group"
            >
              <Box className="h-12 w-12 text-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-medium text-gray-900">Component Independent</h3>
              <p className="mt-2 text-gray-500">
                Generate a PCB design based on functional requirements
              </p>
            </button>
          </div>
        )}

        {/* Component Specific Form */}
        {mode === 'specific' && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Design Requirements
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 resize-none"
                placeholder="Describe your PCB requirements in detail..."
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Components List
              </label>
              <form onSubmit={handleAddComponent} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newComponent}
                  onChange={(e) => setNewComponent(e.target.value)}
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Add a component (e.g., ATmega328P, 10kΩ resistor)"
                />
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </button>
              </form>
              <div className="space-y-2">
                {components.map((component, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 p-3 rounded-md group hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-gray-700">{component}</span>
                    <button
                      onClick={() => handleRemoveComponent(index)}
                      className="text-gray-400 hover:text-red-600 p-1 rounded-full hover:bg-white transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              className="w-full flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!prompt.trim() || components.length === 0}
            >
              Generate PCB Design
              <Send className="ml-2 h-5 w-5" />
            </button>
          </div>
        )}

        {/* Component Independent Form */}
        {mode === 'independent' && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Design Requirements
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={6}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 resize-none"
                placeholder="Describe your PCB requirements in detail (e.g., functionality, size constraints, power requirements)..."
              />
            </div>

            <button
              className="w-full flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!prompt.trim()}
            >
              Generate PCB Design
              <Send className="ml-2 h-5 w-5" />
            </button>
          </div>
        )}

        {mode && (
          <button
            onClick={() => setMode(null)}
            className="mt-4 text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
          >
            ← Back to mode selection
          </button>
        )}
      </div>
    </div>
  );
};

export default GeneratePCB;