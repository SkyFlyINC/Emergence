//封装发送请求相关函数，自动将JWT token添加到请求头中

import JWT from "./jwt";


//封装fetch函数 

export function fetchWithJWT(url: string, options: RequestInit = {}): Promise<Response> {
  const token = JWT.getToken();
  const headers = new Headers(options.headers);

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  return fetch(url, {
    ...options,
    headers
  });
}

//调用示例
// fetchWithJWT('/api/some-endpoint', {
//   method: 'GET'
// }).then(response => response.json())