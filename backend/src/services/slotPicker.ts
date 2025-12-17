import { ISceneTemplateLean } from "../../utils/generateDailyScene";

export function pickRandomSlots(template: ISceneTemplateLean) {
	const allSlots = [...template.slots];

	const numberOfItems = Math.max(
		1,
		Math.floor(Math.random() * template.maxItems) + 1
	);

	for (let i = allSlots.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[allSlots[i], allSlots[j]] = [allSlots[j], allSlots[i]];
	}

	const selectedSlots = allSlots.slice(0, numberOfItems);

	return selectedSlots;
}
