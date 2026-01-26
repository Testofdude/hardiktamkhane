import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { PageTransition } from "@/components/layout/PageTransition";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeft, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <PageTransition>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-lg">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 mb-8">
            <AlertTriangle className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-6xl md:text-8xl font-display font-bold gradient-text mb-4">404</h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            This page doesn't exist in our system.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-medium transition-transform hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5" />
            Return Home
          </Link>
        </div>
      </main>
      <Footer />
    </PageTransition>
  );
};

export default NotFound;
