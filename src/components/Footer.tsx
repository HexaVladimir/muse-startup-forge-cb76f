import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-border/50">
      <div className="container mx-auto">
        <div className="text-center text-muted-foreground">
          <p className="flex items-center justify-center gap-2">
            Built with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> in Lovable by{" "}
            <span className="font-semibold text-foreground">HEXA</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
