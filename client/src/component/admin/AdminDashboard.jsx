import React, { useState, useEffect } from 'react';
import Member from './Member';
import Courses from './Courses';
import Header from '../common/Header';

const AdminDashboard = () => {
    const [courses, setCourses] = useState([]);
    const [members, setMembers] = useState([]);
    const [newCourse, setNewCourse] = useState({ title: '', pdf: null });

    const [editCourseId, setEditCourseId] = useState(null);
    const [editCourseData, setEditCourseData] = useState({ title: '', pdf: null });

    const handleCourseChange = (e) => {
        const { name, value, files } = e.target;
        setNewCourse((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const handleAddCourse = async () => {
        if (!newCourse.title || !newCourse.pdf) {
            return alert("Please provide both title and PDF");
        }

        const formData = new FormData();
        formData.append("name", newCourse.title);
        formData.append("description", "Default description");
        formData.append("createdBy", "64e2fb0f96b7a90012a3f456"); // Hardcoded for now
        formData.append("schedule", JSON.stringify({ day: "Monday", time: "7:00 AM - 8:00 AM" }));
        formData.append("workoutPdf", newCourse.pdf);

        try {
            const response = await fetch("http://localhost:5000/api/add-class", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                alert("Course added!");
                setCourses(prev => [...prev, data.data]);
                setNewCourse({ title: '', pdf: null });
            } else {
                alert(data.message || "Failed to add course");
            }
        } catch (err) {
            console.error(err);
            alert("Error uploading course");
        }
    };

    const handleDeleteCourse = async (courseId) => {
        if (!window.confirm("Are you sure you want to delete this course?")) return;

        try {
            const response = await fetch(`http://localhost:5000/api/delete-class/${courseId}`, {
                method: "DELETE",
            });

            const data = await response.json();

            if (response.ok) {
                setCourses(prev => prev.filter(course => course._id !== courseId));
                alert("Course deleted successfully");
            } else {
                alert(data.message || "Failed to delete course");
            }
        } catch (err) {
            console.error("Error deleting course:", err);
        }
    };

    const handleEditInit = (course) => {
        setEditCourseId(course._id);
        setEditCourseData({ title: course.name, pdf: null });
    };

    const handleEditChange = (e) => {
        const { name, value, files } = e.target;
        setEditCourseData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const handleUpdateCourse = async () => {
        const formData = new FormData();
        formData.append("name", editCourseData.title);
        if (editCourseData.pdf) formData.append("workoutPdf", editCourseData.pdf);

        try {
            const response = await fetch(`http://localhost:5000/api/update-class/${editCourseId}`, {
                method: "PUT",
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                setCourses(prev => prev.map(course =>
                    course._id === editCourseId ? data.updatedCourse : course
                ));
                alert("Course updated!");
                setEditCourseId(null);
                setEditCourseData({ title: '', pdf: null });
            } else {
                alert(data.message || "Failed to update course");
            }
        } catch (err) {
            console.error("Error updating course:", err);
        }
    };

    const getEnrollCount = (courseId) => {
        return members.filter((member) =>
            member.enrolledClasses?.some((course) => course._id === courseId)
        ).length;
    };

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/classes");
                const data = await response.json();
                if (response.ok) {
                    setCourses(data.classes);
                }
            } catch (err) {
                console.error("Failed to fetch courses:", err);
            }
        };
        fetchCourses();
    }, []);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/user/members");
                const data = await response.json();
                if (response.ok) {
                    setMembers(data.members);
                }
            } catch (err) {
                console.error("Failed to fetch members:", err);
            }
        };
        fetchMembers();
    }, []);

    return (
        <div className='flex flex-col min-h-screen gap-5 bg-gradient-to-l from-teal-200 to-teal-40 p-5'>
            <Header isAdminDashboard="Admin" />

            {/* Add Course */}
            <section className='mb-6'>
                <h2 className='text-black text-xl font-semibold flex justify-center md:flex-none md:justify-start'>Add Course</h2>
                <div className='mt-5 space-x-5 flex flex-col justify-center gap-5 md:flex-none md:justify-start md:flex-row md:gap-0'>
                    <input
                        type="text"
                        name="title"
                        placeholder="Course Title"
                        value={newCourse.title}
                        onChange={handleCourseChange}
                        className='border-2 rounded-md p-2 w-80'
                    />
                    <input
                        type="file"
                        name="pdf"
                        accept="application/pdf"
                        onChange={handleCourseChange}
                        a />
                    <button
                        className='bg-teal-600 text-white font-semibold border-2 rounded-full p-2'
                        onClick={handleAddCourse}
                    >
                        Add Course
                    </button>
                </div>
            </section>

            {/* If editing */}
            {editCourseId && (
                <section className='mb-6'>
                    <h2 className='text-black text-xl font-semibold'>Edit Course</h2>
                    <div className='mt-5 space-x-5'>
                        <input
                            type="text"
                            name="title"
                            placeholder="Course Title"
                            value={editCourseData.title}
                            onChange={handleEditChange}
                            className='border-2 rounded-md p-2 w-80'
                        />
                        <input
                            type="file"
                            name="pdf"
                            accept="application/pdf"
                            onChange={handleEditChange}
                        />
                        <button
                            className='bg-yellow-500 text-white font-semibold border-2 rounded-full p-2'
                            onClick={handleUpdateCourse}
                        >
                            Update Course
                        </button>
                        <button
                            className='bg-gray-400 text-white font-semibold border-2 rounded-full p-2'
                            onClick={() => setEditCourseId(null)}
                        >
                            Cancel
                        </button>
                    </div>
                </section>
            )}

            {/* Members */}
            <Member members={members} />

            {/* Courses with edit/delete */}
            <Courses
                courses={courses}
                getEnrollCount={getEnrollCount}
                onEdit={handleEditInit}
                onDelete={handleDeleteCourse}
            />
        </div>
    );
};

export default AdminDashboard;
