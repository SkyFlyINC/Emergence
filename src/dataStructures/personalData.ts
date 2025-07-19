//
// Personal data structure
import type { Course } from "./course";

/**
 * 表示个人数据的基本信息。
 * @property {string} surname - 姓氏。
 * @property {string} email - 电子邮件地址。
 * @property {string} phone - 电话号码。
 * @property {string} avatar - 头像的URL或路径。
 * @property {string} gender - 性别。
 * @property {number} id - 唯一标识符。
 * @property {Course[]} courses - 参与的课程列表。
 * @property {number} salary - 薪资。
 */

export interface PersonalData {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  gender: string;
  id: number;
  courses: Course[];
}

export interface InstructorPersonalData extends PersonalData{
  salary: number;
}

/**
 * 表示课程评价的信息。
 * @property {number} id - 评价的唯一标识符。
 * @property {Course} course - 被评价的课程。
 * @property {InstructorPersonalData} instructor - 授课讲师的个人数据。
 * @property {string} content - 评价内容。
 * @property {number} rate - 评分。
 */

export interface Evaluation {
    id: number;
    course: Course;
    instructor: InstructorPersonalData;
    content: string;
    rate: number;
}

export interface StudentPersonalData extends PersonalData{
  birthday: string;
  courses: Course[];
  evaluationsByInstructor: Evaluation[];
  unpayment: number;
  payment: number;
  totalpayment: number;
}