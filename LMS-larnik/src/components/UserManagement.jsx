import React, { useEffect, useState } from "react";
import { getPartners, getReferral, getStudents, getSubAdmin, getTeachers, getUniversity } from "../api/api";
import UserManagementListDesign from "./UserManagementListDesign";
import StudentDashboardCards from "./cards/StudentDashboardCards";

export default function UserManagement(props) {
  const [userLists, setUserLists] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      let data = [];

      if (props.role === "Student") {
        const response = await getStudents(); // backend already filters Student
        data = response.data;
      } 
      else if (props.role === "Teachers") {
        const response = await getTeachers(); // backend already filters Teacher
        data = response.data;
      }
      else if (props.role === "university") {
        const response = await getUniversity(); // backend already filters university
        data = response.data;
      }
      else if (props.role === "referral") {
        const response = await getReferral(); // backend already filters referral
        data = response.data;
      }
      else if (props.role === "partners") {
        const response = await getPartners(); // backend already filters partners
        data = response.data;
      }
      else if (props.role === "subadmin") {
        const response = await getSubAdmin(); // backend already filters subadmin
        data = response.data;
      }

      console.log(`${props.role}s from API:`, data);
      setUserLists(data);
    } catch (err) {
      console.error(`Failed to fetch ${props.role}s:`, err);
      setUserLists([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [props.role]); // refetch if role changes

  if (loading) return <div className="p-4">Loading {props.role}s...</div>;
  if (!userLists.length) return <div className="p-4">No {props.role}s found</div>;

  const aRole = props.role;
  return (
    <div>
      <StudentDashboardCards role = {aRole}/>
      <div className="flex flex-col ">
        <div className="flex flex-row justify-between">
           <div className="flex flex-col items-start m-6">
              <span className="font-bold">{props.role} List</span>
              <span>View and manage all {props.role} on your platform</span>
            </div>
          </div>
        </div>
      <div className="bg-gray-200 flex justify-between items-center text-start p-2 font-bold">
        <span className="w-1/4">Name</span>
        <span className="w-1/6">Phone</span>
        <span className="w-1/12">Status</span>
        <span className="w-1/12">Actions</span>
      </div>
      {userLists.map((user) => (
        <UserManagementListDesign
          key={user._id}
          userId={user._id}
          name={user.fullName || user.name || user.title || "Unnamed"}
          mail={user.email}
          phone={user.phone}
          status_title={user.status}
          status_colour={user.status === "Active" ? "green" : "yellow"}
          onActionComplete={fetchUsers}
        />
      ))}
    </div>
  );
}
