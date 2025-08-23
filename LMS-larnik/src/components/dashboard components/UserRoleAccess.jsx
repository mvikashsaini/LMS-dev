import React, { useState, useEffect } from "react";
import { addUser, getSubAdmin, deleteUser, updateSubRole } from "../../api/api"; // ✅ added updateSubRole

export default function UserRoleAccess() {
  const [subAdmins, setSubAdmins] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedSubRole, setEditedSubRole] = useState("");

  // Only SubAdmin roles
  const subAdminRoles = ["BlogManager", "FinanceManager", "CareerCell", "GovernanceBody", "SubAdmin"];

  const [newUser, setNewUser] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    role: "SubAdmin", // ✅ Default role
    subRole: "", // ✅ Required if SubAdmin
  });

  // ✅ Fetch SubAdmins when component loads
  useEffect(() => {
    const fetchSubAdmins = async () => {
      try {
        const response = await getSubAdmin();
        setSubAdmins(response.data || []);
      } catch (err) {
        console.error("Failed to fetch SubAdmins:", err);
        setSubAdmins([]);
      }
    };

    fetchSubAdmins();
  }, []);

  // Add new user
  const handleAddUser = async () => {
    if (!newUser.fullName || !newUser.email || !newUser.password || !newUser.phone) {
      alert("Please fill all fields!");
      return;
    }

    if (newUser.role === "SubAdmin" && !newUser.subRole) {
      alert("Please select a SubRole for SubAdmin!");
      return;
    }

    try {
      const res = await addUser(newUser);
      setSubAdmins([...subAdmins, res.data.user]); // ✅ update list
      setNewUser({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        role: "SubAdmin",
        subRole: "",
      });
      alert("User added successfully!");
    } catch (err) {
      console.error("Add User Error:", err.response?.data || err.message);
      alert(err.response?.data?.msg || "Failed to add user");
    }
  };

  // ✅ Delete SubAdmin with confirmation
  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this SubAdmin?")) return;

    try {
      await deleteUser(userId);
      setSubAdmins(subAdmins.filter((user) => user._id !== userId));
      alert("SubAdmin deleted successfully!");
    } catch (err) {
      console.error("Delete User Error:", err.response?.data || err.message);
      alert(err.response?.data?.msg || "Failed to delete user");
    }
  };

  // ✅ Save SubRole Update
  const handleSaveSubRole = async (userId) => {
    try {
      await updateSubRole(userId, editedSubRole);
      setSubAdmins(
        subAdmins.map((u) =>
          u._id === userId ? { ...u, subRole: editedSubRole } : u
        )
      );
      setEditingUserId(null);
      setEditedSubRole("");
      alert("SubRole updated successfully!");
    } catch (err) {
      console.error("Update SubRole Error:", err.response?.data || err.message);
      alert(err.response?.data?.msg || "Failed to update SubRole");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">User & Role Management</h2>

      {/* Add User Form */}
      <div className="mb-6 p-4 border rounded bg-gray-50">
        <h3 className="font-semibold mb-2">Add New User</h3>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder="Name"
            value={newUser.fullName}
            onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })}
            className="border p-2 rounded flex-1"
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="border p-2 rounded flex-1"
          />
          <input
            type="tel"
            placeholder="1234567890"
            value={newUser.phone}
            onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
            className="border p-2 rounded flex-1"
            pattern="[0-9]{10}"
            title="Phone number must be 10 digits"
          />
          <input
            type="password"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            className="border p-2 rounded flex-1"
            minLength={8}
            required
          />
          <select
            value={newUser.subRole}
            onChange={(e) => setNewUser({ ...newUser, subRole: e.target.value })}
            className="border p-2 rounded"
          >
            <option value="">Select Sub Role</option>
            {subAdminRoles.map((sr, idx) => (
              <option key={idx} value={sr}>
                {sr}
              </option>
            ))}
          </select>
          <button
            onClick={handleAddUser}
            className="bg-blue-500 text-white px-4 rounded"
          >
            Add
          </button>
        </div>
      </div>

      {/* Users Table */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Role</th>
            <th className="p-3">SubRole</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {subAdmins.map((subAdmin) => (
            <tr key={subAdmin._id} className="border-b hover:bg-gray-50">
              <td className="p-3">{subAdmin.fullName}</td>
              <td className="p-3">{subAdmin.email}</td>
              <td className="p-3">{subAdmin.role}</td>
              <td className="p-3">
                {editingUserId === subAdmin._id ? (
                  <select
                    value={editedSubRole}
                    onChange={(e) => setEditedSubRole(e.target.value)}
                    className="border p-1 rounded"
                  >
                    <option value="">Select Sub Role</option>
                    {subAdminRoles.map((sr, idx) => (
                      <option key={idx} value={sr}>
                        {sr}
                      </option>
                    ))}
                  </select>
                ) : (
                  subAdmin.subRole || (
                    <span className="text-gray-400 italic">No SubRole</span>
                  )
                )}
              </td>
              <td className="p-3 flex gap-2">
                {editingUserId === subAdmin._id ? (
                  <>
                    <button
                      onClick={() => handleSaveSubRole(subAdmin._id)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditingUserId(null);
                        setEditedSubRole("");
                      }}
                      className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setEditingUserId(subAdmin._id);
                      setEditedSubRole(subAdmin.subRole || "");
                    }}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                )}

                <button
                  onClick={() => handleDeleteUser(subAdmin._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
