import React from "react";

type SingleRenderProps = {
  when: boolean;
  children: React.ReactNode; // this will be treated as "common content"
  fallback?: React.ReactNode;
};

type MultiRenderItem = {
  when: boolean;
  render: React.ReactNode;
};

type MultiRenderProps = {
  items: MultiRenderItem[];
  fallback?: React.ReactNode;
};

type RenderProps = (SingleRenderProps | MultiRenderProps) & {
  children?: React.ReactNode; // optional common content
};

/**
 * Flexible Render Component:
 * - Supports single condition OR multiple conditions
 * - `children` are treated as shared content, rendered only if a condition is true
 */
export const Render: React.FC<RenderProps> = ({
  children,
  fallback = null,
  ...props
}) => {
  const items = (props as MultiRenderProps).items;

  // multiple conditions
  if (items && items.length > 0) {
    for (const item of items) {
      if (item.when) {
        return (
          <>
            {children}
            {item.render}
          </>
        );
      }
    }
    return <>{fallback}</>;
  }

  // single condition
  const when = (props as SingleRenderProps).when;
  const singleChildren = (props as SingleRenderProps).children;

  return (
    <>
      {when ? (
        <>
          {children}
          {singleChildren}
        </>
      ) : (
        fallback
      )}
    </>
  );
};
