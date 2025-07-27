import React, { useState, useEffect, useRef, createContext, useContext } from "react";
    import ReactPlayer from "react-player";
    import {
      BrowserRouter as Router,
      Routes,
      Route,
      Navigate,
      Link,
      useNavigate,
    } from "react-router-dom";

// Chat Message Component (from File A)
const ChatMessage = ({ message, isDark }) => {
      const isCurrentUser = message.userId === "current-user"; // This would be dynamic in a real app
    
      return (
        <div
          className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} mb-4`}
        >
          <div
            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
              isCurrentUser
                ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white"
                : isDark
                ? "bg-gray-700 text-gray-100"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {!isCurrentUser && (
              <div
                className={`text-xs font-semibold mb-1 ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {message.username}
              </div>
            )}
            <div className="text-sm">{message.text}</div>
            <div
              className={`text-xs mt-1 ${
                isCurrentUser
                  ? "text-purple-200"
                  : isDark
                  ? "text-gray-500"
                  : "text-gray-500"
              }`}
            >
              {message.timestamp}
            </div>
          </div>
        </div>
      );
    };
    
    // Groups/Chat Hub Page (keeping File A's styling)
    const GroupsPage = () => {
      const { isDark } = useContext(ThemeContext);
      const [selectedRoom, setSelectedRoom] = useState(null);
      const [messages, setMessages] = useState({
        "react-fundamentals": [
          {
            id: 1,
            userId: "user1",
            username: "Sarah_Dev",
            text: "Hey everyone! Just started the React hooks lesson. Anyone else finding useState confusing?",
            timestamp: "2:30 PM",
          },
          {
            id: 2,
            userId: "current-user",
            username: "You",
            text: "I had the same issue! The key is understanding that useState returns an array with the current state and a setter function.",
            timestamp: "2:32 PM",
          },
          {
            id: 3,
            userId: "user2",
            username: "CodeMaster99",
            text: "Great explanation! Also remember that state updates are asynchronous, so you can't immediately console.log the new state after calling the setter.",
            timestamp: "2:35 PM",
          },
        ],
        "javascript-advanced": [
          {
            id: 1,
            userId: "user3",
            username: "JS_Ninja",
            text: "Can someone explain closures one more time? I'm still confused about variable scope.",
            timestamp: "1:15 PM",
          },
          {
            id: 2,
            userId: "user4",
            username: "WebDev_Pro",
            text: "Think of closures as functions that remember variables from their outer scope even after the outer function has returned!",
            timestamp: "1:18 PM",
          },
        ],
        "python-data-science": [
          {
            id: 1,
            userId: "user5",
            username: "DataGuru",
            text: "Working through the pandas tutorial. These DataFrames are so powerful!",
            timestamp: "3:45 PM",
          },
          {
            id: 2,
            userId: "current-user",
            username: "You",
            text: "Agreed! Wait until you get to the visualization part with matplotlib. Mind-blowing stuff!",
            timestamp: "3:47 PM",
          },
        ],
      });
      const [newMessage, setNewMessage] = useState("");
    
      const chatRooms = [
        {
          id: "react-fundamentals",
          name: "React Fundamentals",
          description: "Discuss React basics, components, props, and state",
          members: 156,
          icon: "⚛️",
          color: "from-blue-500 to-cyan-500",
          bgColor: isDark ? "bg-gray-800" : "bg-blue-50",
        },
        {
          id: "javascript-advanced",
          name: "Advanced JavaScript",
          description: "Deep dive into closures, async/await, and ES6+ features",
          members: 98,
          icon: "🟨",
          color: "from-yellow-500 to-orange-500",
          bgColor: isDark ? "bg-gray-800" : "bg-yellow-50",
        },
        {
          id: "python-data-science",
          name: "Python for Data Science",
          description: "Data analysis, pandas, numpy, and machine learning",
          members: 203,
          icon: "🐍",
          color: "from-green-500 to-emerald-500",
          bgColor: isDark ? "bg-gray-800" : "bg-green-50",
        },
        {
          id: "ui-ux-design",
          name: "UI/UX Design",
          description: "Design principles, user experience, and modern tools",
          members: 87,
          icon: "🎨",
          color: "from-pink-500 to-rose-500",
          bgColor: isDark ? "bg-gray-800" : "bg-pink-50",
        },
        {
          id: "web-development",
          name: "Web Development",
          description: "Full-stack development, APIs, and best practices",
          members: 245,
          icon: "🌐",
          color: "from-purple-500 to-indigo-500",
          bgColor: isDark ? "bg-gray-800" : "bg-purple-50",
        },
        {
          id: "mobile-development",
          name: "Mobile Development",
          description: "React Native, Flutter, and native app development",
          members: 134,
          icon: "📱",
          color: "from-indigo-500 to-blue-500",
          bgColor: isDark ? "bg-gray-800" : "bg-indigo-50",
        },
      ];
    
      const sendMessage = () => {
        if (newMessage.trim() && selectedRoom) {
          const message = {
            id: Date.now(),
            userId: "current-user",
            username: "You",
            text: newMessage.trim(),
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };
    
          setMessages((prev) => ({
            ...prev,
            [selectedRoom]: [...(prev[selectedRoom] || []), message],
          }));
    
          setNewMessage("");
        }
      };
    
      if (selectedRoom) {
        const room = chatRooms.find((r) => r.id === selectedRoom);
        const roomMessages = messages[selectedRoom] || [];
    
        return (
          <
            className={`min-h-screen ${
              isDark ? "bg-gray-900" : "bg-gradient-to-br from-gray-50 to-gray-100"
            }`}
          >
            < className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {/* Chat Header */}
              <
                className={`${
                  isDark
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                } rounded-3xl shadow-xl border-2 p-6 mb-6`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setSelectedRoom(null)}
                      className={`${
                        isDark
                          ? "text-gray-400 hover:text-white hover:bg-gray-700"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      } p-2 rounded-full transition-colors`}
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <div
                      className={`text-4xl mr-4 p-3 rounded-2xl bg-gradient-to-r ${room.color}`}
                    >
                      {room.icon}
                    </div>
                    <div>
                      <h1
                        className={`text-3xl font-black ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {room.name}
                      </h1>
                      <p
                        className={`${
                          isDark ? "text-gray-400" : "text-gray-600"
                        } flex items-center space-x-2`}
                      >
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <span>{room.members} members online</span>
                      </p>
                    </div>
                  </div>
    //Enhanced Course Page with all new features and File A's styling
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
        if (progressPercent < 30) return "from-yellow-400 to-yellow-500";
        if (progressPercent < 60) return "from-yellow-500 to-orange-500";
        if (progressPercent < 80) return "from-orange-500 to-green-500";
        return "from-green-500 to-emerald-500";
      };
    
      const hasNextVideo = selectedVideo < videos.length - 1;
      const nextVideoTitle = hasNextVideo ? videos[selectedVideo + 1].title : "";
    
      return (
        <div
          className={`min-h-screen ${
            isDark ? "bg-gray-900" : "bg-gradient-to-br from-gray-50 to-gray-100"
          } transition-colors duration-300`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Enhanced Course Header */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl shadow-2xl p-8 mb-8 text-white relative overflow-hidden">
              <div className="absolute top-4 right-4 text-4xl opacity-20">🚀</div>
              <div className="absolute bottom-4 left-4 text-3xl opacity-20">⭐</div>
    
              <h1 className="text-4xl md:text-5xl font-black mb-6">
                🎯 React Fundamentals
              </h1>
              <div className="flex items-center text-purple-100 space-x-6 mb-8 flex-wrap">
                <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full font-bold">
                  👨‍🏫 John Smith
                </span>
                <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full font-bold">
                  📚 6 lessons
                </span>
                <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full font-bold">
                  ⏰ 2h 15m
                </span>
              </div>
    
              <div className="bg-white bg-opacity-20 rounded-2xl p-6 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-black">🏆 Course Progress:</span>
                  <span className="text-2xl font-black text-yellow-300">
                    {calculateCourseProgress()}%
                  </span>
                </div>
                <div className="w-full bg-white bg-opacity-30 rounded-full h-4 shadow-inner">
                  <div
                    className={`h-4 bg-gradient-to-r ${getProgressColor()} rounded-full transition-all duration-700 shadow-lg relative overflow-hidden`}
                    style={{ width: `${calculateCourseProgress()}%` }}
                  >
                    <div className="absolute inset-0 bg-white opacity-30 animate-pulse"></div>
                  </div>
                </div>
              </div>
    
              {/* Chat Messages */}
              <div
                className={`${
                  isDark
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                } rounded-3xl shadow-xl border-2 overflow-hidden`}
              >
                <div className="h-96 overflow-y-auto p-6">
                  {roomMessages.map((message) => (
                    <ChatMessage
                      key={message.id}
                      message={message}
                      isDark={isDark}
                    />
                  ))}
                </div>
    
                {/* Message Input */}
                <div
                  className={`p-4 ${
                    isDark
                      ? "border-gray-700 bg-gray-700"
                      : "border-gray-200 bg-gray-50"
                  } border-t`}
                >
                  <div className="flex space-x-4">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                      placeholder="Type your message..."
                      className={`flex-1 px-4 py-3 ${
                        isDark
                          ? "bg-gray-600 border-gray-500 text-white placeholder-gray-400"
                          : "bg-white border-gray-300 text-gray-900"
                      } border-2 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-500 focus:border-transparent transition-all duration-200 font-medium`}
                    />
                    <button
                      onClick={sendMessage}
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    
      return (
        <div
          className={`min-h-screen ${
            isDark ? "bg-gray-900" : "bg-gradient-to-br from-gray-50 to-gray-100"
          } py-16`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="text-5xl mb-6">💬</div>
              <h1
                className={`text-4xl md:text-6xl font-black ${
                  isDark ? "text-white" : "text-gray-900"
                } mb-6`}
              >
                Study <span className="text-purple-600">Groups</span>
              </h1>
              <p
                className={`${
                  isDark ? "text-gray-300" : "text-gray-600"
                } text-xl leading-relaxed max-w-3xl mx-auto`}
              >
                🚀 Connect with fellow learners, ask questions, and share knowledge
                in our vibrant community chat rooms
              </p>
            </div>
    
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {chatRooms.map((room) => (
                <div
                  key={room.id}
                  onClick={() => setSelectedRoom(room.id)}
                  className={`${room.bgColor} rounded-3xl shadow-xl border-2 ${
                    isDark ? "border-gray-700" : "border-gray-100"
                  } overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 hover:scale-105 cursor-pointer group`}
                >
                  <div
                    className={`h-40 bg-gradient-to-r ${room.color} flex items-center justify-center relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-white opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <div className="text-6xl group-hover:scale-125 transition-transform duration-300 relative z-10">
                      {room.icon}
                    </div>
                  </div>
    
                  <div className="p-8">
                    <h3
                      className={`text-2xl font-black ${
                        isDark ? "text-white" : "text-gray-900"
                      } mb-4`}
                    >
                      {room.name}
                    </h3>
                    <p
                      className={`${
                        isDark ? "text-gray-300" : "text-gray-700"
                      } mb-6 leading-relaxed font-medium`}
                    >
                      {room.description}
                    </p>
    
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-sm ${
                          isDark
                            ? "text-gray-400 bg-gray-700"
                            : "text-gray-600 bg-white"
                        } px-4 py-2 rounded-full font-bold shadow-sm flex items-center space-x-2`}
                      >
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <span>👥 {room.members} online</span>
                      </span>
                      <span
                        className={`text-purple-600 font-black text-lg group-hover:text-purple-800 transition-colors`}
                      >
                        Join Chat →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    };
    
    // Enhanced Home Page (keeping File A's complete design)
    const HomePage = () => {
      const { isDark } = useContext(ThemeContext);
    
      return (
        <div
          className={`min-h-screen ${
            isDark
              ? "bg-gray-900"
              : "bg-gradient-to-br from-purple-50 via-white to-indigo-50"
          } transition-colors duration-300`}
        >
          {/* Enhanced Hero Section */}
          <div className="bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0">
              <div
                className="absolute top-10 left-10 w-20 h-20 bg-white opacity-10 rounded-full animate-bounce"
                style={{ animationDelay: "0s" }}
              ></div>
              <div
                className="absolute top-20 right-20 w-16 h-16 bg-yellow-300 opacity-20 rounded-full animate-bounce"
                style={{ animationDelay: "1s" }}
              ></div>
              <div
                className="absolute bottom-20 left-20 w-24 h-24 bg-pink-300 opacity-15 rounded-full animate-bounce"
                style={{ animationDelay: "2s" }}
              ></div>
              <div
                className="absolute bottom-10 right-10 w-12 h-12 bg-green-300 opacity-25 rounded-full animate-bounce"
                style={{ animationDelay: "1.5s" }}
              ></div>
            </div>
    
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
              <div className="text-center">
                <div className="mb-8">
                  <span className="text-6xl animate-bounce">🚀</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight">
                  Learn anything, <br />
                  <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent animate-pulse">
                    anytime
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-purple-100 mb-12 max-w-4xl mx-auto leading-relaxed">
                  🎯 Master new skills with our comprehensive online courses. Join
                  thousands of learners advancing their careers through quality
                  education.
                </p>
    
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Link
                    to="/categories"
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white px-10 py-5 rounded-2xl text-xl font-black transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-1"
                  >
                    🌟 Explore Courses
                  </Link>
                  <Link
                    to="/dashboard"
                    className="border-3 border-white text-white hover:bg-white hover:text-purple-700 px-10 py-5 rounded-2xl text-xl font-black transition-all duration-300 shadow-xl transform hover:scale-105"
                  >
                    📈 View Dashboard
                  </Link>
                </div>
              </div>
            </div>
          </div>
    
          {/* Enhanced Features Section */}
          <div
            className={`py-24 ${
              isDark ? "bg-gray-800" : "bg-gradient-to-r from-gray-50 to-gray-100"
            } transition-colors duration-300`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-20">
                <div className="text-5xl mb-6">✨</div>
                <h2
                  className={`text-4xl md:text-5xl font-black ${
                    isDark ? "text-white" : "text-gray-900"
                  } mb-6`}
                >
                  Why Choose <span className="text-purple-600">EduLearn</span>?
                </h2>
                <p
                  className={`text-xl ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  } max-w-3xl mx-auto leading-relaxed`}
                >
                  Professional courses designed to help you succeed in your career
                  🚀
                </p>
              </div>
    
              <div className="grid md:grid-cols-3 gap-10">
                {[
                  {
                    title: "Expert Instructors",
                    description:
                      "Learn from industry professionals with years of experience",
                    icon: "👨‍🏫",
                    color: "from-blue-500 to-cyan-500",
                    bgColor: isDark ? "bg-gray-700" : "bg-blue-50",
                  },
                  {
                    title: "Interactive Learning",
                    description: "Hands-on projects and real-world applications",
                    icon: "💻",
                    color: "from-purple-500 to-pink-500",
                    bgColor: isDark ? "bg-gray-700" : "bg-purple-50",
                  },
                  {
                    title: "Certificates",
                    description:
                      "Earn recognized certificates upon course completion",
                    icon: "🏆",
                    color: "from-yellow-500 to-orange-500",
                    bgColor: isDark ? "bg-gray-700" : "bg-yellow-50",
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className={`${
                      feature.bgColor
                    } p-10 rounded-3xl shadow-xl border-2 ${
                      isDark ? "border-gray-600" : "border-white"
                    } hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 group`}
                  >
                    <div className={`text-6xl mb-6 group-hover:animate-bounce`}>
                      {feature.icon}
                    </div>
                    <h3
                      className={`text-2xl font-black ${
                        isDark ? "text-white" : "text-gray-900"
                      } mb-6`}
                    >
                      {feature.title}
                    </h3>
                    <p
                      className={`${
                        isDark ? "text-gray-300" : "text-gray-700"
                      } leading-relaxed text-lg font-medium`}
                    >
                      {feature.description}
                    </p>
                    <div
                      className={`w-full h-2 bg-gradient-to-r ${feature.color} rounded-full mt-6 opacity-50 group-hover:opacity-100 transition-opacity duration-300`}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
    
          {/* Statistics Section */}
          <div
            className={`py-24 ${
              isDark ? "bg-gray-900" : "bg-white"
            } transition-colors duration-300`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2
                  className={`text-4xl md:text-5xl font-black ${
                    isDark ? "text-white" : "text-gray-900"
                  } mb-6`}
                >
                  Join Our <span className="text-purple-600">Community</span>
                </h2>
              </div>
    
              <div className="grid md:grid-cols-4 gap-8">
                {[
                  { number: "50,000+", label: "Students", icon: "👥" },
                  { number: "200+", label: "Courses", icon: "📚" },
                  { number: "500+", label: "Hours of Content", icon: "⏰" },
                  { number: "98%", label: "Success Rate", icon: "🎯" },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className={`text-center p-8 rounded-3xl ${
                      isDark
                        ? "bg-gray-800 border-gray-700"
                        : "bg-gray-50 border-gray-200"
                    } border-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
                  >
                    <div className="text-5xl mb-4">{stat.icon}</div>
                    <div className="text-3xl font-black text-purple-600 mb-2">
                      {stat.number}
                    </div>
                    <div
                      className={`text-lg font-semibold ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
    
          {/* Testimonials Section */}
          <div
            className={`py-24 ${
              isDark
                ? "bg-gray-800"
                : "bg-gradient-to-r from-purple-50 to-indigo-50"
            } transition-colors duration-300`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2
                  className={`text-4xl md:text-5xl font-black ${
                    isDark ? "text-white" : "text-gray-900"
                  } mb-6`}
                >
                  What Our <span className="text-purple-600">Students Say</span>
                </h2>
              </div>
    
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    name: "Sarah Johnson",
                    role: "Frontend Developer",
                    content:
                      "EduLearn transformed my career! The React course was incredibly detailed and practical.",
                    avatar: "👩‍💻",
                  },
                  {
                    name: "Mike Chen",
                    role: "Data Scientist",
                    content:
                      "The Python data science track gave me all the skills I needed to land my dream job.",
                    avatar: "👨‍🔬",
                  },
                  {
                    name: "Emily Davis",
                    role: "UI/UX Designer",
                    content:
                      "Amazing community and expert instructors. The design course exceeded my expectations!",
                    avatar: "👩‍🎨",
                  },
                ].map((testimonial, index) => (
                  <div
                    key={index}
                    className={`${
                      isDark
                        ? "bg-gray-700 border-gray-600"
                        : "bg-white border-gray-200"
                    } p-8 rounded-3xl shadow-xl border-2 hover:shadow-2xl transition-all duration-300 transform hover:scale-105`}
                  >
                    <div className="text-5xl mb-4 text-center">
                      {testimonial.avatar}
                    </div>
                    <p
                      className={`${
                        isDark ? "text-gray-300" : "text-gray-700"
                      } text-lg leading-relaxed mb-6 italic`}
                    >
                      "{testimonial.content}"
                    </p>
                    <div className="text-center">
                      <div
                        className={`font-black text-lg ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {testimonial.name}
                      </div>
                      <div className="text-purple-600 font-semibold">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
    
          {/* Call to Action Section */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                Ready to Start Learning?
              </h2>
              <p className="text-xl text-purple-100 mb-10 max-w-3xl mx-auto">
                Join thousands of students who are already advancing their careers
                with EduLearn
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white px-10 py-5 rounded-2xl text-xl font-black transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105"
                >
                  🚀 Get Started Free
                </Link>
                <Link
                  to="/categories"
                  className="border-3 border-white text-white hover:bg-white hover:text-purple-700 px-10 py-5 rounded-2xl text-xl font-black transition-all duration-300 shadow-xl transform hover:scale-105"
                >
                  📚 Browse Courses
                </Link>
              </div>
            </div>
          </div>
    
          {/* Enhanced Footer */}
          <footer
            className={`${
              isDark ? "bg-gray-900 border-gray-700" : "bg-gray-800"
            } text-white py-16 transition-colors duration-300`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-4 gap-12">
                {/* Company Info */}
                <div className="col-span-1">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg p-2 mr-3">
                      <span className="text-white text-xl">🚀</span>
                    </div>
                    <span className="text-2xl font-bold">EduLearn</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    Empowering learners worldwide with quality education and
                    practical skills for the modern world.
                  </p>
                  <div className="flex space-x-4">
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors text-2xl"
                    >
                      📘
                    </a>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors text-2xl"
                    >
                      🐦
                    </a>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors text-2xl"
                    >
                      💼
                    </a>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors text-2xl"
                    >
                      📷
                    </a>
                  </div>
                </div>
    
                {/* Courses */}
                <div>
                  <h3 className="text-xl font-bold mb-6">Popular Courses</h3>
                  <ul className="space-y-3">
                    <li>
                      <Link
                        to="/categories"
                        className="text-gray-300 hover:text-white transition-colors"
                      >
                        React Fundamentals
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/categories"
                        className="text-gray-300 hover:text-white transition-colors"
                      >
                        Python for Data Science
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/categories"
                        className="text-gray-300 hover:text-white transition-colors"
                      >
                        JavaScript Advanced
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/categories"
                        className="text-gray-300 hover:text-white transition-colors"
                      >
                        UI/UX Design
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/categories"
                        className="text-gray-300 hover:text-white transition-colors"
                      >
                        Machine Learning
                      </Link>
                    </li>
                  </ul>
                </div>
    
                {/* Company */}
                <div>
                  <h3 className="text-xl font-bold mb-6">Company</h3>
                  <ul className="space-y-3">
                    <li>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-white transition-colors"
                      >
                        About Us
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-white transition-colors"
                      >
                        Careers
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-white transition-colors"
                      >
                        Press
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-white transition-colors"
                      >
                        Blog
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-white transition-colors"
                      >
                        Contact
                      </a>
                    </li>
                  </ul>
                </div>
    
                {/* Support */}
                <div>
                  <h3 className="text-xl font-bold mb-6">Support</h3>
                  <ul className="space-y-3">
                    <li>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-white transition-colors"
                      >
                        Help Center
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-white transition-colors"
                      >
                        Terms of Service
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-white transition-colors"
                      >
                        Privacy Policy
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-white transition-colors"
                      >
                        Cookie Policy
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-white transition-colors"
                      >
                        Community Guidelines
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
    
              <div className="border-t border-gray-700 mt-12 pt-8 text-center">
                <p className="text-gray-400">
                  © 2024 EduLearn. All rights reserved. Made with ❤️ for learners
                  worldwide.
                </p>
              </div>
            </div>
          </footer>
        </div>
      );
    };
    
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
    
    export default App;
            </div>
    
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Enhanced Course Content Sidebar */}
              <div className="w-full lg:w-1/3">
                <div
                  className={`${
                    isDark
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-100"
                  } rounded-3xl shadow-xl border-2 p-8 sticky top-8`}
                >
                  <h2
                    className={`text-2xl font-black ${
                      isDark ? "text-white" : "text-gray-900"
                    } mb-8 flex items-center`}
                  >
                    <span className="text-3xl mr-3">📋</span>
                    Course Content
                  </h2>
                  <div className="space-y-3">
                    {videos.map((video, index) => (
                      <div
                        key={video.id}
                        className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 border-2 ${
                          selectedVideo === index
                            ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg scale-105 border-transparent"
                            : isDark
                            ? "hover:bg-gray-700 border-gray-600 hover:border-purple-400 hover:shadow-md"
                            : "hover:bg-gray-50 border-gray-200 hover:border-purple-200 hover:shadow-md"
                        }`}
                        onClick={() => setSelectedVideo(index)}
                      >
                        <div className="flex items-center">
                          <div
                            className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-4 text-sm font-black shadow-md ${
                              progress[video.id] === 100
                                ? "bg-green-500 text-white"
                                : selectedVideo === index
                                ? "bg-white text-purple-600"
                                : isDark
                                ? "bg-gray-600 text-gray-300"
                                : "bg-gray-200 text-gray-600"
                            }`}
                          >
                            {progress[video.id] === 100 ? "✓" : index + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p
                              className={`font-bold text-sm truncate ${
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
                                  ? "text-purple-100"
                                  : isDark
                                  ? "text-gray-400"
                                  : "text-gray-500"
                              }`}
                            >
                              ⏰ {video.duration}
                            </p>
                          </div>
                          {selectedVideo === index && (
                            <div className="text-2xl ml-2 animate-pulse">🎬</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
    
              {/* Enhanced Video Player Section */}
              <div className="w-full lg:w-2/3">
                <EnhancedVideoPlayer
                  url={videos[selectedVideo].url}
                  videoTitle={videos[selectedVideo].title}
                  onProgress={() => {}}
                  onVideoEnd={() => handleVideoComplete(videos[selectedVideo].id)}
                  isCompleted={progress[videos[selectedVideo].id] === 100}
                  onToggleComplete={() =>
                    handleToggleComplete(videos[selectedVideo].id)
                  }
                  onNextVideo={handleNextVideo}
                  nextVideoTitle={nextVideoTitle}
                  hasNextVideo={hasNextVideo}
                  autoplayEnabled={autoplayEnabled}
                  onToggleAutoplay={() => setAutoplayEnabled(!autoplayEnabled)}
                />
    
                {/* Enhanced Lesson Description */}
                <div
                  className={`${
                    isDark
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-100"
                  } rounded-3xl shadow-xl border-2 p-8 mt-8`}
                >
                  <div className="flex items-center mb-6">
                    <span className="text-4xl mr-4">📖</span>
                    <h2
                      className={`text-3xl font-black ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {videos[selectedVideo].title}
                    </h2>
                  </div>
                  <p
                    className={`${
                      isDark ? "text-gray-300" : "text-gray-700"
                    } leading-relaxed text-lg mb-8`}
                  >
                    🎯 This lesson covers essential concepts and practical examples
                    to help you master the fundamentals of React development. You'll
                    learn industry best practices and build real-world skills that
                    employers value.
                  </p>
    
                  {/* Lesson Navigation */}
                  <div
                    className={`flex items-center justify-between pt-6 border-t-2 ${
                      isDark ? "border-gray-700" : "border-gray-100"
                    }`}
                  >
                    <div
                      className={`text-sm ${
                        isDark
                          ? "text-gray-400 bg-gray-700"
                          : "text-gray-600 bg-gray-100"
                      } px-4 py-2 rounded-full font-bold`}
                    >
                      📚 Lesson {selectedVideo + 1} of {videos.length}
                    </div>
                    <div className="flex items-center space-x-4">
                      {selectedVideo > 0 && (
                        <button
                          onClick={() => setSelectedVideo(selectedVideo - 1)}
                          className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                          ← Previous
                        </button>
                      )}
                      {selectedVideo < videos.length - 1 && (
                        <button
                          onClick={() => setSelectedVideo(selectedVideo + 1)}
                          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                          Next →
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };
    
    // Enhanced Dashboard Page (keeping File A's styling)
    const DashboardPage = () => {
      const { isDark } = useContext(ThemeContext);
      const [enrolledCourses] = useState([
        {
          id: 1,
          title: "React Fundamentals",
          instructor: "John Smith",
          progress: 75,
          totalLessons: 24,
          completedLessons: 18,
          color: "from-blue-500 to-cyan-500",
          icon: "⚛️",
        },
        {
          id: 2,
          title: "Advanced JavaScript",
          instructor: "Sarah Johnson",
          progress: 40,
          totalLessons: 32,
          completedLessons: 13,
          color: "from-yellow-500 to-orange-500",
          icon: "🟨",
        },
        {
          id: 3,
          title: "Python for Data Science",
          instructor: "Michael Chen",
          progress: 20,
          totalLessons: 28,
          completedLessons: 6,
          color: "from-green-500 to-emerald-500",
          icon: "🐍",
        },
      ]);
    
      const getProgressColor = (progress) => {
        if (progress < 30) return "from-yellow-400 to-yellow-500";
        if (progress < 60) return "from-yellow-500 to-orange-500";
        if (progress < 80) return "from-orange-500 to-green-500";
        return "from-green-500 to-emerald-500";
      };
    
      return (
        <div
          className={`min-h-screen ${
            isDark ? "bg-gray-900" : "bg-gradient-to-br from-purple-50 to-indigo-50"
          } py-16 transition-colors duration-300`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <div className="text-6xl mb-6">📊</div>
              <h1
                className={`text-4xl md:text-6xl font-black ${
                  isDark ? "text-white" : "text-gray-900"
                } mb-6`}
              >
                My Learning <span className="text-purple-600">Dashboard</span>
              </h1>
              <p
                className={`${
                  isDark ? "text-gray-300" : "text-gray-600"
                } text-xl leading-relaxed max-w-3xl mx-auto`}
              >
                🚀 Continue your learning journey and track your amazing progress!
              </p>
            </div>
    
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-3xl p-8 text-white shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">🎯</div>
                  <div className="text-right">
                    <div className="text-3xl font-black">3</div>
                    <div className="text-purple-100 font-semibold">
                      Active Courses
                    </div>
                  </div>
                </div>
              </div>
    
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-8 text-white shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">✅</div>
                  <div className="text-right">
                    <div className="text-3xl font-black">37</div>
                    <div className="text-green-100 font-semibold">
                      Lessons Completed
                    </div>
                  </div>
                </div>
              </div>
    
              <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-3xl p-8 text-white shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">🔥</div>
                  <div className="text-right">
                    <div className="text-3xl font-black">12</div>
                    <div className="text-orange-100 font-semibold">Day Streak</div>
                  </div>
                </div>
              </div>
            </div>
    
            {/* Enrolled Courses */}
            <div className="mb-16">
              <h2
                className={`text-3xl font-black ${
                  isDark ? "text-white" : "text-gray-900"
                } mb-10 flex items-center`}
              >
                <span className="text-4xl mr-4">📚</span>
                Continue Learning
              </h2>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {enrolledCourses.map((course) => (
                  <div
                    key={course.id}
                    className={`${
                      isDark
                        ? "bg-gray-800 border-gray-700"
                        : "bg-white border-gray-100"
                    } rounded-3xl shadow-xl border-2 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group`}
                  >
                    <div
                      className={`h-48 bg-gradient-to-r ${course.color} flex items-center justify-center relative overflow-hidden`}
                    >
                      <div className="absolute inset-0 bg-black opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
                      <div className="text-white text-center relative z-10">
                        <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                          {course.icon}
                        </div>
                        <div className="text-lg font-bold bg-white bg-opacity-20 px-4 py-2 rounded-full">
                          Course in Progress
                        </div>
                      </div>
                    </div>
    
                    <div className="p-8">
                      <h3
                        className={`text-xl font-black ${
                          isDark ? "text-white" : "text-gray-900"
                        } mb-2`}
                      >
                        {course.title}
                      </h3>
                      <p
                        className={`${
                          isDark ? "text-gray-400" : "text-gray-600"
                        } text-sm mb-6 font-semibold`}
                      >
                        👨‍🏫 by {course.instructor}
                      </p>
    
                      <div className="mb-6">
                        <div
                          className={`flex items-center justify-between text-sm font-black ${
                            isDark ? "text-gray-300" : "text-gray-700"
                          } mb-3`}
                        >
                          <span>Progress</span>
                          <span className="text-lg text-purple-600">
                            {course.progress}%
                          </span>
                        </div>
                        <div
                          className={`w-full ${
                            isDark ? "bg-gray-700" : "bg-gray-200"
                          } rounded-full h-3 shadow-inner`}
                        >
                          <div
                            className={`h-3 bg-gradient-to-r ${getProgressColor(
                              course.progress
                            )} rounded-full transition-all duration-700 shadow-sm relative overflow-hidden`}
                            style={{ width: `${course.progress}%` }}
                          >
                            <div className="absolute inset-0 bg-white opacity-30 animate-pulse"></div>
                          </div>
                        </div>
                        <p
                          className={`text-xs ${
                            isDark ? "text-gray-500" : "text-gray-500"
                          } mt-2 font-semibold`}
                        >
                          🎯 {course.completedLessons} of {course.totalLessons}{" "}
                          lessons completed
                        </p>
                      </div>
    
                      <Link
                        to={`/course/${course.id}`}
                        className={`w-full inline-flex items-center justify-center px-6 py-4 bg-gradient-to-r ${course.color} text-white font-black rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105`}
                      >
                        🚀 Continue Learning
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
    
            {/* Enhanced Recommendations */}
            <div>
              <h2
                className={`text-3xl font-black ${
                  isDark ? "text-white" : "text-gray-900"
                } mb-10 flex items-center`}
              >
                <span className="text-4xl mr-4">⭐</span>
                Recommended for You
              </h2>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div
                  className={`${
                    isDark
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-100"
                  } rounded-3xl shadow-xl border-2 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group`}
                >
                  <div className="h-48 bg-gradient-to-r from-pink-500 to-rose-600 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-black opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <div className="text-white text-center relative z-10">
                      <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                        🎨
                      </div>
                      <div className="text-lg font-bold bg-white bg-opacity-20 px-4 py-2 rounded-full">
                        New Course
                      </div>
                    </div>
                  </div>
    
                  <div className="p-8">
                    <h3
                      className={`text-xl font-black ${
                        isDark ? "text-white" : "text-gray-900"
                      } mb-2`}
                    >
                      UI/UX Design Basics
                    </h3>
                    <p
                      className={`${
                        isDark ? "text-gray-400" : "text-gray-600"
                      } text-sm mb-6 font-semibold`}
                    >
                      👩‍🏫 by Emily Davis
                    </p>
    
                    <div className="mb-6">
                      <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-sm font-black rounded-full shadow-lg">
                        ✨ New Course
                      </span>
                    </div>
    
                    <button className="w-full inline-flex items-center justify-center px-6 py-4 border-3 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white font-black rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                      🚀 Enroll Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };
    // Enhanced Categories Page (keeping File A's design)
    const CategoriesPage = () => {
      const { isDark } = useContext(ThemeContext);
    
      const categories = [
        {
          id: 1,
          name: "Programming",
          description:
            "Master coding languages: React, Python, JavaScript and more",
          courses: 24,
          icon: "💻",
          color: "from-purple-500 to-indigo-600",
          bgColor: isDark ? "bg-gray-800" : "bg-purple-50",
        },
        {
          id: 2,
          name: "Mathematics",
          description: "From basic algebra to advanced calculus and statistics",
          courses: 18,
          icon: "🔢",
          color: "from-blue-500 to-cyan-600",
          bgColor: isDark ? "bg-gray-800" : "bg-blue-50",
        },
        {
          id: 3,
          name: "Data Science",
          description: "Analytics, machine learning, and data visualization",
          courses: 15,
          icon: "📊",
          color: "from-green-500 to-emerald-600",
          bgColor: isDark ? "bg-gray-800" : "bg-green-50",
        },
        {
          id: 4,
          name: "Interview Prep",
          description: "Technical interviews and coding challenges",
          courses: 12,
          icon: "🎯",
          color: "from-orange-500 to-red-600",
          bgColor: isDark ? "bg-gray-800" : "bg-orange-50",
        },
        {
          id: 5,
          name: "Design",
          description: "UI/UX design principles and modern design tools",
          courses: 20,
          icon: "🎨",
          color: "from-pink-500 to-rose-600",
          bgColor: isDark ? "bg-gray-800" : "bg-pink-50",
        },
        {
          id: 6,
          name: "Business",
          description: "Entrepreneurship, marketing, and business strategy",
          courses: 16,
          icon: "💼",
          color: "from-indigo-500 to-purple-600",
          bgColor: isDark ? "bg-gray-800" : "bg-indigo-50",
        },
      ];
    
      return (
        <div
          className={`min-h-screen ${
            isDark ? "bg-gray-900" : "bg-gradient-to-br from-gray-50 to-gray-100"
          } py-16 transition-colors duration-300`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="text-5xl mb-6">📚</div>
              <h1
                className={`text-4xl md:text-6xl font-black ${
                  isDark ? "text-white" : "text-gray-900"
                } mb-6`}
              >
                Browse <span className="text-purple-600">Categories</span>
              </h1>
              <p
                className={`text-xl ${
                  isDark ? "text-gray-300" : "text-gray-600"
                } max-w-4xl mx-auto leading-relaxed`}
              >
                🚀 Explore our comprehensive collection of courses across various
                subjects
              </p>
            </div>
    
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/category/${category.id}`}
                  className={`${category.bgColor} rounded-3xl shadow-xl border-2 ${
                    isDark ? "border-gray-700" : "border-white"
                  } hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 hover:scale-105 overflow-hidden group`}
                >
                  <div
                    className={`h-40 bg-gradient-to-r ${category.color} flex items-center justify-center relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-white opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <div className="text-6xl group-hover:scale-125 transition-transform duration-300 relative z-10">
                      {category.icon}
                    </div>
                  </div>
    
                  <div className="p-8">
                    <h3
                      className={`text-2xl font-black ${
                        isDark ? "text-white" : "text-gray-900"
                      } mb-4`}
                    >
                      {category.name}
                    </h3>
                    <p
                      className={`${
                        isDark ? "text-gray-300" : "text-gray-700"
                      } mb-6 leading-relaxed font-medium`}
                    >
                      {category.description}
                    </p>
    
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-sm ${
                          isDark
                            ? "text-gray-400 bg-gray-700"
                            : "text-gray-600 bg-white"
                        } px-4 py-2 rounded-full font-bold shadow-sm`}
                      >
                        🎓 {category.courses} courses
                      </span>
                      <span className="text-purple-600 font-black text-lg group-hover:text-purple-800 transition-colors">
                        Explore →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      );
    };
    
    // Enhanced Category Detail Page (keeping File A's design)
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
          color: "from-blue-500 to-cyan-500",
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
          color: "from-yellow-500 to-orange-500",
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
          color: "from-green-500 to-emerald-500",
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
          color: "from-pink-500 to-rose-500",
        },
      ];
    
      const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
          case "Beginner":
            return "bg-green-100 text-green-800";
          case "Intermediate":
            return "bg-yellow-100 text-yellow-800";
          case "Advanced":
            return "bg-red-100 text-red-800";
          default:
            return "bg-gray-100 text-gray-800";
        }
      };
    
      return (
        <div
          className={`min-h-screen ${
            isDark ? "bg-gray-900" : "bg-gradient-to-br from-purple-50 to-indigo-50"
          } py-16 transition-colors duration-300`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <div className="text-5xl mb-6">💻</div>
              <h1
                className={`text-4xl md:text-6xl font-black ${
                  isDark ? "text-white" : "text-gray-900"
                } mb-6`}
              >
                Programming <span className="text-purple-600">Courses</span>
              </h1>
              <p
                className={`${
                  isDark ? "text-gray-300" : "text-gray-600"
                } text-xl leading-relaxed max-w-3xl mx-auto`}
              >
                🚀 Master programming through hands-on projects and expert
                instruction
              </p>
            </div>
    
            <div className="grid gap-8 md:grid-cols-2">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className={`${
                    isDark
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-100"
                  } rounded-3xl shadow-xl border-2 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group`}
                >
                  <div
                    className={`h-56 bg-gradient-to-r ${course.color} flex items-center justify-center relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-black opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <div className="text-white text-center relative z-10">
                      <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                        📚
                      </div>
                      <div className="text-lg font-bold bg-white bg-opacity-20 px-4 py-2 rounded-full">
                        Course Preview
                      </div>
                    </div>
                  </div>
    
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3
                        className={`text-2xl font-black ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {course.title}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-bold ${getDifficultyColor(
                          course.difficulty
                        )}`}
                      >
                        {course.difficulty}
                      </span>
                    </div>
    
                    <p
                      className={`${
                        isDark ? "text-gray-300" : "text-gray-600"
                      } mb-6 leading-relaxed`}
                    >
                      {course.description}
                    </p>
    
                    <div
                      className={`flex items-center text-sm ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      } mb-6 space-x-4 flex-wrap`}
                    >
                      <span
                        className={`${
                          isDark ? "bg-gray-700" : "bg-gray-100"
                        } px-3 py-1 rounded-full font-semibold`}
                      >
                        👨‍🏫 {course.instructor}
                      </span>
                      <span
                        className={`${
                          isDark ? "bg-gray-700" : "bg-gray-100"
                        } px-3 py-1 rounded-full font-semibold`}
                      >
                        ⏰ {course.duration}
                      </span>
                      <span
                        className={`${
                          isDark ? "bg-gray-700" : "bg-gray-100"
                        } px-3 py-1 rounded-full font-semibold`}
                      >
                        ⭐ {course.rating}
                      </span>
                    </div>
    
                    <div className="flex items-center justify-between">
                      <div
                        className={`text-sm ${
                          isDark ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        <span className="font-bold">{course.videos} lessons</span> •{" "}
                        <span className="font-bold">
                          {course.students.toLocaleString()} students
                        </span>
                      </div>
                      <Link
                        to={`/course/${course.id}`}
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-black transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        🚀 Enroll Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    };
    const Navbar = () => {
      const { user, logout } = useContext(AuthContext);
      const { isDark, toggleTheme } = useContext(ThemeContext);
      const navigate = useNavigate();
    
      return (
        <nav
          className={`${
            isDark ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
          } shadow-lg border-b-4 border-gradient-to-r from-purple-500 to-indigo-500 sticky top-0 z-40 transition-colors duration-300`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="flex-shrink-0 flex items-center group">
                  <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg p-2 mr-3 group-hover:scale-110 transition-transform duration-200">
                    <span className="text-white text-xl">🚀</span>
                  </div>
                  <span
                    className={`text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent`}
                  >
                    EduLearn
                  </span>
                </Link>
                <div className="hidden md:ml-8 md:flex md:space-x-8">
                  <Link
                    to="/"
                    className={`${
                      isDark
                        ? "text-white hover:text-purple-400 hover:bg-gray-800"
                        : "text-gray-900 hover:text-purple-600 hover:bg-purple-50"
                    } px-3 py-2 text-sm font-bold transition-all duration-200 rounded-lg`}
                  >
                    🏠 Home
                  </Link>
                  <Link
                    to="/categories"
                    className={`${
                      isDark
                        ? "text-gray-300 hover:text-white hover:bg-gray-800"
                        : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                    } px-3 py-2 text-sm font-bold transition-all duration-200 rounded-lg`}
                  >
                    📚 Categories
                  </Link>
                  <Link
                    to="/groups"
                    className={`${
                      isDark
                        ? "text-gray-300 hover:text-white hover:bg-gray-800"
                        : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                    } px-3 py-2 text-sm font-bold transition-all duration-200 rounded-lg`}
                  >
                    💬 Groups
                  </Link>
                  {user && (
                    <Link
                      to="/dashboard"
                      className={`${
                        isDark
                          ? "text-gray-300 hover:text-white hover:bg-gray-800"
                          : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                      } px-3 py-2 text-sm font-bold transition-all duration-200 rounded-lg`}
                    >
                      📊 Dashboard
                    </Link>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-4">
                {/* Theme Toggle */}
                <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
    
                {user ? (
                  <div className="flex items-center space-x-4">
                    <div
                      className={`bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-md`}
                    >
                      👋 Hey, <span className="font-black">{user.name}</span>!
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        navigate("/");
                      }}
                      className={`${
                        isDark
                          ? "text-gray-300 hover:text-red-400 hover:bg-gray-800 hover:border-red-400"
                          : "text-gray-500 hover:text-red-600 hover:bg-red-50 hover:border-red-200"
                      } px-4 py-2 text-sm font-bold transition-all duration-200 rounded-lg border-2 border-transparent`}
                    >
                      👋 Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="flex space-x-4">
                    <Link
                      to="/signin"
                      className={`${
                        isDark
                          ? "text-gray-300 hover:text-white hover:bg-gray-800 border-gray-600"
                          : "text-gray-500 hover:text-gray-700 hover:bg-gray-50 border-gray-200"
                      } px-4 py-2 text-sm font-bold transition-all duration-200 rounded-lg border-2`}
                    >
                      🔐 Sign In
                    </Link>
                    <Link
                      to="/signup"
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-2 rounded-lg text-sm font-bold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      ✨ Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      );
    };
    
    // Enhanced Sign Up Page (keeping File A's style)
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
        <div
          className={`min-h-screen flex items-center justify-center ${
            isDark
              ? "bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900"
              : "bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700"
          } py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300`}
        >
          {/* Animated background elements */}
          <div className="absolute inset-0">
            <div
              className="absolute top-20 left-20 w-24 h-24 bg-white opacity-10 rounded-full animate-bounce"
              style={{ animationDelay: "0s" }}
            ></div>
            <div
              className="absolute top-40 right-32 w-16 h-16 bg-yellow-300 opacity-20 rounded-full animate-bounce"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute bottom-32 left-32 w-20 h-20 bg-pink-300 opacity-15 rounded-full animate-bounce"
              style={{ animationDelay: "2s" }}
            ></div>
            <div
              className="absolute bottom-20 right-20 w-12 h-12 bg-green-300 opacity-25 rounded-full animate-bounce"
              style={{ animationDelay: "1.5s" }}
            ></div>
          </div>
    
          <div className="max-w-md w-full space-y-8 relative z-10">
            <div
              className={`${
                isDark ? "bg-gray-800 border-gray-700" : "bg-white"
              } rounded-3xl shadow-2xl border-4 ${
                isDark ? "border-gray-700" : "border-white"
              } p-10`}
            >
              <div className="text-center mb-10">
                <div className="text-5xl mb-4">🚀</div>
                <h2
                  className={`text-4xl font-black ${
                    isDark ? "text-white" : "text-gray-900"
                  } mb-4`}
                >
                  Create Account
                </h2>
                <p
                  className={`${
                    isDark ? "text-gray-300" : "text-gray-600"
                  } text-lg font-semibold`}
                >
                  ✨ Join thousands of learners advancing their skills
                </p>
              </div>
    
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="name"
                    className={`block text-sm font-black ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    } mb-3`}
                  >
                    👤 Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className={`w-full px-4 py-4 border-2 ${
                      isDark
                        ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400"
                        : "border-gray-300 bg-white text-gray-900"
                    } rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-500 focus:border-transparent transition-all duration-200 font-semibold`}
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
    
                <div>
                  <label
                    htmlFor="email"
                    className={`block text-sm font-black ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    } mb-3`}
                  >
                    📧 Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className={`w-full px-4 py-4 border-2 ${
                      isDark
                        ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400"
                        : "border-gray-300 bg-white text-gray-900"
                    } rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-500 focus:border-transparent transition-all duration-200 font-semibold`}
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
    
                <div>
                  <label
                    htmlFor="password"
                    className={`block text-sm font-black ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    } mb-3`}
                  >
                    🔒 Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className={`w-full px-4 py-4 border-2 ${
                      isDark
                        ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400"
                        : "border-gray-300 bg-white text-gray-900"
                    } rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-500 focus:border-transparent transition-all duration-200 font-semibold`}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
    
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className={`block text-sm font-black ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    } mb-3`}
                  >
                    🔒 Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    className={`w-full px-4 py-4 border-2 ${
                      isDark
                        ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400"
                        : "border-gray-300 bg-white text-gray-900"
                    } rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-500 focus:border-transparent transition-all duration-200 font-semibold`}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
    
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-black rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 text-lg"
                >
                  🚀 Create Account
                </button>
              </form>
    
              <div className="text-center mt-8">
                <Link
                  to="/signin"
                  className="text-purple-600 hover:text-purple-700 font-black text-lg transition-colors duration-200"
                >
                  Already have an account?{" "}
                  <span className="underline">Sign in</span> 🔐
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    };
    
    // Enhanced Sign In Page (keeping File A's style)
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
        <div
          className={`min-h-screen flex items-center justify-center ${
            isDark
              ? "bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900"
              : "bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-700"
          } py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300`}
        >
          {/* Animated background elements */}
          <div className="absolute inset-0">
            <div
              className="absolute top-16 left-16 w-20 h-20 bg-white opacity-10 rounded-full animate-bounce"
              style={{ animationDelay: "0s" }}
            ></div>
            <div
              className="absolute top-32 right-24 w-14 h-14 bg-yellow-300 opacity-20 rounded-full animate-bounce"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute bottom-24 left-24 w-18 h-18 bg-pink-300 opacity-15 rounded-full animate-bounce"
              style={{ animationDelay: "2s" }}
            ></div>
            <div
              className="absolute bottom-16 right-16 w-10 h-10 bg-green-300 opacity-25 rounded-full animate-bounce"
              style={{ animationDelay: "1.5s" }}
            ></div>
          </div>
    
          <div className="max-w-md w-full space-y-8 relative z-10">
            <div
              className={`${
                isDark ? "bg-gray-800 border-gray-700" : "bg-white"
              } rounded-3xl shadow-2xl border-4 ${
                isDark ? "border-gray-700" : "border-white"
              } p-10`}
            >
              <div className="text-center mb-10">
                <div className="text-5xl mb-4">👋</div>
                <h2
                  className={`text-4xl font-black ${
                    isDark ? "text-white" : "text-gray-900"
                  } mb-4`}
                >
                  Welcome Back
                </h2>
                <p
                  className={`${
                    isDark ? "text-gray-300" : "text-gray-600"
                  } text-lg font-semibold`}
                >
                  🎯 Sign in to continue your learning journey
                </p>
              </div>
    
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className={`block text-sm font-black ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    } mb-3`}
                  >
                    📧 Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className={`w-full px-4 py-4 border-2 ${
                      isDark
                        ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400"
                        : "border-gray-300 bg-white text-gray-900"
                    } rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-500 focus:border-transparent transition-all duration-200 font-semibold`}
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
    
                <div>
                  <label
                    htmlFor="password"
                    className={`block text-sm font-black ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    } mb-3`}
                  >
                    🔒 Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className={`w-full px-4 py-4 border-2 ${
                      isDark
                        ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400"
                        : "border-gray-300 bg-white text-gray-900"
                    } rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-500 focus:border-transparent transition-all duration-200 font-semibold`}
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
                      className="h-5 w-5 text-purple-600 focus:ring-purple-500 border-2 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className={`ml-3 block text-sm font-bold ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Remember me
                    </label>
                  </div>
    
                  <div className="text-sm">
                    <a
                      href="#"
                      className="text-purple-600 hover:text-purple-700 font-black transition-colors duration-200"
                    >
                      Forgot password? 🤔
                    </a>
                  </div>
                </div>
    
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-black rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 text-lg"
                >
                  🚀 Sign In
                </button>
              </form>
    
              <div className="text-center mt-8">
                <Link
                  to="/signup"
                  className="text-purple-600 hover:text-purple-700 font-black text-lg transition-colors duration-200"
                >
                  Don't have an account? <span className="underline">Sign up</span>{" "}
                  ✨
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    };
    
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
    
    // Auth Provider Component (fixed localStorage usage)
    const AuthProvider = ({ children }) => {
      const [user, setUser] = useState(null);
    
      useEffect(() => {
        // For this demo, we'll use a simple in-memory state
        // In a real app, you'd use proper authentication
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
                  
    
    // Theme Context
    const ThemeContext = createContext();
    
    // Auth Context
    const AuthContext = createContext();
    
    // Enhanced Completion Animation Component (from File B with File A's styling)
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
            { delay: 50, phase: 1 }, // Papers fly in - faster start
            { delay: 300, phase: 2 }, // Checkmark appears - reduced delay
            { delay: 600, phase: 3 }, // Confetti & sparkles - faster
            { delay: 900, phase: 4 }, // Text appears - faster
            { delay: 2800, phase: 5 }, // Auto close - slightly faster
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
    
      const getIllustration = () => {
        const illustrations = {
          lesson: {
            icon: "🎯",
            color: "from-purple-400 to-indigo-600",
            papers: "📄",
          },
          course: {
            icon: "🎓",
            color: "from-emerald-400 to-teal-600",
            papers: "📜",
          },
          module: { icon: "🚀", color: "from-orange-400 to-red-600", papers: "📋" },
          quiz: { icon: "🧠", color: "from-blue-400 to-cyan-600", papers: "📊" },
        };
        return illustrations[type] || illustrations.lesson;
      };
    
      const illustration = getIllustration();
    
      return (
        <>
          <style>{`
            @keyframes flyInLeft {
              0% { 
                transform: translateX(-150px) translateY(30px) rotate(-20deg) scale(0.8); 
                opacity: 0; 
              }
              70% { 
                transform: translateX(15px) translateY(-8px) rotate(8deg) scale(1.1); 
                opacity: 0.9; 
              }
              100% { 
                transform: translateX(0) translateY(0) rotate(0deg) scale(1); 
                opacity: 1; 
              }
            }
            @keyframes flyInRight {
              0% { 
                transform: translateX(150px) translateY(40px) rotate(20deg) scale(0.8); 
                opacity: 0; 
              }
              70% { 
                transform: translateX(-15px) translateY(-10px) rotate(-8deg) scale(1.1); 
                opacity: 0.9; 
              }
              100% { 
                transform: translateX(0) translateY(0) rotate(0deg) scale(1); 
                opacity: 1; 
              }
            }
            @keyframes flyInTop {
              0% { 
                transform: translateY(-120px) translateX(20px) rotate(25deg) scale(0.7); 
                opacity: 0; 
              }
              70% { 
                transform: translateY(12px) translateX(-5px) rotate(-5deg) scale(1.15); 
                opacity: 0.95; 
              }
              100% { 
                transform: translateY(0) translateX(0) rotate(0deg) scale(1); 
                opacity: 1; 
              }
            }
            @keyframes checkmarkDraw {
              0% { 
                stroke-dasharray: 0 100; 
                transform: scale(0.5) rotate(-10deg); 
                opacity: 0;
              }
              40% { 
                stroke-dasharray: 30 100; 
                transform: scale(1.3) rotate(5deg); 
                opacity: 0.8;
              }
              100% { 
                stroke-dasharray: 100 100; 
                transform: scale(1) rotate(0deg); 
                opacity: 1;
              }
            }
            @keyframes circleScale {
              0% { 
                transform: scale(0) rotate(-180deg); 
                opacity: 0; 
              }
              60% { 
                transform: scale(1.4) rotate(10deg); 
                opacity: 0.9; 
              }
              100% { 
                transform: scale(1) rotate(0deg); 
                opacity: 1; 
              }
            }
            @keyframes confettiFall {
              0% { 
                transform: translateY(-150px) rotate(0deg) scale(1); 
                opacity: 1; 
              }
              100% { 
                transform: translateY(150px) rotate(720deg) scale(0.3); 
                opacity: 0; 
              }
            }
            @keyframes textSlideUp {
              0% { 
                transform: translateY(50px) scale(0.9); 
                opacity: 0; 
              }
              100% { 
                transform: translateY(0) scale(1); 
                opacity: 1; 
              }
            }
            @keyframes pulseGlow {
              0%, 100% { 
                box-shadow: 0 0 30px rgba(34, 197, 94, 0.4), 0 0 60px rgba(34, 197, 94, 0.1); 
                transform: scale(1);
              }
              50% { 
                box-shadow: 0 0 50px rgba(34, 197, 94, 0.8), 0 0 80px rgba(34, 197, 94, 0.3); 
                transform: scale(1.05);
              }
            }
            @keyframes sparkle {
              0%, 100% { 
                opacity: 0; 
                transform: scale(0.3) rotate(0deg); 
              }
              50% { 
                opacity: 1; 
                transform: scale(1.2) rotate(180deg); 
              }
            }
            @keyframes backgroundPulse {
              0%, 100% { opacity: 0.05; }
              50% { opacity: 0.12; }
            }
            
            .animate-fly-in-left { animation: flyInLeft 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
            .animate-fly-in-right { animation: flyInRight 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
            .animate-fly-in-top { animation: flyInTop 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
            .animate-checkmark-draw { animation: checkmarkDraw 1s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
            .animate-circle-scale { animation: circleScale 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
            .animate-confetti-fall { animation: confettiFall 3s linear infinite; }
            .animate-text-slide-up { animation: textSlideUp 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
            .animate-pulse-glow { animation: pulseGlow 2.5s ease-in-out infinite; }
            .animate-sparkle { animation: sparkle 1.5s ease-in-out infinite; }
            .animate-background-pulse { animation: backgroundPulse 3s ease-in-out infinite; }
          `}</style>
    
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-md transition-all duration-300">
            <div className="relative max-w-lg mx-4">
              {/* Flying papers with improved timing */}
              {animationPhase >= 1 && (
                <>
                  <div
                    className="absolute -top-12 -left-20 text-5xl animate-fly-in-left"
                    style={{ animationDelay: "0ms" }}
                  >
                    {illustration.papers}
                  </div>
                  <div
                    className="absolute -top-10 -right-24 text-4xl animate-fly-in-right"
                    style={{ animationDelay: "80ms" }}
                  >
                    {illustration.papers}
                  </div>
                  <div
                    className="absolute -top-20 left-12 text-3xl animate-fly-in-top"
                    style={{ animationDelay: "160ms" }}
                  >
                    {illustration.papers}
                  </div>
                  <div
                    className="absolute -bottom-16 -left-16 text-4xl animate-fly-in-left"
                    style={{ animationDelay: "120ms" }}
                  >
                    📑
                  </div>
                  <div
                    className="absolute -bottom-12 -right-20 text-3xl animate-fly-in-right"
                    style={{ animationDelay: "200ms" }}
                  >
                    📋
                  </div>
                </>
              )}
    
              <div className="bg-white rounded-3xl p-16 text-center relative overflow-hidden shadow-2xl border-4 border-white">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${illustration.color} animate-background-pulse rounded-3xl`}
                ></div>
    
                {/* Enhanced confetti with more particles */}
                {animationPhase >= 3 && (
                  <>
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={`confetti-${i}`}
                        className="absolute w-3 h-3 rounded-full animate-confetti-fall"
                        style={{
                          left: `${10 + i * 7}%`,
                          backgroundColor: [
                            "#ef4444",
                            "#f97316",
                            "#eab308",
                            "#22c55e",
                            "#3b82f6",
                            "#8b5cf6",
                            "#ec4899",
                            "#06b6d4",
                          ][i % 8],
                          animationDelay: `${i * 80}ms`,
                          animationDuration: `${2.5 + Math.random() * 1.5}s`,
                        }}
                      />
                    ))}
    
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={`sparkle-${i}`}
                        className="absolute text-yellow-400 animate-sparkle"
                        style={{
                          left: `${10 + i * 12}%`,
                          top: `${15 + (i % 4) * 18}%`,
                          animationDelay: `${i * 150}ms`,
                          fontSize: Math.random() > 0.5 ? "20px" : "16px",
                        }}
                      >
                        ✨
                      </div>
                    ))}
                  </>
                )}
    
                <div className="relative z-10">
                  {/* Enhanced checkmark with better glow */}
                  {animationPhase >= 2 && (
                    <div className="w-28 h-28 bg-gradient-to-br from-green-400 via-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-10 animate-circle-scale animate-pulse-glow shadow-lg">
                      <svg
                        className="w-16 h-16 text-white animate-checkmark-draw drop-shadow-lg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={4}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  )}
    
                  {/* Enhanced icon with better animation */}
                  {animationPhase >= 2 && (
                    <div
                      className="text-7xl mb-8 animate-circle-scale filter drop-shadow-lg"
                      style={{ animationDelay: "150ms" }}
                    >
                      {illustration.icon}
                    </div>
                  )}
    
                  {/* Enhanced text with better typography */}
                  {animationPhase >= 4 && (
                    <div className="animate-text-slide-up">
                      <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6 leading-tight">
                        {title}
                      </h2>
                      <p className="text-gray-600 text-xl leading-relaxed font-medium">
                        {subtitle}
                      </p>
                    </div>
                  )}
                </div>
              </div>
    
              {/* Enhanced floating celebration elements */}
              {animationPhase >= 3 && (
                <>
                  <div
                    className="absolute -top-8 -left-12 text-3xl animate-bounce"
                    style={{ animationDelay: "400ms" }}
                  >
                    🎉
                  </div>
                  <div
                    className="absolute -top-6 -right-10 text-2xl animate-bounce"
                    style={{ animationDelay: "600ms" }}
                  >
                    🎊
                  </div>
                  <div
                    className="absolute -bottom-8 left-8 text-3xl animate-bounce"
                    style={{ animationDelay: "500ms" }}
                  >
                    🌟
                  </div>
                  <div
                    className="absolute -bottom-6 -right-12 text-2xl animate-bounce"
                    style={{ animationDelay: "700ms" }}
                  >
                    ⭐
                  </div>
                  <div
                    className="absolute top-4 -left-6 text-xl animate-bounce"
                    style={{ animationDelay: "800ms" }}
                  >
                    💫
                  </div>
                  <div
                    className="absolute top-6 -right-4 text-xl animate-bounce"
                    style={{ animationDelay: "900ms" }}
                  >
                    ✨
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      );
    };
    
    // Autoplay Countdown Component (from File B)
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
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl border-2 border-purple-200">
            <div className="mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-3xl font-bold text-white">{countdown}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Next Video</h3>
              <p className="text-gray-600 mb-4">Starting in {countdown} seconds</p>
              <p className="text-lg font-semibold text-purple-600 truncate">
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
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                Play Now
              </button>
            </div>
          </div>
        </div>
      );
    };
    
    // Enhanced Custom Video Controls (from File B with improvements)
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
    
      const formatTime = (seconds) => {
        if (!seconds || isNaN(seconds)) return "0:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${String(secs).padStart(2, "0")}`;
      };
    
      const qualities = [
        { label: "Auto", value: "auto" },
        { label: "1080p", value: "1080p" },
        { label: "720p", value: "720p" },
        { label: "480p", value: "480p" },
        { label: "360p", value: "360p" },
      ];
    
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
    
      // Progress bar handling
      const handleProgressClick = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const percentage = Math.max(0, Math.min(1, clickX / rect.width));
        onSeek(percentage);
      };
    
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
    
      // Volume icon
      const getVolumeIcon = () => {
        if (volume === 0) {
          return (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.789L4.674 14H2a1 1 0 01-1-1V7a1 1 0 011-1h2.674l3.709-2.789a1 1 0 011.617.789zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          );
        } else if (volume < 0.5) {
          return (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.789L4.674 14H2a1 1 0 01-1-1V7a1 1 0 011-1h2.674l3.709-2.789a1 1 0 011.617.789z" clipRule="evenodd" />
            </svg>
          );
        }
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.789L4.674 14H2a1 1 0 01-1-1V7a1 1 0 011-1h2.674l3.709-2.789a1 1 0 011.617.789zM18 10a8.024 8.024 0 01-1.789 5.035l-1.414-1.414A6.002 6.002 0 0016 10a6.002 6.002 0 00-1.203-3.621l1.414-1.414A8.024 8.024 0 0118 10z" clipRule="evenodd" />
          </svg>
        );
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
            className={`absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/60 to-transparent transition-opacity duration-300 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          />
          
          {/* Controls container */}
          <div
            className={`relative z-10 px-4 pb-4 transition-all duration-300 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            {/* Progress Bar */}
            <div className="mb-4">
              <div
                className="w-full bg-gray-600 rounded-full h-1 cursor-pointer relative group hover:h-2 transition-all duration-200"
                onClick={handleProgressClick}
              >
                <div
                  className="h-1 bg-red-600 rounded-full transition-all duration-200 relative group-hover:h-2"
                  style={{ width: `${played * 100}%` }}
                >
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                </div>
              </div>
            </div>
    
            {/* Controls */}
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center space-x-4">
                {/* Play/Pause */}
                <button
                  onClick={playing ? onPause : onPlay}
                  className="hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-colors"
                >
                  {playing ? (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
    
                {/* Volume */}
                <div className="relative">
                  <button
                    onMouseEnter={handleVolumeMouseEnter}
                    onMouseLeave={handleVolumeMouseLeave}
                    className="hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-colors"
                  >
                    {getVolumeIcon()}
                  </button>
    
                  {showVolumeSlider && (
                    <div
                      className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-black bg-opacity-90 rounded-lg p-2"
                      onMouseEnter={handleVolumeMouseEnter}
                      onMouseLeave={handleVolumeMouseLeave}
                    >
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                        className="w-20 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                        style={{ writingMode: "bt-lr", transform: "rotate(90deg)" }}
                      />
                    </div>
                  )}
                </div>
    
                {/* Time */}
                <span className="text-sm font-mono">
                  {formatTime(duration * played)} / {formatTime(duration)}
                </span>
              </div>
    
              <div className="flex items-center space-x-4">
                {/* Quality Selector */}
                <div className="relative" ref={qualityMenuRef}>
                  <button
                    onClick={() => setShowQualityMenu(!showQualityMenu)}
                    className="hover:bg-white hover:bg-opacity-20 px-3 py-1 rounded text-sm font-semibold transition-colors"
                  >
                    {quality}
                  </button>
    
                  {showQualityMenu && (
                    <div className="absolute bottom-full right-0 mb-2 bg-black bg-opacity-90 rounded-lg py-2 min-w-24">
                      {qualities.map((q) => (
                        <button
                          key={q.value}
                          onClick={() => {
                            onQualityChange(q.value);
                            setShowQualityMenu(false);
                          }}
                          className={`block w-full text-left px-4 py-2 text-sm hover:bg-white hover:bg-opacity-20 transition-colors ${
                            quality === q.value ? "text-red-500 font-semibold" : ""
                          }`}
                        >
                          {q.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
    
                {/* Fullscreen */}
                <button 
                  onClick={onFullscreen}
                  className="hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-colors"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    };
    
    // Enhanced Video Player with File B's functionality but File A's styling
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
    
        // Mark as near end when 20 seconds left, but don't show animation yet
        if (
          duration > 0 &&
          duration - progress.playedSeconds <= 20 &&
          !isCompleted &&
          !hasAutoCompleted
        ) {
          if (!isNearEnd) {
            setIsNearEnd(true);
            setHasAutoCompleted(true);
            if (onVideoEnd) onVideoEnd(); // Mark as completed but don't show animation
          }
        }
      };
    
      const handleVideoEnded = () => {
        // Show animation only when video actually ends
        if (!showCompletionAnimation) {
          setShowCompletionAnimation(true);
        }
      };
    
      const handleCompletionAnimationClose = () => {
        setShowCompletionAnimation(false);
    
        // Show autoplay countdown if enabled and there's a next video
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
    
        // Show animation when manually marking as complete
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
          } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
          } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
          }
        }
      };
    
      const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${String(secs).padStart(2, "0")}`;
      };
    
      return (
        <>
          <div
            className={`${
              isDark ? "bg-gray-800" : "bg-white"
            } rounded-2xl shadow-xl overflow-hidden border-2 ${
              isDark ? "border-gray-700" : "border-gray-100"
            }`}
          >
            {/* Enhanced header with autoplay toggle */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-white font-medium ml-2">Video Player</span>
                </div>
    
                {hasNextVideo && (
                  <div className="flex items-center space-x-2">
                    <span className="text-white text-sm font-medium">Autoplay</span>
                    <button
                      onClick={onToggleAutoplay}
                      className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                        autoplayEnabled ? "bg-green-400" : "bg-gray-400"
                      }`}
                    >
                      <div
                        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200 ${
                          autoplayEnabled ? "translate-x-6" : "translate-x-0.5"
                        }`}
                      />
                    </button>
                  </div>
                )}
              </div>
            </div>
    
            {/* Video container with enhanced styling and larger size */}
            <div
              className="relative group"
              style={{ aspectRatio: "16/9", minHeight: "500px" }}
            >
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
    
              {/* Enhanced completion overlay */}
              {isCompleted && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center space-x-2 shadow-lg animate-pulse">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Completed!</span>
                </div>
              )}
    
              {/* Near end indicator */}
              {isNearEnd && !isCompleted && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center space-x-2 shadow-lg animate-bounce">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Almost done!</span>
                </div>
              )}
            </div>
    
            {/* Enhanced video controls */}
            <div
              className={`p-6 ${
                isDark ? "bg-gray-800" : "bg-gradient-to-r from-gray-50 to-gray-100"
              }`}
            >
              {/* Enhanced progress bar with color transitions */}
              <div className="mb-6">
                <div
                  className={`flex items-center justify-between text-sm ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  } mb-3`}
                >
                  <span className="font-semibold">Progress</span>
                  <span
                    className={`${
                      isDark ? "bg-gray-700 text-gray-200" : "bg-gray-200"
                    } px-3 py-1 rounded-full font-mono`}
                  >
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>
                <div
                  className={`w-full ${
                    isDark ? "bg-gray-700" : "bg-gray-300"
                  } rounded-full h-3 shadow-inner`}
                >
                  <div
                    className={`h-3 rounded-full transition-all duration-500 shadow-sm relative overflow-hidden ${
                      played < 0.3
                        ? "bg-gradient-to-r from-yellow-400 to-yellow-500"
                        : played < 0.6
                        ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                        : played < 0.8
                        ? "bg-gradient-to-r from-orange-500 to-green-500"
                        : "bg-gradient-to-r from-green-500 to-emerald-500"
                    }`}
                    style={{
                      width: `${
                        duration > 0 ? (currentTime / duration) * 100 : 0
                      }%`,
                    }}
                  >
                    <div className="absolute inset-0 bg-white opacity-30 animate-pulse"></div>
                  </div>
                </div>
              </div>
    
              {/* Enhanced video title and completion */}
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3
                    className={`font-bold text-xl ${
                      isDark ? "text-white" : "text-gray-900"
                    } mb-2 leading-tight`}
                  >
                    {videoTitle}
                  </h3>
                  <p
                    className={`text-sm ${
                      isDark ? "text-gray-300" : "text-gray-600"
                    } flex items-center space-x-2`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isCompleted ? "bg-green-500" : "bg-orange-400"
                      }`}
                    ></span>
                    <span>
                      {isCompleted
                        ? "✅ You've completed this lesson"
                        : "🎯 Mark as complete when finished"}
                    </span>
                  </p>
                </div>
    
                <div className="ml-6">
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={isCompleted}
                      onChange={handleManualToggle}
                      className="w-6 h-6 text-green-600 border-3 border-gray-300 rounded-lg focus:ring-green-500 transition-all duration-200 transform hover:scale-110"
                    />
                    <span
                      className={`text-sm font-bold ${
                        isDark
                          ? "text-gray-300 group-hover:text-white bg-gray-700"
                          : "text-gray-700 group-hover:text-gray-900 bg-gray-200"
                      } transition-colors px-3 py-1 rounded-full`}
                    >
                      Mark Complete
                    </span>
                  </label>
                </div>
              </div>
    
              {/* Enhanced video stats */}
              <div
                className={`mt-6 pt-4 ${
                  isDark ? "border-gray-700" : "border-gray-200"
                } border-t`}
              >
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div
                    className={`${
                      isDark ? "bg-gray-700" : "bg-white"
                    } rounded-lg p-3 shadow-sm`}
                  >
                    <div
                      className={`text-xs ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      } font-semibold uppercase tracking-wide`}
                    >
                      Duration
                    </div>
                    <div
                      className={`text-lg font-bold ${
                        isDark ? "text-gray-200" : "text-gray-800"
                      }`}
                    >
                      {formatTime(duration)}
                    </div>
                  </div>
                  <div
                    className={`${
                      isDark ? "bg-gray-700" : "bg-white"
                    } rounded-lg p-3 shadow-sm`}
                  >
                    <div
                      className={`text-xs ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      } font-semibold uppercase tracking-wide`}
                    >
                      Watched
                    </div>
                    <div className="text-lg font-bold text-purple-600">
                      {duration > 0 && currentTime > 0
                        ? `${Math.round((currentTime / duration) * 100)}%`
                        : "0%"}
                    </div>
                  </div>
                  <div
                    className={`${
                      isDark ? "bg-gray-700" : "bg-white"
                    } rounded-lg p-3 shadow-sm`}
                  >
                    <div
                      className={`text-xs ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      } font-semibold uppercase tracking-wide`}
                    >
                      Status
                    </div>
                    <div
                      className={`text-lg font-bold ${
                        isCompleted ? "text-green-600" : "text-orange-500"
                      }`}
                    >
                      {isCompleted ? "Done" : "Learning"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    
          {/* Enhanced Completion Animation */}
          <AdvancedCompletionAnimation
            isVisible={showCompletionAnimation}
            onClose={handleCompletionAnimationClose}
            title="🎉 Lesson Complete!"
            subtitle="Outstanding work! You've mastered this lesson like a pro!"
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
    
    // Futuristic Theme Toggle Component (keeping File A's styling)
    const ThemeToggle = ({ isDark, onToggle }) => {
      return (
        <button
          onClick={onToggle}
          className={`relative w-16 h-8 rounded-full p-1 transition-all duration-500 ${
            isDark
              ? "bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg shadow-purple-500/30"
              : "bg-gradient-to-r from-yellow-400 to-orange-500 shadow-lg shadow-yellow-500/30"
          } hover:scale-110 transform`}
        >
          <div
            className={`w-6 h-6 rounded-full transition-all duration-500 flex items-center justify-center shadow-lg ${
              isDark
                ? "translate-x-8 bg-gray-900 text-purple-400"
                : "translate-x-0 bg-white text-yellow-600"
            }`}
          >
            {isDark ? (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
    
          {/* Glowing effect */}
          <div
            className={`absolute inset-0 rounded-full transition-opacity duration-500 ${
              isDark ? "bg-purple-500 opacity-20" : "bg-yellow-400 opacity-20"
            } animate-pulse`}
          ></div>
        </button>
      );
    };