import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // change if deployed
});

export const getUsers = (role) => API.get("/users", { params: role ? { role } : {} });
// export const getStudents = () => getUsers("Student");
export const getStudents = () => API.get("/users/students"); // ✅ New endpoint for students

export const updateUserStatus = (userId, status) =>
  API.put("/users", { userId, status });
export const deleteUser = (userId) =>
  API.delete(`/users/${userId}`);
// Approve / update status API
export const approveUserStatus = (userId, status) =>
  API.put("/users/approve", { userId, status });
