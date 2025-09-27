import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  BookOpen,
  Plus,
  BarChart3,
  Users,
  Library,
  ArrowRight,
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-foreground mb-6 text-balance">
            Next Library Management
            <span className="text-primary"> Made Simple</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
            Streamline your library operations with our intuitive book
            management system. Track inventory, manage borrowing, and gain
            insights with powerful analytics.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/books">
                Browse Books <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/create-book">Add New Book</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors">
            <CardHeader>
              <BookOpen className="h-12 w-12 text-primary mb-4" />
              <CardTitle className="text-xl">Book Management</CardTitle>
              <CardDescription>
                Complete CRUD operations for your book inventory with real-time
                updates.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/books">
                  View Books <ArrowRight className="ml-2 h-3 w-3" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors">
            <CardHeader>
              <Plus className="h-12 w-12 text-primary mb-4" />
              <CardTitle className="text-xl">Easy Addition</CardTitle>
              <CardDescription>
                Quickly add new books to your collection with our streamlined
                form interface.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/create-book">
                  Add Book <ArrowRight className="ml-2 h-3 w-3" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors">
            <CardHeader>
              <Users className="h-12 w-12 text-primary mb-4" />
              <CardTitle className="text-xl">Borrowing System</CardTitle>
              <CardDescription>
                Efficient book borrowing with quantity tracking and due date
                management.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/books">
                  Start Borrowing <ArrowRight className="ml-2 h-3 w-3" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors">
            <CardHeader>
              <BarChart3 className="h-12 w-12 text-primary mb-4" />
              <CardTitle className="text-xl">Analytics</CardTitle>
              <CardDescription>
                Comprehensive borrowing summaries and insights into your library
                usage.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/borrow-summary">
                  View Summary <ArrowRight className="ml-2 h-3 w-3" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-4xl font-bold text-primary">1,000+</div>
            <div className="text-muted-foreground">Books Managed</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-primary">500+</div>
            <div className="text-muted-foreground">Active Borrowers</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-primary">99.9%</div>
            <div className="text-muted-foreground">Uptime</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Library className="h-6 w-6 text-primary" />
              <span className="text-sm text-muted-foreground">
                Next Library - Modern Library Management
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
