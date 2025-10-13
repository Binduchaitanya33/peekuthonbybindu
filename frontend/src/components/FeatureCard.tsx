import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fadeInUp } from '../animations/motionVariants';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  to?: string; // optional route path to navigate to when clicked
}

export default function FeatureCard({ icon: Icon, title, description, to }: FeatureCardProps) {
  const card = (
    <motion.div
      variants={fadeInUp}
      whileHover={{ scale: 1.05, y: -5 }}
      className="card backdrop-blur-xl bg-card/40 hover:bg-card/60 border border-secondary/10"
    >
      <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-primary/10">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-foreground/70">{description}</p>
    </motion.div>
  );

  // If a `to` prop is provided, wrap the card in a Link so it navigates via react-router
  if (to) {
    return (
      <Link to={to} aria-label={title} className="block">
        {card}
      </Link>
    );
  }

  return card;
}
