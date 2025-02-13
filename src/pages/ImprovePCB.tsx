import React, { useState, useCallback } from 'react';
import { Upload, Sliders, Send, X, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

const ImprovePCB = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [improvedPCB, setImprovedPCB] = useState<string | null>(null);
  const [parameters, setParameters] = useState({
    size: 50,
    power: 50,
    performance: 50,
    cost: 50,
    general: 50,
  });

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      setSelectedFile(files[0]);
      handleFilePreview(files[0]);
    }
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      handleFilePreview(event.target.files[0]);
    }
  };

  const handleFilePreview = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        // For demo purposes, we'll just display the file content
        setImprovedPCB(null);
      }
    };
    reader.readAsText(file);
  };

  const handleParameterChange = (parameter: string, value: number) => {
    setParameters(prev => ({
      ...prev,
      [parameter]: value,
    }));
  };

  const removeFile = () => {
    setSelectedFile(null);
    setImprovedPCB(null);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    // Simulate processing time
    setTimeout(() => {
      // For demo purposes, we'll show a sample improved PCB
      setImprovedPCB('https://images.unsplash.com/photo-1616763355548-1b606f439f86?auto=format&fit=crop&q=80');
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
          Improve Your PCB Design
        </h1>

        {isLoading ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 flex justify-center items-center min-h-[400px]">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            {/* File Upload Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
              <div
                className={`flex items-center justify-center w-full ${
                  isDragging ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-600'
                }`}
                onDragEnter={handleDragEnter}
                onDragOver={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <label className="w-full flex flex-col items-center px-6 py-8 bg-white dark:bg-gray-800 rounded-lg border-2 border-dashed cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                  {selectedFile ? (
                    <div className="flex flex-col items-center space-y-4 w-full">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500 dark:text-gray-400">{selectedFile.name}</span>
                        <button
                          onClick={removeFile}
                          className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <X className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        </button>
                      </div>
                      {/* PCB Preview */}
                      <div className="w-full max-w-md p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                        <pre className="text-sm text-gray-600 dark:text-gray-300 overflow-auto max-h-40">
                          {selectedFile.name} - PCB Design File
                        </pre>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Upload className="h-12 w-12 text-gray-400" />
                      <span className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Drop your PCB design file here or click to browse
                      </span>
                      <span className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                        Supported formats: .pcb, .gerber
                      </span>
                    </>
                  )}
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".pcb,.gerber"
                  />
                </label>
              </div>
            </div>

            {/* Parameters Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <Sliders className="h-5 w-5 mr-2" />
                Optimization Parameters
              </h2>

              {Object.entries(parameters).map(([key, value]) => (
                <div key={key} className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                      {key}
                    </label>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{value}%</span>
                  </div>
                  <div className="relative">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={value}
                      onChange={(e) => handleParameterChange(key, parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                      style={{
                        background: `linear-gradient(to right, #2563eb ${value}%, ${isDragging ? '#1f2937' : '#e5e7eb'} ${value}%)`,
                      }}
                    />
                    <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500 mt-1">
                      <span>Min</span>
                      <span>Max</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Improved PCB Preview */}
            {improvedPCB && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Improved PCB Design
                </h2>
                <div className="w-full rounded-lg overflow-hidden">
                  <img
                    src={improvedPCB}
                    alt="Improved PCB Design"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            )}

            {/* Generate Button */}
            <button
              onClick={handleSubmit}
              className="w-full flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!selectedFile}
            >
              Generate Improvements
              <Send className="ml-2 h-5 w-5" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ImprovePCB;