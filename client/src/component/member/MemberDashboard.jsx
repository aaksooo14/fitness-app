import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../common/Header';
import Classess from './Classess';
import EnrolledClassess from './EnrolledClassess';

const MemberDashboard = () => {
    const [allClasses, setAllClasses] = useState([]);
    const [enrolledClassIds, setEnrolledClassIds] = useState([]);
    const [userName, setUserName] = useState('');

    const token = localStorage.getItem('token');
    // Fetch classes and enrolled data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const headers = { Authorization: `Bearer ${token}` };

                // Get all available classes
                const classRes = await axios.get('http://localhost:5000/api/classes');
                setAllClasses(classRes?.data?.classes);

                // Get member profile with enrolled classes
                const profileRes = await axios.get('http://localhost:5000/api/member/profile', { headers });

                // [{_id, name, workoutPdf}, ...]
                setUserName(profileRes?.data?.name);

                const enrolledIds = profileRes.data.enrolledClasses.map(cls => cls._id);
                setEnrolledClassIds(enrolledIds);

            } catch (error) {
                console.error("Error loading data:", error);
            }
        };

        fetchData();
    }, [token]);

    const handleEnroll = async (classId) => {
        try {
            await axios.post(
                'http://localhost:5000/api/member/enroll',
                { classId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            // Update state locally
            setEnrolledClassIds((prev) => [...prev, classId]);
        } catch (error) {
            console.error("Enrollment failed:", error);
        }
    };

    console.log('allClasses', allClasses)
    console.log('enrolledClassIds', enrolledClassIds)

    return (
        <div className='bg-gradient-to-l from-teal-200 to-teal-40 min-h-screen' style={{ padding: '20px' }}>
            <Header userName={userName} isMemberdashboard="Member" />
            <h3 className='mt-5 font-semibold text-md md:text-xl'>You have enrolled in {enrolledClassIds.length} classes</h3>

            {/* All Classes */}
            <Classess allClasses={allClasses} enrolledClassIds={enrolledClassIds} handleEnroll={handleEnroll} />

            {/* Enrolled Classes */}
            <EnrolledClassess enrolledClassIds={enrolledClassIds} allClasses={allClasses} />
        </div>
    );
};

export default MemberDashboard;
