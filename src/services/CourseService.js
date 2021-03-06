import axios from "axios";

const apiClient = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "http://team1.eaglesoftwareteam.com/"
      : "http://localhost:3001/",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    crossDomain: true,
    "Access-Control-Allow-Origin": "*",
  },
  transformRequest: (data, headers) => {
    // let user = localStorage.getItem("user");
    let token = localStorage.getItem("token");
    let authHeader = "";
    if (token != null && token != "") authHeader = "Bearer " + token;
    headers.common["Authorization"] = authHeader;
    return JSON.stringify(data);
  },
});

export default {
  //---------------------
  //courses
  //---------------------
  login(user) {
    return apiClient.post("/courseapi/auth/login", user);
  },
  getCourses() {
    return apiClient.get("/courseapi/courses/");
  },
  getCourse(id) {
    return apiClient.get("/courseapi/courses/" + id);
  },
  postCourse(course) {
    return apiClient.post("/courseapi/courses", {
      course_name: course.course_name,
      course_num: course.course_num,
      course_desc: course.course_desc,
      course_dept: course.course_dept,
      course_level: course.course_level,
      course_hours: course.course_hours,
    });
  },
  deleteCourse(id) {
    return apiClient.delete("/courseapi/courses/" + id);
  },
  putCourse(id, course) {
    return apiClient.put("/courseapi/courses/" + id, {
      course_name: course.course_name,
      course_num: course.course_num,
      course_desc: course.course_desc,
      course_dept: course.course_dept,
      course_level: course.course_level,
      course_hours: course.course_hours,
    });
  },

  //---------------------
  //advisors
  //---------------------
  getAdvisors() {
    return apiClient.get("/courseapi/advisor/");
  },
  getAdvisor(id) {
    return apiClient.get("/courseapi/advisor/" + id);
  },
  postAdvisor(advisor) {
    return apiClient.post("/courseapi/advisor", {
      advisor_department: advisor.advisor_department,
      advisor_fname: advisor.advisor_fname,
      advisor_initial: advisor.advisor_initial,
      advisor_lname: advisor.advisor_lname,
    });
  },
  deleteAdvisor(id) {
    return apiClient.delete("/courseapi/advisor/" + id);
  },
  putAdvisor(id, advisor) {
    return apiClient.put("/courseapi/advisor/" + id, {
      advisor_department: advisor.advisor_department,
      advisor_fname: advisor.advisor_fname,
      advisor_initial: advisor.advisor_initial,
      advisor_lname: advisor.advisor_lname,
    });
  },
  //---------------------
  //degrees
  //---------------------
  getDegrees() {
    return apiClient.get("/courseapi/degrees/");
  },
  getDegree(id) {
    return apiClient.get("/courseapi/degrees/" + id);
  },
  postDegree(degree) {
    return apiClient.post("/courseapi/degrees", {
      degree_dept: degree.degree_dept,
      degree_hours: degree.degree_hours,
      degree_name: degree.degree_name,
    });
  },
  deleteDegree(id) {
    return apiClient.delete("/courseapi/degrees/" + id);
  },
  putDegree(id, degree) {
    return apiClient.put("/courseapi/degrees/" + id, {
      degree_dept: degree.degree_dept,
      degree_hours: degree.degree_hours,
      degree_name: degree.degree_name,
    });
  },
  //---------------------
  //degree plans
  //---------------------
  getDegreePlans() {
    return apiClient.get("/courseapi/degree-plans/");
  },
  getDegreePlan(id) {
    return apiClient.get("/courseapi/degree-plans/" + id);
  },
  postDegreePlan(degreePlan) {
    return apiClient.post("/courseapi/degree-plans", {
      degree_plan_degree: degreePlan.degree_plan_degree,
      degree_plan_course: degreePlan.degree_plan_course,
    });
  },
  deleteDegreePlan(id) {
    return apiClient.delete("/courseapi/degree-plans/" + id);
  },
  putDegreePlan(id, degreePlan) {
    return apiClient.put("/courseapi/degree-plans/" + id, {
      degree_plan_degree: degreePlan.degree_plan_degree,
      degree_plan_course: degreePlan.degree_plan_course,
    });
  },

  //---------------------
  //semesters
  //---------------------
  getSemesters() {
    return apiClient.get("/courseapi/semester/");
  },
  getSemester(id) {
    return apiClient.get("/courseapi/semester/" + id);
  },
  postSemester(semester) {
    return apiClient.post("/courseapi/semester", {
      semester_name: semester.semester_name,
      semester_start: semester.semester_start,
      semester_end: semester.semester_end,
      semester_term: semester.semester_term,
    });
  },
  deleteSemester(id) {
    return apiClient.delete("/courseapi/semester/" + id);
  },
  putSemester(id, semester) {
    return apiClient.put("/courseapi/semester/" + id, {
      semester_name: semester.semester_name,
      semester_start: semester.semester_start,
      semester_end: semester.semester_end,
      semester_term: semester.semester_term,
    });
  },

  //---------------------
  // Users
  //---------------------

  getUsers() {
    return apiClient.get("/courseapi/users");
  },

  getUser(id) {
    return apiClient.get("/courseapi/users/" + id);
  },

  postUser(user) {
    return apiClient.post("/courseapi/users", {
      user_name: user.user_name,
      user_password: user.user_password,
      user_email: user.user_email,
      user_student: user.user_student,
      user_advisor: user.user_advisor,
    });
  },

  putUser(id, user) {
    return apiClient.put("/courseapi/users/" + id, {
      user_name: user.user_name,
      user_password: user.user_password,
      user_email: user.user_email,
      user_student: user.user_student,
      user_advisor: user.user_advisor,
    });
  },

  deleteUser(id) {
    return apiClient.delete("/courseapi/users/" + id);
  },

  //---------------------
  // Students
  //---------------------
  getStudents() {
    return apiClient.get("/courseapi/students");
  },

  getStudent(id) {
    return apiClient.get("/courseapi/students/" + id);
  },

  postStudent(student) {
    return apiClient.post("/courseapi/students", {
      student_fname: student.student_fname,
      student_lname: student.student_lname,
      student_initial: student.student_initial,
      student_graduation_date: student.student_graduation_date,
      student_degree: student.student_degree,
      student_advisor: student.student_advisor,
    });
  },

  putStudent(id, student) {
    return apiClient.put("/courseapi/students/" + id, {
      student_fname: student.student_fname,
      student_lname: student.student_lname,
      student_initial: student.student_initial,
      student_graduation_date: student.student_graduation_date,
      student_degree: student.student_degree,
      student_advisor: student.student_advisor,
    });
  },

  deleteStudent(id) {
    return apiClient.delete("/courseapi/students/" + id);
  },

  //---------------------
  // Course Plan
  //---------------------
  getCoursePlans() {
    return apiClient.get("/courseapi/course-plan");
  },

  getCoursePlan(id) {
    return apiClient.get("/courseapi/course-plan/" + id);
  },

  postCoursePlan(coursePlan) {
    return apiClient.post("/courseapi/course-plan", {
      course_plan_last_updated: coursePlan.course_plan_last_updated,
      course_plan_student: coursePlan.course_plan_student,
    });
  },

  putCoursePlan(id, coursePlan) {
    return apiClient.put("/courseapi/course-plan/" + id, {
      course_plan_last_updated: coursePlan.course_plan_last_updated,
      course_plan_student: coursePlan.course_plan_student,
    });
  },

  deleteCoursePlan(id) {
    return apiClient.delete("/courseapi/course-plan/" + id);
  },

  //---------------------
  // Course Plan Items
  //---------------------
  getCoursePlanForStudent(studentId) {
    return apiClient.get("/courseapi/course-plan/student/" + studentId);
  },

  getCoursePlanItems(coursePlanId) {
    return apiClient.get("/courseapi/course-plan/" + coursePlanId + "/items");
  },

  getCoursePlanItem(coursePlanId, itemId) {
    return apiClient.get("/courseapi/course-plan/" + coursePlanId + "/items/" + itemId);
  },

  postCoursePlanItem(coursePlanId, item) {
    return apiClient.post("/courseapi/course-plan/" + coursePlanId + "/items", {
      course_plan_item_grade: item.course_plan_item_grade,
      course_plan_item_status: item.course_plan_item_status,
      course_plan_item_plan: item.course_plan_item_plan,
      course_plan_item_semester: item.course_plan_item_semester,
      course_plan_item_course: item.course_plan_item_course,
    });
  },

  putCoursePlanItem(coursePlanId, itemId, item) {
    return apiClient.put("/courseapi/course-plan/" + coursePlanId + "/items/" + itemId, {
      course_plan_item_grade: item.course_plan_item_grade,
      course_plan_item_status: item.course_plan_item_status,
      course_plan_item_plan: item.course_plan_item_plan,
      course_plan_item_semester: item.course_plan_item_semester,
      course_plan_item_course: item.course_plan_item_course,
    });
  },

  putCoursePlanItems(coursePlanId, items) {
    return apiClient.put("/courseapi/course-plan/" + coursePlanId + "/items", {
      items
    });
  },

  deleteCoursePlanItem(coursePlanId, itemId) {
    return apiClient.delete("/courseapi/course-plan/" + coursePlanId + "/items/" + itemId);
  },

  //---------------------
  // Term
  //---------------------
  getTerms() {
    return apiClient.get("/courseapi/term/");
  },
  getTerm(id) {
    return apiClient.get("/courseapi/term/" + id);
  },
  postTerm(term) {
    return apiClient.post("/courseapi/term/", {
      term_name: term.term_name,
      term_abbr: term.term_abbr
    })
  },
  putTerm(id, term) {
    return apiClient.put("/courseapi/term/"+id, {
      term_name: term.term_name,
      term_abbr: term.term_abbr
    });
  },
  deleteTerm(id) {
    return apiClient.delete("/courseapi/term/"+id);
  },
};
