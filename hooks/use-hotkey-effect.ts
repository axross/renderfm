import * as React from "react";

export function useHotkeyEffect(
  key: string,
  callback: () => void,
  deps: React.DependencyList
) {
  React.useEffect(() => {
    const onKeyPress = (e: KeyboardEvent) => {
      if (e.key === key) {
        e.preventDefault();

        callback();
      }
    };

    globalThis.window.addEventListener("keydown", onKeyPress);

    return () => globalThis.window.removeEventListener("keydown", onKeyPress);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, react-hooks/exhaustive-deps
  }, [key, callback, ...deps]);
}
