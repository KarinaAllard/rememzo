import { IGeneratedItem } from "../itemGenerator";
import { IItem } from "../../models/ItemsLibrary";
import { replaceNamePlaceholder } from "../replaceNamePlaceholder";

export function generateExistsInSceneQuestion(
	sceneItems: IGeneratedItem[],
	item: IItem,
	templateText: string,
	lang: "en" | "sv"
) {
	const exists = sceneItems.some((i) => i.itemId === item._id.toString());

	const questionText = replaceNamePlaceholder(templateText, item, lang);

	return {
		questionText,
		options: [
			{ text: lang === "sv" ? "Ja" : "Yes", isCorrect: exists },
			{ text: lang === "sv" ? "Nej" : "No", isCorrect: !exists },
		],
	};
}
