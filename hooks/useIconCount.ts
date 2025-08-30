import { useEffect, useState } from "react";

const useIconCount = (
  iconSize: number = 40,
  wrapperId = "icon-wrapper"
): number => {
  const [iconCount, setIconCount] = useState<number>(0);

  useEffect(() => {
    const calculateIconCount = (wrapper: HTMLElement | null) => {
      if (wrapper) {
        const wrapperWidth = wrapper.clientWidth;
        const count = Math.floor(wrapperWidth / iconSize);
        setIconCount(count);
      }
    };

    const wrapper = document.getElementById(wrapperId);
    if (wrapper) {
      calculateIconCount(wrapper);

      const resizeObserver = new ResizeObserver(() => {
        calculateIconCount(wrapper);
      });

      resizeObserver.observe(wrapper);

      return () => {
        resizeObserver.unobserve(wrapper);
      };
    }
  }, [iconSize]);

  return iconCount;
};

export default useIconCount;
