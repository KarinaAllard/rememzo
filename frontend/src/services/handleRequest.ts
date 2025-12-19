import type { AxiosResponse } from "axios";

export async function handleRequest<T>(
    request: Promise<AxiosResponse<T>>
): Promise<T> {
    try {
        const response = await request;
        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
}