import { type ISceneItem } from "../types/IGame"

type PlaySceneProps = {
    items: ISceneItem[];
}

export const PlayScene = ({ items } : PlaySceneProps) => {
    return (
        <div className="relative w-full h-60">
            {items.map(item => (
                <div
                    key={item._id}
                    className="absolute w-12 h-12 bg-neutral-500 rounded-sm"
                    style={{
                        left: item.x,
                        top: item.y,
                    }}
                />
            ))}
        </div>
    )
}