import { Person } from "../types";

/**
 * 全局搜索字段配置
 * 定义哪些字段参与全局搜索
 */
export const SEARCH_FIELDS: (keyof Person)[] = ["name", "role", "city", "age"];

/**
 * 检查 person 对象是否匹配搜索值
 */
export const matchesSearch = (person: Person, searchValue: string): boolean => {
  return SEARCH_FIELDS.some((field) => {
    const value = person[field];
    return String(value).toLowerCase().includes(searchValue);
  });
};
