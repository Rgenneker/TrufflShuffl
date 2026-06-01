import { type ReactNode } from "react";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export function CalculatorLayout({ 
  title, 
  description, 
  instructions, 
  children, 
  testimonial 
}: { 
  title: string; 
  description: string;
  instructions: ReactNode;
  children: ReactNode;
  testimonial: string;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <header className="border-b border-border bg-card/50 backdrop-blur sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-medium">
            <ArrowLeft className="w-4 h-4" />
            Back to Tools
          </Link>
        </div>
      </header>
      
      <main className="container mx-auto px-4 pt-12 max-w-4xl">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            {title}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            {description}
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="md:col-span-2">
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm mb-8">
              {children}
            </div>
            
            <div className="bg-sidebar rounded-xl p-6 border border-border">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-primary">
                What Our Users Are Saying
              </h3>
              <div className="prose prose-invert max-w-none text-muted-foreground text-sm leading-loose">
                <p>{testimonial}</p>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-bold text-lg mb-4 text-foreground">How to Use</h3>
                <div className="text-sm text-muted-foreground space-y-4">
                  {instructions}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
