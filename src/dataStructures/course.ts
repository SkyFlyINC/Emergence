/**
 * 课程相关数据结构和工具类。
 * 包含课程、课程成员、时间安排等接口定义，以及相关的工具方法。
 */

import JWT from "../utils/jwt";

/**
 * 表示日期的接口。
 * @property year - 年份。
 * @property month - 月份（1-12）。
 * @property day - 日期（1-31）。
 */
export interface Day {
    year: number;
    month: number;
    day: number;
}

/**
 * 表示一天中的时间的接口，继承自 `Day`。
 * @property hour - 小时（0-23）。
 * @property minute - 分钟（0-59）。
 */
export interface TimeInDay extends Day {
    hour: number;
    minute: number;
}

/**
 * 日期和时间相关的工具方法。
 */
export const DayUtils = {
    /**
     * 从 `Date` 对象中提取日期信息。
     * @param date - 日期对象。
     * @returns 包含年、月、日的对象。
     */
    getDay: (date: Date): Day => {
        return {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate()
        };
    },
    /**
     * 将日期对象转换为字符串格式（YYYY-MM-DD）。
     * @param day - 日期对象。
     * @returns 日期字符串。
     */
    getDayString: (day: Day): string => {
        return `${day.year}-${day.month}-${day.day}`;
    },
    /**
     * 从日期字符串中提取日期信息。
     * @param dateString - 日期字符串。
     * @returns 包含年、月、日的对象。
     */
    getDayFromDateString: (dateString: string): Day => {
        const date = new Date(dateString);
        return DayUtils.getDay(date);
    },
    /**
     * 从 `TimeInDay` 对象中提取日期信息。
     * @param timeInDay - 包含时间的日期对象。
     * @returns 包含年、月、日的对象。
     */
    getDayFromTimeInDay: (timeInDay: TimeInDay): Day => {
        return {
            year: timeInDay.year,
            month: timeInDay.month,
            day: timeInDay.day
        };
    },
    /**
     * 从 `Date` 对象中提取时间和日期信息。
     * @param date - 日期对象。
     * @returns 包含年、月、日、小时、分钟的对象。
     */
    getTimeInDay: (date: Date): TimeInDay => {
        return {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate(),
            hour: date.getHours(),
            minute: date.getMinutes()
        };
    },
    /**
     * 将时间对象转换为字符串格式（HH:MM）。
     * @param timeInDay - 包含时间的对象。
     * @returns 时间字符串。
     */
    getTimeInDayString: (timeInDay: TimeInDay): string => {
        return `${timeInDay.hour}:${timeInDay.minute}`;
    },
    /**
     * 从日期字符串中提取时间和日期信息。
     * @param dateString - 日期字符串。
     * @returns 包含年、月、日、小时、分钟的对象。
     */
    getTimeInDayFromDateString: (dateString: string): TimeInDay => {
        const date = new Date(dateString);
        return DayUtils.getTimeInDay(date);
    },
    /**
     * 从时间字符串中提取日期信息。
     * @param timeInDayString - 时间字符串（HH:MM）。
     * @returns 包含年、月、日的对象。
     */
    getDayFromTimeInDayString: (timeInDayString: string): Day => {
        const date = new Date(`2021-01-01T${timeInDayString}`);
        return DayUtils.getDay(date);
    }
};

/**
 * 课程成员角色的接口。
 * @property type - 角色类型标识符。
 * @property name - 角色名称。
 */
export interface CourseMemberRole {
    type: number;
    name: string;
}

/**
 * 学生角色定义。
 */
export const StudentRole: CourseMemberRole = {
    type: 0,
    name: '学生'
};

/**
 * 任课老师角色定义。
 */
export const InstructorRole: CourseMemberRole = {
    type: 1,
    name: '任课老师'
};

/**
 * 助教角色定义。
 */
export const HelperRole: CourseMemberRole = {
    type: 2,
    name: '助教'
};

/**
 * 单次课程时间安排的接口。
 * @property day - 日期。
 * @property start - 开始时间。
 * @property end - 结束时间。
 * @property signedMembers - 已签到的成员ID列表。
 */
export interface signalTimeArrangement {
    day: Day;
    start: TimeInDay;
    end: TimeInDay;
    signedMembers: number[];
}

/**
 * 课程时间表，包含多个时间安排。
 */
export interface timeTable extends Array<signalTimeArrangement> {
    [index: number]: signalTimeArrangement;
}

/**
 * 课程成员的接口。
 * @property id - 成员ID。
 * @property role_in_course - 成员角色。
 * @property courses_left - 剩余课程次数。
 * @property totalCourseCount - 总课时。
 * @property discount - 折扣总额。
 */
export interface CourseMember {
    id: number;
    role_in_course: CourseMemberRole;
    leftCourseCount: number;
    totalCourseCount: number;
    discount: number;
    realSignalCourseCost: number;
}

/**
 * 课程的接口。
 * @property id - 课程ID。
 * @property name - 课程名称。
 * @property description - 课程描述（可选）。
 * @property instructors - 任课老师列表。
 * @property students - 学生列表。
 * @property timeTable - 课程时间表。
 * @property defultCourseCost - 默认课时花费。
 * @property defultTotalCourseCount - 总课时。
 * @property signalCoursePrice - 单个课时价格。
 * @property totalCoursePrice - 总课时价格。
 */
export interface Course {
    id: number;
    name: string;
    description?: string;
    instructors: CourseMember[];
    students: CourseMember[];
    timeTable: timeTable;
    defultCourseCost: number;
    defultTotalCourseCount: number;
    signalCoursePrice: number;
    totalCoursePrice?: number;
}

