import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // error message

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // reset error

        try {
            const res = await axios.post('http://localhost:3001/register', {
                name,
                email,
                password
            });

            console.log(res.data);

            // ✅ save newly created user id in localStorage
            localStorage.setItem("userId", res.data.client._id); // client, not user

            alert(res.data.message); // "Registration successful"
            navigate('/home'); // go to login page

        } catch (err) {
            // Handle errors from backend
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message); // already registered or backend error
                alert(err.response.data.message);
            } else {
                setError("Something went wrong");
                console.log(err);
            }
        }
    };

    return (
        <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2 className='text-center'>Register</h2>

                {error && <p style={{ color: "red" }}>{error}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label><strong>Name</strong></label>
                        <input
                            placeholder="Name"
                            className="form-control mb-2"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label><strong>Email</strong></label>
                        <input
                            placeholder="Email"
                            className="form-control mb-2"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            type="email"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label><strong>Password</strong></label>
                        <input
                            type="password"
                            placeholder="Password"
                            className="form-control mb-2"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button className="btn btn-dark w-100">REGISTER</button>
                </form>
                <p className="mt-2">Already have an account?</p>
                <Link to="/login" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Login</Link>
            </div>
        </div>
    );
}

export default Signup;
