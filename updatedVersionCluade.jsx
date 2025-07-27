// Enhanced Completion Animation Component
const AdvancedCompletionAnimation = ({
  isVisible,
  onClose,
  title = "Lesson Complete!",
  subtitle = "Great job! You've successfully completed this lesson.",
  type = "lesson",
}) => {
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const phases = [
        { delay: 50, phase: 1 },
        { delay: 300, phase: 2 },
        { delay: 600, phase: 3 },
        { delay: 900, phase: 4 },
        { delay: 2800, phase: 5 },
      ];

      const timers = phases.map(({ delay, phase }) => {
        return setTimeout(() => {
          if (phase === 5) {
            onClose();
          } else {
            setAnimationPhase(phase);
          }
        }, delay);
      });

      return () => {
        timers.forEach((timer) => clearTimeout(timer));
        setAnimationPhase(0);
      };
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <>
      <style>{`
        @keyframes checkmarkDraw {
          0% { stroke-dasharray: 0 100; transform: scale(0.5); opacity: 0; }
          40% { stroke-dasharray: 30 100; transform: scale(1.2); opacity: 0.8; }
          100% { stroke-dasharray: 100 100; transform: scale(1); opacity: 1; }
        }
        @keyframes circleScale {
          0% { transform: scale(0); opacity: 0; }
          60% { transform: scale(1.2); opacity: 0.9; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes textSlideUp {
          0% { transform: translateY(30px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-checkmark-draw { animation: checkmarkDraw 1s ease-out; }
        .animate-circle-scale { animation: circleScale 0.8s ease-out; }
        .animate-text-slide-up { animation: textSlideUp 0.6s ease-out; }
      `}</style>

      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
        <div className="relative max-w-md mx-4">
          <div className="bg-white rounded-2xl p-12 text-center shadow-2xl border-2 border-gray-100">
            <div className="relative">
              {animationPhase >= 2 && (
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-circle-scale shadow-lg">
                  <svg
                    className="w-12 h-12 text-white animate-checkmark-draw"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}

              {animationPhase >= 4 && (
                <div className="animate-text-slide-up">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    {title}
                  </h2>
                  <p className="text-gray-600 text-lg">
                    {subtitle}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Autoplay Countdown Component
const AutoplayCountdown = ({
  isVisible,
  onClose,
  onNext,
  nextVideoTitle,
  duration = 5,
}) => {
  const [countdown, setCountdown] = useState(duration);

  useEffect(() => {
    if (isVisible) {
      setCountdown(duration);
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            onNext();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isVisible, duration, onNext]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl border-2 border-gray-200">
        <div className="mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-2xl font-bold text-white">{countdown}</span>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Next Video</h3>
          <p className="text-gray-600 mb-4">Starting in {countdown} seconds</p>
          <p className="text-lg font-medium text-blue-600 truncate">
            {nextVideoTitle}
          </p>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onNext}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Play Now
          </button>
        </div>
      </div>
    </div>
  );
};

// Professional Theme Toggle Component
const ThemeToggle = ({ isDark, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`relative w-14 h-7 rounded-full p-1 transition-all duration-300 ${
        isDark
          ? "bg-gradient-to-r from-slate-700 to-slate-800 shadow-lg"
          : "bg-gradient-to-r from-amber-400 to-amber-500 shadow-lg"
      } hover:scale-105 transform`}
    >
      <div
        className={`w-5 h-5 rounded-full transition-all duration-300 flex items-center justify-center shadow-md ${
          isDark
            ? "translate-x-7 bg-slate-200 text-slate-700"
            : "translate-x-0 bg-white text-amber-600"
        }`}
      >
        {isDark ? (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        ) : (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
          </svg>
        )}
      </div>
    </button>
  );
};

// Professional Navbar Component
const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  return (
    <nav className={`${isDark ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"} shadow-lg border-b sticky top-0 z-40 transition-colors duration-300 backdrop-blur-md`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center group">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-2 mr-3 group-hover:scale-110 transition-transform duration-200">
                <span className="text-white text-xl">📚</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                EduLearn
              </span>
            </Link>
            <div className="hidden md:ml-8 md:flex md:space-x-8">
              <Link
                to="/"
                className={`${isDark ? "text-white hover:text-blue-400" : "text-gray-900 hover:text-blue-600"} px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg hover:bg-opacity-10 hover:bg-blue-600`}
              >
                🏠 Home
              </Link>
              <Link
                to="/categories"
                className={`${isDark ? "text-gray-300 hover:text-white" : "text-gray-500 hover:text-gray-900"} px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg hover:bg-opacity-10 hover:bg-blue-600`}
              >
                📚 Categories
              </Link>
              <Link
                to="/groups"
                className={`${isDark ? "text-gray-300 hover:text-white" : "text-gray-500 hover:text-gray-900"} px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg hover:bg-opacity-10 hover:bg-blue-600`}
              >
                💬 Groups
              </Link>
              {user && (
                <Link
                  to="/dashboard"
                  className={`${isDark ? "text-gray-300 hover:text-white" : "text-gray-500 hover:text-gray-900"} px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg hover:bg-opacity-10 hover:bg-blue-600`}
                >
                  📊 Dashboard
                </Link>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle isDark={isDark} onToggle={toggleTheme} />

            {user ? (
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                  👋 {user.name}
                </div>
                <button
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  className={`${isDark ? "text-gray-300 hover:text-red-400" : "text-gray-500 hover:text-red-600"} px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg border-2 border-transparent hover:border-red-200`}
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link
                  to="/signin"
                  className={`${isDark ? "text-gray-300 hover:text-white border-gray-600" : "text-gray-500 hover:text-gray-700 border-gray-200"} px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg border-2`}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

// Professional Sign Up Page
const SignUpPage = () => {
  const { isDark } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    signup(formData);
    navigate("/");
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDark ? "bg-gray-900" : "bg-gray-50"} py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300`}>
      {/* Professional background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `radial-gradient(circle at 4px 4px, ${isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)'} 2px, transparent 0)`,
          backgroundSize: '48px 48px'
        }} />
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className={`${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} rounded-2xl shadow-xl border-2 p-10 backdrop-blur-sm`}>
          <div className="text-center mb-10">
            <div className="text-4xl mb-4">🚀</div>
            <h2 className={`text-3xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-4`}>
              Create Account
            </h2>
            <p className={`${isDark ? "text-gray-300" : "text-gray-600"} text-lg`}>
              Join thousands of learners advancing their skills
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className={`block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"} mb-2`}>
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className={`w-full px-4 py-3 border-2 ${isDark ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400" : "border-gray-300 bg-white text-gray-900"} rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="email" className={`block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"} mb-2`}>
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className={`w-full px-4 py-3 border-2 ${isDark ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400" : "border-gray-300 bg-white text-gray-900"} rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="password" className={`block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"} mb-2`}>
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className={`w-full px-4 py-3 border-2 ${isDark ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400" : "border-gray-300 bg-white text-gray-900"} rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className={`block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"} mb-2`}>
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className={`w-full px-4 py-3 border-2 ${isDark ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400" : "border-gray-300 bg-white text-gray-900"} rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Create Account
            </button>
          </form>

          <div className="text-center mt-8">
            <Link
              to="/signin"
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
            >
              Already have an account? <span className="underline">Sign in</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Professional Sign In Page
const SignInPage = () => {
  const { isDark } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { signin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signin(formData);
    navigate("/");
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDark ? "bg-gray-900" : "bg-gray-50"} py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300`}>
      {/* Professional background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `radial-gradient(circle at 4px 4px, ${isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)'} 2px, transparent 0)`,
          backgroundSize: '48px 48px'
        }} />
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className={`${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} rounded-2xl shadow-xl border-2 p-10 backdrop-blur-sm`}>
          <div className="text-center mb-10">
            <div className="text-4xl mb-4">👋</div>
            <h2 className={`text-3xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-4`}>
              Welcome Back
            </h2>
            <p className={`${isDark ? "text-gray-300" : "text-gray-600"} text-lg`}>
              Sign in to continue your learning journey
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className={`block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"} mb-2`}>
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className={`w-full px-4 py-3 border-2 ${isDark ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400" : "border-gray-300 bg-white text-gray-900"} rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="password" className={`block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"} mb-2`}>
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className={`w-full px-4 py-3 border-2 ${isDark ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400" : "border-gray-300 bg-white text-gray-900"} rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-2 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className={`ml-2 block text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
                  Forgot password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Sign In
            </button>
          </form>

          <div className="text-center mt-8">
            <Link
              to="/signup"
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
            >
              Don't have an account? <span className="underline">Sign up</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Rest of the components (HomePage, DashboardPage, etc.) with professional styling...
// [Additional components would follow the same professional styling pattern]

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/signin" />;
};

// Theme Provider Component
const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const value = {
    isDark,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

// Auth Provider Component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const mockUser = {
      id: 1,
      name: "Demo User",
      email: "demo@example.com",
    };
    setUser(mockUser);
  }, []);

  const signin = (userData) => {
    const mockUser = {
      id: 1,
      name: "John Doe",
      email: userData.email,
    };
    setUser(mockUser);
  };

  const signup = (userData) => {
    const mockUser = {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
    };
    setUser(mockUser);
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    signin,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Placeholder components for other pages
const HomePage = () => <div className="min-h-screen flex items-center justify-center text-2xl">Home Page - Professional styling coming soon</div>;
const DashboardPage = () => <div className="min-h-screen flex items-center justify-center text-2xl">Dashboard Page - Professional styling coming soon</div>;
const GroupsPage = () => <div className="min-h-screen flex items-center justify-center text-2xl">Groups Page - Professional styling coming soon</div>;

// Main App Component
const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/category/:id" element={<CategoryDetailPage />} />
              <Route path="/groups" element={<GroupsPage />} />
              <Route
                path="/course/:id"
                element={
                  <ProtectedRoute>
                    <CoursePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/signin" element={<SignInPage />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;import React, { useState, useEffect, useRef, createContext, useContext } from "react";
import ReactPlayer from "react-player";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  useNavigate,
} from "react-router-dom";

// Theme Context
const ThemeContext = createContext();

// Auth Context
const AuthContext = createContext();

// Professional Custom Video Controls with proper functionality
const CustomVideoControls = ({
  playing,
  onPlay,
  onPause,
  played,
  duration,
  onSeek,
  volume,
  onVolumeChange,
  quality,
  onQualityChange,
  isDark,
  onFullscreen,
}) => {
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const volumeTimeoutRef = useRef(null);
  const qualityMenuRef = useRef(null);
  const hideTimeoutRef = useRef(null);
  const playerRef = useRef(null);

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${String(secs).padStart(2, "0")}`;
  };

  // Dynamic quality options based on connection
  const [availableQualities, setAvailableQualities] = useState([
    { label: "Auto", value: "auto" },
    { label: "1080p", value: "1080p" },
    { label: "720p", value: "720p" },
    { label: "480p", value: "480p" },
    { label: "360p", value: "360p" },
  ]);

  // Detect connection speed and adjust available qualities
  useEffect(() => {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection) {
      const effectiveType = connection.effectiveType;
      let maxQuality = "1080p";
      
      switch (effectiveType) {
        case 'slow-2g':
        case '2g':
          maxQuality = "360p";
          break;
        case '3g':
          maxQuality = "480p";
          break;
        case '4g':
          maxQuality = "1080p";
          break;
        default:
          maxQuality = "1080p";
      }
      
      const filteredQualities = availableQualities.filter(q => {
        if (q.value === "auto") return true;
        const qualityNum = parseInt(q.value);
        const maxQualityNum = parseInt(maxQuality);
        return qualityNum <= maxQualityNum;
      });
      
      setAvailableQualities(filteredQualities);
    }
  }, []);

  // Enhanced controls visibility
  const showControls = () => {
    setIsVisible(true);
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    hideTimeoutRef.current = setTimeout(() => {
      if (!showVolumeSlider && !showQualityMenu && !isDragging) {
        setIsVisible(false);
      }
    }, 3000);
  };

  const hideControls = () => {
    if (!showVolumeSlider && !showQualityMenu && !isDragging) {
      hideTimeoutRef.current = setTimeout(() => {
        setIsVisible(false);
      }, 1000);
    }
  };

  // Progress bar dragging
  const handleProgressMouseDown = (e) => {
    setIsDragging(true);
    handleProgressClick(e);
    setIsVisible(true);
  };

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    onSeek(percentage);
  };

  const handleProgressMouseMove = (e) => {
    if (isDragging) {
      handleProgressClick(e);
    }
  };

  const handleProgressMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleProgressMouseMove);
      document.addEventListener('mouseup', handleProgressMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleProgressMouseMove);
      document.removeEventListener('mouseup', handleProgressMouseUp);
    };
  }, [isDragging]);

  // Volume controls
  const handleVolumeMouseEnter = () => {
    if (volumeTimeoutRef.current) clearTimeout(volumeTimeoutRef.current);
    setShowVolumeSlider(true);
    setIsVisible(true);
  };

  const handleVolumeMouseLeave = () => {
    volumeTimeoutRef.current = setTimeout(() => {
      setShowVolumeSlider(false);
    }, 300);
  };

  // Quality menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (qualityMenuRef.current && !qualityMenuRef.current.contains(event.target)) {
        setShowQualityMenu(false);
      }
    };

    if (showQualityMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      setIsVisible(true);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showQualityMenu]);

  // Volume icon
  const getVolumeIcon = () => {
    if (volume === 0) {
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.789L4.674 14H2a1 1 0 01-1-1V7a1 1 0 011-1h2.674l3.709-2.789a1 1 0 011.617.789zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      );
    } else if (volume < 0.5) {
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.789L4.674 14H2a1 1 0 01-1-1V7a1 1 0 011-1h2.674l3.709-2.789a1 1 0 011.617.789z" clipRule="evenodd" />
        </svg>
      );
    }
    return (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.789L4.674 14H2a1 1 0 01-1-1V7a1 1 0 011-1h2.674l3.709-2.789a1 1 0 011.617.789zM18 10a8.024 8.024 0 01-1.789 5.035l-1.414-1.414A6.002 6.002 0 0016 10a6.002 6.002 0 00-1.203-3.621l1.414-1.414A8.024 8.024 0 0118 10z" clipRule="evenodd" />
      </svg>
    );
  };

  // Red gradient progression
  const getProgressColor = () => {
    if (played < 0.25) return '#ef4444'; // Red-500
    if (played < 0.5) return '#dc2626'; // Red-600
    if (played < 0.75) return '#b91c1c'; // Red-700
    return '#991b1b'; // Red-800
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (volumeTimeoutRef.current) clearTimeout(volumeTimeoutRef.current);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  return (
    <div
      className="absolute inset-0 flex flex-col justify-end"
      onMouseMove={showControls}
      onMouseLeave={hideControls}
    >
      {/* Gradient overlay */}
      <div 
        className={`absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      />
      
      {/* Controls container - Properly positioned */}
      <div
        className={`relative z-10 px-4 pb-4 transition-all duration-300 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        {/* Progress Bar with enhanced red gradient */}
        <div className="mb-3">
          <div
            className="w-full bg-white/30 rounded-full h-1.5 cursor-pointer relative group/progress hover:h-2 transition-all duration-200"
            onClick={handleProgressClick}
            onMouseDown={handleProgressMouseDown}
          >
            <div
              className="h-full rounded-full shadow-sm transition-all duration-200 relative"
              style={{ 
                width: `${Math.max(0, Math.min(100, played * 100))}%`,
                backgroundColor: getProgressColor()
              }}
            >
              <div 
                className="absolute right-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity duration-200 shadow-lg"
                style={{ backgroundColor: getProgressColor() }}
              />
            </div>
          </div>
        </div>

        {/* Controls Row */}
        <div className="flex items-center justify-between text-white">
          {/* Left Controls */}
          <div className="flex items-center space-x-3">
            {/* Play/Pause Button */}
            <button
              onClick={playing ? onPause : onPlay}
              className="flex items-center justify-center w-9 h-9 hover:bg-white/20 rounded-full transition-all duration-200 hover:scale-105"
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </button>

            {/* Volume Control */}
            <div className="relative">
              <button
                onMouseEnter={handleVolumeMouseEnter}
                onMouseLeave={handleVolumeMouseLeave}
                onClick={() => onVolumeChange(volume === 0 ? 0.5 : 0)}
                className="flex items-center justify-center w-9 h-9 hover:bg-white/20 rounded-full transition-all duration-200 hover:scale-105"
                aria-label="Volume"
              >
                {getVolumeIcon()}
              </button>

              {/* Volume Slider */}
              {showVolumeSlider && (
                <div
                  className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-black/90 backdrop-blur-sm rounded-lg p-3 shadow-xl"
                  onMouseEnter={handleVolumeMouseEnter}
                  onMouseLeave={handleVolumeMouseLeave}
                >
                  <div className="h-20 w-6 flex items-center justify-center">
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={volume}
                      onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                      className="h-16 w-1 appearance-none cursor-pointer bg-transparent slider-vertical"
                      orient="vertical"
                      style={{
                        background: `linear-gradient(to top, #3b82f6 0%, #3b82f6 ${volume * 100}%, rgba(255,255,255,0.3) ${volume * 100}%, rgba(255,255,255,0.3) 100%)`
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Time Display */}
            <span className="text-sm font-mono bg-black/40 px-3 py-1 rounded-md backdrop-blur-sm">
              {formatTime(duration * played)} / {formatTime(duration)}
            </span>
          </div>

          {/* Right Controls */}
          <div className="flex items-center space-x-3">
            {/* Quality Selector */}
            <div className="relative" ref={qualityMenuRef}>
              <button
                onClick={() => setShowQualityMenu(!showQualityMenu)}
                className="flex items-center justify-center h-8 px-3 hover:bg-white/20 rounded-md text-sm font-medium transition-all duration-200 bg-black/40 backdrop-blur-sm hover:scale-105"
                aria-label="Quality settings"
              >
                {quality || 'Auto'}
              </button>

              {showQualityMenu && (
                <div className="absolute bottom-full right-0 mb-2 bg-black/90 backdrop-blur-sm rounded-lg py-1 min-w-20 shadow-xl border border-white/10">
                  {availableQualities.map((q) => (
                    <button
                      key={q.value}
                      onClick={() => {
                        onQualityChange(q.value);
                        setShowQualityMenu(false);
                      }}
                      className={`block w-full text-left px-3 py-2 text-sm hover:bg-white/20 transition-colors duration-200 ${
                        quality === q.value ? "text-blue-400 font-medium" : "text-white"
                      }`}
                    >
                      {q.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Fullscreen Button */}
            <button
              onClick={onFullscreen}
              className="flex items-center justify-center w-9 h-9 hover:bg-white/20 rounded-full transition-all duration-200 hover:scale-105"
              aria-label="Fullscreen"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Professional Categories Page with enhanced design
const CategoriesPage = () => {
  const { isDark } = useContext(ThemeContext);

  const categories = [
    {
      id: 1,
      name: "Programming",
      description: "Master coding languages: React, Python, JavaScript and more",
      courses: 24,
      icon: "💻",
      color: "from-blue-600 to-blue-700",
      bgColor: isDark ? "bg-gray-800/50" : "bg-white",
      borderColor: "border-blue-200",
    },
    {
      id: 2,
      name: "Mathematics",
      description: "From basic algebra to advanced calculus and statistics",
      courses: 18,
      icon: "📊",
      color: "from-emerald-600 to-emerald-700",
      bgColor: isDark ? "bg-gray-800/50" : "bg-white",
      borderColor: "border-emerald-200",
    },
    {
      id: 3,
      name: "Data Science",
      description: "Analytics, machine learning, and data visualization",
      courses: 15,
      icon: "📈",
      color: "from-violet-600 to-violet-700",
      bgColor: isDark ? "bg-gray-800/50" : "bg-white",
      borderColor: "border-violet-200",
    },
    {
      id: 4,
      name: "Interview Prep",
      description: "Technical interviews and coding challenges",
      courses: 12,
      icon: "🎯",
      color: "from-orange-600 to-orange-700",
      bgColor: isDark ? "bg-gray-800/50" : "bg-white",
      borderColor: "border-orange-200",
    },
    {
      id: 5,
      name: "Design",
      description: "UI/UX design principles and modern design tools",
      courses: 20,
      icon: "🎨",
      color: "from-rose-600 to-rose-700",
      bgColor: isDark ? "bg-gray-800/50" : "bg-white",
      borderColor: "border-rose-200",
    },
    {
      id: 6,
      name: "Business",
      description: "Entrepreneurship, marketing, and business strategy",
      courses: 16,
      icon: "💼",
      color: "from-slate-600 to-slate-700",
      bgColor: isDark ? "bg-gray-800/50" : "bg-white",
      borderColor: "border-slate-200",
    },
  ];

  return (
    <div className={`min-h-screen ${isDark ? "bg-gray-900" : "bg-gray-50"} transition-colors duration-300 relative`}>
      {/* Professional background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, ${isDark ? 'rgba(148, 163, 184, 0.15)' : 'rgba(71, 85, 105, 0.08)'} 2px, transparent 0)`,
          backgroundSize: '32px 32px'
        }} />
      </div>
      
      <div className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className={`text-4xl md:text-5xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-6`}>
              Course <span className="text-blue-600">Categories</span>
            </h1>
            <p className={`text-xl ${isDark ? "text-gray-300" : "text-gray-600"} max-w-3xl mx-auto leading-relaxed`}>
              Explore our comprehensive collection of courses across various subjects
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className={`${category.bgColor} ${category.borderColor} rounded-2xl shadow-lg border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group backdrop-blur-sm`}
              >
                <div className={`h-24 bg-gradient-to-r ${category.color} flex items-center justify-center relative overflow-hidden rounded-t-xl`}>
                  <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                </div>

                <div className="p-8">
                  <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-3`}>
                    {category.name}
                  </h3>
                  <p className={`${isDark ? "text-gray-300" : "text-gray-600"} mb-6 leading-relaxed`}>
                    {category.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${isDark ? "text-gray-400 bg-gray-700/50" : "text-gray-600 bg-gray-100"} px-3 py-1 rounded-full font-medium`}>
                      {category.courses} courses
                    </span>
                    <svg className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Professional Category Detail Page
const CategoryDetailPage = () => {
  const { isDark } = useContext(ThemeContext);

  const courses = [
    {
      id: 1,
      title: "React Fundamentals",
      description: "Learn modern React development from scratch",
      instructor: "John Smith",
      duration: "8 hours",
      videos: 24,
      rating: 4.8,
      students: 1234,
      difficulty: "Beginner",
      color: "from-blue-600 to-blue-700",
    },
    {
      id: 2,
      title: "Advanced JavaScript",
      description: "Master ES6+ features and advanced JavaScript concepts",
      instructor: "Sarah Johnson",
      duration: "10 hours",
      videos: 32,
      rating: 4.9,
      students: 856,
      difficulty: "Advanced",
      color: "from-amber-600 to-amber-700",
    },
    {
      id: 3,
      title: "Python for Data Science",
      description: "Data analysis and visualization with Python",
      instructor: "Michael Chen",
      duration: "12 hours",
      videos: 28,
      rating: 4.7,
      students: 2341,
      difficulty: "Intermediate",
      color: "from-emerald-600 to-emerald-700",
    },
    {
      id: 4,
      title: "UI/UX Design Basics",
      description: "Principles of modern user interface design",
      instructor: "Emily Davis",
      duration: "6 hours",
      videos: 18,
      rating: 4.6,
      students: 567,
      difficulty: "Beginner",
      color: "from-rose-600 to-rose-700",
    },
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner":
        return isDark ? "bg-emerald-900/50 text-emerald-300" : "bg-emerald-100 text-emerald-800";
      case "Intermediate":
        return isDark ? "bg-amber-900/50 text-amber-300" : "bg-amber-100 text-amber-800";
      case "Advanced":
        return isDark ? "bg-red-900/50 text-red-300" : "bg-red-100 text-red-800";
      default:
        return isDark ? "bg-gray-900/50 text-gray-300" : "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? "bg-gray-900" : "bg-gray-50"} transition-colors duration-300 relative`}>
      {/* Professional background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(45deg, ${isDark ? 'rgba(59, 130, 246, 0.03)' : 'rgba(59, 130, 246, 0.02)'} 25%, transparent 25%), linear-gradient(-45deg, ${isDark ? 'rgba(59, 130, 246, 0.03)' : 'rgba(59, 130, 246, 0.02)'} 25%, transparent 25%)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h1 className={`text-4xl md:text-5xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-6`}>
              Programming <span className="text-blue-600">Courses</span>
            </h1>
            <p className={`${isDark ? "text-gray-300" : "text-gray-600"} text-xl leading-relaxed max-w-3xl mx-auto`}>
              Master programming through hands-on projects and expert instruction
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {courses.map((course) => (
              <div
                key={course.id}
                className={`${isDark ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"} rounded-2xl shadow-lg border-2 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group backdrop-blur-sm`}
              >
                <div className={`h-32 bg-gradient-to-r ${course.color} flex items-center justify-center relative overflow-hidden`}>
                  <div className="text-white text-center">
                    <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
                      📚
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                      {course.title}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(course.difficulty)}`}>
                      {course.difficulty}
                    </span>
                  </div>

                  <p className={`${isDark ? "text-gray-300" : "text-gray-600"} mb-6 leading-relaxed`}>
                    {course.description}
                  </p>

                  <div className={`flex items-center text-sm ${isDark ? "text-gray-400" : "text-gray-500"} mb-6 space-x-4 flex-wrap gap-2`}>
                    <span className={`${isDark ? "bg-gray-700/50" : "bg-gray-100"} px-3 py-1 rounded-full font-medium`}>
                      👨‍🏫 {course.instructor}
                    </span>
                    <span className={`${isDark ? "bg-gray-700/50" : "bg-gray-100"} px-3 py-1 rounded-full font-medium`}>
                      ⏱️ {course.duration}
                    </span>
                    <span className={`${isDark ? "bg-gray-700/50" : "bg-gray-100"} px-3 py-1 rounded-full font-medium`}>
                      ⭐ {course.rating}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                      <span className="font-medium">{course.videos} lessons</span> • <span className="font-medium">{course.students.toLocaleString()} students</span>
                    </div>
                    <Link
                      to={`/course/${course.id}`}
                      className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      Enroll Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Course Page with larger video and better layout
const CoursePage = () => {
  const { isDark } = useContext(ThemeContext);
  const [selectedVideo, setSelectedVideo] = useState(0);
  const [progress, setProgress] = useState({});
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);

  const videos = [
    {
      id: 1,
      title: "Introduction to React",
      duration: "12:35",
      url: "/one.mp4",
    },
    {
      id: 2,
      title: "Components and Props",
      duration: "18:42",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    },
    {
      id: 3,
      title: "State Management",
      duration: "22:15",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    },
    {
      id: 4,
      title: "Event Handling",
      duration: "25:30",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    },
    {
      id: 5,
      title: "React Hooks",
      duration: "19:20",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    },
    {
      id: 6,
      title: "Context API",
      duration: "21:10",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    },
  ];

  const handleVideoComplete = (videoId) => {
    setProgress((prev) => ({
      ...prev,
      [videoId]: 100,
    }));
  };

  const handleToggleComplete = (videoId) => {
    const newValue = progress[videoId] === 100 ? 0 : 100;
    setProgress((prev) => ({
      ...prev,
      [videoId]: newValue,
    }));
  };

  const handleNextVideo = () => {
    if (selectedVideo < videos.length - 1) {
      setSelectedVideo(selectedVideo + 1);
    }
  };

  const calculateCourseProgress = () => {
    const completedVideos = Object.values(progress).filter(
      (p) => p === 100
    ).length;
    return Math.round((completedVideos / videos.length) * 100);
  };

  const getProgressColor = () => {
    const progressPercent = calculateCourseProgress();
    if (progressPercent < 30) return "from-amber-500 to-amber-600";
    if (progressPercent < 60) return "from-amber-600 to-orange-600";
    if (progressPercent < 80) return "from-orange-600 to-emerald-600";
    return "from-emerald-600 to-emerald-700";
  };

  const hasNextVideo = selectedVideo < videos.length - 1;
  const nextVideoTitle = hasNextVideo ? videos[selectedVideo + 1].title : "";

  return (
    <div className={`min-h-screen ${isDark ? "bg-gray-900" : "bg-gray-50"} transition-colors duration-300`}>
      <div className="max-w-full mx-auto px-6 py-8">
        {/* Professional Course Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-xl p-8 mb-8 text-white relative overflow-hidden">
          <div className="absolute top-4 right-4 text-3xl opacity-20">📚</div>
          
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                React Fundamentals
              </h1>
              <div className="flex items-center text-blue-100 space-x-6 flex-wrap">
                <span className="bg-white/20 px-4 py-2 rounded-full font-medium">
                  👨‍🏫 John Smith
                </span>
                <span className="bg-white/20 px-4 py-2 rounded-full font-medium">
                  📚 {videos.length} lessons
                </span>
                <span className="bg-white/20 px-4 py-2 rounded-full font-medium">
                  ⏱️ 2h 15m
                </span>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-100 mb-2">
                {calculateCourseProgress()}%
              </div>
              <div className="text-sm text-blue-200">Complete</div>
            </div>
          </div>

          <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
            <div className="w-full bg-white/30 rounded-full h-3 shadow-inner">
              <div
                className={`h-3 bg-gradient-to-r ${getProgressColor()} rounded-full transition-all duration-700 shadow-lg relative overflow-hidden`}
                style={{ width: `${calculateCourseProgress()}%` }}
              >
                <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Layout - All in one view */}
        <div className="flex flex-col xl:flex-row gap-8">
          {/* Video Player Section - 2/3 width */}
          <div className="xl:w-2/3">
            <EnhancedVideoPlayer
              url={videos[selectedVideo].url}
              videoTitle={videos[selectedVideo].title}
              onProgress={() => {}}
              onVideoEnd={() => handleVideoComplete(videos[selectedVideo].id)}
              isCompleted={progress[videos[selectedVideo].id] === 100}
              onToggleComplete={() => handleToggleComplete(videos[selectedVideo].id)}
              onNextVideo={handleNextVideo}
              nextVideoTitle={nextVideoTitle}
              hasNextVideo={hasNextVideo}
              autoplayEnabled={autoplayEnabled}
              onToggleAutoplay={() => setAutoplayEnabled(!autoplayEnabled)}
            />

            {/* Lesson Description */}
            <div className={`${isDark ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"} rounded-2xl shadow-lg border-2 p-6 mt-6 backdrop-blur-sm`}>
              <h2 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-4`}>
                {videos[selectedVideo].title}
              </h2>
              <p className={`${isDark ? "text-gray-300" : "text-gray-600"} leading-relaxed text-lg mb-6`}>
                This lesson covers essential concepts and practical examples to help you master the fundamentals of React development. You'll learn industry best practices and build real-world skills.
              </p>

              {/* Lesson Navigation */}
              <div className={`flex items-center justify-between pt-4 border-t-2 ${isDark ? "border-gray-700" : "border-gray-200"}`}>
                <div className={`text-sm ${isDark ? "text-gray-400 bg-gray-700/50" : "text-gray-600 bg-gray-100"} px-4 py-2 rounded-full font-medium`}>
                  Lesson {selectedVideo + 1} of {videos.length}
                </div>
                <div className="flex items-center space-x-4">
                  {selectedVideo > 0 && (
                    <button
                      onClick={() => setSelectedVideo(selectedVideo - 1)}
                      className={`${isDark ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"} text-gray-700 px-6 py-2 rounded-lg font-medium transition-all duration-300`}
                    >
                      ← Previous
                    </button>
                  )}
                  {selectedVideo < videos.length - 1 && (
                    <button
                      onClick={() => setSelectedVideo(selectedVideo + 1)}
                      className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300"
                    >
                      Next →
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Course Content Sidebar - 1/3 width */}
          <div className="xl:w-1/3">
            <div className={`${isDark ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"} rounded-2xl shadow-lg border-2 p-6 sticky top-8 backdrop-blur-sm`}>
              <h2 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-6 flex items-center`}>
                <span className="text-2xl mr-3">📋</span>
                Course Content
              </h2>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {videos.map((video, index) => (
                  <div
                    key={video.id}
                    className={`p-4 rounded-xl cursor-pointer transition-all duration-300 border-2 ${
                      selectedVideo === index
                        ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg scale-105 border-transparent"
                        : isDark
                        ? "hover:bg-gray-700/50 border-gray-600 hover:border-blue-400"
                        : "hover:bg-gray-50 border-gray-200 hover:border-blue-200"
                    }`}
                    onClick={() => setSelectedVideo(index)}
                  >
                    <div className="flex items-center">
                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold ${
                          progress[video.id] === 100
                            ? "bg-emerald-500 text-white"
                            : selectedVideo === index
                            ? "bg-white text-blue-600"
                            : isDark
                            ? "bg-gray-600 text-gray-300"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {progress[video.id] === 100 ? "✓" : index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className={`font-medium text-sm truncate ${
                            selectedVideo === index
                              ? "text-white"
                              : isDark
                              ? "text-white"
                              : "text-gray-900"
                          }`}
                        >
                          {video.title}
                        </p>
                        <p
                          className={`text-xs ${
                            selectedVideo === index
                              ? "text-blue-100"
                              : isDark
                              ? "text-gray-400"
                              : "text-gray-500"
                          }`}
                        >
                          ⏱️ {video.duration}
                        </p>
                      </div>
                      {selectedVideo === index && (
                        <div className="text-xl ml-2">▶️</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress Summary */}
              <div className={`mt-6 pt-4 border-t-2 ${isDark ? "border-gray-700" : "border-gray-200"}`}>
                <div className="text-center">
                  <div className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-2`}>
                    {Object.values(progress).filter(p => p === 100).length} / {videos.length}
                  </div>
                  <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"} mb-4`}>
                    Lessons Completed
                  </div>
                  
                  <div className={`w-full ${isDark ? "bg-gray-700" : "bg-gray-200"} rounded-full h-2`}>
                    <div
                      className={`h-2 bg-gradient-to-r ${getProgressColor()} rounded-full transition-all duration-700`}
                      style={{ width: `${calculateCourseProgress()}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Video Player Component
const EnhancedVideoPlayer = ({
  url,
  videoTitle = "Introduction to React",
  onProgress,
  onVideoEnd,
  isCompleted,
  onToggleComplete,
  onNextVideo,
  nextVideoTitle,
  hasNextVideo = false,
  autoplayEnabled = false,
  onToggleAutoplay,
}) => {
  const { isDark } = useContext(ThemeContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [played, setPlayed] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [quality, setQuality] = useState("Auto");
  const [showCompletionAnimation, setShowCompletionAnimation] = useState(false);
  const [showAutoplayCountdown, setShowAutoplayCountdown] = useState(false);
  const [hasAutoCompleted, setHasAutoCompleted] = useState(false);
  const [isNearEnd, setIsNearEnd] = useState(false);
  const playerRef = useRef(null);

  const handleProgress = (progress) => {
    setCurrentTime(progress.playedSeconds);
    setPlayed(progress.played);
    if (onProgress) onProgress(progress);

    // Mark as near end when 20 seconds left
    if (
      duration > 0 &&
      duration - progress.playedSeconds <= 20 &&
      !isCompleted &&
      !hasAutoCompleted
    ) {
      if (!isNearEnd) {
        setIsNearEnd(true);
        setHasAutoCompleted(true);
        if (onVideoEnd) onVideoEnd();
      }
    }
  };

  const handleVideoEnded = () => {
    if (!showCompletionAnimation) {
      setShowCompletionAnimation(true);
    }
  };

  const handleCompletionAnimationClose = () => {
    setShowCompletionAnimation(false);
    if (autoplayEnabled && hasNextVideo && onNextVideo) {
      setShowAutoplayCountdown(true);
    }
  };

  const handleAutoplayNext = () => {
    setShowAutoplayCountdown(false);
    if (onNextVideo) {
      onNextVideo();
    }
  };

  const handleManualToggle = () => {
    if (onToggleComplete) onToggleComplete();
    if (!isCompleted) {
      setShowCompletionAnimation(true);
    }
  };

  const handleSeek = (percentage) => {
    if (playerRef.current) {
      playerRef.current.seekTo(percentage);
    }
    setPlayed(percentage);
  };

  const handleFullscreen = () => {
    if (playerRef.current) {
      const element = playerRef.current.wrapper;
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    }
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <>
      <div className={`${isDark ? "bg-gray-800/50" : "bg-white"} rounded-2xl shadow-xl overflow-hidden border-2 ${isDark ? "border-gray-700" : "border-gray-200"} backdrop-blur-sm`}>
        {/* Professional header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
              <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
              <span className="text-white font-medium ml-3">Video Player</span>
            </div>

            {hasNextVideo && (
              <div className="flex items-center space-x-3">
                <span className="text-white text-sm font-medium">Autoplay</span>
                <button
                  onClick={onToggleAutoplay}
                  className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                    autoplayEnabled ? "bg-emerald-500" : "bg-gray-400"
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200 ${
                      autoplayEnabled ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Video container - Larger size */}
        <div className="relative group" style={{ aspectRatio: "16/9", minHeight: "600px" }}>
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black">
            <ReactPlayer
              ref={playerRef}
              url={url}
              controls={false}
              width="100%"
              height="100%"
              playing={isPlaying}
              volume={volume}
              onProgress={handleProgress}
              onDuration={setDuration}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={handleVideoEnded}
              style={{ position: "absolute", top: 0, left: 0 }}
            />

            {/* Custom Controls Overlay */}
            <CustomVideoControls
              playing={isPlaying}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              played={played}
              duration={duration}
              onSeek={handleSeek}
              volume={volume}
              onVolumeChange={setVolume}
              quality={quality}
              onQualityChange={setQuality}
              isDark={isDark}
              onFullscreen={handleFullscreen}
            />
          </div>

          {/* Status indicators */}
          {isCompleted && (
            <div className="absolute top-4 right-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2 shadow-lg">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Completed</span>
            </div>
          )}

          {isNearEnd && !isCompleted && (
            <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2 shadow-lg">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span>Almost done!</span>
            </div>
          )}
        </div>

        {/* Professional video controls */}
        <div className={`p-6 ${isDark ? "bg-gray-800/50" : "bg-gray-50"}`}>
          {/* Progress indicator */}
          <div className="mb-6">
            <div className={`flex items-center justify-between text-sm ${isDark ? "text-gray-300" : "text-gray-600"} mb-3`}>
              <span className="font-medium">Progress</span>
              <span className={`${isDark ? "bg-gray-700 text-gray-200" : "bg-gray-200"} px-3 py-1 rounded-full font-mono text-xs`}>
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
            <div className={`w-full ${isDark ? "bg-gray-700" : "bg-gray-300"} rounded-full h-2 shadow-inner`}>
              <div
                className="h-2 rounded-full transition-all duration-500 shadow-sm bg-gradient-to-r from-blue-500 to-blue-600"
                style={{
                  width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`,
                }}
              />
            </div>
          </div>

          {/* Video title and completion */}
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className={`font-bold text-lg ${isDark ? "text-white" : "text-gray-900"} mb-2`}>
                {videoTitle}
              </h3>
              <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"} flex items-center space-x-2`}>
                <span className={`w-2 h-2 rounded-full ${isCompleted ? "bg-emerald-500" : "bg-amber-500"}`}></span>
                <span>
                  {isCompleted ? "✅ Lesson completed" : "📚 Mark as complete when finished"}
                </span>
              </p>
            </div>

            <div className="ml-6">
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={isCompleted}
                  onChange={handleManualToggle}
                  className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500 transition-all duration-200"
                />
                <span className={`text-sm font-medium ${isDark ? "text-gray-300 group-hover:text-white" : "text-gray-700 group-hover:text-gray-900"} transition-colors`}>
                  Mark Complete
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Completion Animation */}
      <AdvancedCompletionAnimation
        isVisible={showCompletionAnimation}
        onClose={handleCompletionAnimationClose}
        title="🎉 Lesson Complete!"
        subtitle="Great work! You've successfully completed this lesson."
        type="lesson"
      />

      {/* Autoplay Countdown */}
      <AutoplayCountdown
        isVisible={showAutoplayCountdown}
        onClose={() => setShowAutoplayCountdown(false)}
        onNext={handleAutoplayNext}
        nextVideoTitle={nextVideoTitle}
        duration={5}
      />
    </>
  );
};