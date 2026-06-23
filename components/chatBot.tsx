"use client";

import { useChat } from "@ai-sdk/react";
import { Bot, Send, X, MessageSquare, Terminal } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface LocalMessage {
  id: string;
  role: string;
  content?: string;
  parts?: Array<{ type: string; text?: string | unknown;[key: string]: unknown }>;
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, sendMessage, status } = useChat();
  const [input, setInput] = useState("");
  const isLoading = status === "streaming" || status === "submitted";

  const chatRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage({ text: input });
    setInput("");
  };

  // Open/Close Animation
  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        chatRef.current,
        { opacity: 0, scale: 0.9, y: 20, pointerEvents: "none" },
        { opacity: 1, scale: 1, y: 0, pointerEvents: "all", duration: 0.5, ease: "back.out(1.4)" }
      );
    }
  }, [isOpen]);

  // Magnetic trigger effect
  useEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const onMove = (e: MouseEvent) => {
      const rect = trigger.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.4;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.4;
      gsap.to(trigger, { x, y, duration: 0.3 });
    };

    const onLeave = () => {
      gsap.to(trigger, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" });
    };

    trigger.addEventListener("mousemove", onMove);
    trigger.addEventListener("mouseleave", onLeave);
    return () => {
      trigger.removeEventListener("mousemove", onMove);
      trigger.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          ref={triggerRef}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 w-14 h-14 md:w-16 md:h-16 rounded-full bg-white text-black shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(255,255,255,0.4)] transition-shadow z-50 flex items-center justify-center group overflow-hidden"
          aria-label="Open AI Assistant"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shimmer" />
          <MessageSquare size={24} className="relative z-10" />
        </button>
      )}

      {/* Chat Window */}
      <div
        ref={chatRef}
        className={cn(
          "fixed bottom-6 right-6 md:bottom-8 md:right-8 w-[calc(100vw-48px)] md:w-[400px] h-[550px] md:h-[600px] max-h-[85vh] flex flex-col z-50 overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a]/90 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]",
          !isOpen && "hidden opacity-0"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-5 border-b border-white/5 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="p-2 md:p-2.5 bg-white/5 rounded-xl border border-white/10">
                <Terminal size={16} className="md:size-[18px] text-white/80" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 md:w-3 md:h-3 bg-emerald-500 border-2 border-[#0a0a0a] rounded-full animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-[12px] md:text-sm text-white tracking-wide">ELECTRO</h3>
                <span className="text-[8px] md:text-[10px] font-mono px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-white/40 uppercase tracking-tighter">v2.0</span>
              </div>
              <p className="text-[9px] md:text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">Security Protocol Active</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/40 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scrollbar-hide">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/10">
                <Bot className="size-7 md:size-8" />
              </div>
              <div className="space-y-1 px-4">
                <p className="text-[13px] md:text-sm text-white/60 font-medium">Encrypted Session Initialized</p>
                <p className="text-[10px] md:text-[11px] text-white/25 font-mono uppercase tracking-widest">Awaiting Command...</p>
              </div>
            </div>
          ) : (
            (messages as unknown as LocalMessage[]).map((m: LocalMessage) => (
              <div
                key={m.id}
                className={cn("flex w-full", m.role === "user" ? "justify-end" : "justify-start")}
              >
                <div
                  className={cn(
                    "relative p-3 md:p-4 rounded-xl max-w-[90%] md:max-w-[85%] text-[12px] md:text-[13px] leading-relaxed transition-all",
                    m.role === "user"
                      ? "bg-white text-black font-semibold rounded-tr-none shadow-xl"
                      : "bg-white/5 border border-white/10 text-white/80 rounded-tl-none font-light"
                  )}
                >
                  <div className="absolute top-0 opacity-20 pointer-events-none -translate-y-full mb-1">
                    <span className="text-[8px] md:text-[9px] font-mono uppercase tracking-widest">{m.role}</span>
                  </div>
                  {(() => {
                    const contentStr: string =
                      m.content ||
                      (m.parts
                        ? m.parts
                          .filter((p) => p.type === "text")
                          .map((p) => (p as { text: string }).text)
                          .join("\n")
                        : "");

                    return (
                      <div className="prose prose-sm dark:prose-invert max-w-none wrap-break-word">
                        <ReactMarkdown
                          components={{
                            p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                            ul: ({ children }) => <ul className="list-disc ml-4 mb-2">{children}</ul>,
                            ol: ({ children }) => <ol className="list-decimal ml-4 mb-2">{children}</ol>,
                            li: ({ children }) => <li className="mb-1">{children}</li>,
                            strong: ({ children }) => <strong className="font-bold text-white">{children}</strong>,
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
          {isLoading && (
            <div className="flex justify-start">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 rounded-tl-none">
                <div className="flex gap-1.5">
                  {[0, 150, 300].map((delay) => (
                    <span
                      key={delay}
                      className="w-1 h-1 bg-white/40 rounded-full animate-bounce"
                      style={{ animationDelay: `${delay}ms` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 md:p-5 border-t border-white/5 bg-white/[0.01]">
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 md:gap-3 bg-white/5 rounded-xl p-1 md:p-1.5 pl-3 md:pl-4 border border-white/10 focus-within:border-white/30 transition-all shadow-inner"
          >
            <input
              value={input}
              onChange={handleInputChange}
              placeholder="Query Photon..."
              className="flex-1 bg-transparent border-none outline-none text-[11px] md:text-xs py-2 md:py-2.5 text-white placeholder:text-white/20 disabled:opacity-50"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-2 md:p-2.5 rounded-lg bg-white text-black disabled:opacity-50 hover:bg-white/90 transition-all flex items-center justify-center"
            >
              <Send size={14} strokeWidth={2.5} />
            </button>
          </form>
          <div className="flex items-center justify-center gap-2 mt-3 opacity-20 group">
            <div className="h-px flex-1 bg-white/20" />
            <span className="text-[8px] md:text-[9px] font-mono uppercase tracking-[0.3em]">End-to-End Encrypted</span>
            <div className="h-px flex-1 bg-white/20" />
          </div>
        </div>
      </div>
    </>
  );
}
