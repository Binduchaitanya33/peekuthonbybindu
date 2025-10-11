import { motion } from 'framer-motion';
import { BookOpen, Award, ExternalLink } from 'lucide-react';
import { Resource } from '../data/resources';
import { fadeInUp } from '../animations/motionVariants';

interface ResourceCardProps {
  resource: Resource;
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -8 }}
      className="card backdrop-blur-xl bg-card/40 hover:bg-card/60 border border-secondary/10 relative"
    >
      {resource.mentorRecommended && (
        <div className="absolute top-4 right-4">
          <div className="flex items-center bg-warning/20 text-warning px-2 py-1 rounded-full text-xs font-medium">
            <Award className="h-3 w-3 mr-1" />
            Mentor Pick
          </div>
        </div>
      )}

      <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-primary/10">
        <BookOpen className="h-6 w-6 text-primary" />
      </div>

      <h3 className="text-lg font-semibold text-foreground mb-2">{resource.title}</h3>
      <p className="text-sm text-foreground/70 mb-4">{resource.description}</p>

      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-medium text-foreground/60 uppercase">{resource.type}</span>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          resource.difficulty === 'Beginner' ? 'bg-success/20 text-success' :
          resource.difficulty === 'Intermediate' ? 'bg-warning/20 text-warning' :
          'bg-destructive/20 text-destructive'
        }`}>
          {resource.difficulty}
        </span>
      </div>

      <a
        href={resource.link}
        className="button-secondary w-full flex items-center justify-center group"
      >
        Access Resource
        <ExternalLink className="h-4 w-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
      </a>
    </motion.div>
  );
}
