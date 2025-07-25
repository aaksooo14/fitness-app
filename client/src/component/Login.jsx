import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:5000/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));


            if (res.ok) {
                alert("Login successful!");
                // optionally store token
                localStorage.setItem('token', data.token);
                navigate(data.user.redirect); // change route as needed
            } else {
                alert(data.message || "Login failed");
            }

        } catch (err) {
            console.error("Login error:", err);
            alert("Something went wrong");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-amber-200">
            <div className='flex flex-col xl:w-[20vw] gap-5  bg-amber-50'>
                <div className='bg-gray-800 text-start p-4 rounded-md space-y-4'>
                    <h2 className="text-xl  text-white font-bold">Signin To your <br /> Account</h2>
                    <h6 className='text-white'>Sign in to Account</h6>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-8 p-2">
                    <div>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder='Enter your email'
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full border p-2 rounded-full"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder='Enter your password'
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full border p-2 rounded-full"
                        />
                    </div>
                    <button type="submit" className="bg-pink-700 text-white p-2 rounded-full font-bold text-xl">Login</button>
                    <p className="">
                        <div className='text-md flex justify-center gap-2 pb-2'>
                            <span>Don't have an account?</span><a href="/signup" className="text-blue-600 underline">Signup</a>
                        </div>
                        <div className='text-md flex justify-center gap-2 pb-2'>
                            <p>admin@gmail.com</p>
                            <p>admin@123</p>
                        </div>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
