"use client";

import { useChat } from "@ai-sdk/react";
import { Bot, Send, X, MessageSquare } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import { useState, useEffect, useRef } from "react";

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, sendMessage, status } = useChat();
  const [input, setInput] = useState("");
  const isLoading = status === "streaming" || status === "submitted";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage({ text: input });
    setInput("");
  };
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 p-4 rounded-full bg-primary text-primary-foreground shadow-xl hover:scale-105 transition-transform z-50 flex items-center justify-center"
          aria-label="Open Photon Security AI Chat"
        >
          <MessageSquare size={24} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-95 h-150 max-h-[80vh] flex flex-col bg-background border border-border rounded-2xl shadow-2xl z-50 overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-card">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-full">
                <Bot size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Electro</h3>
                <p className="text-xs text-muted-foreground">AI Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-muted rounded-full transition-colors"
            >
              <X size={18} className="text-muted-foreground" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-3 opacity-70">
                <Bot size={48} className="text-muted-foreground opacity-50" />
                <p className="text-sm text-muted-foreground px-4">
                  Hello! I'm Electro, your AI Assistant. How can I help you?
                </p>
              </div>
            ) : (
              messages.map((m: any) => (
                <div
                  key={m.id}
                  className={`flex w-full ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`p-3 rounded-2xl max-w-[85%] text-sm ${
                      m.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-muted rounded-bl-sm space-y-2"
                    }`}
                  >
                    {(() => {
                      const contentStr: string =
                        m.content ||
                        (m.parts
                          ? m.parts
                              .filter((p: any) => p.type === "text")
                              .map((p: any) => p.text)
                              .join("\n")
                          : "");

                      return (
                        <div className="prose prose-sm dark:prose-invert max-w-none wrap-break-word">
                          <ReactMarkdown
                            components={{
                              p: ({ children }: { children?: React.ReactNode }) => <p className="mb-2 last:mb-0">{children}</p>,
                              ul: ({ children }: { children?: React.ReactNode }) => <ul className="list-disc ml-4 mb-2">{children}</ul>,
                              ol: ({ children }: { children?: React.ReactNode }) => <ol className="list-decimal ml-4 mb-2">{children}</ol>,
                              li: ({ children }: { children?: React.ReactNode }) => <li className="mb-1">{children}</li>,
                              strong: ({ children }: { children?: React.ReactNode }) => <strong className="font-bold">{children}</strong>,
                            }}
                          >
                            {contentStr}
                          </ReactMarkdown>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              ))
            )}
            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start animate-pulse">
                <div className="p-3 rounded-2xl bg-muted rounded-bl-sm max-w-[85%]">
                  <div className="flex gap-1">
                    <span
                      className="w-1.5 h-1.5 bg-foreground/30 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></span>
                    <span
                      className="w-1.5 h-1.5 bg-foreground/30 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></span>
                    <span
                      className="w-1.5 h-1.5 bg-foreground/30 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 border-t bg-card">
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 bg-muted/50 rounded-full p-1 pl-4 border border-border focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all"
            >
              <input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask about Photon Security..."
                className="flex-1 bg-transparent border-none outline-none text-sm py-2 disabled:opacity-50"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="p-2 rounded-full bg-primary text-primary-foreground disabled:opacity-50 hover:opacity-90 transition-opacity"
              >
                <Send size={16} className={isLoading ? "opacity-0" : ""} />
                {isLoading && (
                  <Bot
                    size={16}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin duration-3000"
                  />
                )}
              </button>
            </form>
            <div className="text-center mt-2">
              <span className="text-[10px] text-muted-foreground">
                AI can make mistakes. Verify critical security information.
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
