import React, { useState } from 'react';
import { Shield, LogOut, ArrowLeft, FileText, Calendar, TrendingUp, Search, Filter, Eye, Download, Trash2, AlertTriangle, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { PageType, User, AnalysisResult } from '../App';

interface HistoryPageProps {
  user: User | null;
  history: AnalysisResult[];
  onNavigate: (page: PageType) => void;
  onLogout: () => void;
  onViewResult: (result: AnalysisResult) => void;
}

const HistoryPage: React.FC<HistoryPageProps> = ({ 
  user, 
  history, 
  onNavigate, 
  onLogout, 
  onViewResult 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRisk, setFilterRisk] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'risk' | 'name'>('date');

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

  const filteredHistory = history
    .filter(item => {
      const matchesSearch = item.fileName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterRisk === 'all' || item.riskLevel === filterRisk;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.analysisDate).getTime() - new Date(a.analysisDate).getTime();
        case 'risk':
          return b.riskPercentage - a.riskPercentage;
        case 'name':
          return a.fileName.localeCompare(b.fileName);
        default:
          return 0;
      }
    });

  const handleViewResult = (result: AnalysisResult) => {
    onViewResult(result);
    onNavigate('results');
  };

  const handleDownloadReport = (item: AnalysisResult) => {
    // Create a human-readable summary
    const summary = [
      `Contract Analysis Report`,
      `=======================`,
      `File Name: ${item.fileName}`,
      `File Size: ${item.fileSize}`,
      `Analysis Date: ${item.analysisDate}`,
      `Risk Percentage: ${item.riskPercentage}%`,
      `Risk Level: ${item.riskLevel}`,
      '',
      'Identified Risk Factors:',
      ...item.factors.map((factor, i) =>
        [
          `  ${i + 1}. Category: ${factor.category}`,
          `     Severity: ${factor.severity}`,
          `     Description: ${factor.description}`,
          `     Recommendation: ${factor.recommendation}`,
          ''
        ].join('\n')
      ),
      'Overall Recommendation:',
      item.overallRecommendation,
      '',
      '--- End of Report ---'
    ].join('\n');
    const textBlob = new window.Blob([summary], { type: 'text/plain' });
    const textUrl = window.URL.createObjectURL(textBlob);
    const textLink = document.createElement('a');
    textLink.href = textUrl;
    textLink.download = `${item.fileName || 'contract-report'}.txt`;
    document.body.appendChild(textLink);
    textLink.click();
    document.body.removeChild(textLink);
    window.URL.revokeObjectURL(textUrl);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-72 h-72 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-40 w-72 h-72 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>

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
                Analysis History
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Analysis History
          </h1>
          <p className="text-xl text-gray-600">
            Review your past contract analyses and track your risk management progress
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 animate-fade-in-up">
            <div className="flex items-center space-x-3 mb-2">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-xl">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-gray-900">Total Analyses</span>
            </div>
            <p className="text-3xl font-bold text-purple-600">{history.length}</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 animate-fade-in-up animation-delay-100">
            <div className="flex items-center space-x-3 mb-2">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-xl">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-gray-900">Low Risk</span>
            </div>
            <p className="text-3xl font-bold text-green-600">
              {history.filter(h => h.riskLevel === 'Low').length}
            </p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 animate-fade-in-up animation-delay-200">
            <div className="flex items-center space-x-3 mb-2">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-2 rounded-xl">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-gray-900">High Risk</span>
            </div>
            <p className="text-3xl font-bold text-orange-600">
              {history.filter(h => h.riskLevel === 'High' || h.riskLevel === 'Critical').length}
            </p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 animate-fade-in-up animation-delay-300">
            <div className="flex items-center space-x-3 mb-2">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-2 rounded-xl">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-gray-900">Avg Risk</span>
            </div>
            <p className="text-3xl font-bold text-blue-600">
              {history.length > 0 ? Math.round(history.reduce((acc, h) => acc + h.riskPercentage, 0) / history.length) : 0}%
            </p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 mb-8 animate-fade-in-up animation-delay-400">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search contracts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filterRisk}
                onChange={(e) => setFilterRisk(e.target.value)}
                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              >
                <option value="all">All Risk Levels</option>
                <option value="Low">Low Risk</option>
                <option value="Medium">Medium Risk</option>
                <option value="High">High Risk</option>
                <option value="Critical">Critical Risk</option>
              </select>
            </div>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'risk' | 'name')}
              className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            >
              <option value="date">Sort by Date</option>
              <option value="risk">Sort by Risk</option>
              <option value="name">Sort by Name</option>
            </select>
          </div>
        </div>

        {/* History List */}
        {filteredHistory.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-12 shadow-xl border border-white/20 text-center animate-fade-in-up animation-delay-500">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No analyses found</h3>
            <p className="text-gray-600 mb-6">
              {history.length === 0 
                ? "You haven't analyzed any contracts yet. Start your first analysis!"
                : "No contracts match your current search and filter criteria."
              }
            </p>
            <button
              onClick={() => onNavigate('analysis')}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-2xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Start Analysis
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredHistory.map((item, index) => {
              const RiskIcon = getRiskIcon(item.riskLevel);
              return (
                <div
                  key={item.id}
                  className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-3 rounded-2xl">
                        <FileText className="w-6 h-6 text-purple-600" />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.fileName}</h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(item.analysisDate)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <FileText className="w-4 h-4" />
                            <span>{item.fileSize}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <TrendingUp className="w-4 h-4" />
                            <span>{item.riskPercentage}% Risk</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className={`flex items-center space-x-2 px-4 py-2 rounded-xl border ${getRiskColor(item.riskLevel)}`}>
                        <RiskIcon className="w-4 h-4" />
                        <span className="font-semibold">{item.riskLevel}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewResult(item)}
                          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-2 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          className="bg-gray-200 text-gray-600 p-2 rounded-xl hover:bg-gray-300 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                          title="Download Report"
                          onClick={() => handleDownloadReport(item)}
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          className="bg-red-100 text-red-600 p-2 rounded-xl hover:bg-red-200 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
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
        .animation-delay-100 {
          animation-delay: 0.1s;
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

export default HistoryPage;