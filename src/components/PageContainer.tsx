import type { ReactNode } from "react";

const PageContainer = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`w-screen h-screen flex flex-col items-center justify-center px-6 ${className}`}>
    {children}
  </div>
);

export default PageContainer;
