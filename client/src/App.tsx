import { Switch, Route, Link } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ThemeToggle from "@/components/ThemeToggle";
import Home from "@/pages/home";
import Streaks from "@/pages/streaks";
import NotFound from "@/pages/not-found";
import { Flame, Mic } from "lucide-react";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/streaks" component={Streaks} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background">
          <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="max-w-5xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
              <Link href="/">
                <button className="flex items-center gap-2 hover-elevate px-3 py-2 rounded-md">
                  <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                    <Mic className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <span className="font-heading font-bold text-lg">VoiceNote</span>
                </button>
              </Link>
              
              <div className="flex items-center gap-2">
                <Link href="/streaks">
                  <button className="flex items-center gap-2 px-3 py-2 rounded-md hover-elevate" data-testid="link-streaks">
                    <Flame className="w-5 h-5 text-orange-500" />
                    <span className="font-medium hidden sm:inline">Streaks</span>
                  </button>
                </Link>
                <ThemeToggle />
              </div>
            </div>
          </header>
          
          <Router />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
