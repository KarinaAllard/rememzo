import { getOrCreateGuestId } from "./guest";

export type AttemptIdentity = 
| { userId: string }
| { guestId: string };

export const getAttemptIdentity = (): AttemptIdentity => {
    const token =
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");

    if (token) {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return { userId: payload.userId };
    }

    return { guestId: getOrCreateGuestId() };
}