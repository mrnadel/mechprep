'use client';

interface QuestionDiagramProps {
  svg: string;
  className?: string;
}

export default function QuestionDiagram({ svg, className = '' }: QuestionDiagramProps) {
  return (
    <div
      className={`flex justify-center my-4 p-4 rounded-xl bg-surface-50/50 border border-surface-200/50 ${className}`}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
