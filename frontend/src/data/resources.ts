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
    title: "React.js Complete Guide for Beginners",
    category: "Frontend Development",
    type: "Tutorial",
    description: "Comprehensive GeeksForGeeks guide covering React.js fundamentals, components, state management, and more",
    link: "https://www.geeksforgeeks.org/reactjs/getting-started-with-reactjs-a-complete-guide-for-beginners/",
    mentorRecommended: true,
    difficulty: "Beginner"
  },
  {
    id: 2,
    title: "Data Science with Python Tutorial",
    category: "Data Science",
    type: "Tutorial",
    description: "Comprehensive GeeksForGeeks guide covering Python for Data Science, NumPy, Pandas, Visualization, and Machine Learning",
    link: "https://www.geeksforgeeks.org/data-science/data-science-with-python-tutorial/",
    mentorRecommended: true,
    difficulty: "Intermediate"
  },
  {
    id: 3,
    title: "Fundamentals of SOLID UI/UX Design",
    category: "Design",
    type: "Tutorial",
    description: "Complete guide to UI/UX design principles, user research, design thinking, and prototyping fundamentals",
    link: "https://www.geeksforgeeks.org/websites-apps/fundamentals-of-solid-ui-ux-design/",
    mentorRecommended: true,
    difficulty: "Beginner"
  },
  {
    id: 4,
    title: "Node.js Official Getting Started Guide",
    category: "Backend Development",
    type: "Documentation",
    description: "Official Node.js introduction and getting started guide covering core concepts, installation, and fundamentals",
    link: "https://nodejs.org/en/learn/getting-started/introduction-to-nodejs",
    mentorRecommended: true,
    difficulty: "Advanced"
  },
  {
    id: 5,
    title: "Product Management Essentials by Coursera",
    category: "Product Management",
    type: "Course",
    description: "Learn essential product management skills: product strategy, design thinking, roadmap planning, and product development lifecycle",
    link: "https://www.coursera.org/learn/product-management-essentials",
    mentorRecommended: true,
    difficulty: "Intermediate"
  },
  {
    id: 6,
    title: "DevOps with Kubernetes - University of Helsinki",
    category: "DevOps",
    type: "Course",
    description: "Free, comprehensive course covering Kubernetes, container orchestration, CI/CD, and cloud-native application deployment",
    link: "https://courses.mooc.fi/org/uh-cs/courses/devops-with-kubernetes",
    mentorRecommended: true,
    difficulty: "Advanced"
  },
  {
    id: 7,
    title: "Complete Machine Learning Tutorial",
    category: "Data Science",
    type: "Tutorial",
    description: "Comprehensive GeeksForGeeks guide covering ML algorithms, supervised & unsupervised learning, neural networks, and practical implementations",
    link: "https://www.geeksforgeeks.org/machine-learning/machine-learning/",
    mentorRecommended: true,
    difficulty: "Intermediate"
  },
  {
    id: 8,
    title: "How to Crack System Design Interviews",
    category: "Software Development",
    type: "Tutorial",
    description: "Comprehensive guide on system design interview preparation, including scalability, distributed systems, and real-world architecture examples",
    link: "https://www.geeksforgeeks.org/interview-experiences/how-to-crack-system-design-round-in-interviews/",
    mentorRecommended: true,
    difficulty: "Advanced"
  }
];
