import { MessageSquare, Sparkles, Heart } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: MessageSquare,
      title: "Tell Us Your Interests",
      description: "Share what you're passionate about - technology, education, healthcare, or any field that excites you.",
    },
    {
      icon: Sparkles,
      title: "AI Generates Ideas",
      description: "Our advanced AI analyzes your interests and generates unique startup ideas with detailed business models.",
    },
    {
      icon: Heart,
      title: "Save Your Favorites",
      description: "Bookmark the ideas you love and access them anytime. Refine and explore your entrepreneurial journey.",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 px-6 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to discover your next big idea
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="glass-card p-8 rounded-2xl hover:scale-105 transition-transform duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                
                <div className="relative">
                  <span className="absolute -top-12 -right-4 text-8xl font-bold text-primary/5">
                    {index + 1}
                  </span>
                  <h3 className="text-2xl font-semibold mb-4 relative z-10">{step.title}</h3>
                  <p className="text-muted-foreground relative z-10">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
