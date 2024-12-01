import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';
import CreatetableSelect from 'react-select/creatable';

const AddNewItem = ({ isOpen, onClose, onAddSuccess, onEditSuccess, initialFormData, isEditMode }) => {

    const [formData, setFormData] = useState('');
    const [offices, setOffices] = useState([]);
    const [names, setNames] = useState([]);
    const [departmentAgencies, setDepartmentAgencies] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios.get('/get-key-stakeholders')
            .then((response) => {
                setDepartmentAgencies(response.data.map(da => ({ value: da.department_name, label: da.department_name })));
            })
            .catch((error) => {
                console.error(error.response.data.message);
            })
    }, []);

    useEffect(() => {
        axios.get('/get-names')
            .then((response) => {
                setNames(response.data.map(user => ({ value: user.id, label: user.name })));
            })
            .catch((error) => {
                console.error(error.response.data.message);
            })
    }, []);

    useEffect(() => {
        axios.get('/get-distinct-offices')
            .then((response) => {
                setOffices(response.data.map(office => ({ value: office.office, label: office.office })));
            })
            .catch((error) => {
                console.error(error.response.data.message);
            })
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleCategoryChange = (selectedOption) => {
        setFormData({ ...formData, category: selectedOption ? selectedOption.value : '' });
    }

    const handleAssignedToChange = (selectedOptions) => {
        setFormData({ ...formData, assigned_to: selectedOptions ? selectedOptions.map((option) => option.value) : [] });
    }

    const handleCreateKeyStakeholder = (inputValue) => {
        const newOption = { value: inputValue, label: inputValue };
        setDepartmentAgencies((prevOptions) => [...prevOptions, newOption]);
        setFormData((prevFormData) => ({
            ...prevFormData,
            key_stakeholders: [...(prevFormData.key_stakeholders || []), inputValue],
        }));
    }

    const handleKeyStakeholderChange = (selectedOptions) => {
        setFormData({
            ...formData,
            key_stakeholders: selectedOptions ? selectedOptions.map((option) => option.value) : []
        });
    }

    const handleClose = () => {
        setFormData('');
        onClose();
    }

    const handleModalSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (isEditMode) {
                const response = await axios.patch(`/update-work-items/${formData.id}`, formData);
                toast.success(response.data.message);
                onEditSuccess();
            } else {
                const response = await axios.post('/add-new-work-items', formData);
                toast.success(response.data.message);
                onAddSuccess();
            }
            setFormData('');
            onClose();
        } catch (error) {
            toast.error(error.response.data.message);
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (isOpen && initialFormData) {
            const processedFormData = {
                ...initialFormData,
                assigned_to: initialFormData.assigned_to ? initialFormData.assigned_to.map(user => user.id) : [],
                key_stakeholders: initialFormData.key_stakeholders ? initialFormData.key_stakeholders.split(', ') : []
            }
            setFormData(isEditMode ? processedFormData : '');
        }
    }, [isOpen, initialFormData, isEditMode]);

    if (!isOpen) return null;

    return (
        <>
            <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <div className={`relative w-full max-w-lg p-6 bg-white shadow-lg overflow-y-auto max-h-[75vh] dark:border-strokedark dark:bg-boxdark transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-y-0 scale-100' : '-translate-y-10 scale-95'}`}>
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
                    >
                        &times;
                    </button>
                    <h2 className='text-2xl font-semibold mb-4'>{isEditMode ? 'Update Work Item' : 'Add New Work Item'}</h2>
                    <form onSubmit={handleModalSubmit} className='space-y-4'>
                        <input type='hidden' name='id' value={formData.id || ''} readOnly />
                        <div>
                            <label className='block font-medium'>Work Item</label>
                            <input
                                type="text"
                                name="work_item"
                                value={formData.work_item || ''}
                                onChange={handleChange}
                                className='w-full p-2 border focus:outline-none focus:ring focus:ring-indigo-300 dark:bg-meta-4'
                                required
                            />
                        </div>
                        <div>
                            <label className='block font-medium'>Description</label>
                            <textarea
                                name="description"
                                rows="3"
                                value={formData.description || ''}
                                onChange={handleChange}
                                className='w-full p-2 border focus:outline-none focus:ring focus:ring-indigo-300 dark:bg-meta-4'
                                required
                            />
                        </div>
                        <div className="flex gap-4">
                            <div className='w-1/2'>
                                <label className='block font-medium'>Category</label>
                                <div className="relative w-full">
                                    <Select
                                        options={offices}
                                        value={offices.filter(option => option.value === formData.category)}
                                        onChange={handleCategoryChange}
                                        className='w-full p-2 border focus:outline-none focus:ring focus:ring-indigo-300 dark:bg-meta-4 dark:text-black'
                                        required
                                    />
                                </div>
                            </div>
                            <div className='w-1/2'>
                                <label className='block font-medium'>Status</label>
                                <select
                                    name="progress"
                                    value={formData.progress || ''}
                                    onChange={handleChange}
                                    className='w-full p-2 border focus:outline-none focus:ring focus:ring-indigo-300 dark:bg-meta-4'
                                    required
                                >
                                    <option value="">Select Status</option>
                                    <option value="Not started">Not started</option>
                                    <option value="In progress">In progress</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Blocked">Blocked</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className='block font-medium'>Complexity</label>
                            <select
                                name="complexity"
                                value={formData.complexity || ''}
                                onChange={handleChange}
                                className='w-full p-2 border focus:outline-none focus:ring focus:ring-indigo-300 dark:bg-meta-4'
                                required
                            >
                                <option value="">Select Complexity</option>
                                <option value="Simple">Simple</option>
                                <option value="Complex">Complex</option>
                                <option value="Highly Technical">Highly Technical</option>
                            </select>
                        </div>
                        <div className="flex gap-4">
                            <div className='w-1/2'>
                                <label className='block font-medium'>Start Date</label>
                                <input
                                    type="date"
                                    name="start_date"
                                    value={formData.start_date || ''}
                                    onChange={handleChange}
                                    className='w-full p-2 border focus:outline-none focus:ring focus:ring-indigo-300 dark:bg-meta-4'
                                    required
                                />
                            </div>
                            <div className='w-1/2'>
                                <label className='block font-medium'>Due Date</label>
                                <input
                                    type="date"
                                    name="due_date"
                                    value={formData.due_date || ''}
                                    onChange={handleChange}
                                    className='w-full p-2 border focus:outline-none focus:ring focus:ring-indigo-300 dark:bg-meta-4'
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className='block font-medium'>Assigned To</label>
                            <Select
                                isMulti
                                options={names}
                                value={names.filter(option => formData.assigned_to?.includes(option.value))}
                                onChange={handleAssignedToChange}
                                className='w-full p-2 border focus:outline-none focus:ring focus:ring-indigo-300 dark:bg-meta-4 dark:text-black'
                                required
                            />
                        </div>
                        <div>
                            <label className='block font-medium'>Key Stakeholders</label>
                            <CreatetableSelect
                                isMulti
                                options={departmentAgencies}
                                value={departmentAgencies.filter(option => formData.key_stakeholders?.includes(option.value))}
                                onChange={handleKeyStakeholderChange}
                                onCreateOption={handleCreateKeyStakeholder}
                                className='w-full p-2 border focus:outline-none focus:ring focus:ring-indigo-300 dark:bg-meta-4 dark:text-black'
                                required
                            />
                        </div>
                        <div>
                            <label className='block font-medium'>Action Items and Notes</label>
                            <textarea
                                name="remarks"
                                rows="3"
                                value={formData.remarks || ''}
                                onChange={handleChange}
                                className="w-full p-2 border focus:outline-none focus:ring focus:ring-indigo-300 dark:bg-meta-4"
                                required
                            />
                        </div>
                        <div className="flex justify-end space-x-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`px-4 py-2 rounded text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {loading ? (
                                    <span className='flex items-center'>
                                        <svg aria-hidden="true" role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"></path>
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"></path>
                                        </svg>
                                        Please wait...
                                    </span>
                                ) : isEditMode ? 'Update' : 'Save'}
                            </button>
                            <button
                                type="button"
                                onClick={handleClose}
                                className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-300"
                                required
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AddNewItem;