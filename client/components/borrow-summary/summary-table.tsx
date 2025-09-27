import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { BorrowSummary } from '@/lib/types';
import { BarChart3, BookOpen } from 'lucide-react';

interface SummaryTableProps {
  borrowSummary: BorrowSummary[];
  loading: boolean;
}

export function SummaryTable({ borrowSummary, loading }: SummaryTableProps) {
  return (
    <Card className="border-border bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          <span>Borrowing Summary by Title</span>
        </CardTitle>
        <CardDescription>
          Total quantity borrowed for each book title
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        ) : borrowSummary.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Book Title</TableHead>
                <TableHead>ISBN</TableHead>
                <TableHead className="text-right">Total Borrowed</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {borrowSummary.map((summary, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {summary?.book.title}
                  </TableCell>
                  <TableCell className="font-mono text-sm text-muted-foreground">
                    {summary.book?.isbn}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant="outline" className="font-mono">
                      {summary.totalQuantity}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8">
            <BookOpen className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-muted-foreground">
              No books have been borrowed yet
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
