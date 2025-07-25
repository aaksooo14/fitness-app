import React from 'react';
import { FaCheckCircle } from "react-icons/fa";


const Classess = ({ allClasses = [], enrolledClassIds = [], handleEnroll }) => {
    return (
        <section className="mt-8">
            <h2 className="text-black text-xl font-semibold mb-4">All Available Classes</h2>
            <div className="flex flex-wrap gap-5">
                {Array.isArray(allClasses) && allClasses.length > 0 ? (
                    allClasses.map((cls) => (
                        <div
                            key={cls._id}
                            className="border-2 p-4 rounded-lg w-full sm:w-[300px] 
                                       bg-white shadow-xl text-black"
                        >
                            <div className="text-2xl font-semibold mb-3">{cls.name}</div>
                            <hr className="border-gray-300" />
                            <div className="mt-4">
                                {enrolledClassIds.includes(cls._id) ? (
                                    <>
                                        <div className="text-green-600 font-medium mb-2 flex gap-2"><span className='flex items-center'><FaCheckCircle /> </span>Enrolled</div>
                                        <a
                                            href={cls.workoutPdf}
                                            download
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-block mt-1 px-4 py-2 bg-teal-600 text-white font-medium rounded hover:bg-teal-700 transition"
                                        >
                                            📄 Download PDF
                                        </a>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => handleEnroll(cls._id)}
                                        className="px-4 py-2 mt-1  text-white rounded font-bold bg-orange-400 transition"
                                    >
                                        Enroll
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-gray-700">No classes available.</div>
                )}
            </div>
        </section>
    );
};

export default Classess;
