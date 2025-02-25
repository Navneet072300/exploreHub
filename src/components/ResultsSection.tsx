import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface ResultsSectionProps {
  title: string;
  icon: string;
  children: ReactNode;
}

export default function ResultsSection({
  title,
  icon,
  children,
}: ResultsSectionProps) {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="bg-purple-700 text-white">
        <CardTitle className="flex items-center justify-between text-lg">
          <span>{title}</span>
          <span>{icon}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 divide-y divide-gray-200 dark:divide-gray-700">
        {children}
      </CardContent>
    </Card>
  );
}
