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
};
