"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const formSchema = z.object({
  query: z.string().min(2, {
    message: "Search query must be at least 2 characters.",
  }),
});

export function SearchForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    router.push(`/results?q=${encodeURIComponent(values.query)}`);
  }

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex space-x-2">
                    <Input 
                      placeholder="Enter your search query..." 
                      className="flex-1" 
                      {...field} 
                    />
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Searching
                        </>
                      ) : (
                        "Search"
                      )}
                    </Button>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="youtube">YouTube</TabsTrigger>
              <TabsTrigger value="github">GitHub</TabsTrigger>
              <TabsTrigger value="papers">Papers</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="text-sm text-muted-foreground pt-2">
              Search across all platforms including YouTube, GitHub, research papers, and blogs.
            </TabsContent>
            <TabsContent value="youtube" className="text-sm text-muted-foreground pt-2">
              Search for YouTube videos related to your query.
            </TabsContent>
            <TabsContent value="github" className="text-sm text-muted-foreground pt-2">
              Find GitHub repositories matching your search terms.
            </TabsContent>
            <TabsContent value="papers" className="text-sm text-muted-foreground pt-2">
              Discover research papers and academic content.
            </TabsContent>
          </Tabs>
        </form>
      </Form>
    </div>
  );
}