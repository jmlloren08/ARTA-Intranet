import React, { useEffect, useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import axios from 'axios';
import ReturnDocument from '../../../Components/Modals/ReturnDocument';
import RouteDocument from '../../../Components/Modals/RouteDocument';

const ViewDocument = ({ document_id, document_status, assigned_to, current_user }) => {

    const [status, setStatus] = useState(document_status);
    const [isModalIsReturnOpen, setIsModalIsReturnOpen] = useState(false);
    const [isModalIsRouteOpen, setIsModalIsRouteOpen] = useState(false);

    const handleContextMenu = (event) => {
        event.preventDefault();
    }

    const handleReceive = () => {
        setStatus('Received');
    }

    const handleReturn = () => setIsModalIsReturnOpen(true);
    const handleRoute = () => setIsModalIsRouteOpen(true);

    const closeModal = () => {
        setIsModalIsReturnOpen(false);
        setIsModalIsRouteOpen(false);
    }

    if (!document_id) {
        <p>Document not found.</p>
    }

    return (
        <>
            <Head title="View Document" />
            <div className="mx-auto max-w-full" onContextMenu={handleContextMenu}>
                <div className='m-2 flex justify-center items-center'>

                    <button
                        onClick={() => {
                            window.open(`https://docs.google.com/document/d/${document_id}/export?format=doc`, '_blank');
                        }}
                        className='flex flex-col items-center px-2 rounded font-medium'
                        title='Download'
                    >
                        <span className='flex flex-col items-center text-black hover:text-primary transition duration-300 ease-in-out'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path fillRule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 0 1 3.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 0 1 3.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 0 1-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875Zm5.845 17.03a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V12a.75.75 0 0 0-1.5 0v4.19l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3Z" clipRule="evenodd" />
                                <path d="M14.25 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 16.5 7.5h-1.875a.375.375 0 0 1-.375-.375V5.25Z" />
                            </svg>
                            <label className="text-xs hover:cursor-pointer">Download</label>
                        </span>
                    </button>
                    {status === 'Received' && current_user === assigned_to ? (
                        <>
                            <button
                                onClick={handleRoute}
                                className='flex flex-col items-center px-2 rounded font-medium'
                                title='Route'
                            >
                                <span className='flex flex-col items-center text-black hover:text-primary transition duration-300 ease-in-out'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                        <path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm10.72 4.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H9a.75.75 0 0 1 0-1.5h10.94l-1.72-1.72a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                    </svg>
                                    <label className="text-xs hover:cursor-pointer">Route</label>
                                </span>
                            </button>
                            <button
                                onClick={handleReturn}
                                className='flex flex-col items-center px-2 rounded font-medium'
                                title='Return'
                            >
                                <span className='flex flex-col items-center text-black hover:text-primary transition duration-300 ease-in-out'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                        <path fillRule="evenodd" d="M9.53 2.47a.75.75 0 0 1 0 1.06L4.81 8.25H15a6.75 6.75 0 0 1 0 13.5h-3a.75.75 0 0 1 0-1.5h3a5.25 5.25 0 1 0 0-10.5H4.81l4.72 4.72a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                                    </svg>
                                    <label className="text-xs hover:cursor-pointer">Return</label>
                                </span>
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={handleReceive}
                            className='flex flex-col items-center px-2 rounded font-medium'
                            title='Receive'
                        >
                            <span className='flex flex-col items-center text-black hover:text-primary transition duration-300 ease-in-out'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                    <path fillRule="evenodd" d="M9 1.5H5.625c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5Zm6.61 10.936a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 14.47a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                                    <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
                                </svg>
                                <label className="text-xs hover:cursor-pointer">Receive</label>
                            </span>
                        </button>
                    )}
                </div>
                <div>
                    <iframe
                        src={`https://docs.google.com/document/d/${document_id}/preview`}
                        width={'100%'}
                        height={'800px'}
                        style={{ border: 'none' }}
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
            {isModalIsReturnOpen && (
                <ReturnDocument
                    isOpen={isModalIsReturnOpen}
                    onClose={closeModal}
                    onReturnSuccess={() => {
                        closeModal();
                        setStatus('Returned');
                    }}
                />
            )}
            {isModalIsRouteOpen && (
                <RouteDocument
                    isOpen={isModalIsRouteOpen}
                    onClose={closeModal}
                    onRouteSuccess={() => {
                        closeModal();
                        setStatus('Routed');
                    }}
                />
            )}
        </>
    );
}

export default ViewDocument;