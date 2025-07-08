import React, { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import AnalysisPage from './components/AnalysisPage';
import ResultsPage from './components/ResultsPage';
import ProfilePage from './components/ProfilePage';
import HistoryPage from './components/HistoryPage';

export type PageType = 'login' | 'dashboard' | 'analysis' | 'results' | 'profile' | 'history';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  joinDate: string;
  totalAnalyses: number;
}

export interface AnalysisResult {
  id: string;
  riskPercentage: number;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  fileName: string;
  fileSize: string;
  analysisDate: string;
  factors: Array<{
    category: string;
    description: string;
    severity: 'Low' | 'Medium' | 'High';
    recommendation: string;
  }>;
  overallRecommendation: string;
}

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('login');
  const [user, setUser] = useState<User | null>({
    id: Date.now().toString(),
    name: 'Joe',
    email: 'joe123@gmail.com',
    avatar: '',
    joinDate: new Date().toISOString(),
    totalAnalyses: 0
  });
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [analysisHistory, setAnalysisHistory] = useState<AnalysisResult[]>([]);

  // Load user data and history from localStorage on app start
  useEffect(() => {
    setCurrentPage('login');
    setUser({
      id: Date.now().toString(),
      name: 'Joe',
      email: 'joe123@gmail.com',
      avatar: '',
      joinDate: new Date().toISOString(),
      totalAnalyses: 0
    });
    setAnalysisHistory([]);
  }, []);

  const handleLogin = () => {
    const newUser: User = {
      id: Date.now().toString(),
      name: 'Joe',
      email: 'joe123@gmail.com',
      avatar: '',
      joinDate: new Date().toISOString(),
      totalAnalyses: analysisHistory.length
    };
    setUser(newUser);
    localStorage.setItem('contractDetectorUser', JSON.stringify(newUser));
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('contractDetectorUser');
    setCurrentPage('login');
    setAnalysisResult(null);
  };

  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);
  };

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setAnalysisResult(result);
    
    // Add to history
    const updatedHistory = [result, ...analysisHistory];
    setAnalysisHistory(updatedHistory);
    localStorage.setItem('contractDetectorHistory', JSON.stringify(updatedHistory));
    
    // Update user's total analyses count
    if (user) {
      const updatedUser = { ...user, totalAnalyses: updatedHistory.length };
      setUser(updatedUser);
      localStorage.setItem('contractDetectorUser', JSON.stringify(updatedUser));
    }
    
    setCurrentPage('results');
  };

  const handleProfileUpdate = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('contractDetectorUser', JSON.stringify(updatedUser));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {currentPage === 'login' && <LoginPage onLogin={handleLogin} />}
      {currentPage === 'dashboard' && (
        <Dashboard 
          user={user} 
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          totalAnalyses={analysisHistory.length}
        />
      )}
      {currentPage === 'analysis' && (
        <AnalysisPage 
          user={user}
          onNavigate={handleNavigate}
          onAnalysisComplete={handleAnalysisComplete}
          onLogout={handleLogout}
        />
      )}
      {currentPage === 'results' && (
        <ResultsPage 
          user={user}
          result={analysisResult}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        />
      )}
      {currentPage === 'profile' && (
        <ProfilePage 
          user={user}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          onProfileUpdate={handleProfileUpdate}
        />
      )}
      {currentPage === 'history' && (
        <HistoryPage 
          user={user}
          history={analysisHistory}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          onViewResult={setAnalysisResult}
        />
      )}
    </div>
  );
}

export default App;