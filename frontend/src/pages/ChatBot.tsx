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
    if (
      userMessage.toLowerCase().includes("blood sugar") ||
      userMessage.toLowerCase().includes("glucose") ||
      userMessage.toLowerCase().includes("sugar levels") ||
      userMessage.toLowerCase().includes("monitor sugar")
    ) {
      response = "Monitoring your blood glucose levels consistently is essential for effective diabetes management. The recommended range is generally 70-130 mg/dL before meals and less than 180 mg/dL after meals. However, your healthcare provider may establish personalized targets based on your specific needs.";
    } else if (
      userMessage.toLowerCase().includes("diet") ||
      userMessage.toLowerCase().includes("food") ||
      userMessage.toLowerCase().includes("meal plan") ||
      userMessage.toLowerCase().includes("nutrition") ||
      userMessage.toLowerCase().includes("what to eat")
    ) {
      response = "A well-balanced diet plays a key role in managing diabetes. Emphasize foods with a low glycemic index, including non-starchy vegetables, lean proteins, and whole grains. Minimize consumption of refined sugars, sugary drinks, and processed foods. Consider consulting with a registered dietitian for a personalized nutrition plan.";
    } else if (
      userMessage.toLowerCase().includes("exercise") ||
      userMessage.toLowerCase().includes("physical activity") ||
      userMessage.toLowerCase().includes("workout") ||
      userMessage.toLowerCase().includes("fitness") ||
      userMessage.toLowerCase().includes("stay active")
    ) {
      response = "Regular physical activity is essential for managing diabetes and improving overall health. Aim for at least 150 minutes of moderate exercise per week, such as walking, swimming, or cycling. Always monitor your blood sugar levels before and after exercise, and carry a fast-acting carbohydrate in case of low blood sugar.";
    } else if (
      userMessage.toLowerCase().includes("medication") ||
      userMessage.toLowerCase().includes("insulin") ||
      userMessage.toLowerCase().includes("prescription") ||
      userMessage.toLowerCase().includes("medicine") ||
      userMessage.toLowerCase().includes("doses")
    ) {
      response = "Taking medications as prescribed is critical to managing your condition effectively. Always follow your healthcare provider's instructions regarding dosages and schedules. If you experience side effects or have concerns about your medications, consult your doctor rather than making changes on your own.";
    } else if (
      userMessage.toLowerCase().includes("symptoms") ||
      userMessage.toLowerCase().includes("feeling unwell") ||
      userMessage.toLowerCase().includes("signs of diabetes") ||
      userMessage.toLowerCase().includes("tired") ||
      userMessage.toLowerCase().includes("frequent urination")
    ) {
      response = "Symptoms such as fatigue, excessive thirst, frequent urination, or blurry vision could indicate blood sugar fluctuations. If you're experiencing these symptoms, please monitor your blood sugar and consult a healthcare provider promptly.";
    } else if (
      userMessage.toLowerCase().includes("hello") ||
      userMessage.toLowerCase().includes("hi") ||
      userMessage.toLowerCase().includes("hey") ||
      userMessage.toLowerCase().includes("greetings")
    ) {
      response = "Hello! I'm here to support you with general information about diabetes management. Let me know how I can assist you today.";
    } else if (
      userMessage.toLowerCase().includes("complications") ||
      userMessage.toLowerCase().includes("risks") ||
      userMessage.toLowerCase().includes("long-term effects")
    ) {
      response = "Managing diabetes effectively helps reduce the risk of complications like neuropathy, kidney disease, and heart problems. Regular checkups, healthy lifestyle choices, and medication adherence are key to prevention.";
    } else if (
      userMessage.toLowerCase().includes("stress") ||
      userMessage.toLowerCase().includes("mental health") ||
      userMessage.toLowerCase().includes("emotions") ||
      userMessage.toLowerCase().includes("anxiety")
    ) {
      response = "Stress and mental health can significantly impact blood sugar levels. Engage in stress-reducing activities such as meditation, yoga, or deep breathing, and consider reaching out to a mental health professional if needed.";
    } else if (
      userMessage.toLowerCase().includes("emergency") ||
      userMessage.toLowerCase().includes("low sugar") ||
      userMessage.toLowerCase().includes("hypoglycemia") ||
      userMessage.toLowerCase().includes("high sugar") ||
      userMessage.toLowerCase().includes("hyperglycemia")
    ) {
      response = "For hypoglycemia, consume a fast-acting carbohydrate like juice or glucose tablets and recheck your levels after 15 minutes. For hyperglycemia, stay hydrated and follow your care plan. Contact your healthcare provider if your levels remain unstable or you feel unwell.";
    } else {
      response = "Thank you for your message! For personalized advice or urgent concerns, please consult a healthcare professional. Is there anything specific you'd like assistance with?";
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
