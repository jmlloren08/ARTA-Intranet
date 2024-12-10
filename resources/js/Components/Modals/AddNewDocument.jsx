import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';
import { usePage } from '@inertiajs/react';

const AddNewDocument = ({ isOpen, onClose, onAddSuccess, onEditSuccess, initialFormData, isEditMode }) => {

    const [formData, setFormData] = useState('');
    const [offices, setOffices] = useState([]);
    const [names, setNames] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fileName, setFileName] = useState('');
    const user = usePage().props.auth.user;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleCategoryChange = (selectedOption) => {
        setFormData({ ...formData, category: selectedOption ? selectedOption.value : '' });
    }

    const handleAssignedToChange = (selectedOptions) => {
        setFormData({ ...formData, assigned_to: selectedOptions ? selectedOptions.map((option) => option.value) : [] });
    }

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, file });
            setFileName(file.name);
        }
    }

    const handleClose = () => {
        setFormData('');
        onClose();
    }

    const handleUpdateDocumentTitle = async (e) => {
        try {
            const response = await axios.patch(`/google/docs/update-document-title/${formData.document_id}`, {
                title: formData.title
            });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error updating document title');
        }
    }

    const handleModalSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (isEditMode) {
            try {
                // update document title
                handleUpdateDocumentTitle();
                // update metadata
                const response = await axios.patch(`/update-document-metadata/${formData.id}`, formData);
                toast.success(response.data.message);
                onEditSuccess();
            } catch (error) {
                toast.error(error.response?.data?.message || 'Error updating metadata');
            } finally {
                setLoading(false);
                setFormData('');
                onClose();
            }
        } else {
            try {
                // create metadata
                const saveResponse = await axios.post('/create-new-document', formData);
                const savedDocument = saveResponse.data.document;
                // create google doc
                const response = await axios.post('/google/docs/create', { title: formData.title });
                const { document_id, document_url } = response.data;
                // update document id and url, after metadata is created
                const response2 = await axios.put(`/update-document/${savedDocument.id}`, {
                    document_id,
                    document_url
                });
                toast.success(response2.data.message);
                onAddSuccess();
            } catch (error) {
                toast.error(error.response?.data?.message || 'Error creating/updating document');
            } finally {
                setLoading(false);
                setFormData('');
                onClose();
            }
        }
    }

    useEffect(() => {
        axios.get('/get-names')
            .then((response) => {
                setNames(response.data.map(user => ({ value: user.id, label: user.name })));
            })
            .catch((error) => {
                console.error(error.response?.data?.message || 'Error fetching data');
            })
    }, []);

    useEffect(() => {
        axios.get('/get-distinct-offices')
            .then((response) => {
                setOffices(response.data.map(office => ({ value: office.office, label: office.office })));
            })
            .catch((error) => {
                console.error(error.response?.data?.message || 'Error fetching data');
            })
    }, []);

    useEffect(() => {
        if (isOpen && initialFormData) {
            const processedFormData = {
                ...initialFormData,
                assigned_to: initialFormData.assigned_to ? initialFormData.assigned_to.map(user => user.id) : []
            }
            setFormData(isEditMode ? processedFormData : '');
        }
    }, [isOpen, initialFormData, isEditMode]);

    if (!isOpen) return null;

    return (
        <>
            <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transform transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <div className={`relative w-full max-w-lg p-6 bg-white shadow-lg overflow-y-auto max-h-[75vh] dark:border-strokedark dark:bg-boxdark transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-y-0 scale-100' : '-translate-y-10 scale-95'}`}>
                    <h2 className='text-2xl font-semibold mb-4'>{isEditMode ? formData.document_number : 'Create New Document'}</h2>
                    <form onSubmit={handleModalSubmit} className='space-y-4'>
                        <input type='hidden' name='id' value={formData.id || ''} readOnly />
                        <div>
                            <label className='block font-medium'>Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title || ''}
                                onChange={handleChange}
                                className='w-full p-2 border focus:outline-none focus:ring focus:ring-indigo-300 dark:bg-meta-4'
                                required
                            />
                        </div>
                        <div>
                            <label className='block font-medium'>Description</label>
                            <textarea
                                name="description"
                                rows="4"
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
                                        className='w-full p-2 border focus:outline-none focus:ring focus:ring-indigo-300 dark:bg-meta-4'
                                        required
                                    />
                                </div>
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
                                className='w-full p-2 border focus:outline-none focus:ring focus:ring-indigo-300 dark:bg-meta-4'
                                required
                            />
                        </div>
                        <div>
                            <label className='block font-medium'>Status</label>
                            <input
                                type="text"
                                name="status"
                                value={formData.status || 'Draft'}
                                readOnly
                                className={`w-full p-2 border focus:outline-none focus:ring focus:ring-indigo-300 dark:bg-meta-4`}
                            />
                        </div>
                        <div className='mt-4'>
                            <label htmlFor="file" className='text-xs'>Upload scanned signed document once status is <span className='bg-success rounded px-1 text-white'>Approved</span>.</label>
                            <div
                                id="file"
                                className={`relative block w-full appearance-none rounded border border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5 ${formData.status !== 'Approved' && 'opacity-50'}`}
                            >
                                <input
                                    type="file"
                                    accept="application/vnd.openxmlformats-officedocument.wordprocessingml.document/*"
                                    name='file'
                                    value={formData.scanned_file_path || ''}
                                    onChange={handleFileChange}
                                    className={`absolute inset-0 z-50 m-0 h-full w-full p-0 opacity-0 outline-none ${formData.status !== 'Approved' && 'cursor-not-allowed'}`}
                                    required={formData.status === 'Approved'}
                                    disabled={formData.status !== 'Approved'}
                                />
                                <div className="flex flex-col items-center justify-center space-y-3">
                                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark text-primary">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                                        </svg>
                                    </span>
                                    <p>
                                        <span className="text-primary">Click to upload</span> or
                                        drag and drop
                                    </p>
                                    <p className="mt-1.5">.docx, .xlsx, .ppt, .pdf</p>
                                    <p>(max, 5mb)</p>
                                </div>
                            </div>
                            {fileName && (
                                <label className='text-xs italic'>{fileName}</label>
                            )}
                        </div>
                        <div className="flex justify-end space-x-2">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-300"
                                required
                            >
                                Cancel
                            </button>
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
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AddNewDocument