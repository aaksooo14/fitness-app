import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CiLogout } from "react-icons/ci";
import { IoIosFitness } from "react-icons/io";



const Header = ({ userName, isAdminDashboard, isMemberdashboard }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // ✅ Clear localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        // ✅ Optionally show alert
        alert('You have been logged out.');

        // ✅ Redirect to login
        navigate('/login');
    };

    return (
        <div>
            <div className="md:text-xl flex justify-between items-center gap-2 md:gap-5 p-2 border-b-2">
                <div className="border-2 rounded-md p-2 flex flex-col gap-2">
                    <div className='flex items-center justify-center text-4xl'>
                        <IoIosFitness />
                    </div>
                    <div className='flex items-center'>{isAdminDashboard ? ' (Admin)' : isMemberdashboard ? ' (Member)' : ''}</div>
                </div>
                <div className="flex items-center gap-4">
                    {userName && <span className='flex flex-wrap'>Welcome , {userName}</span>}
                    <button
                        onClick={handleLogout}
                        className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition"
                    >
                        <CiLogout />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;