/**
 * 课程相关的工具方法。
 */
export const CourseUtils = {
    /**
     * 根据课程ID获取课程信息。
     * @param id - 课程ID。
     * @returns 课程对象。
     * @throws 如果获取失败，抛出错误。
     */
    fetchCourse: async (id: number): Promise<Course> => {
        const response = await JWT.fetch(`/api/course/${id}`, { method: 'GET' });
        if (!response.ok) {
            throw new Error('获取课程信息失败');
        }
        const course = await response.json() as Course;
        return course;
    },
    /**
     * 获取所有课程信息。
     * @returns 课程列表。
     * @throws 如果获取失败，抛出错误。
     */
    fetchAllCourses: async (): Promise<Course[]> => {
        const response = await JWT.fetch('/api/course', { method: 'GET' });
        if (!response.ok) {
            throw new Error('获取课程信息失败');
        }
        const courses = await response.json() as Course[];
        return courses;
    },
    /**
     * 创建新课程。
     * @param course - 课程对象。
     * @returns 是否创建成功。
     * @throws 如果创建失败，抛出错误。
     */
    createCourse: async (course: Course): Promise<boolean> => {
        const response = await JWT.fetch('/api/course', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(course)
        });
        if (!response.ok) {
            throw new Error('创建课程失败');
        }
        return true;
    },
    /**
     * 更新课程信息。
     * @param course - 课程对象。
     * @returns 是否更新成功。
     * @throws 如果更新失败，抛出错误。
     */
    updateCourse: async (course: Course): Promise<boolean> => {
        const response = await JWT.fetch('/api/course', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(course)
        });
        if (!response.ok) {
            throw new Error('更新课程信息失败');
        }
        return true;
    },
    /**
     * 删除课程。
     * @param id - 课程ID。
     * @returns 是否删除成功。
     * @throws 如果删除失败，抛出错误。
     */
    deleteCourse: async (id: number): Promise<boolean> => {
        const response = await JWT.fetch(`/api/course/${id}`, { method: 'DELETE' });
        if (!response.ok) {
            throw new Error('删除课程失败');
        }
        return true;
    },
    /**
     * 获取课程中已签到的成员ID列表。
     * @param id - 课程ID。
     * @returns 已签到的成员ID列表。
     */
    getSignedMembersFromCourse: async (id: number): Promise<number[]> => {
        const course = await CourseUtils.fetchCourse(id);
        const today = DayUtils.getDay(new Date());
        course.timeTable.forEach((timeArrangement) => {
            if (timeArrangement.day.day == today.day && timeArrangement.day.month == today.month && timeArrangement.day.year == today.year) {
                return timeArrangement.signedMembers;
            }
        });
        return [];
    },
    /**
     * 获取课程的所有成员（包括任课老师和学生）。
     * @param id - 课程ID。
     * @returns 成员列表。
     */
    getMembersFromCourse: async (id: number): Promise<CourseMember[]> => {
        const course = await CourseUtils.fetchCourse(id);
        return course.instructors.concat(course.students);
    },
    /**
     * 设置课程成员的剩余课程次数。
     * @param id - 课程ID。
     * @param coursesLeft - 剩余课程次数。
     * @returns 是否设置成功。
     * @throws 如果设置失败，抛出错误。
     */
    setMemberCoursesLeft: async (id: number, coursesLeft: number): Promise<boolean> => {
        const course = await CourseUtils.fetchCourse(id);
        const signedMembers = await CourseUtils.getSignedMembersFromCourse(id);
        course.students.forEach((student) => {
            if (signedMembers.includes(student.id)) {
                student.leftCourseCount = coursesLeft;
            }
        });
        const response = await JWT.fetch('/api/course', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(course)
        });
        if (!response.ok) {
            throw new Error('更新课程信息失败');
        }
        return true;
    },
    /**
     * 为课程成员签到。
     * @param id - 课程ID。
     * @param memberID - 成员ID。
     * @param courseCost - 所扣课时（可选）。
     * @returns 是否签到成功。
     * @throws 如果签到失败或成员已签到，抛出错误。
     */
    signMemberToCourse: async (id: number, memberID: number, courseCost?: number): Promise<boolean> => {
        const course = await CourseUtils.fetchCourse(id);
        const signedMembers = await CourseUtils.getSignedMembersFromCourse(id);
        const today = DayUtils.getDay(new Date());
        if (signedMembers.includes(memberID)) {
            throw new Error('该成员已签到');
        }
        course.timeTable.forEach((timeArrangement) => {
            if (timeArrangement.day.day == today.day && timeArrangement.day.month == today.month && timeArrangement.day.year == today.year) {
                timeArrangement.signedMembers.push(memberID);
                CourseUtils.setMemberCoursesLeft(id, course.students.find((student) => student.id == memberID)!.leftCourseCount - (courseCost ? courseCost : 1));
                return;
            }
        })
        const response = await JWT.fetch('/api/course', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(course)
        });
        if (!response.ok) {
            throw new Error('更新课程信息失败');
        }
        return true;
    }
};

export const StatesticsUtils = {
    //计算单日课销
    caculateSinalCoursePriceByTimeTable: (course: Course): number => {
        const today = DayUtils.getDay(new Date());
        let totalPrice = 0;
        course.timeTable.forEach((timeArrangement) => {
            if (timeArrangement.day.year == today.year && timeArrangement.day.month == today.month && timeArrangement.day.day == today.day) {
                course.students.forEach((student) => {
                    if (timeArrangement.signedMembers.includes(student.id)) {
                        totalPrice += student.realSignalCourseCost;
                    }
                })
            }
        });
        return totalPrice;
    }
};