export interface Service {
  id: string;
  slug: string;
  name: string;
  category: string;
  shortDescription: string;
  description: string;
  icon?: string;
  tags?: string[];
}

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  services: Service[];
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  industry: string;
  challenge: string;
  solution: string;
  outcome: string;
  testimonial?: string;
  author?: string;
  metrics?: Array<{ label: string; value: string }>;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  content?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  image?: string;
}

export interface JobPosting {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  description: string;
  requirements: string[];
  benefits: string[];
}
