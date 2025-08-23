// import React, { useEffect, useState } from "react";
// import { Users, UserCheck, UserX, CalendarDays } from "lucide-react";
// import { getStudents } from "../../api/api"; // ✅ your API
// import UserManagementCardDesign from "../UserManagementCardDesign";

// export default function StudentDashboardCards(props) {
//   const [studentCards, setStudentCards] = useState([]);

//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const res = await getStudents(); // ✅ API call
//         const students = res.data || [];
//         console.log("Fetched students:", props.role);

//         // ✅ Total students
//         const total = students.length;

//         // ✅ Status-based counts
//         const activeCount = students.filter((s) => s.status === "Active").length;
//         const pendingCount = students.filter((s) => s.status === "Pending").length;

//         // ✅ Count students created this month
//         const now = new Date();
//         const thisMonth = now.getMonth();
//         const thisYear = now.getFullYear();

//         const thisMonthCount = students.filter((s) => {
//           const createdAt = new Date(s.createdAt);
//           return createdAt.getMonth() === thisMonth && createdAt.getFullYear() === thisYear;
//         }).length;

//         // ✅ Update state
//         setStudentCards([
//           {
//             title: "Total Students",
//             value: total,
//             subTitle: "All registered students",
//             icon: Users,
//           },
//           {
//             title: "Active Students",
//             value: activeCount,
//             subTitle: "Currently active",
//             icon: UserCheck,
//           },
//           {
//             title: "Pending Students",
//             value: pendingCount,
//             subTitle: "Awaiting approval",
//             icon: UserX,
//           },
//           {
//             title: "New This Month",
//             value: thisMonthCount,
//             subTitle: "Joined this month",
//             icon: CalendarDays,
//           },
//         ]);
//       } catch (err) {
//         console.error("Failed to fetch students:", err);
//       }
//     };

//     fetchStudents();
//   }, []);

//   return (
//     <div className="flex w-full flex-col">
//         {console.log("Rendering StudentDashboardCards with cards:", props.role)}
//       <div className="flex flex-row gap-5 w-full p-5">
//         {studentCards.map((studentCard, index) => (
//           <UserManagementCardDesign
//             key={index}
//             title={studentCard.title}
//             subTitle={studentCard.subTitle}
//             icon={studentCard.icon}
//             value={studentCard.value}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { Users, UserCheck, UserX, CalendarDays } from "lucide-react";
import { getStudents, getTeachers, getUniversity, getReferral, getPartners, getSubAdmin } from "../../api/api"; 
import UserManagementCardDesign from "../UserManagementCardDesign";

export default function StudentDashboardCards({ role, refreshKey }) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res;
        if (role === "Student") {
          res = await getStudents();
        } else if (role === "Teachers") {
          res = await getTeachers();
        } else if (role === "university") {
          res = await getUniversity();
        } else if (role === "referral") {
          res = await getReferral();
        } else if (role === "partners") {
          res = await getPartners();
        } else if (role === "subadmin") {
          res = await getSubAdmin();
        }

        const users = res?.data || [];
        console.log(`Fetched ${role}s:`, users);

        // ✅ Total count
        const total = users.length;

        // ✅ Status-based counts
        const activeCount = users.filter((u) => u.status === "Active").length;
        const pendingCount = users.filter((u) => u.status === "Pending").length;

        // ✅ Joined this month
        const now = new Date();
        const thisMonth = now.getMonth();
        const thisYear = now.getFullYear();

        const thisMonthCount = users.filter((u) => {
          const createdAt = new Date(u.createdAt);
          return createdAt.getMonth() === thisMonth && createdAt.getFullYear() === thisYear;
        }).length;

        setCards([
          {
            title: `Total ${role}s`,
            value: total,
            subTitle: `All registered ${role.toLowerCase()}s`,
            icon: Users,
          },
          {
            title: `Active ${role}s`,
            value: activeCount,
            subTitle: "Currently active",
            icon: UserCheck,
          },
          {
            title: `Pending ${role}s`,
            value: pendingCount,
            subTitle: "Awaiting approval",
            icon: UserX,
          },
          {
            title: "New This Month",
            value: thisMonthCount,
            subTitle: "Joined this month",
            icon: CalendarDays,
          },
        ]);
      } catch (err) {
        console.error(`Failed to fetch ${role}s:`, err);
      }
    };

    fetchData();
  }, [role, refreshKey]); // 🔑 re-fetch if role changes or refreshKey increments

  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-row gap-5 w-full p-5">
        {cards.map((card, index) => (
          <UserManagementCardDesign
            key={index}
            title={card.title}
            subTitle={card.subTitle}
            icon={card.icon}
            value={card.value}
          />
        ))}
      </div>
    </div>
  );
}
