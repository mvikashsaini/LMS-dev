import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // change if deployed
});

// 🔑 Attach token automatically if present in localStorage
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});



export const getUsers = (role) => API.get("/users", { params: role ? { role } : {} });
// export const getStudents = () => getUsers("Student");
export const getStudents = () => API.get("/users/students"); // ✅ New endpoint for students
export const getTeachers = () => API.get("/users/teachers"); // ✅ New endpoint for teachers
export const getUniversity = () => API.get("/users/university"); // ✅ New endpoint for university
export const getReferral = () => API.get("/users/referral"); // ✅ New endpoint for referral
export const getPartners = () => API.get("/users/partners"); // ✅ New endpoint for partners
export const getSubAdmin = () => API.get("/users/subadmin"); // ✅ New endpoint for subadmin

export const updateUserStatus = (userId, status) =>  API.put("/users", { userId, status });
export const deleteUser = (userId) =>  API.delete(`/users/${userId}`);

// Approve / update status API
export const approveUserStatus = (userId, status) =>  API.put("/users/approve", { userId, status });

// Update SubRole
export const updateSubRole = (id, subRole) =>  API.put(`/users/subrole/${id}`, { subRole });

// Add new user (Admin)
export const addUser = (userData) => API.post("/users/add", userData);

// Create a new coupon
export const createCoupon = (couponData) => API.post("/coupons", couponData);

// Get all coupons
export const getCoupons = () => API.get("/coupons");

// Get coupon by ID
export const getCouponById = (id) => API.get(`/coupons/${id}`);

// Update coupon
export const updateCoupon = (id, updatedData) => API.put(`/coupons/${id}`, updatedData);

// Delete coupon
export const deleteCoupon = (id) => API.delete(`/coupons/${id}`);


// Update University Code (only logged-in University role)
export const updateUniversityCode = (universityCode) =>
  API.put("/university/update-university-code", { universityCode });


// ===== University Document APIs =====

// Upload document
export const uploadUniversityDocument = async (file, docType) => {
  const formData = new FormData();
  formData.append("document", file); // field name matches multer
  formData.append("docType", docType);

  return API.post("/university-documents/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// Get my documents
export const getMyDocuments = async () => {
  return API.get("/university-documents/my-documents", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};



// ===== Admin: University documents =====

// Get documents of a specific university (admin)
export const getDocumentsByUniversity = async (universityId) => {
  return API.get(`/university-documents/by-university/${universityId}`);
};

// Update status of a document (admin)
export const updateDocumentStatus = async (docId, status) => {
  return API.put(`/university-documents/status/${docId}`, { status });
};