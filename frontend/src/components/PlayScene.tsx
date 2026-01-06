import { useEffect, useRef, useState } from "react";
import { type ISceneItem } from "../types/IGame"
import type { IItem } from "../types/IItemLibrary";

type PlaySceneProps = {
  items: ISceneItem[];
  itemsById: Map<string, IItem>;
  backgroundRef?: string;
  zoomFactor?: number;
};

const originalSceneSize = 1024;
const minSceneWidth = 600;

export const PlayScene = ({ items, itemsById, backgroundRef, zoomFactor = 1, } : PlaySceneProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);
    
    useEffect(() => {
      const updateScale = () => {
        if (!containerRef.current) return;
        const width = containerRef.current.clientWidth;

        const scaleBasedOnMin = Math.max(minSceneWidth / originalSceneSize, width / originalSceneSize);
        setScale(scaleBasedOnMin * zoomFactor);
      };
      
      updateScale();
      window.addEventListener("resize", updateScale);
      return () => window.removeEventListener("resize", updateScale);
  }, [zoomFactor]);

    return (
      <div className="flex justify-center w-full overflow-hidden border-2 border-(--cta) rounded-sm">
        <div
            ref={containerRef}
            className="relative overflow-hidden"
            style={{
                width: `${originalSceneSize * scale}px`,
                height: `${originalSceneSize * scale}px`,
                backgroundImage: backgroundRef ? `url(/assets/scenes/${backgroundRef})` : undefined,
                backgroundSize: `${originalSceneSize * scale}px ${originalSceneSize * scale}px`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                minWidth: `${minSceneWidth}px`,
            }}
        >
            {items.map(sceneItem => {
                const libraryItem = itemsById.get(sceneItem.itemId);

                if (!libraryItem || libraryItem.type === "empty") return null;

                const variationIndex = libraryItem.variations.indexOf(sceneItem.variation);
                const artFile =
                libraryItem.artRef[variationIndex] ?? libraryItem.artRef[0];

                // if (libraryItem.type === "empty") {
                // return null;
                // }

                const src = `/assets/items/${libraryItem.type}/${artFile}`;

                return (
                <img
                    key={sceneItem._id}
                    src={src}
                    alt={libraryItem.name}
                    className="absolute select-none pointer-events-none"
                    style={{
                     left: sceneItem.x * scale,
                      top: sceneItem.y * scale,
                      transform: "translate(-50%, -50%)",
                    }}
                    />
                );
            })}
        </div>
      </div>
    )
}