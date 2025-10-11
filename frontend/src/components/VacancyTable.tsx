import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Vacancy } from '../data/vacancies';
import { fadeInUp } from '../animations/motionVariants';

interface VacancyTableProps {
  vacancies: Vacancy[];
}

export default function VacancyTable({ vacancies }: VacancyTableProps) {
  const statusColors = {
    Ongoing: 'bg-success/20 text-success',
    Closed: 'bg-secondary/20 text-secondary',
    Upcoming: 'bg-info/20 text-info',
  };

  return (
    <div className="overflow-x-auto">
      <motion.table
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="w-full backdrop-blur-xl bg-card/40 rounded-xl shadow-lg border border-secondary/10 overflow-hidden"
      >
        <thead className="bg-secondary/20">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold text-foreground uppercase tracking-wider">
              Company
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-foreground uppercase tracking-wider">
              Position
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-foreground uppercase tracking-wider">
              Deadline
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-foreground uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-foreground uppercase tracking-wider">
              Openings
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-foreground uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-secondary/10">
          {vacancies.map((vacancy) => (
            <motion.tr
              key={vacancy.id}
              whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.03)' }}
              className="transition-colors"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-semibold text-foreground">{vacancy.company}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-foreground">{vacancy.position}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-foreground/70">{vacancy.deadline}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    statusColors[vacancy.status]
                  }`}
                >
                  {vacancy.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-foreground font-medium">{vacancy.openings}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {vacancy.status === 'Ongoing' && (
                  <a
                    href={vacancy.applyLink}
                    className="inline-flex items-center text-primary hover:opacity-80 font-medium text-sm group"
                  >
                    Apply
                    <ExternalLink className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </a>
                )}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </motion.table>
    </div>
  );
}
