import { useEffect, useRef, useState } from "react";
import { type ISceneItem } from "../types/IGame";
import type { IItem } from "../types/IItemLibrary";

type PlaySceneProps = {
  items: ISceneItem[];
  itemsById: Map<string, IItem>;
  backgroundRef?: string;
  zoomFactor?: number;
};

const originalSceneSize = 1024;
const minSceneWidth = 600;

export const PlayScene = ({
  items,
  itemsById,
  backgroundRef,
  zoomFactor = 1,
}: PlaySceneProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return;

      const parentWidth = containerRef.current.parentElement?.clientWidth ?? window.innerWidth;


      const calculatedScale = Math.max(parentWidth / originalSceneSize, minSceneWidth / originalSceneSize);
      setScale(calculatedScale * zoomFactor);
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [zoomFactor]);

  const scaledSize = originalSceneSize * scale;

  return (
    <div className="flex justify-center w-full max-w-3xl overflow-hidden border-2 border-(--cta) rounded-sm">
      <div
        ref={containerRef}
        className="relative overflow-hidden w-full"
        style={{
          width: `${scaledSize}px`,
          height: `${scaledSize}px`,
          minWidth: `${minSceneWidth}px`,
          backgroundImage: backgroundRef ? `url(/assets/scenes/${backgroundRef})` : undefined,
          backgroundSize: `${scaledSize}px ${scaledSize}px`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {items.map((sceneItem) => {
          const libraryItem = itemsById.get(sceneItem.itemId);
          if (!libraryItem || libraryItem.type === "empty") return null;

          const variationIndex = libraryItem.variations.indexOf(sceneItem.variation);
          const artFile = libraryItem.artRef[variationIndex] ?? libraryItem.artRef[0];
          const src = `/assets/items/${libraryItem.type}/${artFile}`;

          const size = libraryItem.variationSizes?.[variationIndex];

          return (
            <img
              key={sceneItem._id}
              src={src}
              alt={libraryItem.name}
              className="absolute select-none pointer-events-none"
              style={{
                left: sceneItem.x * scale,
                top: sceneItem.y * scale,
                width: size ? `${size.width * scale}px` : undefined,
                height: size ? `${size.height * scale}px` : undefined,
                transform: "translate(-50%, -50%)",
              }}
            />
          );
        })}
      </div>
    </div>
  );
};