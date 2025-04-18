
import { useState } from 'react';
import { getChatResponse } from '@/utils/gemini';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const AIBuddy = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hey there! I'm your AI focus buddy. Ready to crush some goals together? 🚀" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getChatResponse(input);
      const aiMessage = { role: 'assistant' as const, content: response };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md border rounded-lg bg-black/20 p-4">
      <ScrollArea className="h-[300px] mb-4">
        <div className="space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={cn(
                "px-4 py-2 rounded-lg",
                msg.role === 'assistant' 
                  ? "bg-blue-500/20 ml-4" 
                  : "bg-purple-500/20 mr-4"
              )}
            >
              {msg.content}
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Chat with your focus buddy..."
          className="flex-1 bg-black/10"
        />
        <Button 
          onClick={sendMessage} 
          disabled={isLoading}
          className="bg-blue-500 hover:bg-blue-600"
        >
          {isLoading ? '...' : 'Send'}
        </Button>
      </div>
    </div>
  );
};
