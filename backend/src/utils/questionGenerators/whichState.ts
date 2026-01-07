import { IGeneratedItem } from "../itemGenerator";
import { IItem } from "../../models/ItemsLibrary";
import { resolveItemName } from "../resolveItemName";
import { resolveState } from "../resolveState";
import { replaceNamePlaceholder } from "../replaceNamePlaceholder";

export function generateWhichStateQuestion(
	sceneItems: IGeneratedItem[],
	itemsById: Map<string, IItem>,
	templateText: string,
	optionsCount: number,
	lang: "en" | "sv"
): { questionText: string; options: { text: string; isCorrect: boolean }[] } {
	const candidates = sceneItems
		.filter((i) => i.state !== "empty")
		.filter((i) => (itemsById.get(i.itemId)?.states || []).length > 1);

	if (!candidates.length) {
		throw new Error("No valid items for whichState question");
	}

	const selectedItem =
		candidates[Math.floor(Math.random() * candidates.length)];
	const itemsFromLibrary = itemsById.get(selectedItem.itemId);
	if (!itemsFromLibrary) throw new Error("Item not found in library");

	const states = itemsFromLibrary?.states || ["default"];
	const itemName = resolveItemName(itemsFromLibrary, lang, "base");

	let questionText = "";
	let options: { text: string; isCorrect: boolean }[] = [];

	if (states.length === 2) {
		const correctState = selectedItem.state;
		const templateStr =
			itemsFromLibrary.questionTemplate?.[lang] ??
			templateText ??
			"Was the {name:base} {state}?";
		questionText = replaceNamePlaceholder(
			templateStr,
			itemsFromLibrary,
			lang,
			correctState
		);

		options = [
			{ text: lang === "sv" ? "Ja" : "Yes", isCorrect: true },
			{ text: lang === "sv" ? "Nej" : "No", isCorrect: false },
		];

		options.sort(() => 0.5 - Math.random());
	} else {
		const templateStr =
			itemsFromLibrary.questionTemplate?.[lang] ??
			templateText ??
			"What was the state of {name:base}";

		questionText = replaceNamePlaceholder(templateStr, itemsFromLibrary, lang);

		const shuffledStates = [...states].sort(() => 0.5 - Math.random());
		const chosenOptions = shuffledStates.slice(
			0,
			Math.max(optionsCount, shuffledStates.length)
		);

		options = chosenOptions.map((s) => ({
			text: resolveState(itemsFromLibrary, lang, s),
			isCorrect: s === selectedItem.state,
		}));

		if (!options.some((o) => o.isCorrect)) {
			options[0] = {
				text: resolveState(itemsFromLibrary, lang, selectedItem.state),
				isCorrect: true,
			};
		}
	}

	return { questionText, options };
}
