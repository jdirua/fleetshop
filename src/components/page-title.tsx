import React from 'react';

interface PageTitleProps {
  title: string;
  description?: string;
  isHub?: boolean;
}

export function PageTitle({ title, description, isHub = false }: PageTitleProps) {
  if (isHub) {
    return (
        <div className="flex items-center justify-between mb-5">
            <h1 className="text-2xl font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg px-3 py-1 shadow-lg">
                {title}
            </h1>
        </div>
    );
  }
  
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-white">{title}</h1>
      {description && <p className="text-muted-foreground mt-1">{description}</p>}
    </div>
  );
}
