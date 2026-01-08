export interface IItem {
  _id: string;
  name: string;
  type: string;
  variations: string[];
  states: string[];
  artRef: string[];
  variationSizes?: { width: number; height: number }[];
}