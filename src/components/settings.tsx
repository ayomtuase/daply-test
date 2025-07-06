"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";

interface SettingsProps {
  universalPrompt: string;
  setUniversalPrompt: (prompt: string) => void;
}

export function Settings({
  universalPrompt,
  setUniversalPrompt,
}: SettingsProps) {
  const handleClear = () => {
    setUniversalPrompt("");
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Settings</Button>
      </SheetTrigger>
      <SheetContent className="px-4">
        <SheetHeader>
          <SheetTitle>Universal Prompt</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <p className="text-sm text-muted-foreground">
            This prompt will be prepended to every message you send. Changes are
            saved automatically.
          </p>
          <Textarea
            value={universalPrompt}
            onChange={(e) => setUniversalPrompt(e.target.value)}
            placeholder="Enter your universal prompt here..."
            rows={20}
          />
          <Button onClick={handleClear} variant="secondary">
            Clear Prompt
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
