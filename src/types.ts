export interface Course {
  id: string;
  title: string;
  shortTitle: string;
  duration: string;
  category: 'core' | 'advanced' | 'diploma' | 'academic';
  icon: string;
  description: string;
  fullDescription: string;
  curriculum: string[];
  benefits: string[];
  opportunities: string[];
  learningOutcomes: string[];
  price?: string; // Optional: can display fee structure
  installments?: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  iconName: string;
  color: 'blue' | 'purple' | 'cyan' | 'indigo' | 'emerald';
}

export interface Statistic {
  id: string;
  value: number;
  suffix: string;
  label: string;
  iconName: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  course: string;
  avatarUrl: string;
  rating: number;
  review: string;
  date: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'lab' | 'classroom' | 'events' | 'certificates';
  imageUrl: string;
  aspectRatio: 'square' | 'video' | 'portrait' | 'wide';
}

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  course: string;
  message: string;
}
