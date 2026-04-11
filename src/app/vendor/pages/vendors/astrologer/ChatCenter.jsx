import { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, Search, Filter, Plus,
  MoreVertical, Phone, Video, Mail,
  User, Clock, Check, CheckCheck,
  Paperclip, Send, Smile, Image,
  FileText, Mic, X, MoreHorizontal,
  Calendar, Bell, Star, Pin,
  Trash2, Archive, Volume2, VolumeX,
  Shield, AlertCircle, ChevronDown,
  ChevronUp, Users, RefreshCw,
  Download, Printer, Eye, Edit,
  Hash, Globe, Home, Building,
  ArrowUpRight, ArrowDownRight
} from 'lucide-react';

const ChatCenter = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [showChatSettings, setShowChatSettings] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [filterClient, setFilterClient] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const messagesEndRef = useRef(null);

  // Tabs
  const tabs = [
    { id: 'all', label: 'All Chats', count: 24 },
    { id: 'unread', label: 'Unread', count: 3 },
    { id: 'important', label: 'Important', count: 8 },
    { id: 'archived', label: 'Archived', count: 5 }
  ];

  // Sample chats data
  const chats = [
    {
      id: 1,
      client: 'Rajesh Kumar',
      lastMessage: 'Thank you for the clarification! When should I start the remedies?',
      time: '10:30 AM',
      unread: 2,
      isImportant: true,
      isPinned: true,
      lastActive: 'Online',
      type: 'follow-up',
      service: 'Ganpati Puja',
      messages: [
        { id: 1, sender: 'client', content: 'Hello, I had a question about the Ganpati Puja remedies you suggested', time: '10:15 AM', read: true },
        { id: 2, sender: 'client', content: 'Should I start them immediately or wait for a specific day?', time: '10:16 AM', read: true },
        { id: 3, sender: 'you', content: 'Hi Rajesh! You can start immediately. The remedies are not day-dependent.', time: '10:20 AM', read: true },
        { id: 4, sender: 'you', content: 'But if you want to wait, Thursday would be ideal for Lord Brihaspati.', time: '10:21 AM', read: true },
        { id: 5, sender: 'client', content: 'Thank you for the clarification! When should I start the remedies?', time: '10:30 AM', read: false },
      ]
    },
    {
      id: 2,
      client: 'Priya Sharma',
      lastMessage: 'I\'ve attached the report for your review',
      time: 'Yesterday',
      unread: 0,
      isImportant: true,
      isPinned: false,
      lastActive: '2 hours ago',
      type: 'report-clarification',
      service: 'Satyanarayan Katha',
      messages: [
        { id: 1, sender: 'you', content: 'Hi Priya, I\'ve sent the report to your email.', time: 'Yesterday, 3:45 PM', read: true },
        { id: 2, sender: 'client', content: 'Received it! Could you explain the planetary positions section?', time: 'Yesterday, 4:30 PM', read: true },
        { id: 3, sender: 'you', content: 'Sure! The planetary positions show where each graha was at your birth time.', time: 'Yesterday, 5:15 PM', read: true },
        { id: 4, sender: 'client', content: 'I\'ve attached the report for your review', time: 'Yesterday, 6:20 PM', read: true },
      ]
    }
  ];

  // Quick messages templates
  const quickMessages = [
    { id: 1, text: 'Thanks for your message! I\'ll get back to you shortly.' },
    { id: 2, text: 'Your consultation is confirmed for [date] at [time].' },
    { id: 3, text: 'Please check your email for the report.' },
    { id: 4, text: 'Reminder: Your session starts in 15 minutes.' },
    { id: 5, text: 'Could you share more details about your concern?' }
  ];

  // Stats
  const stats = [
    { title: 'Total Chats', value: '24', change: '+3', icon: MessageSquare, color: 'orange', trend: 'up' },
    { title: 'Avg. Response', value: '12 min', change: '-2', icon: Clock, color: 'blue', trend: 'up' },
    { title: 'Satisfaction', value: '96%', change: '+3%', icon: Star, color: 'green', trend: 'up' },
    { title: 'Active Now', value: '4', change: '+1', icon: Users, color: 'purple', trend: 'up' }
  ];

  // Filter chats based on active tab and filters
  const filteredChats = chats.filter(chat => {
    if (activeTab === 'unread' && chat.unread === 0) return false;
    if (activeTab === 'important' && !chat.isImportant) return false;
    if (activeTab === 'archived') return false;
    
    if (filterClient !== 'all' && chat.client !== filterClient) return false;
    if (filterType !== 'all' && chat.type !== filterType) return false;
    
    if (searchTerm && !chat.client.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !chat.service.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    
    return true;
  });

  // Scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat?.messages]);

  // Send message
  const sendMessage = () => {
    if (!messageInput.trim() || !selectedChat) return;
    
    const newMessage = {
      id: selectedChat.messages.length + 1,
      sender: 'you',
      content: messageInput,
      time: 'Just now',
      read: true
    };
    
    const updatedChat = {
      ...selectedChat,
      lastMessage: messageInput,
      time: 'Just now',
      unread: 0,
      messages: [...selectedChat.messages, newMessage]
    };
    
    setSelectedChat(updatedChat);
    setMessageInput('');
    
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      
      const autoReply = {
        id: updatedChat.messages.length + 1,
        sender: 'client',
        content: getAutoReply(selectedChat.type),
        time: 'Just now',
        read: true
      };
      
      setSelectedChat({
        ...updatedChat,
        lastMessage: autoReply.content,
        messages: [...updatedChat.messages, autoReply]
      });
    }, 2000);
  };

  // Generate auto-reply based on chat type
  const getAutoReply = (type) => {
    const replies = {
      'follow-up': 'Thank you for the quick response! That helps clarify things.',
      'report-clarification': 'Got it, I\'ll review and get back to you.',
      'reminder': 'Noted, thank you for the reminder.',
      'feedback': 'Glad to hear it\'s working well for you!',
      'default': 'Thanks, I\'ll review and respond shortly.'
    };
    
    return replies[type] || replies.default;
  };

  // Mark as read
  const markAsRead = (chatId) => {
    if (selectedChat?.id === chatId) {
      setSelectedChat({
        ...selectedChat,
        unread: 0,
        messages: selectedChat.messages.map(msg => ({ ...msg, read: true }))
      });
    }
  };

  // Get type icon and color
  const getTypeInfo = (type) => {
    switch(type) {
      case 'follow-up':
        return { icon: <RefreshCw className="w-3.5 h-3.5" />, color: 'bg-blue-100 text-blue-700', label: 'Follow-up' };
      case 'report-clarification':
        return { icon: <FileText className="w-3.5 h-3.5" />, color: 'bg-green-100 text-green-700', label: 'Report' };
      case 'reminder':
        return { icon: <Bell className="w-3.5 h-3.5" />, color: 'bg-orange-100 text-orange-700', label: 'Reminder' };
      case 'feedback':
        return { icon: <Star className="w-3.5 h-3.5" />, color: 'bg-purple-100 text-purple-700', label: 'Feedback' };
      default:
        return { icon: <MessageSquare className="w-3.5 h-3.5" />, color: 'bg-gray-100 text-gray-700', label: 'Chat' };
    }
  };

  // Format time
  const formatTime = (timeStr) => {
    if (timeStr === 'Just now') return timeStr;
    if (timeStr.includes('Today')) return timeStr;
    if (timeStr.includes('Yesterday')) return timeStr;
    return timeStr;
  };

  // Chat List Item Component
  const ChatListItem = ({ chat }) => {
    const typeInfo = getTypeInfo(chat.type);
    
    return (
      <div 
        className={`p-3 border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors ${
          selectedChat?.id === chat.id ? 'bg-orange-50 border-l-4 border-l-orange-500' : ''
        }`}
        onClick={() => {
          setSelectedChat(chat);
          markAsRead(chat.id);
        }}
      >
        <div className="flex items-start gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 
                          flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-lg">
                {chat.client.charAt(0)}
              </span>
            </div>
            {chat.unread > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs 
                            rounded-full flex items-center justify-center">
                {chat.unread}
              </div>
            )}
            {chat.isPinned && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-yellow-500 text-white text-xs 
                            rounded-full flex items-center justify-center">
                <Pin className="w-3 h-3" />
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-800 truncate">{chat.client}</h3>
                {chat.isImportant && (
                  <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                )}
                <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-xs ${typeInfo.color}`}>
                  {typeInfo.icon}
                  {typeInfo.label}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-500">{chat.time}</span>
                {chat.lastActive === 'Online' && (
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                )}
              </div>
            </div>
            
            <p className="text-sm text-gray-600 truncate mb-1">{chat.lastMessage}</p>
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">{chat.service}</span>
              <span className="text-xs text-gray-500">{chat.lastActive}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Message Component
  const Message = ({ message }) => {
    const isYou = message.sender === 'you';
    const isSystem = message.sender === 'system';
    
    return (
      <div className={`flex ${isYou ? 'justify-end' : 'justify-start'} mb-4`}>
        <div className={`max-w-[70%] ${isSystem ? 'w-full text-center' : ''}`}>
          {!isSystem && (
            <div className={`text-xs text-gray-500 mb-1 ${isYou ? 'text-right' : ''}`}>
              {message.sender === 'client' ? selectedChat?.client : 'You'} • {formatTime(message.time)}
            </div>
          )}
          
          <div className={`
            rounded-2xl px-4 py-2.5 ${isSystem ? 'bg-gray-100 text-gray-700 italic' : ''}
            ${isYou ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white' : 'bg-white border border-gray-200 text-gray-800'}
            ${!isSystem ? 'shadow-xs' : ''}
          `}>
            <div className="flex items-start gap-2">
              {isSystem && <AlertCircle className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />}
              <p className="text-sm">{message.content}</p>
            </div>
          </div>
          
          {isYou && (
            <div className="flex items-center justify-end gap-1 mt-1">
              <span className="text-xs text-gray-500">Delivered</span>
              {message.read ? (
                <CheckCheck className="w-3 h-3 text-blue-500" />
              ) : (
                <Check className="w-3 h-3 text-gray-400" />
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className='min-h-screen'>
      {/* Header Section */}
      <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40  
                    px-3 py-1.5 border border-orange-100">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <div className="text-left sm:text-left flex items-end gap-2">
            <div>
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-orange-900 uppercase
                            leading-tight">
                Messages & Chat Center
              </h1>
              <p className="sm:hidden text-sm text-gray-600 mt-0.5">
                Follow-up, clarification, and reminder messages
              </p>
            </div>
            <p className="hidden sm:block text-sm text-gray-600 mb-0.5">
              Follow-up, clarification, and reminder messages
            </p>
          </div>
          
          <div className="flex justify-end sm:justify-end mt-1 sm:mt-0">
            <button
              onClick={() => setShowNewChatModal(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 
                         bg-gradient-to-r from-orange-400 to-orange-500 text-white 
                         rounded-lg hover:from-orange-600 hover:to-orange-700 
                         transition-all shadow-sm text-sm"
            >
              <Plus className="w-4 h-4" />
              New Message
            </button>
          </div>
        </div>
      </div>

      {/* Main Content - Only left side visible */}
      <div className="h-[calc(100vh-120px)] p-6">
        <div className="h-full  overflow-hidden">
          <div className="h-full flex flex-col">
            {/* Stats Cards */}
            <div className="pb-4 border-b border-gray-200 bg-white">
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-2">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 
                                            p-3 rounded-lg border border-gray-200 shadow-xs">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                        <div className="flex items-baseline gap-1 mt-0.5">
                          <p className="text-lg font-semibold text-gray-800">{stat.value}</p>
                          <span className={`text-xs font-medium flex items-center ${
                            stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {stat.trend === 'up' ? 
                              <ArrowUpRight className="w-3 h-3" /> : 
                              <ArrowDownRight className="w-3 h-3" />
                            }
                            {stat.change}
                          </span>
                        </div>
                      </div>
                      <div className={`p-1 rounded ${
                        stat.color === 'orange' ? 'bg-orange-50' :
                        stat.color === 'blue' ? 'bg-blue-50' :
                        stat.color === 'green' ? 'bg-green-50' :
                        'bg-purple-50'
                      }`}>
                        <stat.icon className={`w-3.5 h-3.5 ${
                          stat.color === 'orange' ? 'text-orange-500' :
                          stat.color === 'blue' ? 'text-blue-500' :
                          stat.color === 'green' ? 'text-green-500' :
                          'text-purple-500'
                        }`} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div className="py-3 border-b border-gray-200 bg-white">
              <div className="flex overflow-x-auto">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded text-sm font-medium transition-all whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {tab.label}
                    <span className={`px-1.5 py-0.5 text-xs rounded-full ${
                      activeTab === tab.id
                        ? 'bg-white/20'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Search and Filters */}
            <div className="py-3 border-b border-gray-200 bg-white">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search messages..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 text-sm"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                  {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {/* Filters Dropdown */}
              {showFilters && (
                <div className="mt-3 p-3 border border-gray-200 rounded bg-gray-50">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Client</label>
                      <select
                        value={filterClient}
                        onChange={(e) => setFilterClient(e.target.value)}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500"
                      >
                        <option value="all">All Clients</option>
                        {[...new Set(chats.map(chat => chat.client))].map(client => (
                          <option key={client} value={client}>{client}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Type</label>
                      <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500"
                      >
                        <option value="all">All Types</option>
                        <option value="follow-up">Follow-up</option>
                        <option value="report-clarification">Report</option>
                        <option value="reminder">Reminder</option>
                        <option value="feedback">Feedback</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto">
              {filteredChats.map(chat => (
                <ChatListItem key={chat.id} chat={chat} />
              ))}
              
              {filteredChats.length === 0 && (
                <div className="text-center py-8 ">
                  <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <h3 className="text-base font-medium text-gray-700 mb-1.5">No messages found</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {searchTerm ? 'Try adjusting your search' : 'Start a new conversation'}
                  </p>
                  <button
                    onClick={() => setShowNewChatModal(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-lg text-sm"
                  >
                    <Plus className="w-4 h-4" />
                    New Message
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Chat Modal - Right side content in modal */}
      {selectedChat && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 sm:p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 bg-white flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setSelectedChat(null)}
                    className="p-1.5 hover:bg-gray-100 rounded"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                  
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 
                                flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-md">
                      {selectedChat.client.charAt(0)}
                    </span>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-bold text-gray-800">{selectedChat.client}</h2>
                      {selectedChat.lastActive === 'Online' && (
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-xs text-green-600">Online</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-sm text-gray-600">{selectedChat.service}</span>
                      <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-xs ${getTypeInfo(selectedChat.type).color}`}>
                        {getTypeInfo(selectedChat.type).icon}
                        {getTypeInfo(selectedChat.type).label}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-1">
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded">
                    <Phone className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded">
                    <Video className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded">
                    <Mail className="w-4 h-4" />
                  </button>
                  <div className="relative">
                    <button 
                      onClick={() => setShowChatSettings(!showChatSettings)}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                    
                    {showChatSettings && (
                      <div className="absolute right-0 top-10 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-48">
                        <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2">
                          <Star className="w-3 h-3" />
                          Mark Important
                        </button>
                        <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2">
                          <Pin className="w-3 h-3" />
                          Pin Chat
                        </button>
                        <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2">
                          <Archive className="w-3 h-3" />
                          Archive
                        </button>
                        <button className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                          <Trash2 className="w-3 h-3" />
                          Delete Chat
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              <div className="max-w-2xl mx-auto">
                {selectedChat.messages.map(message => (
                  <Message key={message.id} message={message} />
                ))}
                
                {isTyping && (
                  <div className="flex justify-start mb-4">
                    <div className="bg-white border border-gray-200 rounded-2xl px-4 py-2.5 shadow-xs">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Quick Messages */}
            <div className="p-3 border-t border-gray-200 bg-white flex-shrink-0">
              <div className="max-w-2xl mx-auto">
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {quickMessages.map(qm => (
                    <button
                      key={qm.id}
                      onClick={() => setMessageInput(qm.text)}
                      className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 whitespace-nowrap"
                    >
                      {qm.text}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 bg-white flex-shrink-0">
              <div className="max-w-2xl mx-auto">
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-500 hover:bg-gray-100 rounded">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-500 hover:bg-gray-100 rounded">
                    <Image className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-500 hover:bg-gray-100 rounded">
                    <FileText className="w-5 h-5" />
                  </button>
                  
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      placeholder="Type your message..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                    <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
                      <Smile className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <button
                    onClick={sendMessage}
                    disabled={!messageInput.trim()}
                    className={`p-3 rounded-full ${
                      messageInput.trim()
                        ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white hover:from-orange-600 hover:to-orange-700'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Message Modal */}
      {showNewChatModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 sm:p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-800">New Message</h2>
                <button 
                  onClick={() => setShowNewChatModal(false)}
                  className="p-1 hover:bg-gray-100 rounded text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Recipient Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Client *
                  </label>
                  <select className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500">
                    <option value="">Choose a client...</option>
                    {[...new Set(chats.map(chat => chat.client))].map(client => (
                      <option key={client} value={client}>{client}</option>
                    ))}
                  </select>
                </div>

                {/* Message Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message Type *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'follow-up', label: 'Follow-up', icon: RefreshCw, color: 'from-blue-500 to-blue-600' },
                      { id: 'report-clarification', label: 'Report', icon: FileText, color: 'from-green-500 to-green-600' },
                      { id: 'reminder', label: 'Reminder', icon: Bell, color: 'from-orange-400 to-orange-500' },
                      { id: 'general', label: 'General', icon: MessageSquare, color: 'from-gray-500 to-gray-600' }
                    ].map(type => (
                      <button
                        key={type.id}
                        type="button"
                        className="p-3 border border-gray-300 rounded text-center hover:border-orange-500"
                      >
                        <div className={`w-10 h-10 mx-auto rounded-lg bg-gradient-to-r ${type.color} 
                                      flex items-center justify-center mb-2`}>
                          <type.icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-sm font-medium">{type.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message Content */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500"
                    placeholder="Type your message here..."
                    defaultValue=""
                  />
                </div>

                {/* Scheduling Options */}
                <div className="bg-gray-50 p-3 rounded border border-gray-200">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="text-orange-500 rounded" />
                    <div>
                      <span className="font-medium text-gray-800 text-sm">Schedule Message</span>
                      <p className="text-sm text-gray-600">Send later at a specific time</p>
                    </div>
                  </label>
                  
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      className="px-2 py-1.5 text-sm border border-gray-300 rounded"
                    />
                    <input
                      type="time"
                      className="px-2 py-1.5 text-sm border border-gray-300 rounded"
                    />
                  </div>
                </div>

                {/* Template Suggestions */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quick Templates
                  </label>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {quickMessages.slice(0, 3).map(qm => (
                      <button
                        key={qm.id}
                        type="button"
                        onClick={() => {}}
                        className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 whitespace-nowrap"
                      >
                        {qm.text}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Modal Actions */}
                <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 pt-4 border-t">
                  <button
                    onClick={() => setShowNewChatModal(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 text-sm w-full sm:w-auto"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setShowNewChatModal(false);
                      alert('Message sent successfully!');
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded hover:from-orange-600 hover:to-orange-700 text-sm w-full sm:w-auto"
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatCenter;