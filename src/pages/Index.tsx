import ChatInterface from '@/components/ChatInterface';
import { Sprout } from 'lucide-react';
import farmBackground from '@/assets/farm-background.jpg';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Header */}
      <header className="bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
              <Sprout className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">FarmBot Assistant</h1>
              <p className="text-sm text-muted-foreground">Your intelligent farming companion</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="max-w-6xl mx-auto h-[calc(100vh-80px)]">
        <div className="relative h-full">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{ backgroundImage: `url(${farmBackground})` }}
          />
          
          {/* Chat Interface */}
          <div className="relative h-full">
            <ChatInterface />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;