export interface Vacancy {
  id: number;
  company: string;
  position: string;
  deadline: string;
  status: "Ongoing" | "Closed" | "Upcoming";
  openings: number;
  applyLink: string;
}

export const vacancies: Vacancy[] = [
  {
    id: 1,
    company: "Google",
    position: "Software Engineer",
    deadline: "2025-11-15",
    status: "Ongoing",
    openings: 25,
    applyLink: "#"
  },
  {
    id: 2,
    company: "Microsoft",
    position: "Cloud Solutions Architect",
    deadline: "2025-10-30",
    status: "Ongoing",
    openings: 15,
    applyLink: "#"
  },
  {
    id: 3,
    company: "Amazon",
    position: "Data Engineer",
    deadline: "2025-09-20",
    status: "Closed",
    openings: 0,
    applyLink: "#"
  },
  {
    id: 4,
    company: "Meta",
    position: "Product Designer",
    deadline: "2025-11-30",
    status: "Upcoming",
    openings: 10,
    applyLink: "#"
  },
  {
    id: 5,
    company: "Apple",
    position: "iOS Developer",
    deadline: "2025-10-25",
    status: "Ongoing",
    openings: 20,
    applyLink: "#"
  },
  {
    id: 6,
    company: "Netflix",
    position: "Backend Engineer",
    deadline: "2025-11-05",
    status: "Ongoing",
    openings: 12,
    applyLink: "#"
  }
];
