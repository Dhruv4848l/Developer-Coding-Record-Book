import { motion } from "framer-motion";
import { Github, Linkedin, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-16" style={{ borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-between gap-8"
        >
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <span className="text-lg font-bold text-white">
                Dhruv<span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, hsl(190, 95%, 60%), hsl(260, 80%, 65%))" }}>'s</span>
              </span>
              <span className="text-xs text-white/40 -mt-1 tracking-wider">
                CODE VAULT
              </span>
            </div>
          </div>

          {/* Copyright */}
          <p className="text-sm text-white/40">
            © 2026 Dhruv's CodeVault. Track your coding journey.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {[Github, Linkedin, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white/40 hover:text-white transition-all duration-300"
                style={{
                  background: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
