'use client';

interface MastersHeaderProps {
  title: string;
  description: string;
}

export function MastersHeader({ title, description }: MastersHeaderProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}