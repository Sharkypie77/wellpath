import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { mockArticles } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ArticleDetailPage({ params }: { params: { id: string } }) {
  const article = mockArticles.find((a) => a.id === params.id);

  if (!article) {
    notFound();
  }

  const relatedArticles = mockArticles
    .filter((a) => a.category === article.category && a.id !== article.id)
    .slice(0, 2);

  return (
    <div className="max-w-4xl mx-auto">
      <Button variant="outline" asChild className="mb-8">
        <Link href="/education">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to all articles
        </Link>
      </Button>
      <article className="space-y-8">
        <header className="space-y-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              {article.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="capitalize">{tag}</Badge>
              ))}
            </div>
            <h1 className="text-4xl font-bold tracking-tight font-headline">{article.title}</h1>
            <p className="text-muted-foreground text-sm">
              By {article.author} on {format(article.publishDate, 'MMMM dd, yyyy')}
            </p>
          </div>
          <div className="relative aspect-video">
            <Image
              src={article.imageUrl}
              alt={article.title}
              data-ai-hint={article.imageHint}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </header>

        <div className="prose prose-lg max-w-none dark:prose-invert">
          <p>{article.content}</p>
        </div>
      </article>

      {relatedArticles.length > 0 && (
        <aside className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight font-headline mb-4">Related Articles</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {relatedArticles.map((related) => (
              <Card key={related.id}>
                <Link href={`/education/${related.id}`}>
                    <Image
                        src={related.imageUrl}
                        alt={related.title}
                        data-ai-hint={related.imageHint}
                        width={400}
                        height={225}
                        className="object-cover rounded-t-lg aspect-video"
                    />
                </Link>
                <CardHeader>
                  <CardTitle className="text-lg font-headline">
                    <Link href={`/education/${related.id}`} className="hover:underline">{related.title}</Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">{related.summary}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </aside>
      )}
    </div>
  );
}
