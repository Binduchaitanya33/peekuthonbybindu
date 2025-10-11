export interface Mentor {
  id: number;
  name: string;
  expertise: string;
  experience: string;
  bio: string;
  availability: string;
  rating: number;
}

export const mentors: Mentor[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    expertise: "Frontend Development",
    experience: "10+ years",
    bio: "Senior Frontend Engineer at Google. Passionate about teaching React and modern web technologies.",
    availability: "Weekends",
    rating: 4.9
  },
  {
    id: 2,
    name: "Michael Chen",
    expertise: "Data Science",
    experience: "8 years",
    bio: "Lead Data Scientist specializing in ML and AI. Love helping aspiring data scientists.",
    availability: "Evenings",
    rating: 4.8
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    expertise: "UX Design",
    experience: "12 years",
    bio: "Principal Designer with experience at Apple and Adobe. Focus on user-centered design.",
    availability: "Flexible",
    rating: 5.0
  },
  {
    id: 4,
    name: "David Park",
    expertise: "Backend Engineering",
    experience: "9 years",
    bio: "Staff Engineer building distributed systems. Mentor backend developers on architecture.",
    availability: "Weekdays",
    rating: 4.7
  },
  {
    id: 5,
    name: "Jessica Taylor",
    expertise: "Product Management",
    experience: "11 years",
    bio: "VP of Product at a startup. Help aspiring PMs break into product management.",
    availability: "Weekends",
    rating: 4.9
  },
  {
    id: 6,
    name: "Alex Kumar",
    expertise: "DevOps",
    experience: "7 years",
    bio: "DevOps Architect specializing in cloud infrastructure and Kubernetes.",
    availability: "Evenings",
    rating: 4.8
  }
];
