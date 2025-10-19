import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { mockArticles } from "@/lib/data";

export default function EducationPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Health Education Hub</h1>
        <p className="text-muted-foreground">Browse articles, guides, and resources to learn more about your health.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockArticles.map((article) => (
          <Card key={article.id} className="flex flex-col">
            <CardHeader className="p-0">
              <Image
                src={article.imageUrl}
                alt={article.title}
                data-ai-hint={article.imageHint}
                width={400}
                height={225}
                className="object-cover rounded-t-lg aspect-video"
              />
            </CardHeader>
            <div className="flex flex-col flex-1 p-6">
              <CardTitle className="font-headline text-lg">{article.title}</CardTitle>
              <CardDescription className="mt-2 flex-1">{article.summary}</CardDescription>
              <CardFooter className="p-0 pt-4 flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{article.readTime} min read</span>
                <Button asChild variant="secondary" size="sm">
                  <Link href="#">Read More</Link>
                </Button>
              </CardFooter>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
