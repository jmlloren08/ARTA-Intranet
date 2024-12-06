import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../../layout/DefaultLayout';
import Breadcrumb from '../../../Components/Breadcrumbs/Breadcrumb';
import { Head } from '@inertiajs/react';

const NewDocument = () => {

  const [loading, setLoading] = useState(false);
  const [docUrl, setDocUrl] = useState(null);
  const [docId, setDocId] = useState(null);
  const [reloadIframe, setReloadIframe] = useState(false);

  const createDocument = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/google/docs/create');
      const { docUrl, docId } = response.data;
      setDocUrl(docUrl);
      setDocId(docId);
    } catch (error) {
      console.error(error.response?.data?.message || 'Error creating document');
    } finally {
      setLoading(false);
    }
  }

  const refreshIframe = () => {
    setReloadIframe(prev => !prev);
  }

  return (
    <>
      <Head title="Create New Document" />
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Create New Document" />
        <h2 className='text-xl font-semibold mb-4'>Create a New Document</h2>
        <button
          onClick={createDocument}
          className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Creating...' : 'New Document'}
        </button>
        {docUrl && (
          <div className="mt-4">
            <h3 className='font-semibold'>Document Created!</h3>
            <p>Preview:</p>
            <iframe
              key={reloadIframe}
              src={`https://docs.google.com/document/d/${docId}/preview?tab=t.0`}
              width={'50%'}
              height={'300px'}
              style={{ border: 'none' }}
            ></iframe>
            <div className='flex gap-2'>
              <button
                onClick={() => window.open(docUrl, '_blank')}
                className='bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600'
              >
                Edit document
              </button>
              <button
                onClick={refreshIframe}
                className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'
              >
                Refresh
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

NewDocument.layout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default NewDocument;