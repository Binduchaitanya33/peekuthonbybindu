import { motion } from 'framer-motion';
import { MapPin, Briefcase, DollarSign, ChevronRight } from 'lucide-react';
import { Job } from '../data/jobs';
import { fadeInUp } from '../animations/motionVariants';

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -8 }}
      className="card backdrop-blur-xl bg-card/40 hover:bg-card/60 border border-secondary/10"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-1">{job.title}</h3>
          <p className="text-primary font-medium">{job.company}</p>
        </div>
        <span className="px-3 py-1 bg-info/20 text-info rounded-full text-xs font-medium">
          {job.type}
        </span>
      </div>

      <p className="text-foreground/70 text-sm mb-4">
        {job.description
          .replace(/<[^>]*>/g, '') // Remove HTML tags
          .slice(0, 100) // Take only first 100 characters
          .trim() + '...'} {/* Add ellipsis */}
      </p>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-foreground/70">
          <MapPin className="h-4 w-4 mr-2 text-success" />
          {job.location}
        </div>
        <div className="flex items-center text-sm text-foreground/70">
          <DollarSign className="h-4 w-4 mr-2 text-primary" />
          {job.salary}
        </div>
        <div className="flex items-center text-sm text-foreground/70">
          <Briefcase className="h-4 w-4 mr-2 text-info" />
          {job.domain}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {job.requirements.slice(0, 3).map((req, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-secondary/20 text-foreground/80 rounded text-xs font-medium"
          >
            {req}
          </span>
        ))}
        {job.requirements.length > 3 && (
          <span className="px-2 py-1 text-foreground/60 text-xs">
            +{job.requirements.length - 3} more
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2">
        <a
          href={`https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(job.title + ' ' + job.domain)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="button-primary flex items-center justify-center group"
        >
          LinkedIn Jobs
          <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </a>
        <a
          href={`https://www.naukri.com/jobs-in-india?q=${encodeURIComponent(job.title)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="button-secondary flex items-center justify-center group"
        >
          Naukri.com
          <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </motion.div>
  );
}
