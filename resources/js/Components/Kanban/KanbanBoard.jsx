import React from 'react';

const KanbanBoard = ({ activities, openEditModal }) => {

    const statuses = ['Completed', 'In progress', 'Not started', 'Blocked'];
    const getActivitiesByStatus = (status) => activities.filter(activity => activity.progress === status);

    const getInitials = (name) => {
        const nameParts = name.split(' ');
        const firstInitial = nameParts[0]?.charAt(0).toUpperCase() || '';
        const secondInitial = nameParts[1]?.charAt(0).toUpperCase() || '';
        return `${firstInitial}${secondInitial}`;
    }

    return (
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 p-4'>
            {statuses.map((status) => (
                <div key={status} className='flex flex-col space-y-4 p-4'>
                    <h3 className={`px-4 py-2 text-sm font-semibold text-gray-700 rounded-xl text-white
                        ${status === 'Completed' ? 'bg-success' : status === 'In progress' ? 'bg-secondary' : status === 'Not started' ? 'bg-warning' : 'bg-danger'}`}
                    >
                        {status}
                    </h3>
                    <div className='space-y-2'>
                        {getActivitiesByStatus(status).map((activity, index) => (
                            <div
                                key={index}
                                onClick={() => openEditModal(activity)}
                                className='p-4 bg-white rounded shadow cursor-pointer hover:shadow-xl transition duration-300 ease-in-out'
                            >
                                <h5 className='font-medium text-gray-800'>{activity.work_item}</h5>
                                <p className={`mt-1 text-sm text-gray-500 rounded-full px-2 bg-opacity-10 ${activity.complexity === 'Simple' ? 'border border-secondary bg-secondary text-secondary' : activity.complexity === 'Complex' ? 'border border-warning bg-warning text-warning' : 'border border-danger bg-danger text-danger'}`}>{activity.complexity}</p>
                                <p className='mt-1 text-sm text-gray-500'>Due: {activity.due_date}</p>
                                <div className="mt-1 text-xs flex flex-wrap">
                                    {activity.assigned_to && activity.assigned_to.map((assignedTo, index) => (
                                        <div
                                            key={index}
                                            className='flex items-center'
                                        >
                                            {assignedTo.photo_url ? (
                                                <img
                                                    src={`/storage/${assignedTo.photo_url}`}
                                                    alt={assignedTo.name}
                                                    className="w-8 h-8 rounded-full object-cover mr-1"
                                                />
                                            ) : (
                                                <div className='w-8 h-8 rounded-full bg-bodydark flex items-center justify-center text-black mr-1 mt-1'>
                                                    {getInitials(assignedTo.name)}
                                                </div>
                                            )}
                                            {/* <p className='bg-opacity-30 rounded-full text-black px-2 py-1'>
                                            {getInitials(assignedTo.name)}
                                            </p> */}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default KanbanBoard;