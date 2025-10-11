export interface Resource {
  id: number;
  title: string;
  category: string;
  type: string;
  description: string;
  link: string;
  mentorRecommended: boolean;
  difficulty: string;
}

export const resources: Resource[] = [
  {
    id: 1,
    title: "React Complete Guide",
    category: "Frontend Development",
    type: "Course",
    description: "Master React from basics to advanced concepts",
    link: "#",
    mentorRecommended: true,
    difficulty: "Beginner"
  },
  {
    id: 2,
    title: "Python for Data Science",
    category: "Data Science",
    type: "Book",
    description: "Complete guide to data analysis with Python",
    link: "#",
    mentorRecommended: true,
    difficulty: "Intermediate"
  },
  {
    id: 3,
    title: "UX Design Fundamentals",
    category: "Design",
    type: "Course",
    description: "Learn user research, wireframing, and prototyping",
    link: "#",
    mentorRecommended: false,
    difficulty: "Beginner"
  },
  {
    id: 4,
    title: "Node.js Backend Mastery",
    category: "Backend Development",
    type: "Video Series",
    description: "Build scalable APIs and microservices",
    link: "#",
    mentorRecommended: true,
    difficulty: "Advanced"
  },
  {
    id: 5,
    title: "Product Management Essentials",
    category: "Product Management",
    type: "Course",
    description: "Strategy, roadmapping, and stakeholder management",
    link: "#",
    mentorRecommended: false,
    difficulty: "Beginner"
  },
  {
    id: 6,
    title: "DevOps with Kubernetes",
    category: "DevOps",
    type: "Tutorial",
    description: "Container orchestration and deployment automation",
    link: "#",
    mentorRecommended: true,
    difficulty: "Advanced"
  },
  {
    id: 7,
    title: "Machine Learning A-Z",
    category: "Data Science",
    type: "Course",
    description: "Hands-on ML algorithms and real-world projects",
    link: "#",
    mentorRecommended: true,
    difficulty: "Intermediate"
  },
  {
    id: 8,
    title: "System Design Interview Prep",
    category: "Software Development",
    type: "Book",
    description: "Master system design for technical interviews",
    link: "#",
    mentorRecommended: false,
    difficulty: "Advanced"
  }
];
