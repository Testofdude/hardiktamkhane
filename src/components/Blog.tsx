import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Clock, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const posts = [
  {
    title: "Building Scalable React Applications",
    excerpt:
      "Learn the patterns and practices I use to build maintainable React apps that scale to millions of users.",
    date: "2024-01-15",
    readTime: "8 min read",
    category: "Development",
  },
  {
    title: "The Art of Product Thinking",
    excerpt:
      "How combining technical skills with product mindset leads to better solutions and happier users.",
    date: "2024-01-08",
    readTime: "6 min read",
    category: "Product",
  },
  {
    title: "Marketing Automation at Scale",
    excerpt:
      "Lessons learned from building and scaling a marketing automation platform to 5000+ users.",
    date: "2024-01-01",
    readTime: "10 min read",
    category: "Marketing",
  },
];

export const Blog = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="blog" ref={ref} className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Latest Thoughts</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Insights on technology, design, and entrepreneurship
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {posts.map((post, index) => (
            <motion.article
              key={post.title}
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
            >
              <div className="text-sm text-primary font-medium mb-2">{post.category}</div>
              <h3 className="text-xl font-display font-semibold mb-3 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <Button variant="outline" size="lg">
            View All Posts
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
