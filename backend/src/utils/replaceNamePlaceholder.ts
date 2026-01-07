import { IItem } from "../models/ItemsLibrary";
import { resolveItemName } from "./resolveItemName";
import { resolveState } from "./resolveState";

export function replaceNamePlaceholder(
    template: string,
    item: IItem,
    lang: string,
    state?: string
): string {
    return template
        .replace(/\{name(?::(base|indefinite|definite))?\}/g, (_, form) => {
            return resolveItemName(item, lang, (form as "base" | "indefinite" | "definite") || "base");
        })
        .replace("{state}", state ? resolveState(item, lang, state) : "");
}