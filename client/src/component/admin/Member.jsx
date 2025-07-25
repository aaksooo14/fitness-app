import React from 'react'
import Header from '../common/Header'

const Member = ({ members }) => {
    return (
        <div>
            <section className="mt-5 mb-5 px-4">
                <h2 className="text-black text-xl font-semibold mb-4">Members</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-300 rounded-md shadow-md">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="px-4 py-2 border text-center">Name</th>
                                <th className="px-4 py-2 border text-center">Enrolled Classes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.map((member) => (
                                <tr key={member._id} className="text-center bg-white hover:bg-gray-50">
                                    <td className="px-4 py-2 border">{member.name}</td>
                                    <td className="px-4 py-2 border">
                                        {member.enrolledClasses?.map(course => course.name).join(', ') || 'None'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    )
}

export default Member
