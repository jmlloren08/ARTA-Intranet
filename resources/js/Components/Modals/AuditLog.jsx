import Loader from '../../common/Loader';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuditLog = ({ isOpen, onClose, id }) => {

    const [viewAuditLogs, setViewAuditLogs] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleClose = () => onClose();

    const fetchAuditLogs = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/document/${id}/get-document-audit-logs`);
            setViewAuditLogs(response.data);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error fetching data');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (isOpen && id) {
            fetchAuditLogs();
        }
    }, [isOpen, id]);

    if (!isOpen) return null;

    return (
        <>
            <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transform transition-opacity duration-300 ease-in-out`}>
                <div className={`relative w-full max-w-lg p-6 bg-white shadow-lg overflow-y-auto max-h-[75vh] dark:border-strokedark dark:bg-boxdark transform transition-transform duration-300 ease-in-out`}>
                    <h2 className='text-2xl font-semibold mb-4'>
                        <span className='flex items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                            </svg>
                            <label className="ml-2">Audit Logs</label>
                        </span>
                    </h2>
                    {loading ? (
                        <div className='flex items-center justify-center'>
                            <div style={{ borderTopColor: 'transparent' }} className="w-8 h-8 border-4 border-blue-200 rounded-full animate-spin"></div>
                            <p className="ml-2">Please wait...</p>
                        </div>
                    ) : (
                        <>
                            {viewAuditLogs.length > 0 ? (
                                <>
                                    <div className='relative px-4'>
                                        <div className="absolute h-full border border-dashed border-opacity-20 border-secondary"></div>
                                        {viewAuditLogs.map((logg, index) => (
                                            <div key={index}>
                                                <div className="flex items-center w-full my-6 -ml-1.5">
                                                    <div className="w-1/12 z-10">
                                                        <div className="w-3.5 h-3.5 bg-blue-600 rounded-full"></div>
                                                    </div>
                                                    <div className="w-11/12">
                                                        <p className="text-sm">{logg.details}</p>
                                                        <p className='text-xs'>{logg.user?.name || 'Unknown'}</p>
                                                        <p className="text-xs text-gray-500">{new Date(logg.updated_at).toLocaleString()}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <p>No audit logs available for this document.</p>
                            )}
                        </>
                    )}
                    <div className='flex justify-end'>
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-300"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div >
        </>
    );
}

export default AuditLog