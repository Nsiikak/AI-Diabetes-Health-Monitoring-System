import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Bot, Send, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your diabetes assistant. How can I help you today? Remember, I can provide general information, but I'm not a replacement for professional medical advice.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Mock response function - in a real app, this would call your NestJS backend
  const getAssistantResponse = async (userMessage: string) => {
    setIsTyping(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    let response = "";
    
    // Simple response logic based on keywords
    if (userMessage.toLowerCase().includes("blood sugar") || userMessage.toLowerCase().includes("glucose")) {
      response = "Monitoring your blood glucose levels regularly is essential for diabetes management. The target range is typically between 70-130 mg/dL before meals and less than 180 mg/dL after meals, but your doctor may set personalized targets for you.";
    } else if (userMessage.toLowerCase().includes("diet") || userMessage.toLowerCase().includes("food") || userMessage.toLowerCase().includes("eat")) {
      response = "A balanced diet is crucial for diabetes management. Focus on foods with low glycemic index, plenty of vegetables, lean proteins, and whole grains. Limit refined carbs, sugary foods, and processed items. Consider working with a dietitian to create a meal plan.";
    } else if (userMessage.toLowerCase().includes("exercise") || userMessage.toLowerCase().includes("activity")) {
      response = "Regular physical activity helps improve insulin sensitivity. Aim for at least 150 minutes of moderate exercise per week. Always check your blood sugar before and after exercise, and carry a fast-acting carbohydrate with you in case of hypoglycemia.";
    } else if (userMessage.toLowerCase().includes("medication") || userMessage.toLowerCase().includes("insulin")) {
      response = "Taking your medications as prescribed is vital. Never adjust your insulin or medication doses without consulting your healthcare provider first. If you're experiencing side effects, discuss them with your doctor instead of stopping the medication.";
    } else if (userMessage.toLowerCase().includes("hello") || userMessage.toLowerCase().includes("hi")) {
      response = "Hello there! I'm here to provide general information about diabetes management. How can I assist you today?";
    } else {
      response = "Thank you for your question. For specific advice tailored to your condition, please consult with your healthcare provider. Is there something else I can help you with regarding diabetes management?";
    }
    
    setIsTyping(false);
    
    return {
      role: "assistant" as const,
      content: response,
      timestamp: new Date(),
    };
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = {
      role: "user" as const,
      content: input,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    
    try {
      const assistantResponse = await getAssistantResponse(input);
      setMessages(prev => [...prev, assistantResponse]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col h-[calc(100vh-160px)]"
      >
        <div className="flex items-center justify-between mb-4">
          <h1 className="heading-1">Diabetes Assistant</h1>
          <Card className="bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800 p-2">
            <div className="flex items-center gap-2 text-sm text-amber-700 dark:text-amber-400">
              <AlertTriangle className="h-4 w-4" />
              <p>This assistant provides general information only and is not a substitute for professional medical advice.</p>
            </div>
          </Card>
        </div>

        {/* Messages Container */}
        <Card className="flex-1 overflow-hidden flex flex-col mb-4">
          <CardContent className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex items-start gap-3 max-w-[80%]",
                    message.role === "user" ? "ml-auto" : ""
                  )}
                >
                  <div
                    className={cn(
                      "flex items-center justify-center w-8 h-8 rounded-full",
                      message.role === "user"
                        ? "bg-primary text-primary-foreground order-last"
                        : "bg-glucose-normal text-white"
                    )}
                  >
                    {message.role === "user" ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </div>
                  <div
                    className={cn(
                      "p-3 rounded-lg",
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    )}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-start gap-3 max-w-[80%]">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-glucose-normal text-white">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="p-3 rounded-lg bg-muted">
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 rounded-full bg-foreground animate-pulse-light" style={{ animationDelay: '0ms' }}></div>
                      <div className="h-2 w-2 rounded-full bg-foreground animate-pulse-light" style={{ animationDelay: '300ms' }}></div>
                      <div className="h-2 w-2 rounded-full bg-foreground animate-pulse-light" style={{ animationDelay: '600ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
        </Card>

        {/* Input Area */}
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your question about diabetes..."
            className="flex-1"
          />
          <Button onClick={handleSendMessage} disabled={!input.trim() || isTyping}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>
    </Layout>
  );
};

export default ChatBot;
