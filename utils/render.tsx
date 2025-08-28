import { ReactNode } from "react";

type RenderProps = {
  when: boolean;
  children: ReactNode;
  fallback?: ReactNode;
};

export const Render = ({ when, children, fallback = null }: RenderProps) => {
  return <>{when ? children : fallback}</>;
};
