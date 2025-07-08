import React from 'react';
import { Shield, Brain, FileText, TrendingUp, Users, Clock, ArrowRight, LogOut, Menu, X, User, History, Sparkles, Zap, Star } from 'lucide-react';
import { PageType, User as UserType } from '../App';

interface DashboardProps {
  user: UserType | null;
  onNavigate: (page: PageType) => void;
  onLogout: () => void;
  totalAnalyses: number;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onNavigate, onLogout, totalAnalyses }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Advanced machine learning algorithms analyze contract language and identify potential risks with 95% accuracy.',
      color: 'from-purple-500 via-pink-500 to-red-500',
      bgColor: 'from-purple-100 to-pink-100'
    },
    {
      icon: Shield,
      title: 'Risk Assessment',
      description: 'Comprehensive risk scoring system that evaluates contracts across multiple dimensions and legal frameworks.',
      color: 'from-blue-500 via-indigo-500 to-purple-500',
      bgColor: 'from-blue-100 to-indigo-100'
    },
    {
      icon: FileText,
      title: 'Detailed Reports',
      description: 'Generate comprehensive reports with actionable insights, risk breakdowns, and improvement recommendations.',
      color: 'from-emerald-500 via-teal-500 to-cyan-500',
      bgColor: 'from-emerald-100 to-teal-100'
    },
    {
      icon: TrendingUp,
      title: 'Performance Tracking',
      description: 'Track your contract performance over time and identify patterns in risk factors and mitigation strategies.',
      color: 'from-orange-500 via-red-500 to-pink-500',
      bgColor: 'from-orange-100 to-red-100'
    }
  ];

  const stats = [
    { label: 'Your Analyses', value: totalAnalyses.toString(), icon: FileText, color: 'from-purple-500 to-pink-500' },
    { label: 'Risk Factors Found', value: (totalAnalyses * 4).toString(), icon: Shield, color: 'from-blue-500 to-indigo-500' },
    { label: 'Time Saved', value: `${totalAnalyses * 2}h`, icon: Clock, color: 'from-emerald-500 to-teal-500' },
    { label: 'Success Rate', value: '98%', icon: TrendingUp, color: 'from-orange-500 to-red-500' }
  ];

  const floatingElements = Array.from({ length: 8 }, (_, i) => (
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
              <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 p-2 rounded-2xl shadow-lg animate-pulse">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Contract Risk Detector
              </span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => onNavigate('history')}
                className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors duration-200 hover:scale-105"
              >
                <History className="w-4 h-4" />
                <span>History</span>
              </button>
              
              <div className="flex items-center space-x-3">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-8 h-8 rounded-full border-2 border-purple-200 hover:border-purple-400 transition-colors duration-200"
                />
                <button
                  onClick={() => onNavigate('profile')}
                  className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium"
                >
                  {user?.name}
                </button>
              </div>
              
              <button
                onClick={onLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors duration-200 hover:scale-105"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-600 hover:text-purple-600 transition-colors duration-200"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-white/20 shadow-lg">
            <div className="px-4 py-4 space-y-3">
              <div className="flex items-center space-x-3 pb-3 border-b border-gray-200">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-10 h-10 rounded-full border-2 border-purple-200"
                />
                <div>
                  <p className="font-medium text-gray-900">{user?.name}</p>
                  <p className="text-sm text-gray-600">{user?.email}</p>
                </div>
              </div>
              <button
                onClick={() => onNavigate('profile')}
                className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors duration-200 w-full text-left"
              >
                <User className="w-4 h-4" />
                <span>Profile</span>
              </button>
              <button
                onClick={() => onNavigate('history')}
                className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors duration-200 w-full text-left"
              >
                <History className="w-4 h-4" />
                <span>History</span>
              </button>
              <button
                onClick={onLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors duration-200 w-full text-left"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center animate-fade-in-up">
            <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6">
              Welcome back,
              <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent block">
                {user?.name?.split(' ')[0]}! 
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Ready to analyze more contracts? Our AI has processed over 50,000 contracts and is getting smarter every day.
              Let's identify risks and protect your business together.
            </p>
            <button
              onClick={() => onNavigate('analysis')}
              className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white px-10 py-5 rounded-3xl font-semibold text-lg hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 flex items-center space-x-3 mx-auto group"
            >
              <span>Start New Analysis</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-white/20 group animate-fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
              <div className="flex items-center justify-between mb-4">
                <div className={`bg-gradient-to-r ${stat.color} p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-3xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                  {stat.value}
                </span>
              </div>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            Powerful AI Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our cutting-edge AI technology provides comprehensive contract analysis 
            with unmatched accuracy and lightning-fast speed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-white/20 group animate-fade-in-up" style={{animationDelay: `${index * 0.2}s`}}>
              <div className="flex items-center mb-6">
                <div className={`bg-gradient-to-r ${feature.bgColor} p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <div className={`bg-gradient-to-r ${feature.color} p-2 rounded-xl`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 ml-4 group-hover:text-purple-600 transition-colors duration-300">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-3xl p-12 text-center shadow-2xl animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready for Your Next Analysis?
          </h2>
          <p className="text-purple-100 text-xl mb-8 max-w-2xl mx-auto">
            Upload your contract documents and get comprehensive risk analysis 
            with actionable recommendations in under 2 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('analysis')}
              className="bg-white text-purple-600 px-10 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center space-x-2 mx-auto group"
            >
              <span>Start Analysis</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            <button
              onClick={() => onNavigate('history')}
              className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-2xl font-semibold text-lg hover:bg-white hover:text-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center space-x-2 mx-auto"
            >
              <History className="w-5 h-5" />
              <span>View History</span>
            </button>
          </div>
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

export default Dashboard;