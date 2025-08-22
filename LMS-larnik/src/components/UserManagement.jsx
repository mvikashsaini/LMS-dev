import React, { useEffect, useState } from "react";
import { getStudents, getTeachers } from "../api/api";
import UserManagementListDesign from "./UserManagementListDesign";

export default function UserManagement({ role }) {
  const [userLists, setUserLists] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      let response;
      role === "Student" && (response = await getStudents());
      role === "Teacher" && (response = await getTeachers());

      const data = response?.data || [];
      console.log(`${role}s from API:`, data);
      setUserLists(data);
    } catch (err) {
      console.error(`Failed to fetch ${role}s:`, err);
      setUserLists([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [role]);

  if (loading) return <div className="p-4">Loading {role}s...</div>;
  if (!userLists.length) return <div className="p-4">No {role}s found</div>;

  return (
    <div>
      <div className="bg-gray-200 flex justify-between items-center text-start p-2 font-bold">
        <span className="w-1/4">Name</span>
        <span className="w-1/6">Phone</span>
        <span className="w-1/12">Status</span>
        <span className="w-1/12">Courses</span>
        <span className="w-1/12">Actions</span>
      </div>
      {userLists.map((user) => (
        <UserManagementListDesign
          key={user._id}
          userId={user._id}
          name={user.fullName || user.name || user.title || "Unnamed"}
          mail={user.email}
          phone={user.phone}
          courses={user.courses ?? 0}
          status_title={user.status}
          status_colour={user.status === "Active" ? "green" : "yellow"}
          onActionComplete={fetchStudents}
        />
      ))}
    </div>
  );
}
