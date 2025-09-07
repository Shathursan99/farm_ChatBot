import { useState, useRef, useEffect } from 'react';
import { Send, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "வணக்கம்! நான் உங்கள் விவசாய உதவியாளர். பயிர்கள் மற்றும் விவசாய நுட்பங்கள் பற்றிய கேள்விகளுக்கு உங்களுக்கு உதவ நான் இங்கே இருக்கிறேன். நீங்கள் என்ன தெரிந்து கொள்ள விரும்புகிறீர்கள்?",
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  async function sendMessage() {
    if (!input.trim()) return;
    setLoading(true);
    setIsTyping(true);
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    try {
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input })
      });
      const data = await res.json();
      const botMessage: Message = {
        id: messages.length + 2,
        text: data.reply,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      const errorMessage: Message = {
        id: messages.length + 2,
        text: "Error connecting to backend.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    }
    setInput("");
    setIsTyping(false);
    setLoading(false);
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-background">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
          >
            <div className="flex items-start gap-3 max-w-[80%]">
              {!message.isUser && (
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                  <Leaf className="w-4 h-4 text-primary-foreground" />
                </div>
              )}
              <Card
                className={`p-3 transition-var(--transition-smooth) ${
                  message.isUser
                    ? "bg-chat-user text-chat-user-foreground rounded-tl-lg rounded-tr-lg rounded-bl-lg"
                    : "bg-chat-bot text-chat-bot-foreground rounded-tl-lg rounded-tr-lg rounded-br-lg"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
                <span className="text-xs opacity-70 mt-2 block">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </Card>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start gap-3 max-w-[80%]">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                <Leaf className="w-4 h-4 text-primary-foreground" />
              </div>
              <Card className="bg-chat-bot text-chat-bot-foreground p-3 rounded-tl-lg rounded-tr-lg rounded-br-lg">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                </div>
              </Card>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      {/* Input Area */}
      <div className="border-t bg-background/80 backdrop-blur-sm p-4">
        <div className="flex gap-2 max-w-4xl mx-auto">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything about farming..."
            className="flex-1 border-border focus:ring-primary"
            disabled={isTyping || loading}
          />
          <Button
            onClick={sendMessage}
            disabled={!input.trim() || isTyping || loading}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;