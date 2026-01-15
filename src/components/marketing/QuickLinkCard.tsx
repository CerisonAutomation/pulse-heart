import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface QuickLinkCardProps {
  title: string;
  description: string;
  path: string;
  icon: LucideIcon;
  isPrimary?: boolean;
}

export const QuickLinkCard = ({
  title,
  description,
  path,
  icon: Icon,
  isPrimary = false,
}: QuickLinkCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 10px 40px -10px rgba(0,0,0,0.15)' }}
      transition={{ duration: 0.2 }}
    >
      <Link
        to={path}
        className={`block p-6 rounded-xl border transition-colors ${
          isPrimary
            ? 'bg-blue-600 border-blue-600 text-white hover:bg-blue-700'
            : 'bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50'
        }`}
      >
        <div className="flex items-start gap-4">
          <div
            className={`p-3 rounded-lg ${
              isPrimary ? 'bg-blue-500' : 'bg-blue-100'
            }`}
          >
            <Icon
              className={`h-6 w-6 ${isPrimary ? 'text-white' : 'text-blue-600'}`}
            />
          </div>
          <div className="flex-1">
            <h3
              className={`text-lg font-semibold mb-1 ${
                isPrimary ? 'text-white' : 'text-slate-900'
              }`}
            >
              {title}
            </h3>
            <p
              className={`text-sm ${
                isPrimary ? 'text-blue-100' : 'text-slate-600'
              }`}
            >
              {description}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default QuickLinkCard;
