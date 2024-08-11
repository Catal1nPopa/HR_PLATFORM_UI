// utils/tokenUtils.js
export const getDecodedToken = (token) => {
  try {
    const payload = token.split(".")[1];
    const decodedPayload = JSON.parse(atob(payload));
    return decodedPayload;
  } catch (e) {
    console.error("Failed to decode token:", e);
    return null;
  }
};
