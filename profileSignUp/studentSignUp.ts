import { StudentRole } from "../src/dataStructures/course";



async function studentSignUp() {
   const student = StudentRole;
   if (!student)
      return null;
   const fragment = document.createDocumentFragment();
   StudentRole.forEach(student => {
      const card = document.createElement('div');
      card.innerHTML = `<button class="student-button">${student.name}</button>`;
      fragment.appendChild(card);
   });
   const card = document.createElement('div');
   card.className = 'studentName';
   card.innerHTML = `
      <div class="flex">
         <button type="button" class="student-button">
            ${student.name} 
         </button>
      </div>
   `;
   return card;
}

function studentContainer() {
   const container = document.getElementById('nameOfStudent');
   if (!container) {
      console.error('容器未找到');
      return;
   }

   studentSignUp().then(card => {
      if (card) container.appendChild(card);
   });
}

const studentButton = document.createElement('button');
studentButton.textContent = '注册学生';
studentButton.addEventListener('click', studentContainer);
document.getElementById('toolbar')?.appendChild(studentButton);
