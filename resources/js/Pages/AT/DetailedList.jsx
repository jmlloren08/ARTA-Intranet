import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../Components/Breadcrumbs/Breadcrumb';
import SummaryList from '../../Components/Tables/SummaryList';
import KanbanBoard from '../../Components/Kanban/KanbanBoard';
import AddNewItem from '../../Components/Modals/AddNewItem';
import axios from 'axios';
import { Head } from '@inertiajs/react';
import { ToastContainer } from 'react-toastify';

const DetailedList = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editItem, setEditItem] = useState('');
    const [refresh, setRefresh] = useState(false);
    const [activeTab, setActiveTab] = useState('All');
    const [counts, setCounts] = useState({
        all: 0,
        completed: 0,
        inProgress: 0,
        notStarted: 0,
        blocked: 0
    });

    const [activities, setActivities] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [view, setView] = useState('Board');

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    }

    const openAddModal = () => {
        setEditItem('');
        setIsModalOpen(true);
    }

    const openEditModal = (item) => {
        setEditItem(item);
        setIsModalOpen(true);
    }

    const fetchActivities = async () => {
        try {
            const response = await axios.get('/get-all-activities');
            const allActivities = response.data;

            const updatedCounts = {
                all: allActivities.length,
                completed: allActivities.filter((a) => a.progress === 'Completed').length,
                inProgress: allActivities.filter((a) => a.progress === 'In progress').length,
                notStarted: allActivities.filter((a) => a.progress === 'Not started').length,
                blocked: allActivities.filter((a) => a.progress === 'Blocked').length
            }

            setCounts(updatedCounts);

            const filteredActivities =
                activeTab === 'All' ? allActivities : allActivities.filter((activity) => activity.progress === activeTab);
            setActivities(filteredActivities);

        } catch (error) {
            console.error(error.response.data.message);
        }
    }

    const handleAddSuccess = () => {
        setRefresh(prev => !prev);
    }

    const handleEditSuccess = () => {
        setRefresh(prev => !prev);
    }

    useEffect(() => {
        fetchActivities();
    }, [refresh, activeTab]);

    return (
        <>
            <Head title="Activity Tracker/List" />
            <ToastContainer />
            <div className="mx-auto max-w-full">
                <Breadcrumb pageName="List" />
                <div className='flex flex-col gap-y-4 rounded-sm border border-stroke bg-white p-3 mb-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:flex-row sm:items-center sm:justify-between'>
                    <div className='flex flex-col items-start sm:items-center'>
                        <button
                            onClick={openAddModal}
                            className='flex items-center gap-2 rounded bg-primary py-2 px-4.5 font-medium text-white hover:bg-opacity-90'
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            Add New Item
                        </button>
                        <AddNewItem
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            onAddSuccess={handleAddSuccess}
                            onEditSuccess={handleEditSuccess}
                            initialFormData={editItem}
                            isEditMode={Boolean(editItem)}
                        />
                    </div>
                    <div className='flex space-x-2'>
                        <div className="relative inline-block">
                            <select
                                onChange={(e) => setView(e.target.value)}
                                value={view}
                                className='appearance-none w-full py-2 px-4 hover:cursor-pointer hover:bg-bodydark hover:text-white dark:hover:bg-dark dark:bg-meta-4 transition duration-300 ease-in-out rounded-full'
                            >
                                <option value="Board" className="text-body dark:text-white">Board</option>
                                <option value="Table" className="text-body dark:text-white">Table</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="flex space-x-4 border-b border-gray-300">
                    {['All', 'Completed', 'In progress', 'Not started', 'Blocked'].map((status, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveTab(status)}
                            className={`py-2 px-4 md:px-6 lg:px-8 font-semibold focus:outline-none text-xs md:text-base ${activeTab === status ? 'border-b-2 border-primary text-primary' : 'text-gray-600 hover:text-primary'}`}
                        >
                            {status} ({counts[status === 'In progress' ? 'inProgress' : status === 'Not started' ? 'notStarted' : status.toLowerCase()] || 0})
                        </button>
                    ))}
                </div>
                <div className="flex items-center m-2 bg-white dark:border-strokedark dark:bg-boxdark focus-within:border-primary focus-within:ring-2 focus-within:ring-primary">
                    <span className="p-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-5 h-5 text-gray-500"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
                            />
                        </svg>
                    </span>
                    <input
                        type='text'
                        placeholder='Search activities...'
                        className='p-2 w-full focus:outline-none dark:border-strokedark dark:bg-boxdark'
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
                {view === 'Board' ? (
                    <KanbanBoard activities={activities.filter(activity => activity.work_item.toLowerCase().includes(searchTerm.toLowerCase()))} openEditModal={openEditModal} />
                ) : (
                    <SummaryList activities={activities.filter(activity => activity.work_item.toLowerCase().includes(searchTerm.toLowerCase()))} openEditModal={openEditModal} />
                )}
            </div >
        </>
    );
}

DetailedList.layout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default DetailedList;