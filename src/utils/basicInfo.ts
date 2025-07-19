import { JWT } from './jwt';

interface BasicInfo {
  key: string;
  value: string;
}

/**
 * 获取基本信息
 * @param key - 信息键名
 * @returns 基本信息值
 */
export async function getBasicInfo(key: string): Promise<string | null> {
  try {
    const response = await JWT.fetch(`/api/basic/${key}`, { method: 'GET' });
    
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error('获取基本信息失败');
    }
    
    const data = await response.json() as BasicInfo;
    return data.value;
  } catch (error) {
    console.error('获取基本信息错误:', error);
    throw error;
  }
}

/**
 * 更新基本信息
 * @param key - 信息键名
 * @param value - 信息值
 * @returns 是否更新成功
 */
export async function updateBasicInfo(key: string, value: string): Promise<boolean> {
  try {
    const response = await JWT.fetch('/api/basic', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, value })
    });
    
    if (!response.ok) {
      if (response.status === 400) {
        const error = await response.json();
        throw new Error(error.message || '更新信息失败: 缺少必要字段');
      }
      throw new Error('更新基本信息失败');
    }
    
    return true;
  } catch (error) {
    console.error('更新基本信息错误:', error);
    throw error;
  }
}