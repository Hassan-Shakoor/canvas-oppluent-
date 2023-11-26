export const setLocalStorage = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error setting data in localStorage:', error);
    }
  }

export const getLocalStorage = (key) => {
    try {
      const data = localStorage.getItem(key);
      if (data) {
        return JSON.parse(data);
      }
      return false
    } catch (error) {
      console.error('Error getting data from localStorage:', error);
    }
  }
  