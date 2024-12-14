import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';
import { usePage } from '@inertiajs/react';

const ReturnDocument = ({ isOpen, onClose, onReturnSuccess, initialFormData }) => {

    const [formData, setFormData] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleClose = () => {
        setFormData('');
        onClose();
    }

    const handleModalSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    }

    useEffect(() => {
        if (isOpen && initialFormData) {
            const processedFormData = {
                ...initialFormData
            }
            setFormData(processedFormData);
        }
    }, [isOpen, initialFormData]);

    return (
        <>
            <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transform transition-opacity duration-300 ease-in-out`}>
                <div className={`relative w-full max-w-lg p-6 bg-white shadow-lg dark:border-strokedark dark:bg-boxdark transform transition-transform duration-300 ease-in-out`}>
                    <h2 className='text-2xl font-semibold mb-4'>
                        <span className='flex items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                            </svg>
                            <label className="ml-2">Return Document</label>
                        </span>
                    </h2>
                    <form onSubmit={handleModalSubmit} className='space-y-4'>
                        <input type='hidden' name='id' value={formData.id || ''} readOnly />
                        <div>
                            <label className='block font-medium'>Remarks/Instructions</label>
                            <textarea
                                name="remarks_instructions"
                                rows="4"
                                value={formData.remarks_instructions || ''}
                                onChange={handleChange}
                                className='w-full p-2 border focus:outline-none focus:ring focus:ring-indigo-300 dark:bg-meta-4'
                                required
                            />
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
                                ) : 'Return'}
                            </button>
                        </div>
                    </form>
                </div>
            </div >
        </>
    );
}

export default ReturnDocument