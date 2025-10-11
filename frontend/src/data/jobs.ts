export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string[];
  domain: string;
}

export const jobs: Job[] = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Tech Solutions Inc.",
    location: "Remote",
    type: "Full-time",
    salary: "$80,000 - $120,000",
    description: "Build modern web applications using React and TypeScript",
    requirements: ["React", "TypeScript", "CSS", "REST APIs"],
    domain: "Software Development"
  },
  {
    id: 2,
    title: "Data Scientist",
    company: "Analytics Corp",
    location: "New York, NY",
    type: "Full-time",
    salary: "$100,000 - $150,000",
    description: "Analyze large datasets and build ML models",
    requirements: ["Python", "Machine Learning", "SQL", "Statistics"],
    domain: "Data Science"
  },
  {
    id: 3,
    title: "UX Designer",
    company: "Creative Studio",
    location: "San Francisco, CA",
    type: "Contract",
    salary: "$70,000 - $100,000",
    description: "Design user-centered digital experiences",
    requirements: ["Figma", "User Research", "Prototyping", "Design Systems"],
    domain: "Design"
  },
  {
    id: 4,
    title: "Backend Engineer",
    company: "Cloud Systems",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$90,000 - $130,000",
    description: "Build scalable server-side applications",
    requirements: ["Node.js", "PostgreSQL", "Docker", "AWS"],
    domain: "Software Development"
  },
  {
    id: 5,
    title: "Product Manager",
    company: "Innovation Labs",
    location: "Boston, MA",
    type: "Full-time",
    salary: "$110,000 - $160,000",
    description: "Lead product strategy and development",
    requirements: ["Product Strategy", "Agile", "Analytics", "Communication"],
    domain: "Product Management"
  },
  {
    id: 6,
    title: "DevOps Engineer",
    company: "Infrastructure Co",
    location: "Seattle, WA",
    type: "Full-time",
    salary: "$95,000 - $140,000",
    description: "Manage CI/CD pipelines and cloud infrastructure",
    requirements: ["Kubernetes", "CI/CD", "Linux", "Terraform"],
    domain: "DevOps"
  }
];
