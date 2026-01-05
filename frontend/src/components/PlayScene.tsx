import { type ISceneItem } from "../types/IGame"
import type { IItem } from "../types/IItemLibrary";

type PlaySceneProps = {
  items: ISceneItem[];
  itemsById: Map<string, IItem>;
  backgroundRef?: string;
};

export const PlayScene = ({ items, itemsById, backgroundRef } : PlaySceneProps) => {
    return (
        <div
            className="relative w-full h-60 md:h-80 lg:h-96"
            style={{
                backgroundImage: backgroundRef ? `url(/assets/scenes/${backgroundRef})` : undefined,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
            }}
        >
            {items.map(sceneItem => {
                const libraryItem = itemsById.get(sceneItem.itemId);

                if (!libraryItem) {
                console.warn("Missing library item for", sceneItem.itemId);
                return null;
                }

                const variationIndex = libraryItem.variations.indexOf(sceneItem.variation);
                const artFile =
                libraryItem.artRef[variationIndex] ?? libraryItem.artRef[0];

                if (libraryItem.type === "empty") {
                return null;
                }

                const src = `/assets/items/${libraryItem.type}/${artFile}`;

                return (
                <img
                    key={sceneItem._id}
                    src={src}
                    alt={libraryItem.name}
                    className="absolute select-none pointer-events-none"
                    style={{
                    left: sceneItem.x,
                    top: sceneItem.y,
                    width: 48,
                    height: 48,
                    }}
                    />
                );
            })}
        </div>
    )
}