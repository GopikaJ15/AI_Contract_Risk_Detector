import React from 'react';
import { Shield, LogOut, ArrowLeft, AlertTriangle, CheckCircle, XCircle, AlertCircle, Download, Share2, History, Sparkles } from 'lucide-react';
import { PageType, AnalysisResult, User } from '../App';

interface ResultsPageProps {
  user: User | null;
  result: AnalysisResult | null;
  onNavigate: (page: PageType) => void;
  onLogout: () => void;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ 
  user, 
  result, 
  onNavigate, 
  onLogout 
}) => {
  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center bg-white/80 backdrop-blur-lg rounded-3xl p-12 shadow-2xl border border-white/20">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-6 text-lg">No analysis results available</p>
          <button
            onClick={() => onNavigate('analysis')}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-2xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Start New Analysis
          </button>
        </div>
      </div>
    );
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Low': return 'text-green-600 bg-green-100 border-green-200';
      case 'Medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'High': return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'Critical': return 'text-red-600 bg-red-100 border-red-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'Low': return CheckCircle;
      case 'Medium': return AlertCircle;
      case 'High': return AlertTriangle;
      case 'Critical': return XCircle;
      default: return AlertCircle;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Low': return 'text-green-600 bg-green-100 border-green-200';
      case 'Medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'High': return 'text-red-600 bg-red-100 border-red-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const RiskIcon = getRiskIcon(result.riskLevel);

  const floatingElements = Array.from({ length: 4 }, (_, i) => (
    <div
      key={i}
      className={`absolute animate-bounce opacity-10 ${
        i % 2 === 0 ? 'text-purple-400' : 'text-blue-400'
      }`}
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 3}s`,
        animationDuration: `${4 + Math.random() * 2}s`
      }}
    >
      <Sparkles className="w-6 h-6" />
    </div>
  ));

  const handleDownloadReport = () => {
    if (!result) return;
    // Create a human-readable summary
    const summary = [
      `Contract Analysis Report`,
      `=======================`,
      `File Name: ${result.fileName}`,
      `File Size: ${result.fileSize}`,
      `Analysis Date: ${result.analysisDate}`,
      `Risk Percentage: ${result.riskPercentage}%`,
      `Risk Level: ${result.riskLevel}`,
      '',
      'Identified Risk Factors:',
      ...result.factors.map((factor, i) =>
        [
          `  ${i + 1}. Category: ${factor.category}`,
          `     Severity: ${factor.severity}`,
          `     Description: ${factor.description}`,
          `     Recommendation: ${factor.recommendation}`,
          ''
        ].join('\n')
      ),
      'Overall Recommendation:',
      result.overallRecommendation,
      '',
      '--- End of Report ---'
    ].join('\n');
    const blob = new Blob([summary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${result.fileName || 'contract-report'}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Floating Background Elements */}
      {floatingElements}
      
      {/* Gradient Orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>

      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => onNavigate('analysis')}
                className="text-gray-600 hover:text-purple-600 transition-colors duration-200 hover:scale-110"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 p-2 rounded-2xl shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Analysis Results
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Contract Analysis Complete
          </h1>
          <p className="text-xl text-gray-600">
            Analysis complete for: <span className="font-semibold text-purple-600">{result.fileName}</span>
          </p>
        </div>

        {/* Risk Overview */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 mb-8 border border-white/20 animate-fade-in-up animation-delay-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Risk Score */}
            <div className="text-center">
              <div className="relative inline-block mb-6">
                <div className="w-40 h-40 rounded-full bg-gradient-to-r from-purple-100 via-blue-100 to-indigo-100 flex items-center justify-center shadow-2xl">
                  <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center shadow-lg">
                    <span className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                      {result.riskPercentage}%
                    </span>
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 animate-pulse">
                  <Sparkles className="w-8 h-8 text-yellow-400" />
                </div>
              </div>
              <h2 className="text-3xl font-semibold text-gray-900 mb-4">
                Overall Risk Score
              </h2>
              <div className={`inline-flex items-center space-x-3 px-6 py-3 rounded-2xl border-2 ${getRiskColor(result.riskLevel)} shadow-lg`}>
                <RiskIcon className="w-6 h-6" />
                <span className="font-bold text-lg">{result.riskLevel} Risk</span>
              </div>
            </div>

            {/* Risk Breakdown */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Risk Breakdown</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Legal Compliance</span>
                  <div className="w-40 bg-gray-200 rounded-full h-3 shadow-inner">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full shadow-lg transition-all duration-1000 ease-out"
                      style={{ width: '75%' }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Financial Risk</span>
                  <div className="w-40 bg-gray-200 rounded-full h-3 shadow-inner">
                    <div 
                      className="bg-gradient-to-r from-yellow-500 to-orange-500 h-3 rounded-full shadow-lg transition-all duration-1000 ease-out"
                      style={{ width: '60%' }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Operational Risk</span>
                  <div className="w-40 bg-gray-200 rounded-full h-3 shadow-inner">
                    <div 
                      className="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full shadow-lg transition-all duration-1000 ease-out"
                      style={{ width: '45%' }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Strategic Risk</span>
                  <div className="w-40 bg-gray-200 rounded-full h-3 shadow-inner">
                    <div 
                      className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full shadow-lg transition-all duration-1000 ease-out"
                      style={{ width: '55%' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Risk Factors */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 mb-8 border border-white/20 animate-fade-in-up animation-delay-400">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Identified Risk Factors
            </h2>
            <span className="bg-purple-100 text-purple-600 px-4 py-2 rounded-2xl font-semibold">
              {result.factors.length} factors identified
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {result.factors.map((factor, index) => (
              <div key={index} className="border-2 border-gray-100 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50 animate-fade-in-up" style={{animationDelay: `${0.5 + index * 0.1}s`}}>
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-semibold text-gray-900 text-lg">{factor.category}</h3>
                  <span className={`px-4 py-2 rounded-xl text-sm font-semibold border ${getSeverityColor(factor.severity)}`}>
                    {factor.severity}
                  </span>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">{factor.description}</p>
                <div className="border-t-2 border-gray-100 pt-4">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                    <span>💡</span>
                    <span>Recommendation:</span>
                  </h4>
                  <p className="text-gray-600 leading-relaxed">{factor.recommendation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Overall Recommendation */}
        <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-3xl p-8 mb-8 shadow-2xl animate-fade-in-up animation-delay-600">
          <h2 className="text-3xl font-semibold text-white mb-6 flex items-center space-x-3">
            <span>🎯</span>
            <span>Overall Recommendation</span>
          </h2>
          <p className="text-purple-100 text-lg leading-relaxed">
            {result.overallRecommendation}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-800">
          <button
            onClick={() => onNavigate('analysis')}
            className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white px-10 py-4 rounded-2xl font-semibold hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg"
          >
            Analyze Another Contract
          </button>
          <button 
            onClick={() => onNavigate('history')}
            className="bg-white text-purple-600 border-2 border-purple-600 px-10 py-4 rounded-2xl font-semibold hover:bg-purple-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center space-x-2 text-lg"
          >
            <History className="w-5 h-5" />
            <span>View History</span>
          </button>
          <button className="bg-white text-purple-600 border-2 border-purple-600 px-10 py-4 rounded-2xl font-semibold hover:bg-purple-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center space-x-2 text-lg" onClick={handleDownloadReport}>
            <Download className="w-5 h-5" />
            <span>Download Report</span>
          </button>
          <button className="bg-white text-purple-600 border-2 border-purple-600 px-10 py-4 rounded-2xl font-semibold hover:bg-purple-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center space-x-2 text-lg">
            <Share2 className="w-5 h-5" />
            <span>Share Results</span>
          </button>
        </div>
      </div>

      <style>{`
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
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
        .animation-delay-800 {
          animation-delay: 0.8s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default ResultsPage;