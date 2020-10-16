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
      advisor_id: advisor.advisor_id,
      advisor_initial: advisor.advisor_initial,
      advisor_lname: advisor.advisor_lname
    });
  },
  deleteAdvisor(id) {
    return apiClient.delete("/courseapi/advisor/" + id);
  },
  putAdvisor(id, advisor) {
    return apiClient.put("/courseapi/advisor/" + id, {
      advisor_department: advisor.advisor_department,
      advisor_fname: advisor.advisor_fname,
      advisor_id: advisor.advisor_id,
      advisor_initial: advisor.advisor_initial,
      advisor_lname: advisor.advisor_lname
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
      degree_id: degree.degree_id,
      degree_name: degree.degree_name
    });
  },
  deleteDegree(id) {
    return apiClient.delete("/courseapi/degrees/" + id);
  },
  putDegree(id, degree) {
    return apiClient.put("/courseapi/degrees/" + id, {
      degree_dept: degree.degree_dept,
      degree_hours: degree.degree_hours,
      degree_id: degree.degree_id,
      degree_name: degree.degree_name
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
      degree_plan_id: degreePlan.degree_plan_id,
      degree: degreePlan.degree,
      course: degreePlan.course
    });
  },
  deleteDegreePlan(id) {
    return apiClient.delete("/courseapi/degree-plans/" + id);
  },
  putDegreePlan(id, degreePlan) {
    return apiClient.put("/courseapi/degree-plans/" + id, {
      degree_plan_id: degreePlan.degree_plan_id,
      degree: degreePlan.degree,
      course: degreePlan.course
    });
  },
  //---------------------
  //TODO: course plans
  //---------------------

  //---------------------
  //TODO: semesters
  //---------------------

  //---------------------
  //TODO: students
  //---------------------
  getStudents() {
    return apiClient.get("/courseapi/students/");
  },
};
