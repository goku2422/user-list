import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // error message
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // reset error

        try {
            const res = await axios.post('http://localhost:3001/login', {
                email,
                password
            });

            console.log(res.data);

            // ✅ save logged-in user id in localStorage
            localStorage.setItem("userId", res.data.user._id);

            alert("Login Successful");
            navigate('/data'); // go to Data.jsx page

        } catch (err) {
            // Handle errors from backend
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
                alert(err.response.data.message);
            } else {
                setError("Something went wrong");
                console.log(err);
            }
        }
    };

    return (
        <div className="vh-100 d-flex justify-content-center align-items-center bg-secondary">
            <div className="bg-white p-4 w-25">
                <h2>Login</h2>

                {error && <p style={{ color: "red" }}>{error}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input
                            type="email"
                            placeholder="Email"
                            className="form-control mb-2"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">
                            <strong>Password</strong>
                        </label>
                        <input
                            type="password"
                            placeholder="Password"
                            className="form-control mb-2"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button className="btn btn-dark w-100">Login</button>
                </form>
                <br />
                <Link to="/register" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                    Signup
                </Link>
            </div>
        </div>
    );
}

export default Login;
