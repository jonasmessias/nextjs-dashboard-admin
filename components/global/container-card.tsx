import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface ContainerCardProps {
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  contentClassName?: string;
}

export function ContainerCard({
  title,
  description,
  children,
  className = "w-full",
  contentClassName = "flex flex-col gap-4"
}: ContainerCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className={contentClassName}>
        {children}
      </CardContent>
    </Card>
  );
} 