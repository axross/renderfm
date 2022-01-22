import * as React from "react";
import { twMerge } from "tailwind-merge";
import { useRect } from "~/hooks/use-rect";

export interface SeekBarProps {
  value?: number;
  defaultValue?: number;
  disabled?: boolean;
  onChange?: (value: number) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const SeekBar: React.VFC<SeekBarProps> = ({
  value: givenValue,
  defaultValue = 0,
  disabled = false,
  onChange = () => undefined,
  className,
  ...props
}) => {
  if (typeof givenValue === "number" && (givenValue < 0 || givenValue > 1)) {
    throw new Error("props.value needs to be 0 <= value <= 1.");
  }

  const [ref, rect] = useRect<HTMLDivElement>();
  const [value, setValue] = React.useState(givenValue ?? defaultValue);
  const [isDragging, setDragging] = React.useState(false);
  const [draggingX, setDraggingX] = React.useState(0);
  const _value = givenValue ?? value;

  const onMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    if (disabled) {
      return;
    }

    const mouseMoveEventListner = (e: MouseEvent) => {
      const relativeX = Math.min(
        Math.max(e.clientX - rect.left, 0),
        rect.width
      );
      const v = relativeX / rect.width;

      if (givenValue === undefined) {
        setDraggingX(relativeX);
        setValue(v);
      }

      onChange(v);
    };

    const mouseUpEventListener = () => {
      window.removeEventListener("mousemove", mouseMoveEventListner);
      window.removeEventListener("mouseup", mouseUpEventListener);

      setDragging(false);
    };

    window.addEventListener("mousemove", mouseMoveEventListner);
    window.addEventListener("mouseup", mouseUpEventListener);

    const relativeX = Math.min(Math.max(e.clientX - rect.left, 0), rect.width);
    const v = relativeX / rect.width;

    setDragging(true);

    if (givenValue === undefined) {
      setDraggingX(relativeX);
      setValue(v);
    }

    onChange(v);
  };

  return (
    <div
      className={twMerge(
        "relative h-2 bg-slate-500/50 rounded-full cursor-pointer",
        disabled ? "cursor-not-allowed" : null,
        className
      )}
      onMouseDown={onMouseDown}
      role="meter"
      aria-valuemin={0}
      aria-valuemax={1}
      aria-valuenow={_value}
      ref={ref}
      {...props}
    >
      <div
        className="absolute top-0 left-0 bottom-0 bg-yellow-500 disabled:bg-yellow-500/50 rounded-full"
        style={{
          width:
            isDragging && givenValue === undefined
              ? `${draggingX}px`
              : `${_value * rect.width}px`,
          transitionProperty: isDragging ? "none" : undefined,
        }}
        data-testid="indicator-active"
      />
    </div>
  );
};
