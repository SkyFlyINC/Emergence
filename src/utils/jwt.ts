import {jwtDecode} from 'jwt-decode';

const JWT = {
    setToken: (token: string) => {
        localStorage.setItem('jwt_token', token);
    },
    getToken: () => {
        return localStorage.getItem('jwt_token');
    },
    removeToken: () => {
        localStorage.removeItem('jwt_token');
    },
    getUserFromToken: () => {
        const token = JWT.getToken();
        if (!token) return null;

        try {
            return jwtDecode(token);
        } catch (error) {
            JWT.removeToken(); // 如果token无效则移除
            return null;
        }
    },
    isTokenValid: () => {
        const user = JWT.getUserFromToken();
        if (!user || !user.exp) return false;

        // exp是以秒为单位的时间戳
        return Date.now() < user.exp * 1000;
    }

}

export default JWT;
export { JWT };