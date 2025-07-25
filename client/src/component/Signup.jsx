import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        number: '',
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
            const res = await fetch('http://localhost:5000/api/user/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                alert('Signup successful! Please login.');
                navigate('/login');
            } else {
                alert(data.message || 'Signup failed');
            }
        } catch (err) {
            console.error('Signup error:', err);
            alert('Server error');
        }
    };

    return (
        <div className="h-full flex flex-col items-center justify-center min-h-screen bg-amber-200">
            <div className='flex flex-col xl:w-[20vw] gap-5 bg-amber-50 rounded-lg shadow-md'>
                <div className='bg-gray-800 text-start p-4 rounded-md space-y-4'>
                    <h2 className="text-xl text-white font-bold">Create your <br /> Account</h2>
                    <h6 className='text-white'>Signup to get started</h6>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-4">
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder='Enter your name'
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full border p-2 rounded-full"
                    />
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
                    <input
                        type="text"
                        id="number"
                        name="number"
                        placeholder='Enter your phone number'
                        value={formData.number}
                        onChange={handleChange}
                        required
                        className="w-full border p-2 rounded-full"
                    />
                    <button type="submit" className="bg-pink-700 text-white p-2 rounded-full font-bold text-xl">Signup</button>
                    <div className='text-md flex justify-center gap-2 pb-2'>
                        <span>Already have an account?</span><a href="/login" className="text-blue-600 underline">Login</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
