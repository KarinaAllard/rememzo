export const getOrCreateGuestId = (): string => {
    let guestId = sessionStorage.getItem("guestId");
    if (!guestId) {
        guestId = crypto.randomUUID();
        sessionStorage.setItem("guestId", guestId);
    }
    return guestId;
}
