import type { IItem } from "../types/IItemLibrary";
import baseService from "./baseService";
import { handleRequest } from "./handleRequest";

export const fetchItemsLibrary = async (): Promise<IItem[]> => 
     handleRequest(
        baseService.get(`/items`)
    );