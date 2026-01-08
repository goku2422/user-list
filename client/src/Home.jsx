import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get("http://localhost:3001/users")
      .then(res => setUsers(res.data));
  };

  // DELETE
  const deleteUser = (id) => {
    axios.delete(`http://localhost:3001/user/${id}`)
      .then(() => fetchUsers());
  };

  // UPDATE
  const updateUser = () => {
    axios.put(`http://localhost:3001/user/${editUser._id}`, editUser)
      .then(() => {
        setEditUser(null);
        fetchUsers();
      });
  };

  return (
    <div>
      <h2>User Management</h2>

      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Actions</th>

          </tr>
        </thead>

        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
                <td>{user.password}</td>

              <td>
                <button onClick={() => setEditUser(user)}>Edit</button>
                <button onClick={() => deleteUser(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

     
      {editUser && (
        <div>
          <h3>Edit User</h3>
          <input
            value={editUser.name}
            onChange={e => setEditUser({ ...editUser, name: e.target.value })}
          />
          <input
            value={editUser.email}
            onChange={e => setEditUser({ ...editUser, email: e.target.value })}
          />
          <input
            value={editUser.password}
            onChange={e => setEditUser({ ...editUser, password: e.target.value })}
          />

          <button onClick={updateUser}>Update</button>
        </div>
      )}
    </div>
  );
}

export default Home;
