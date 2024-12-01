import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../Components/Breadcrumbs/Breadcrumb';
import { Head } from '@inertiajs/react';

const Calendar = () => {

    const [activities, setActivities] = useState([]);
    const [view, setView] = useState('dayGridMonth');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const getInitials = (name) => {
        const nameParts = name.split(' ');
        const firstInitial = nameParts[0]?.charAt(0).toUpperCase() || '';
        const secondInitial = nameParts[1]?.charAt(0).toUpperCase() || '';
        return `${firstInitial}${secondInitial}`;
    }

    const fetchActivities = async () => {
        try {
            const response = await axios.get('/get-all-activities');
            setActivities(response.data);
        } catch (error) {
            console.error(error.response.data.message);
        }
    };

    const handleEventClick = (info) => {
        setSelectedEvent(info.event.extendedProps);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedEvent(null);
        setIsModalOpen(false);
    };

    useEffect(() => {
        fetchActivities();
    }, []);

    const events = activities.map(activity => ({
        title: activity.work_item,
        start: new Date(activity.start_date),
        end: new Date(activity.due_date),
        description: activity.description,
        backgroundColor: activity.complexity === 'Simple' ? 'rgba(0, 123, 255, 0.12)' : activity.complexity === 'Complex' ? 'rgba(255, 193, 7, 0.12)' : 'rgba(220, 53, 69, 0.12)',
        borderColor: activity.complexity === 'Simple' ? 'rgba(0, 123, 255, 1)' : activity.complexity === 'Complex' ? 'rgba(255, 193, 7, 1)' : 'rgba(220, 53, 69, 1)',
        textColor: activity.complexity === 'Simple' ? 'rgba(0, 123, 255, 1)' : activity.complexity === 'Complex' ? 'rgba(255, 193, 7, 1)' : 'rgba(220, 53, 69, 1)',
        extendedProps: activity
    }));

    return (
        <>
            <Head title="Calendar of Activities" />
            <div className="mx-auto max-w-full">
                <Breadcrumb pageName="Calendar of Activities" />
                <div className="flex flex-col gap-y-4 rounded-sm border border-stroke bg-white p-3 mb-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:flex-row sm:items-center sm:justify-between">
                    <div className="p-4 flex flex-col w-full">
                        <FullCalendar
                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                            initialView={view}
                            events={events}
                            eventClick={handleEventClick}
                            headerToolbar={{
                                left: 'prev,next today',
                                center: 'title',
                                right: 'timeGridDay,timeGridWeek,dayGridMonth',
                            }}
                            selectable={true}
                            editable={true}
                            selectMirror={true}
                            dayMaxEvents={false}
                        />
                        {isModalOpen && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                                <div className="bg-white p-6 w-full max-w-lg bg-white shadow-lg overflow-y-auto max-h-[75vh]">
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-lg font-semibold mb-4">{selectedEvent.work_item}</h2>
                                        <button
                                            className="text-gray-600 hover:text-gray-800 text-lg"
                                            onClick={closeModal}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="font-medium text-gray-700 mb-1">DESCRIPTION</p>
                                            <p className="text-gray-600">{selectedEvent.description}</p>
                                        </div>
                                        <hr className="my-4 border-t border-slate-200" />
                                        <div className='flex items-center gap-2 justify-start'>
                                            <p className="font-medium text-gray-700">COMPLEXITY:</p>
                                            <span className={
                                                `text-${selectedEvent.complexity === 'Simple' ? 'primary' : selectedEvent.complexity === 'Complex' ? 'warning' : 'danger'}
                                                bg-${selectedEvent.complexity === 'Simple' ? 'primary bg-opacity-10' : selectedEvent.complexity === 'Complex' ? 'warning bg-opacity-10' : 'danger bg-opacity-10'}
                                                border border-color-${selectedEvent.complexity === 'Simple' ? 'primary' : selectedEvent.complexity === 'Complex' ? 'warning' : 'danger'}
                                                px-2 py-1 rounded-full`
                                            }>
                                                {selectedEvent.complexity}
                                            </span>
                                        </div>
                                        <hr className="my-4 border-t border-slate-200" />
                                        <div className="grid grid-cols-2">
                                            <div>
                                                <p className="font-medium text-gray-700 mb-1">START DATE</p>
                                                <p className="text-gray-600">{selectedEvent.start_date}</p>
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-700 mb-1">DUE DATE</p>
                                                <p className="text-gray-600">{selectedEvent.due_date}</p>
                                            </div>
                                        </div>
                                        <hr className="my-4 border-t border-slate-200" />
                                        <div className='flex items-center gap-2 justify-start'>
                                            <p className="font-medium text-gray-700">STATUS:</p>
                                            <span className={
                                                `text-${selectedEvent.progress === 'Completed' ? 'success' : selectedEvent.progress === 'In progress' ? 'primary' : selectedEvent.progress === 'Not started' ? 'warning' : 'danger'}
                                                bg-${selectedEvent.progress === 'Completed' ? 'success bg-opacity-10' : selectedEvent.progress === 'In progress' ? 'primary bg-opacity-10' : selectedEvent.progress === 'Not started' ? 'warning bg-opacity-10' : 'danger bg-opacity-10'}
                                                border border-color-${selectedEvent.progress === 'Completed' ? 'success' : selectedEvent.progress === 'In progress' ? 'primary' : selectedEvent.progress === 'Not started' ? 'warning' : 'danger'}
                                                px-2 py-1 rounded-full`
                                            }>
                                                {selectedEvent.progress}
                                            </span>
                                        </div>
                                        <hr className="my-4 border-t border-slate-200" />
                                        <div className="flex items-center gap-2">
                                            <p className="font-medium text-gray-700">ASSIGNED TO:</p>
                                            {selectedEvent.assigned_to && selectedEvent.assigned_to.map((assignedTo, index) => (
                                                <div
                                                    key={index}
                                                    className='flex items-center'
                                                >
                                                    {assignedTo.photo_url ? (
                                                        <img
                                                            src={`/storage/${assignedTo.photo_url}`}
                                                            alt={assignedTo.name}
                                                            className="w-8 h-8 rounded-full object-cover mt-1 hover:cursor-pointer"
                                                            title={assignedTo.name}
                                                        />
                                                    ) : (
                                                        <div
                                                            className='w-8 h-8 rounded-full bg-warning bg-opacity-30 text-warning flex items-center justify-center text-black mt-1 hover:cursor-pointer'
                                                            title={assignedTo.name}
                                                        >
                                                            {getInitials(assignedTo.name)}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                        <hr className="my-4 border-t border-slate-200" />
                                        <div>
                                            <p className="font-medium text-gray-700 mb-1">KEY STAKEHOLDERS</p>
                                            <p className="text-gray-600">{selectedEvent.key_stakeholders}</p>
                                        </div>
                                        <hr className="my-4 border-t border-slate-200" />
                                        <div>
                                            <p className="font-medium text-gray-700 mb-1">ACTION ITEMS AND NOTES</p>
                                            <p className="text-gray-600">{selectedEvent.remarks}</p>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 z-30"
                                    onClick={closeModal}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

Calendar.layout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default Calendar;