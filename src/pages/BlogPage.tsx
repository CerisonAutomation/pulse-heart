import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import { GlobalHeader } from '@/components/marketing/GlobalHeader';
import { GlobalFooter } from '@/components/marketing/GlobalFooter';
import { CookieConsent } from '@/components/marketing/CookieConsent';

const blogPosts = [
  {
    id: 1,
    title: 'Tips for a Great First Date',
    excerpt: 'Make your first impression count with these expert tips on how to navigate the exciting world of dating.',
    date: '2026-01-10',
    category: 'Dating Tips',
  },
  {
    id: 2,
    title: 'Building Meaningful Connections',
    excerpt: 'Learn how to foster genuine relationships that go beyond surface-level interactions.',
    date: '2026-01-08',
    category: 'Relationships',
  },
  {
    id: 3,
    title: 'Safety First: Online Dating Guide',
    excerpt: 'Essential safety tips to keep yourself protected while meeting new people online.',
    date: '2026-01-05',
    category: 'Safety',
  },
  {
    id: 4,
    title: 'The Art of Conversation',
    excerpt: 'Master the skills of engaging conversation and keep your matches interested.',
    date: '2026-01-03',
    category: 'Communication',
  },
  {
    id: 5,
    title: 'Profile Photo Tips',
    excerpt: 'Choose the perfect photos that showcase your authentic self and attract the right matches.',
    date: '2025-12-28',
    category: 'Profile Tips',
  },
  {
    id: 6,
    title: 'Long-Distance Dating Success',
    excerpt: 'Navigate the challenges of long-distance relationships with practical advice.',
    date: '2025-12-25',
    category: 'Relationships',
  },
];

const BlogPage = () => {
  useEffect(() => {
    document.title = 'FIND YOUR KING Blog | Life and Dating Tips';
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <GlobalHeader />

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="py-16 sm:py-20 px-4 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                FIND YOUR KING Blog
              </h1>
              <p className="text-lg sm:text-xl text-slate-600">
                Life and Dating Tips to help you on your journey
              </p>
            </motion.div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">{post.category}</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
                      <Calendar className="h-4 w-4" />
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                    </div>
                    <h2 className="text-xl font-semibold text-slate-900 mb-2">
                      {post.title}
                    </h2>
                    <p className="text-slate-600 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <Link
                      to={`/blog/${post.id}`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Read more
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <GlobalFooter />
      <CookieConsent />
    </div>
  );
};

export default BlogPage;
