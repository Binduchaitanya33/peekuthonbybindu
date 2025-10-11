import { motion } from 'framer-motion';
import { Star, Calendar, MessageCircle } from 'lucide-react';
import { Mentor } from '../data/mentors';
import { fadeInUp } from '../animations/motionVariants';

interface MentorCardProps {
  mentor: Mentor;
}

export default function MentorCard({ mentor }: MentorCardProps) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -8 }}
      className="card backdrop-blur-xl bg-card/40 hover:bg-card/60 border border-secondary/10"
    >
      <div className="flex items-start mb-4">
        <div className="w-16 h-16 bg-gradient-to-r from-primary to-info rounded-full flex items-center justify-center text-foreground text-2xl font-bold mr-4 shadow-lg shadow-primary/20">
          {mentor.name.charAt(0)}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground">{mentor.name}</h3>
          <p className="text-sm text-primary font-medium">{mentor.expertise}</p>
          <div className="flex items-center mt-1">
            <Star className="h-4 w-4 text-warning fill-warning mr-1" />
            <span className="text-sm font-medium text-foreground">{mentor.rating}</span>
            <span className="text-xs text-foreground/60 ml-1">({mentor.experience})</span>
          </div>
        </div>
      </div>

      <p className="text-sm text-foreground/70 mb-4">{mentor.bio}</p>

      <div className="flex items-center text-sm text-foreground/70 mb-4">
        <Calendar className="h-4 w-4 mr-2 text-info" />
        Available: {mentor.availability}
      </div>

      <button className="button-primary w-full shadow-lg shadow-primary/20 hover:shadow-primary/40 flex items-center justify-center group">
        <MessageCircle className="h-4 w-4 mr-2" />
        Connect Now
      </button>
    </motion.div>
  );
}
