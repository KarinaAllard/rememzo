import { IItem } from "../models/ItemsLibrary";

export function resolveState(
    item: IItem,
    lang: string,
    state: string
): string {
    return item.stateTranslations?.[lang]?.[state]
        || item.stateTranslations?.["en"]?.[state]
        || state;
}