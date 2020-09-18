import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    crossDomain: true,
    "Access-Control-Allow-Origin": "*"
  }
});

export default {
  getCourses() {
    return apiClient.get("/courseapi/courses/");
  },
  getCourse(id) {
    return apiClient.get("/courseapi/courses/" + id);
  },
  postCourse(course) {
    return apiClient.post("/courseapi/courses", {
      //course object here
      name: course.name
    });
  },
  deleteCourse(id) {
    return apiClient.delete("/courseapi/courses/" + id);
  },
  putCourse(id, course) {
    return apiClient.put("/courseapi/courses/" + id, {
      //course object here
      name: course.name
    });
  }
};
