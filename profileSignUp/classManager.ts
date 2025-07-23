const classManager = document.getElementById('classSheet');

import { UserUtils } from '../src/utils/user.ts';
import { PersonalData } from '../src/dataStructures/personalData.ts';
import { Course, CourseMember, DayUtils } from '../src/dataStructures/course.ts';

async function fetchClasses() {
    try {
        const user = UserUtils.getUserFromLocalStorage()
        if (!user) return null;
        if (!user.id) {
            return null;
        }
        const userdata = UserUtils.fetchUserData(user.id).then(user => {
            if (!user) return null;
            return user.data ? JSON.parse(user.data) as PersonalData : null;
        });
        userdata.then(data => {
            if (!data) return null;
            const classes = data.courses;
            if (!classes) return null;
            classes.forEach((course: Course) => {
                const classElement = document.getElementById('classCard');
                if (!classElement) return null;
          const teachers = course.instructors;
            if (!teachers) return null;
          let teachersStr = "";
          const teacherstoString = teachers.forEach((teacher: CourseMember) => {
            UserUtils.fetchUserData(teacher.id).then(user => {
              if (!user) return null;
              return user.data ? JSON.parse(user.data) as PersonalData : null;
            }).then (data => {
              if (!data) return null;
              teachersStr += data.name + " ";
            });
        })
            
            const today = DayUtils.getDay(new Date());
            let timeArrangement = course.timeTable.find((timeArrangement) => {
                if (timeArrangement.day.day == today.day && timeArrangement.day.month == today.month && timeArrangement.day.year == today.year) {
                    return timeArrangement;
                }
            });
            if (!timeArrangement) return null; 
                classElement.innerHTML = `
                        <a href="./index.html">
                        <div class="flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
                        <div class="p-4 md:p-5">
    <h3 class="text-lg font-bold text-gray-800 dark:text-white">
      ${course.name}
    </h3>
    <p class="mt-2 text-gray-500 dark:text-neutral-400">
      ${course.description}
    </p>
  </div>
  <div class="bg-gray-100 border-t border-gray-200 rounded-b-xl py-3 px-4 md:py-4 md:px-5 dark:bg-neutral-900 dark:border-neutral-700">
    <p class="mt-1 text-sm text-gray-500 dark:text-neutral-500">
     ${teachersStr}
    </p>
  </div>
  <div class="bg-gray-100 border-t border-gray-200 rounded-b-xl py-3 px-4 md:py-4 md:px-5 dark:bg-neutral-900 dark:border-neutral-700">
    <p class="mt-1 text-sm text-gray-500 dark:text-neutral-500">
     ${timeArrangement.start}
    </p>
  </div>
</div>
</a>
                `;
                classManager?.appendChild(classElement);
            });
        }).catch(error => {
            console.error('获取班级数据失败:', error);
        });
    } catch (error) {
        console.error('获取班级数据失败:', error);
    }
}
fetchClasses();