import { IItem } from "../models/ItemsLibrary";

export function resolveItemName(
    item: IItem,
    lang: string,
    form: "base" | "indefinite" | "definite" = "base"
): string {
    const entry = item.translations?.[lang] || item.translations?.["en"];

    if (!entry) return item.name;

    return entry?.[form] || entry?.base || item.name;
}