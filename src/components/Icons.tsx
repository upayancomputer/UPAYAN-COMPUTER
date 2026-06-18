import React from 'react';
import {
  Monitor,
  Cpu,
  GraduationCap,
  BookOpen,
  Users,
  CircuitBoard,
  MousePointerClick,
  LayoutGrid,
  Compass,
  Award,
  TrendingUp,
  BadgeCent,
  HeartHandshake,
  CheckCircle2,
  Sparkles,
  Briefcase,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Star,
  Check,
  ChevronDown,
  ChevronUp,
  X,
  Menu,
  ShieldCheck,
  Sparkle,
  BookOpenCheck,
  Send,
  Zap,
  Info,
  Loader2
} from 'lucide-react';

export const IconMap: Record<string, React.ComponentType<any>> = {
  Monitor,
  Cpu,
  GraduationCap,
  BookOpen,
  Users,
  CircuitBoard,
  MousePointerClick,
  LayoutGrid,
  Compass,
  Award,
  TrendingUp,
  BadgeCent,
  HeartHandshake,
  CheckCircle2,
  Sparkles,
  Briefcase
};

interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

export const Icon: React.FC<IconProps> = ({ name, className = '', size = 24 }) => {
  const Component = IconMap[name];
  if (!Component) {
    return <Info className={className} size={size} />;
  }
  return <Component className={className} size={size} />;
};

export {
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Star,
  Check,
  ChevronDown,
  ChevronUp,
  X,
  Menu,
  ShieldCheck,
  Send,
  Zap,
  BookOpen,
  GraduationCap,
  Sparkle,
  Loader2,
  Award
};
