"use client";

import { Settings } from "@/components/settings";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChat } from "@ai-sdk/react";
import { useEffect, useState } from "react";

export default function Home() {
  const [universalPrompt, setUniversalPrompt] = useState("");
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      body: {
        universalPrompt,
      },
    });

  useEffect(() => {
    const storedPrompt = localStorage.getItem("universalPrompt");
    if (storedPrompt) {
      setUniversalPrompt(storedPrompt);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("universalPrompt", universalPrompt);
  }, [universalPrompt]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-12 lg:p-24">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-1 lg:items-center space-x-2 lg:flex-row">
              <CardTitle>Ayo{"'"}s Daply AI Chatbot</CardTitle>
              {universalPrompt && <Badge>Prompt Active</Badge>}
            </div>
            <Settings
              universalPrompt={universalPrompt}
              setUniversalPrompt={setUniversalPrompt}
            />
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] w-full pr-4">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md p-3 rounded-lg ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-center items-center pt-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              )}
            </div>
          </ScrollArea>
          <form
            onSubmit={handleSubmit}
            className="mt-4 flex items-center space-x-2"
          >
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="flex-grow"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading}>
              Send
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
