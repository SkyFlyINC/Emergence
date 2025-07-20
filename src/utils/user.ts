import JWT from "./jwt";

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
    removeUserFromLocalStorage: (): void => {
        localStorage.removeItem('user');
    },
    fetchUserData: async (id: number): Promise<User | null> => {
        try {
            const response = await JWT.fetch(`/api/auth/getUserInfo/${id}`, { method: 'GET' });
            if (!response.ok) {
                if (response.status === 404) return null;
                throw new Error('获取用户信息失败');
            }
            const userData = await response.json() as User;
            return userData;
        } catch (error) {
            console.error('获取用户数据错误:', error);
            throw error;
        }
    },
    fetchAllUsers: async (): Promise<User[] | null> => {
        try {
            const response = await JWT.fetch('/api/auth/getAllUsers', { method: 'GET' });
            if (!response.ok) {
                if (response.status === 403) return null;
                throw new Error('获取所有用户失败');
            }
            const users = await response.json() as User[];
            return users;
        } catch (error) {
            console.error('获取所有用户错误:', error);
            throw error;
        }
    },
    deleteUser: async (id: number): Promise<void> => {
        try {
            const response = await JWT.fetch(`/api/auth/deleteUser/${id}`, { method: 'DELETE' });
            if (!response.ok) {
                if (response.status === 403) throw new Error('权限不足');
                if (response.status === 404) throw new Error('用户未找到');
                throw new Error('删除用户失败');
            }
            const result = await response.json();
            console.log('用户删除成功:', result);
        } catch (error) {
            console.error('删除用户错误:', error);
            throw error;
        }
    },
    updateUser: async (id: number, data: Partial<User>): Promise<void> => {
        try {
            const response = await JWT.fetch(`/api/auth/updateUser/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                if (response.status === 403) throw new Error('权限不足');
                if (response.status === 404) throw new Error('用户未找到');
                throw new Error('更新用户失败');
                }
            const result = await response.json();
            console.log('用户更新成功:', result);
        } catch (error) {
            console.error('更新用户错误:', error);
            throw error;
        }
    },
    createUser: async (data: Partial<User>): Promise<void> => {
        try {
            const response = await JWT.fetch('/api/auth/createUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                if (response.status === 403) throw new Error('权限不足');
                if (response.status === 400) throw new Error('请填写所有必需字段');
                if (response.status === 409) throw new Error('用户名已存在');
                throw new Error('创建用户失败');
                }
                const result = await response.json();
                console.log('用户创建成功:', result);
                } catch (error) {
            console.error('创建用户错误:', error);
            throw error;
        }
    },
    

}