export const persistUser = (user) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('user', JSON.stringify(user));
  }
};

export const getPersistedUser = () => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  return null;
};

export const clearPersistedUser = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user');
  }
};