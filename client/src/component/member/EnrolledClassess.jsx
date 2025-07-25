import React from 'react';

const EnrolledClassess = ({ allClasses, enrolledClassIds }) => {
    const enrolledClasses = allClasses?.filter(cls => enrolledClassIds.includes(cls._id)) || [];

    return (
        <section className="mt-8">
            <h2 className="text-black text-xl font-semibold mb-4">My Enrolled Classes</h2>
            <div className="flex flex-wrap gap-5">
                {enrolledClasses.length > 0 ? (
                    enrolledClasses.map((cls) => (
                        <div key={cls._id} className="border-2 p-4 shadow-xl rounded-lg bg-teal-600 text-white w-full sm:w-[300px]">
                            <div className="text-2xl mb-3">{cls.name}</div>
                            <hr className="border-white" />
                            <div className="mt-4">
                                <a
                                    href={cls.workoutPdf}
                                    download
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block mt-2 px-4 py-2 bg-white text-teal-800 font-medium rounded hover:bg-gray-200 transition"
                                >
                                    📄 Download PDF
                                </a>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-gray-700">You haven't enrolled in any classes yet.</div>
                )}
            </div>
        </section>
    );
};

export default EnrolledClassess;
