const openNav = document.querySelector('.summarruButton');
openNav.addEventListener('click', function () {
  openNav.classList.toggle('close');
});
const openFilters = document.querySelector('.SecondsummarruButton');
openFilters.addEventListener('click', function () {
  openFilters.classList.toggle('close');
});
const errorDisplay = document.querySelector('.error-display');
let editingId;
const submitButton = document.getElementById('submitButton');
const searchInput = document.getElementById('searchInput');
const themeButton = document.getElementById('themeToggle');
const studentForm = document.querySelector('form');
const studentCard = document.getElementById('studentCard');
const studentDetails = document.getElementById('studentDetails');
const studentStatistics = document.getElementById('studentStatistics');
const totalStudents = document.getElementById('totalStudents');
const activeStudents = document.getElementById('activeStudents');
const inactiveStudents = document.getElementById('inactiveStudents');
const averageMarks = document.getElementById('averageMarks');
const display = document.querySelector('.display');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const ageInput = document.getElementById('age');
const selectCourse = document.getElementById('course');
const marksInput = document.getElementById('marks');
const students = [
  {
    id: crypto.randomUUID(),
    name: 'Elvis Ouma',
    age: 20,
    email: 'elvis@example.com',
    course: 'IT',
    mark: 85,
    active: true,
    subjects: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    id: crypto.randomUUID(),
    name: 'Jane Smith',
    age: 21,
    email: 'jane@example.com',
    course: 'Medicine',
    mark: 72,
    active: true,
    subjects: ['Biology', 'Chemistry'],
  },
  {
    id: crypto.randomUUID(),
    name: 'John Doe',
    age: 22,
    email: 'john@example.com',
    course: 'Education',
    mark: 45,
    active: false,
    subjects: ['History', 'Geography'],
  },
  {
    id: crypto.randomUUID(),
    name: 'Mary James',
    age: 19,
    email: 'mary@example.com',
    course: 'IT',
    mark: 91,
    active: true,
    subjects: ['HTML', 'JavaScript'],
  },
];
function renderStudents(studentArray) {
  studentCard.textContent = '';
  if (studentArray.length === 0) {
    errorDisplay.textContent = 'No matching student found';
    setTimeout(() => {
      errorDisplay.textContent = '';
    }, 3000);
    return;
  }
  studentArray.forEach((student) => {
    const card = document.createElement('div');
    card.className = 'createdCard';
    card.innerHTML = `<h4>Student Name: ${student.name}</h4><br><p class="createdParagraph">Student email: ${student.email}</p><br><p class="createdParagraph">Student course: ${student.course}</p><br><p class="createdParagraph">Student age: ${student.age}</p><br> <p class="createdParagraph">Student mark: ${student.mark}</p><br><p class="createdParagraph">Student status: ${student.active ? 'Active' : 'Inactive'}</p><br> <button class="viewButton" data-id = "${student.id}" >View Details</button> <button class = "editButton" data-id = "${student.id}">Edit</button>  <button class = "toggleStatus" data-id = "${student.id}">Toggle Status</button> <button class="deleteButton" data-id="${student.id}">Delete</button>`;
    studentCard.appendChild(card);
  });
}
function validateForm() {
  const name = nameInput.value.trim().toUpperCase();
  const email = emailInput.value.trim();
  const age = ageInput.value.trim();
  const course = selectCourse.value;
  const marks = marksInput.value.trim();
  if (name === '') {
    display.textContent = 'Enter Your Name';
    setTimeout(() => {
      display.textContent = '';
    }, 3000);
    nameInput.focus();
    return;
  }
  if (name.length < 3 || name.length > 25) {
    display.textContent = 'Name length must be between 3 and 25';
    setTimeout(() => {
      display.textContent = '';
    }, 3000);
    nameInput.focus();
    return;
  }
  if (email === '') {
    display.textContent = 'Enter Your Email';
    setTimeout(() => {
      display.textContent = '';
    }, 3000);
    emailInput.focus();
    return;
  }
  const checkEmail = students.some((student) => {
    return (
      student.email.toUpperCase() === email.toUpperCase() &&
      student.id !== editingId
    );
  });
  if (checkEmail) {
    display.textContent = 'Email already exist';
    setTimeout(() => {
      display.textContent = '';
    }, 3000);
    return;
  }

  if (age === '') {
    display.textContent = 'Enter Your Age';
    setTimeout(() => {
      display.textContent = '';
    }, 3000);
    ageInput.focus();
    return;
  }
  const ageNumber = Number(age);
  if (Number.isNaN(ageNumber)) {
    display.textContent = 'Age must be a number';
    setTimeout(() => {
      display.textContent = '';
    }, 3000);
    ageInput.focus();
    return;
  }

  if (ageNumber < 16 || ageNumber > 100) {
    display.textContent = 'Age must be between 16 and 100';
    setTimeout(() => {
      display.textContent = '';
    }, 3000);
    ageInput.focus();
    return;
  }

  if (course === '') {
    display.textContent = 'Select your course';
    setTimeout(() => {
      display.textContent = '';
    }, 3000);
    selectCourse.focus();
    return;
  }
  if (marks === '') {
    display.textContent = 'Enter Your Marks';
    setTimeout(() => {
      display.textContent = '';
    }, 3000);
    marksInput.focus();
    return;
  }
  const marksNumber = Number(marks);
  if (Number.isNaN(marksNumber)) {
    display.textContent = 'Marks must be a number';
    setTimeout(() => {
      display.textContent = '';
    }, 3000);
    marksInput.focus();
    return;
  }
  if (marksNumber < 0 || marksNumber > 100) {
    display.textContent = 'Marks must be between 0 and 100';
    setTimeout(() => {
      display.textContent = '';
    }, 3000);
    marksInput.focus();
    return;
  }
  return { name, email, age: Number(age), course, marks: Number(marks) };
}
studentForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const validate = validateForm();
  if (!validate) {
    return;
  }
  if (editingId) {
    const updateStudent = students.find((student) => {
      return student.id === editingId;
    });
    if (updateStudent) {
      updateStudent.name = validate.name;
      updateStudent.email = validate.email;
      updateStudent.age = validate.age;
      updateStudent.course = validate.course;
      updateStudent.mark = validate.marks;
    }
    editingId = null;
    submitButton.textContent = 'Add Student';
    display.textContent = 'Student updated succcesfully!';
    setTimeout(() => {
      display.textContent = '';
    }, 3000);
  } else {
    const student = {
      id: crypto.randomUUID(),
      name: validate.name,
      age: validate.age,
      email: validate.email,
      course: validate.course,
      mark: validate.marks,
      active: true,
      subjects: ['HTML', 'CSS', 'JavaScript'],
    };
    students.push(student);
    display.textContent = 'Student successfully added!';
    setTimeout(() => {
      display.textContent = '';
    }, 2000);
  }
  nameInput.value = '';
  emailInput.value = '';
  ageInput.value = '';
  selectCourse.value = '';
  marksInput.value = '';
  renderStudents(students);
  updateStatistics();
  studentCard.lastElementChild?.scrollIntoView({
    behavior: 'smooth',
    block: 'nearest',
  });
});
updateStatistics();
renderStudents(students);
studentCard.addEventListener('click', function (event) {
  const deleted = event.target.closest('.deleteButton');
  if (deleted) {
    const deleteId = deleted.dataset.id;
    const finddeletedStudent = students.findIndex((student) => {
      return student.id === deleteId;
    });
    if (finddeletedStudent !== -1) {
      const confirmed = confirm('Do you want to delete this student?');

      if (confirmed) {
        students.splice(finddeletedStudent, 1);
        const result = filterAndSortStudents();
        renderStudents(result);
        updateStatistics();
        display.textContent = 'Student deleted successfully!';
        setTimeout(() => {
          display.textContent = '';
        }, 3000);
      }
    }
  }
  const toggleStatus = event.target.closest('.toggleStatus');
  if (toggleStatus) {
    const Togglestudentid = toggleStatus.dataset.id;
    const findtoggledStudent = students.find((student) => {
      return student.id === Togglestudentid;
    });
    if (findtoggledStudent) {
      findtoggledStudent.active = !findtoggledStudent.active;
      const result = filterAndSortStudents();
      renderStudents(result);
      updateStatistics();
    }
  }
  const editStudent = event.target.closest('.editButton');
  if (editStudent) {
    const editstudentId = editStudent.dataset.id;
    const matchingStudent = students.find((student) => {
      return student.id === editstudentId;
    });
    if (matchingStudent) {
      editingId = matchingStudent.id;
      nameInput.value = matchingStudent.name;
      emailInput.value = matchingStudent.email;
      ageInput.value = matchingStudent.age;
      selectCourse.value = matchingStudent.course;
      marksInput.value = matchingStudent.mark;
      nameInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      nameInput.focus();
      submitButton.textContent = 'Update Student';
    }
  }
  const viewdetailsButton = event.target.closest('.viewButton');
  if (viewdetailsButton) {
    const viewdetailsId = viewdetailsButton.dataset.id;
    const findView = students.find((student) => {
      return student.id === viewdetailsId;
    });
    if (findView) {
      let grade;
      if (findView.mark >= 80) {
        grade = 'A';
      } else if (findView.mark >= 70) {
        grade = 'B';
      } else if (findView.mark >= 60) {
        grade = 'C';
      } else if (findView.mark >= 50) {
        grade = 'D';
      } else {
        grade = 'F';
      }
      studentDetails.textContent = '';
      studentDetails.innerHTML = `<h4>Student name: ${findView.name}</h4><p>Email: ${findView.email}</p><p>Age: ${findView.age}</p><p>Course: ${findView.course}</p><p>Marks: ${findView.mark}</p><p>Performance grade: ${grade}</p><p>Account status: ${findView.active ? 'Active' : 'Inactive'}</p>
    <p>Subjects: ${findView.subjects.join(',')}</p> <button class="closeDetails">Close Details</button>`;
      studentDetails.lastElementChild.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }
});
studentDetails.addEventListener('click', function (event) {
  const closeDetails = event.target.closest('.closeDetails');
  if (!closeDetails) {
    return;
  } else {
    studentDetails.textContent =
      'Select a student(View Details button) from the student list to view here.';
  }
});
searchInput.addEventListener('input', function () {
  const result = filterAndSortStudents();
  renderStudents(result);
});
const sortDropdown = document.getElementById('sort');
const statusDropdown = document.getElementById('status');
const performanceDropdown = document.getElementById('performance');
function filterAndSortStudents() {
  let studentCopy = [...students];
  const searchText = searchInput.value.trim().toLowerCase();
  const searchDisplay = document.querySelector('.search-display');
  searchDisplay.textContent = searchInput.value;
  studentCopy = studentCopy.filter((student) => {
    return (
      student.name.toLowerCase().includes(searchText) ||
      student.email.toLowerCase().includes(searchText) ||
      student.course.toLowerCase().includes(searchText)
    );
  });
  if (statusDropdown.value === 'activeStudents') {
    studentCopy = studentCopy.filter((student) => {
      return student.active === true;
    });
  }
  if (statusDropdown.value === 'inactiveStudents') {
    studentCopy = studentCopy.filter((student) => {
      return student.active === false;
    });
  }
  if (performanceDropdown.value === 'passed') {
    studentCopy = studentCopy.filter((student) => {
      return student.mark >= 50;
    });
  }
  if (performanceDropdown.value === 'failed') {
    studentCopy = studentCopy.filter((student) => {
      return student.mark < 50;
    });
  }
  if (performanceDropdown.value === 'Excellent') {
    studentCopy = studentCopy.filter((student) => {
      return student.mark >= 80;
    });
  }
  if (sortDropdown.value === 'Marks-lth') {
    studentCopy = studentCopy.sort((a, b) => {
      return a.mark - b.mark;
    });
  }
  if (sortDropdown.value === 'Marks-htl') {
    studentCopy = studentCopy.sort((a, b) => {
      return b.mark - a.mark;
    });
  }
  if (sortDropdown.value === 'Name-atz') {
    studentCopy = studentCopy.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
  }
  if (sortDropdown.value === 'Name-zta') {
    studentCopy = studentCopy.sort((a, b) => {
      return b.name.localeCompare(a.name);
    });
  }
  return studentCopy;
}

statusDropdown.addEventListener('change', function () {
  const result = filterAndSortStudents();
  renderStudents(result);
});
performanceDropdown.addEventListener('change', function () {
  const result = filterAndSortStudents();
  renderStudents(result);
});
sortDropdown.addEventListener('change', function () {
  const result = filterAndSortStudents();
  renderStudents(result);
});
function updateStatistics() {
  const totalstudentsNumber = students.length;
  const activestudentsNumber = students.filter((student) => {
    return student.active === true;
  });
  const inactivestudentsNumber = students.filter((student) => {
    return student.active === false;
  });
  const total = students.reduce((acc, student) => {
    return acc + student.mark;
  }, 0);
  const averagestudentsMark = students.length > 0 ? total / students.length : 0;
  totalStudents.textContent = `Total Students\n ${totalstudentsNumber}`;
  activeStudents.textContent = `Active Students\n ${activestudentsNumber.length}`;
  inactiveStudents.textContent = `Inactive Students\n ${inactivestudentsNumber.length}`;
  averageMarks.textContent = `Average Mark\n ${averagestudentsMark.toFixed(2)}`;
}
const body = document.querySelector('body');
themeButton.addEventListener('click', () => {
  body.classList.toggle('dark-theme');
  if (body.classList.contains('dark-theme')) {
    themeButton.textContent = 'Light Mode';
  } else {
    themeButton.textContent = 'Dark Mode';
  }
});
const details = document.querySelector('#sidebar');
const navLinks = document.querySelectorAll('nav a');
const allSections = document.querySelectorAll('section');
navLinks.forEach((navLink) => {
  navLink.addEventListener('click', function (event) {
    event.preventDefault();
    const identifier = navLink.dataset.section;
    showSection(identifier);
    //const details = document.querySelector('#sidebar');
    if (openNav.classList.contains('close')) {
      openNav.classList.remove('close');
      details.open = false;
    }
  });
});
function showSection(selectedSection) {
  allSections.forEach((section) => {
    section.classList.add('hide');
  });
  allSections.forEach((section) => {
    if (section.id === selectedSection) {
      section.classList.remove('hide');
    }
  });
  navLinks.forEach((link) => {
    link.classList.remove('active');
  });
  navLinks.forEach((link) => {
    if (link.dataset.section === selectedSection) {
      link.classList.add('active');
    }
  });
}
const dashboard = document.getElementById('dashboard');
showSection(dashboard.id);
document.addEventListener('click', () => {
  if (
    !event.target.closest('#sidebar') &&
    openNav.classList.contains('close')
  ) {
    openNav.classList.remove('close');
    details.open = false;
  }
});
