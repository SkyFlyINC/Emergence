export interface User {
  id?: number;
  username: string;
  data?: string;
  permission: number;
  email: string;
}

export const UserUtils = {
    getUserFromLocalStorage: (): User | null => {
        const user = localStorage.getItem('user');
        if (user) {
            try {
                return JSON.parse(user) as User;
            } catch (e) {
                console.error('Error parsing user from localStorage:', e);
                return null;
            }
        }
        return null;
    },
    setUserToLocalStorage: (user: User): void => {
        localStorage.setItem('user', JSON.stringify(user));
    },
}