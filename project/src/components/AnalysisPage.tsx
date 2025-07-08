import React, { useState } from 'react';
import { Upload, FileText, Shield, LogOut, ArrowLeft, CheckCircle, AlertCircle, Brain, Sparkles, Zap, Star } from 'lucide-react';
import { PageType, AnalysisResult, User } from '../App';

interface AnalysisPageProps {
  user: User | null;
  onNavigate: (page: PageType) => void;
  onAnalysisComplete: (result: AnalysisResult) => void;
  onLogout: () => void;
}

const AnalysisPage: React.FC<AnalysisPageProps> = ({ 
  user, 
  onNavigate, 
  onAnalysisComplete, 
  onLogout 
}) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setDragOver(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleAnalyze = async () => {
    if (!uploadedFile) return;

    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    // Simulate progressive analysis with realistic steps
    const steps = [
      { progress: 20, message: 'Uploading document...' },
      { progress: 40, message: 'Extracting text content...' },
      { progress: 60, message: 'Analyzing contract clauses...' },
      { progress: 80, message: 'Identifying risk factors...' },
      { progress: 100, message: 'Generating recommendations...' }
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setAnalysisProgress(step.progress);
    }
    
    // Generate mock analysis result
    const mockResult: AnalysisResult = {
      id: Date.now().toString(),
      riskPercentage: Math.floor(Math.random() * 40) + 30, // 30-70% risk
      riskLevel: 'Medium',
      fileName: uploadedFile.name,
      fileSize: `${(uploadedFile.size / 1024 / 1024).toFixed(2)} MB`,
      analysisDate: new Date().toISOString(),
      factors: [
        {
          category: 'Termination Clauses',
          description: 'Contract lacks clear termination procedures and notice requirements',
          severity: 'High',
          recommendation: 'Add specific termination notice periods and procedures to protect both parties'
        },
        {
          category: 'Payment Terms',
          description: 'Vague payment schedule and late payment penalties',
          severity: 'Medium',
          recommendation: 'Define exact payment dates, methods, and late payment fees'
        },
        {
          category: 'Liability Limitations',
          description: 'Insufficient liability caps and indemnification clauses',
          severity: 'High',
          recommendation: 'Include mutual indemnification and reasonable liability limitations'
        },
        {
          category: 'Intellectual Property',
          description: 'Unclear IP ownership and licensing terms',
          severity: 'Medium',
          recommendation: 'Clearly define IP ownership, usage rights, and licensing terms'
        }
      ],
      overallRecommendation: 'This contract requires significant revisions to reduce risk exposure. Focus on clarifying termination procedures, payment terms, and liability limitations. Consider legal review before signing.'
    };

    // Determine risk level based on percentage
    if (mockResult.riskPercentage < 30) {
      mockResult.riskLevel = 'Low';
    } else if (mockResult.riskPercentage < 60) {
      mockResult.riskLevel = 'Medium';
    } else if (mockResult.riskPercentage < 80) {
      mockResult.riskLevel = 'High';
    } else {
      mockResult.riskLevel = 'Critical';
    }

    setIsAnalyzing(false);
    setAnalysisProgress(0);
    onAnalysisComplete(mockResult);
  };

  const floatingElements = Array.from({ length: 6 }, (_, i) => (
    <div
      key={i}
      className={`absolute animate-bounce opacity-10 ${
        i % 3 === 0 ? 'text-purple-400' : i % 3 === 1 ? 'text-blue-400' : 'text-pink-400'
      }`}
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 3}s`,
        animationDuration: `${4 + Math.random() * 2}s`
      }}
    >
      {i % 3 === 0 ? <Sparkles className="w-8 h-8" /> : 
       i % 3 === 1 ? <Zap className="w-6 h-6" /> : 
       <Star className="w-5 h-5" />}
    </div>
  ));

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Floating Background Elements */}
      {floatingElements}
      
      {/* Gradient Orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-40 w-96 h-96 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>

      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => onNavigate('dashboard')}
                className="text-gray-600 hover:text-purple-600 transition-colors duration-200 hover:scale-110"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 p-2 rounded-2xl shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Contract Analysis
              </span>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-8 h-8 rounded-full border-2 border-purple-200"
                />
                <span className="text-gray-700">{user?.name}</span>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors duration-200 hover:scale-105"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            AI Contract Analysis
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upload your contract document and let our advanced AI analyze potential risks and provide actionable recommendations in seconds.
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 mb-8 border border-white/20 animate-fade-in-up animation-delay-200">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-purple-100 via-blue-100 to-indigo-100 p-6 rounded-3xl inline-block mb-6 animate-pulse">
              <Upload className="w-10 h-10 text-purple-600" />
            </div>
            <h2 className="text-3xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-3">
              Upload Contract Document
            </h2>
            <p className="text-gray-600 text-lg">
              Supported formats: PDF, DOC, DOCX, TXT (Max 10MB)
            </p>
          </div>

          {/* File Upload Area */}
          <div
            className={`border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300 ${
              dragOver 
                ? 'border-purple-400 bg-purple-50 scale-105' 
                : 'border-gray-300 hover:border-purple-400 hover:bg-purple-50 hover:scale-105'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {uploadedFile ? (
              <div className="flex items-center justify-center space-x-4 animate-fade-in-up">
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-3 rounded-2xl">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-lg">{uploadedFile.name}</p>
                  <p className="text-gray-600">
                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <div className="bg-green-100 p-2 rounded-full">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            ) : (
              <div className="animate-fade-in-up">
                <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-6 rounded-3xl inline-block mb-6">
                  <Upload className="w-16 h-16 text-purple-600" />
                </div>
                <p className="text-gray-600 mb-4 text-lg">
                  Drag and drop your contract here, or click to browse
                </p>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl cursor-pointer hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 transition-all duration-300 inline-block font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Choose File
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Analysis Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group animate-fade-in-up animation-delay-300">
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-2xl w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
              <Brain className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2 text-lg">AI-Powered Analysis</h3>
            <p className="text-gray-600">
              Advanced machine learning algorithms analyze contract language and structure with 95% accuracy
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group animate-fade-in-up animation-delay-400">
            <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-4 rounded-2xl w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2 text-lg">Risk Assessment</h3>
            <p className="text-gray-600">
              Comprehensive risk scoring across multiple legal and business dimensions
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group animate-fade-in-up animation-delay-500">
            <div className="bg-gradient-to-r from-emerald-100 to-teal-100 p-4 rounded-2xl w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
              <AlertCircle className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2 text-lg">Smart Recommendations</h3>
            <p className="text-gray-600">
              Actionable suggestions to improve contract terms and reduce risk exposure
            </p>
          </div>
        </div>

        {/* Analyze Button */}
        <div className="text-center animate-fade-in-up animation-delay-600">
          <button
            onClick={handleAnalyze}
            disabled={!uploadedFile || isAnalyzing}
            className={`px-12 py-5 rounded-3xl font-semibold text-xl transition-all duration-300 ${
              uploadedFile && !isAnalyzing
                ? 'bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isAnalyzing ? (
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Analyzing Contract... {analysisProgress}%</span>
              </div>
            ) : (
              'Analyze Contract'
            )}
          </button>
          
          {isAnalyzing && (
            <div className="mt-6 max-w-md mx-auto">
              <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-purple-600 to-blue-600 h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${analysisProgress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default AnalysisPage;