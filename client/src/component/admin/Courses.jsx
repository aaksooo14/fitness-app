import React from 'react';

const Courses = ({ courses, getEnrollCount, onEdit, onDelete }) => {
    return (
        <section>
            <h2 className="text-black text-xl font-semibold mb-4">Courses</h2>
            <div className='flex flex-wrap gap-5'>
                {courses.map((course) => (
                    <div key={course._id} className='border-2 p-4 rounded-lg bg-teal-600 text-white w-80 shadow-md'>
                        <div className='text-2xl mb-3 font-bold'>{course.name}</div>
                        <hr className="border-gray-300" />
                        <div className='mt-4'>Enrolled Members: {getEnrollCount(course._id)}</div>

                        <div className="mt-5 flex gap-3">
                            <button
                                className='flex-1 border-2 rounded-md bg-white text-teal-700 font-semibold py-1 hover:bg-teal-100 transition'
                                onClick={() => onEdit(course)}
                            >
                                Edit
                            </button>

                            <button
                                className='flex-1 border-2 rounded-md bg-red-500 text-white font-semibold py-1 hover:bg-red-600 transition'
                                onClick={() => onDelete(course._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Courses;
