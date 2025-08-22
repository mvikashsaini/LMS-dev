// import React, { useState } from 'react'
// import StatusButton from './StatusButton'

// export default function UserManagementListDesign({
//   name = "Vikash Saini",
//   mail = "vikash@mail.com",
//   phone = "+917231842488",
//   courses = "5",
//   status_title = "active",
//   status_colour = "yellow",
// }) {
//   const [showConfirm, setShowConfirm] = useState(false);

//   const handleApprove = () => {
//     alert(`✅ Approved ${name}`);
//   };

//   const handleDelete = () => {
//     setShowConfirm(true);
//   };

//   const confirmDelete = () => {
//     setShowConfirm(false);
//     alert(`🗑️ Deleted ${name}`);
//   };

//   return (
//     <>
//       <div className='flex bg-white justify-between p-2 items-center border-t-2 border-black'>
//         <div className='flex flex-col items-start w-1/4 truncate'>
//           <span className='font-bold'>{name}</span>
//           <span>{mail}</span>
//         </div>
//         <span className='w-1/6'>{phone}</span>
//         <div className='w-1/12'>
//           <StatusButton title={status_title} colour={status_colour} />
//         </div>
//         <span className='w-1/12'>{courses}</span>
//         <div className='w-1/6 flex gap-2'>
//           <button
//             onClick={handleApprove}
//             className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
//           >
//             Approve
//           </button>
//           <button
//             onClick={handleDelete}
//             className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
//           >
//             Delete
//           </button>
//         </div>
//       </div>

//       {/* ✅ Confirmation Modal */}
//       {showConfirm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-xl shadow-lg w-80 text-center">
//             <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
//             <p className="mb-6">Do you really want to delete <b>{name}</b>? This action cannot be undone.</p>
//             <div className="flex justify-center gap-4">
//               <button
//                 onClick={() => setShowConfirm(false)}
//                 className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={confirmDelete}
//                 className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
//               >
//                 Confirm Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   )
// }


// import React, { useState } from 'react';
// import StatusButton from './StatusButton';
// import { updateUserStatus, deleteUser } from '../api/api';

// export default function UserManagementListDesign({
//   userId,
//   name,
//   mail,
//   phone,
//   courses,
//   status_title,
//   status_colour,
//   onActionComplete, // callback to refresh parent list
// }) {
//   const [showConfirm, setShowConfirm] = useState(false);

//   const handleApprove = async () => {
//     try {
//       await updateUserStatus(userId, "Active");
//       onActionComplete?.(); // refresh list in parent
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const confirmDelete = async () => {
//     try {
//       await deleteUser(userId);
//       setShowConfirm(false);
//       onActionComplete?.();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <>
//       <div className='flex bg-white justify-between p-2 items-center border-t-2 border-black'>
//         <div className='flex flex-col items-start w-1/4 truncate'>
//           <span className='font-bold'>{name}</span>
//           <span>{mail}</span>
//         </div>
//         <span className='w-1/6'>{phone}</span>
//         <div className='w-1/12'>
//           <StatusButton title={status_title} colour={status_colour} />
//         </div>
//         <span className='w-1/12'>{courses}</span>
//         <div className='w-1/6 flex gap-2'>
//           <button
//             onClick={handleApprove}
//             className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
//           >
//             Approve
//           </button>
//           <button
//             onClick={() => setShowConfirm(true)}
//             className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
//           >
//             Delete
//           </button>
//         </div>
//       </div>

//       {/* ✅ Confirmation Modal */}
//       {showConfirm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-xl shadow-lg w-80 text-center">
//             <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
//             <p className="mb-6">Do you really want to delete <b>{name}</b>? This action cannot be undone.</p>
//             <div className="flex justify-center gap-4">
//               <button
//                 onClick={() => setShowConfirm(false)}
//                 className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={confirmDelete}
//                 className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
//               >
//                 Confirm Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }


// import React, { useState } from 'react';
// import StatusButton from './StatusButton';
// import { updateUserStatus, deleteUser } from '../api/api';

// export default function UserManagementListDesign({
//   userId,
//   name,
//   mail,
//   phone,
//   courses,
//   status_title,
//   status_colour,
//   onActionComplete, // parent refresh callback
// }) {
//   const [showConfirm, setShowConfirm] = useState(false);

// const handleApprove = async () => {
//   try {
//     await approveUserStatus(userId, "Active"); // call new API
//     onActionComplete?.(); // refresh parent list
//   } catch (err) {
//     console.error("Approve failed:", err);
//   }
// };


//   const confirmDelete = async () => {
//     try {
//       await deleteUser(userId);
//       setShowConfirm(false);
//       onActionComplete?.();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <>
//       <div className='flex bg-white justify-between p-2 items-center border-t-2 border-black'>
//         <div className='flex flex-col items-start w-1/4 truncate'>
//           <span className='font-bold'>{name}</span>
//           <span>{mail}</span>
//         </div>
//         <span className='w-1/6'>{phone}</span>
//         <div className='w-1/12'>
//           <StatusButton title={status_title} colour={status_colour} />
//         </div>
//         <span className='w-1/12'>{courses}</span>
//         <div className='w-1/6 flex gap-2'>
//           <button onClick={handleApprove} className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600">Approve</button>
//           <button onClick={() => setShowConfirm(true)} className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
//         </div>
//       </div>

//       {showConfirm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-xl shadow-lg w-80 text-center">
//             <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
//             <p className="mb-6">Do you really want to delete <b>{name}</b>? This action cannot be undone.</p>
//             <div className="flex justify-center gap-4">
//               <button onClick={() => setShowConfirm(false)} className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
//               <button onClick={confirmDelete} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Confirm Delete</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }



import React, { useState } from 'react';
import StatusButton from './StatusButton';
import { approveUserStatus, deleteUser } from '../api/api'; // ✅ import approveUserStatus

export default function UserManagementListDesign({
  userId,
  name,
  mail,
  phone,
  courses,
  status_title,
  status_colour,
  onActionComplete, // parent refresh callback
}) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleApprove = async () => {
    try {
      await approveUserStatus(userId, "Active"); // ✅ call approve API
      onActionComplete?.(); // refresh parent list
    } catch (err) {
      console.error("Approve failed:", err);
    }
  };

  const confirmDelete = async () => {
    try {
      await deleteUser(userId);
      setShowConfirm(false);
      onActionComplete?.();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className='flex bg-white justify-between p-2 items-center border-t-2 border-black'>
        <div className='flex flex-col items-start w-1/4 truncate'>
          <span className='font-bold'>{name}</span>
          <span>{mail}</span>
        </div>
        <span className='w-1/6'>{phone}</span>
        <div className='w-1/12'>
          <StatusButton title={status_title} colour={status_colour} />
        </div>
        <span className='w-1/12'>{courses}</span>
        <div className='w-1/6 flex gap-2'>
          <button
            onClick={handleApprove}
            className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Approve
          </button>
          <button
            onClick={() => setShowConfirm(true)}
            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl shadow-lg w-80 text-center">
            <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
            <p className="mb-6">
              Do you really want to delete <b>{name}</b>? This action cannot be undone.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
