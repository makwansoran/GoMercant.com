'use client';

import React, { useState, useEffect, useRef } from 'react';
import { getCurrentUser } from '@/lib/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { SearchIcon, SendIcon, MessageSquareIcon, PlusIcon, X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  title?: string;
  company?: string;
}

interface Conversation {
  id: string;
  otherUser: User;
  lastMessage: {
    content: string;
    createdAt: string;
    read: boolean;
    isFromMe: boolean;
  } | null;
  updatedAt: string;
}

interface Message {
  id: string;
  content: string;
  senderId: string;
  createdAt: string;
  read: boolean;
  sender: {
    id: string;
    name: string;
    avatar: string | null;
  };
}

export const Messaging: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [showNewChat, setShowNewChat] = useState(false);
  const [userSearch, setUserSearch] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [searchingUsers, setSearchingUsers] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
      fetchConversations(user.id);
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selectedConversation && currentUser) {
      fetchMessages(selectedConversation.id, currentUser.id);
      const interval = setInterval(() => {
        fetchMessages(selectedConversation.id, currentUser.id);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [selectedConversation, currentUser]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (userSearch && currentUser) {
      searchUsers(userSearch);
    } else {
      setSearchResults([]);
    }
  }, [userSearch, currentUser]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchConversations = async (userId: string) => {
    try {
      const response = await fetch(`/api/messages/conversations?userId=${userId}`);
      const data = await response.json();
      if (response.ok) {
        setConversations(data.conversations);
      }
    } catch (error) {
      console.error('Error fetching conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (conversationId: string, userId: string) => {
    try {
      const response = await fetch(`/api/messages/conversations/${conversationId}?userId=${userId}`);
      const data = await response.json();
      if (response.ok) {
        setMessages(data.messages);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const searchUsers = async (query: string) => {
    if (!currentUser) return;
    setSearchingUsers(true);
    try {
      const response = await fetch(`/api/users?excludeUserId=${currentUser.id}&search=${encodeURIComponent(query)}`);
      const data = await response.json();
      if (response.ok) {
        setSearchResults(data.users);
      }
    } catch (error) {
      console.error('Error searching users:', error);
    } finally {
      setSearchingUsers(false);
    }
  };

  const startConversation = async (otherUser: User) => {
    if (!currentUser) return;
    try {
      const response = await fetch('/api/messages/conversations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUser.id,
          otherUserId: otherUser.id,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        const newConv: Conversation = {
          id: data.conversation.id,
          otherUser: data.conversation.otherUser,
          lastMessage: null,
          updatedAt: new Date().toISOString(),
        };
        setSelectedConversation(newConv);
        setShowNewChat(false);
        setUserSearch('');
        fetchConversations(currentUser.id);
      }
    } catch (error) {
      console.error('Error starting conversation:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation || !currentUser) return;

    try {
      const response = await fetch('/api/messages/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          conversationId: selectedConversation.id,
          senderId: currentUser.id,
          recipientId: selectedConversation.otherUser.id,
          content: newMessage.trim(),
        }),
      });

      if (response.ok) {
        setNewMessage('');
        fetchMessages(selectedConversation.id, currentUser.id);
        fetchConversations(currentUser.id);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.otherUser.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.otherUser.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!currentUser) {
    return (
      <div className="flex flex-col h-full items-center justify-center p-6">
        <MessageSquareIcon className="h-12 w-12 text-muted-foreground mb-4" />
        <p className="text-muted-foreground">Please log in to view messages</p>
      </div>
    );
  }

  return (
    <div className="flex h-full">
      {/* Conversations List */}
      <div className="w-full md:w-80 border-r flex flex-col bg-background">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MessageSquareIcon className="h-5 w-5" />
              <h2 className="text-lg font-semibold">Messages</h2>
            </div>
            <Button size="icon" variant="ghost" onClick={() => setShowNewChat(true)}>
              <PlusIcon className="h-5 w-5" />
            </Button>
          </div>
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="p-4 flex items-center justify-center">
              <span className="loader"></span>
            </div>
          ) : filteredConversations.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              {searchQuery ? 'No conversations found' : 'No conversations yet'}
              <Button
                variant="link"
                className="block mx-auto mt-2"
                onClick={() => setShowNewChat(true)}
              >
                Start a new chat
              </Button>
            </div>
          ) : (
            <div className="divide-y">
              {filteredConversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation)}
                  className={`w-full p-4 text-left hover:bg-accent transition-colors ${
                    selectedConversation?.id === conversation.id ? 'bg-accent' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        {conversation.otherUser.avatar || conversation.otherUser.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-sm truncate">{conversation.otherUser.name}</p>
                        {conversation.lastMessage && !conversation.lastMessage.read && !conversation.lastMessage.isFromMe && (
                          <Badge className="h-2 w-2 p-0 rounded-full bg-blue-500" />
                        )}
                      </div>
                      {conversation.lastMessage && (
                        <p className="text-xs text-muted-foreground truncate">
                          {conversation.lastMessage.isFromMe ? 'You: ' : ''}{conversation.lastMessage.content}
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-background">
        {showNewChat ? (
          // New Chat Modal
          <div className="flex-1 flex flex-col">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-semibold">New Message</h3>
              <Button size="icon" variant="ghost" onClick={() => {
                setShowNewChat(false);
                setUserSearch('');
              }}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="p-4 border-b">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users by name or email..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  className="pl-10"
                  autoFocus
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {searchingUsers ? (
                <div className="p-4 flex items-center justify-center">
                  <span className="loader-sm"></span>
                </div>
              ) : userSearch && searchResults.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">
                  No users found
                </div>
              ) : (
                <div className="divide-y">
                  {searchResults.map((user) => (
                    <button
                      key={user.id}
                      onClick={() => startConversation(user)}
                      className="w-full p-4 text-left hover:bg-accent transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>
                            {user.avatar || user.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">{user.name}</p>
                          <p className="text-xs text-muted-foreground truncate">
                            {user.title ? `${user.title}${user.company ? ` at ${user.company}` : ''}` : user.email}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
              {!userSearch && (
                <div className="p-4 text-center text-muted-foreground">
                  Search for a user to start a conversation
                </div>
              )}
            </div>
          </div>
        ) : selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b flex items-center gap-3">
              <Avatar>
                <AvatarFallback>
                  {selectedConversation.otherUser.avatar || selectedConversation.otherUser.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{selectedConversation.otherUser.name}</p>
                <p className="text-xs text-muted-foreground">{selectedConversation.otherUser.email}</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <AnimatePresence>
                {messages.map((message) => {
                  const isFromMe = message.senderId === currentUser.id;
                  return (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${isFromMe ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[70%] ${isFromMe ? 'order-2' : 'order-1'}`}>
                        {!isFromMe && (
                          <p className="text-xs text-muted-foreground mb-1 px-2">
                            {message.sender.name}
                          </p>
                        )}
                        <div
                          className={`rounded-2xl px-4 py-2 ${
                            isFromMe
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-foreground'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-xs mt-1 ${
                            isFromMe ? 'text-primary-foreground/70' : 'text-muted-foreground'
                          }`}>
                            {new Date(message.createdAt).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage();
                    }
                  }}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                  <SendIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquareIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">Select a conversation to start messaging</p>
              <Button onClick={() => setShowNewChat(true)}>
                <PlusIcon className="h-4 w-4 mr-2" />
                New Message
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
