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
                    <button
                        onClick={handleReceive}
                        className='flex flex-col items-center px-2 rounded font-medium'
                        title='Receive'
                    >
                        <span className='flex flex-col items-center text-black hover:text-primary transition duration-300 ease-in-out'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
                            </svg>
                            <label className="text-xs hover:cursor-pointer">Receive</label>
                        </span>
                    </button>
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