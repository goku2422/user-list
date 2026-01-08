import { useEffect, useState } from "react";
import axios from "axios";

function Data() {
    const [users, setUsers] = useState([]);
    const [editUser, setEditUser] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        axios.get("http://localhost:3001/users")
            .then(res => setUsers(res.data));
             

    };
    return (
        <div>
            <h2>login data </h2>

            <table border="1">
                <thead>
                    <tr>

                        <th>Email</th>
                        <th>Password</th>
                    </tr>
                </thead>
                <tbody>
          {users.map(user => (
            <tr key={user._id}>
              
              <td>{user.email}</td>
                <td>{user.password}</td>
            </tr>
          ))}
        </tbody>
            </table>
        </div>
    )
};
export default Data;