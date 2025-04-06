import React, { useState, useEffect } from 'react';
import { Send, Settings, RotateCcw, Copy, Rocket, Brain, Bot } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";


const apiKey = 'AIzaSyDn9uLfFCzuvEG-sOfHKpLT_Ccd_WXeiBc';
const ai = new GoogleGenAI({ apiKey: apiKey});

async function callGemini(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });
  return response.text;
}

const AIModelMatchmaker = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: "Welcome to AI Model Matchmaker! Ask anything, and I'll intelligently select the best AI model for your query.",
      timestamp: new Date(),
      model: "System",
      isUser: false,
    }
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [activeModels, setActiveModels] = useState({
    'claude': true,
    'gpt4': true,
    'gemini': true,
    'llama': false
  });
  const [lightTheme, setLightTheme] = useState(false);
  const [responseDetail, setResponseDetail] = useState('Balanced');
  const [modelSelectionMode, setModelSelectionMode] = useState('Auto');
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    
    setVisible(true);
  }, []);



  const models = {
    'claude': { name: 'Claude', color: 'bg-purple-500', icon: <Brain className="h-4 w-4" /> },
    'gpt4': { name: 'GPT-4', color: 'bg-green-500', icon: <Bot className="h-4 w-4" /> },
    'gemini': { name: 'Gemini', color: 'bg-blue-500', icon: <Rocket className="h-4 w-4" /> },
    'llama': { name: 'Llama', color: 'bg-orange-500', icon: <Bot className="h-4 w-4" /> }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const userMessage = {
      id: messages.length + 1,
      content: input,
      timestamp: new Date(),
      isUser: true,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    
    const responseDelay = responseDetail === 'Detailed' ? 2000 : responseDetail === 'Concise' ? 800 : 1500;
    
    setTimeout(() => {
      const availableModels = Object.keys(activeModels).filter(key => activeModels[key]);
      const selectedModel = modelSelectionMode === 'Auto' ? 
        selectBestModel(input, availableModels) : 
        availableModels[Math.floor(Math.random() * availableModels.length)];

      const aiResponse = {
        id: messages.length + 2,
        content: generateResponse(input, selectedModel, responseDetail),
        timestamp: new Date(),
        model: selectedModel,
        isUser: false,
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, responseDelay);
  };

  
  const selectBestModel = (query, availableModels) => {
    if (availableModels.length === 0) return 'System';
    
    const lowerQuery = query.toLowerCase();
    
    
    if ((lowerQuery.includes('code') || lowerQuery.includes('program') || 
         lowerQuery.includes('function') || lowerQuery.includes('algorithm')) && 
        availableModels.includes('gpt4')) {
      return 'gpt4';
    } 
    else if ((lowerQuery.includes('explain') || lowerQuery.includes('describe') || 
              lowerQuery.includes('detail') || lowerQuery.includes('elaborate')) && 
             availableModels.includes('claude')) {
      return 'claude';
    } 
    else if ((lowerQuery.includes('creative') || lowerQuery.includes('imagine') || 
              lowerQuery.includes('story') || lowerQuery.includes('design')) && 
             availableModels.includes('gemini')) {
      return 'gemini';
    }
    else if ((lowerQuery.includes('specific') || lowerQuery.includes('expert') || 
              lowerQuery.includes('narrow') || lowerQuery.includes('domain')) && 
             availableModels.includes('llama')) {
      return 'llama';
    }
    
    
    return availableModels[Math.floor(Math.random() * availableModels.length)];
  };
  
  const generateResponse = (query, model, detail) => {
    const baseResponses = {
      'claude': `I'm Claude, specialized in nuanced understanding and detailed explanations. Here's my response to your query: "${query}"...`,
      'gpt4': `As GPT-4, I excel at coding and structured information. Regarding "${query}", I would approach it this way...`,
      // 'gemini': `Gemini here! I'm great at creative and multimodal tasks. For "${query}", I've generated this response...`,
      'gemini': (async () => {
        return await callGemini(query);
      })(),
      'llama': `Llama model response to: "${query}". I'm efficient for specific knowledge domains...`,
      'System': `I notice you're asking about "${query}". Let me find the best model to answer that...`
    };

    
    if (detail === 'Concise') {
      return `${model !== 'System' ? models[model].name : 'System'}: ${baseResponses[model].split('.')[0]}.`;
    } else if (detail === 'Detailed') {
      return `${baseResponses[model]} I can provide additional details on this topic, including implementation strategies, best practices, and alternative approaches. Would you like me to elaborate on any specific aspect?`;
    }
    
    return baseResponses[model] || baseResponses['System'];
  };

  const toggleModel = (model) => {
    setActiveModels(prev => ({
      ...prev,
      [model]: !prev[model]
    }));
  };

  const resetConversation = () => {
    setMessages([
      {
        id: 1,
        content: "Welcome to AI Model Matchmaker! Ask anything, and I'll intelligently select the best AI model for your query.",
        timestamp: new Date(),
        model: "System",
        isUser: false,
      }
    ]);
    setInput('');
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const bgClasses = lightTheme 
    ? 'bg-gray-50 text-gray-800' 
    : 'bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white';

  return (
    <div className={`flex flex-col h-screen ${bgClasses}`}>
      <header className={`${lightTheme ? 'bg-white text-gray-800' : 'bg-black bg-opacity-20 backdrop-blur-lg border-b border-gray-800 text-white'}`}>
        <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <span className="h-3 w-3 bg-purple-500 rounded-full"></span>
              <span className="h-3 w-3 bg-green-500 rounded-full"></span>
              <span className="h-3 w-3 bg-blue-500 rounded-full"></span>
            </div>
            <h1 className={`text-xl font-bold ${!lightTheme && 'text-blue-400'}`}>AI Model Matchmaker</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              className={`p-2 rounded-full hover:${lightTheme ? 'bg-gray-100' : 'bg-gray-700'}`}
              onClick={() => setShowSettings(!showSettings)}
            >
              <Settings className={`h-5 w-5 ${lightTheme ? 'text-gray-600' : 'text-gray-300'}`} />
            </button>
            {showSettings && (
              <div className={`absolute z-50 translate-y-10 ${lightTheme ? 'bg-white text-gray-800' : 'bg-gray-800 bg-opacity-90 text-gray-100'} shadow-md p-2 rounded-lg -translate-x-10 backdrop-blur-lg border ${lightTheme ? 'border-gray-200' : 'border-gray-700'}`}>
                <div className="flex items-center justify-between border-b border-gray-700 p-2">
                  <span>Settings</span>
                  <button className="block ml-auto text-red-500" onClick={() => setShowSettings(false)}>X</button>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <span>Theme</span>
                    <label className="relative inline-flex items-center cursor-pointer ml-2">
                      <input
                        type="checkbox"
                        checked={!lightTheme}
                        onChange={() => setLightTheme(!lightTheme)}
                        className="sr-only peer"
                      />
                      <div className={`w-9 h-5 ${lightTheme ? 'bg-gray-200' : 'bg-gray-600'} peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600`}></div>
                    </label>
                  </div>
                  <button 
                    onClick={resetConversation}
                    className="w-full bg-red-600 hover:bg-red-700 text-white p-2 rounded text-sm"
                  >
                    Reset Conversation
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <div className={`w-64 border-r ${lightTheme ? 'border-gray-200 bg-white' : 'bg-black bg-opacity-30 backdrop-blur-lg border-gray-800'} hidden md:block p-4`}>
          <h2 className={`text-lg font-semibold mb-4 ${!lightTheme && 'text-blue-400'}`}>Active Models</h2>
          <div className="space-y-3">
            {Object.keys(models).map(modelKey => (
              <div key={modelKey} className={`flex items-center justify-between p-2 rounded ${!lightTheme && 'hover:bg-gray-800'} transition-colors`}>
                <div className="flex items-center space-x-2">
                  <div className={`h-3 w-3 rounded-full ${models[modelKey].color}`}></div>
                  <span className="text-sm">{models[modelKey].name}</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={activeModels[modelKey]}
                    onChange={() => toggleModel(modelKey)}
                    className="sr-only peer"
                  />
                  <div className={`w-9 h-5 ${lightTheme ? 'bg-gray-200' : 'bg-gray-700'} peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600`}></div>
                </label>
              </div>
            ))}
          </div>
          
          <div className="mt-8">
            <h2 className={`text-lg font-semibold mb-4 ${!lightTheme && 'text-blue-400'}`}>Conversation Settings</h2>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium ${lightTheme ? 'text-gray-700' : 'text-white'} mb-1`}>Response Detail</label>
                <select 
                  className={`w-full text-sm border border-gray-600 rounded-md p-2 ${lightTheme ? 'bg-white' : 'bg-gray-800'}`}
                  value={responseDetail}
                  onChange={(e) => setResponseDetail(e.target.value)}
                >
                  <option>Balanced</option>
                  <option>Concise</option>
                  <option>Detailed</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium ${lightTheme ? 'text-gray-700' : 'text-white'} mb-1`}>Model Selection</label>
                <select 
                  className={`w-full text-sm border border-gray-600 rounded-md p-2 ${lightTheme ? 'bg-white' : 'bg-gray-800'}`}
                  value={modelSelectionMode}
                  onChange={(e) => setModelSelectionMode(e.target.value)}
                >
                  <option>Auto (Recommended)</option>
                  <option>Manual</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className={`flex-1 flex flex-col ${lightTheme ? 'bg-white' : 'bg-transparent'}`}>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} group`}
              >
                <div className={`max-w-3xl p-4 rounded-lg shadow-lg ${message.isUser
                    ? 'bg-blue-600 text-white'
                    : `${lightTheme ? 'bg-gray-100 text-gray-800' : 'bg-black bg-opacity-30 backdrop-blur-lg text-gray-100 border border-gray-800'}`
                  }`}>
                  {!message.isUser && message.model && (
                    <div className="flex items-center space-x-1 mb-2">
                      <div className={`h-2 w-2 rounded-full ${message.model !== 'System' ? models[message.model]?.color : 'bg-gray-400'}`}></div>
                      <span className={`text-xs font-medium ${!lightTheme && 'text-blue-300'}`}>
                        {message.model !== 'System' ? models[message.model]?.name : 'System'}
                      </span>
                    </div>
                  )}
                  <p className="text-sm">{message.content}</p>
                  <div className="mt-2 flex justify-end items-center space-x-2">
                    <button 
                      className={`opacity-0 group-hover:opacity-100 text-xs ${message.isUser ? 'text-gray-300' : 'text-gray-500'} hover:text-gray-700 transition-opacity`}
                      onClick={() => copyToClipboard(message.content)}
                    >
                      <Copy className="h-3 w-3" />
                    </button>
                    <span className={`text-xs ${message.isUser ? 'text-blue-200' : lightTheme ? 'text-gray-500' : 'text-gray-400'}`}>
                      {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className={`p-4 rounded-lg max-w-3xl ${lightTheme ? 'bg-gray-100 text-gray-800' : 'bg-black bg-opacity-30 backdrop-blur-lg text-gray-100 border border-gray-800'}`}>
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="h-2 w-2 bg-purple-400 rounded-full animate-bounce delay-100"></div>
                    <div className="h-2 w-2 bg-green-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className={`border-t ${lightTheme ? 'border-gray-200' : 'border-gray-800'} p-4`}>
            <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything..."
                  className={`w-full p-3 pr-10 border ${lightTheme ? 'bg-gray-50 border-gray-300' : 'bg-gray-800 bg-opacity-60 border-gray-700'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                <button
                  type="button"
                  onClick={resetConversation}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${lightTheme ? 'text-gray-500 hover:text-gray-600' : 'text-gray-400 hover:text-gray-300'}`}
                >
                  <RotateCcw className="h-5 w-5" />
                </button>
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
            <div className={`mt-2 flex justify-between text-xs ${lightTheme ? 'text-gray-500' : 'text-gray-400'}`}>
              <span>AI Model Matchmaker will select the optimal model for your query</span>
              <span>Powered by multiple AI models</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Visual elements from landing page - background gradients */}
      {!lightTheme && (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute w-96 h-96 bg-blue-500 rounded-full opacity-10 -top-20 -left-20 blur-3xl"></div>
          <div className="absolute w-96 h-96 bg-purple-500 rounded-full opacity-10 top-40 right-20 blur-3xl"></div>
          <div className="absolute w-64 h-64 bg-blue-300 rounded-full opacity-10 bottom-10 left-1/3 blur-3xl"></div>
        </div>
      )}
    </div>
  );
};

export default AIModelMatchmaker;