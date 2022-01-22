import * as React from "react";

interface Rect {
  top: number;
  bottom: number;
  left: number;
  right: number;
  width: number;
  height: number;
}

const INITIAL_RECT = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  width: 0,
  height: 0,
};

export function useRect<T extends Element>(): [React.RefObject<T>, Rect] {
  const ref = React.useRef<T>(null);
  const [rect, setRect] = React.useState<Rect>(INITIAL_RECT);

  React.useEffect(() => {
    if (ref.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        const rect = entries[0].target.getBoundingClientRect();

        setRect({
          top: rect.top,
          bottom: rect.bottom,
          left: rect.left,
          right: rect.right,
          width: rect.width,
          height: rect.height,
        });
      });

      resizeObserver.observe(ref.current);

      return () => resizeObserver.disconnect();
    }

    return () => undefined;
  }, []);

  return [ref, rect];
}
