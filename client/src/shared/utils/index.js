export const generateRandomId = () => {
    const timestamp = Date.now().toString(36);
    const randomString = Math.random().toString(36).substr(2, 5);
    const randomId = timestamp + randomString;
    return randomId;
  }