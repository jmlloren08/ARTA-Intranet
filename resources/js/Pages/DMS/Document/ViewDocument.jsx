import React, { useEffect } from 'react';
import { Head } from '@inertiajs/react';

const ViewDocument = ({ document_id }) => {

    const handleContextMenu = (event) => {
        event.preventDefault();
    }

    if (!document_id) {
        <p>Document not found.</p>
    }

    return (
        <>
            <Head title="View Document" />
            <div className="mx-auto max-w-full" onContextMenu={handleContextMenu}>
                <iframe
                    src={`https://docs.google.com/document/d/${document_id}/preview`}
                    width={'100%'}
                    height={'600px'}
                    style={{ border: 'none' }}
                    allowFullScreen
                ></iframe>
            </div>
        </>
    );
}

export default ViewDocument;