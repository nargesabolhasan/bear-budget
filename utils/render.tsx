import React from "react";

type SingleRenderProps = {
  when: boolean;
  children: React.ReactNode;
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
  children?: React.ReactNode;
};

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
