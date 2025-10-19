"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { mockArticles, articleCategories } from "@/lib/data";
import { Article, ArticleCategory } from "@/lib/types";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export default function EducationPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ArticleCategory | "All">("All");

  const filteredArticles = mockArticles.filter((article) => {
    const matchesCategory =
      selectedCategory === "All" || article.category === selectedCategory;
    const matchesSearch = article.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Health Education Hub
        </h1>
        <p className="text-muted-foreground">
          Browse articles, guides, and resources to learn more about your
          health.
        </p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search articles..."
            className="w-full appearance-none bg-background pl-8 shadow-none md:w-1/3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === "All" ? "default" : "outline"}
            onClick={() => setSelectedCategory("All")}
          >
            All
          </Button>
          {articleCategories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredArticles.map((article) => (
          <Card key={article.id} className="flex flex-col overflow-hidden">
             <Link href={`/education/${article.id}`} className="block">
              <div className="relative">
                <Image
                    src={article.imageUrl}
                    alt={article.title}
                    data-ai-hint={article.imageHint}
                    width={400}
                    height={225}
                    className="object-cover w-full aspect-video"
                />
                 <Badge className="absolute top-2 right-2">{article.category}</Badge>
              </div>
            </Link>
            <div className="flex flex-col flex-1 p-6">
              <CardTitle className="font-headline text-lg mb-2">
                 <Link href={`/education/${article.id}`} className="hover:underline">{article.title}</Link>
                </CardTitle>
              <CardContent className="p-0 flex-1">
                <p className="text-sm text-muted-foreground line-clamp-2">{article.summary}</p>
              </CardContent>
              <CardFooter className="p-0 pt-4 flex justify-between items-center">
                <span className="text-xs text-muted-foreground">
                  {article.readTime} min read
                </span>
                <Button asChild variant="secondary" size="sm">
                  <Link href={`/education/${article.id}`}>Read More</Link>
                </Button>
              </CardFooter>
            </div>
          </Card>
        ))}
      </div>
       {filteredArticles.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
            <p>No articles found.</p>
            <p className="text-sm">Try adjusting your search or filters.</p>
        </div>
       )}
    </div>
  );
}
