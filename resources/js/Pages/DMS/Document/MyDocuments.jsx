import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../../layout/DefaultLayout';
import Breadcrumb from '../../../Components/Breadcrumbs/Breadcrumb';
import { Head } from '@inertiajs/react';
import { ToastContainer } from 'react-toastify';
import AddNewDocument from '../../../Components/Modals/AddNewDocument';
import DocumentActions from '../../../Components/Modals/DocumentActions';
import Loader from '@/common/Loader';

const MyDocuments = () => {

  const [documents, setDocuments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [editItem, setEditItem] = useState('');
  const [loading, setLoading] = useState(true);

  const checkGoogleAuth = async () => {
    try {
      const response = await axios.get('/check-google-authentication');
      if (!response.data.authenticated) {
        window.location.href = '/google/auth';
      }
    } catch (error) {
      console.error(error.response?.data?.message || 'Error fetching documents');
    }
  }

  const fetchDocuments = async () => {
    try {
      const response = await axios.get('/list-my-documents');
      setDocuments(response.data);
    } catch (error) {
      console.error(error.response?.data?.message || 'Error fetching documents');
    } finally {
      setLoading(false);
    }
  }

  const openAddModal = () => {
    setEditItem('');
    setIsModalOpen(true);
  }

  const openEditModal = (item) => {
    setEditItem(item);
    setIsModalOpen(true);
  }

  const handleRouteSuccess = () => {
    setRefresh(prev => !prev);
  }

  const handleAddSuccess = () => {
    setRefresh(prev => !prev);
  }

  const handleEditSuccess = () => {
    setRefresh(prev => !prev);
  }

  useEffect(() => {
    checkGoogleAuth();
    fetchDocuments();
  }, [refresh]);

  return (
    <>
      <Head title="My Documents" />
      <ToastContainer />
      <div className="mx-auto max-w-full">
        <Breadcrumb pageName="My Documents" />
        <div className='flex flex-col gap-y-4 rounded-sm border border-stroke bg-white p-3 mb-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:flex-row sm:items-center sm:justify-between'>
          <div className='flex flex-col items-start sm:items-center'>
            <p className='text-xs'>All documents created by you are listed here.</p>
          </div>
        </div>
        <div className='flex flex-col gap-y-4 rounded-sm border border-stroke bg-white p-3 mb-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:flex-row sm:items-center sm:justify-between'>
          <div className='flex flex-col items-start sm:items-center'>
            <button
              onClick={openAddModal}
              className='flex items-center gap-2 rounded bg-primary py-2 px-4.5 font-medium text-white hover:bg-opacity-90'
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Create New Document
            </button>
          </div>
        </div>
        <div className='p-4 bg-white rounded border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
          {loading ? (
            <Loader />
          ) : documents.length < 1 ? (
            <div className="text-center py-6">
              <p className="text-sm text-gray-600 dark:text-gray-300">No documents found</p>
            </div>
          ) : (
            <table className='w-full table-auto '>
              <thead>
                <tr className='bg-gray-2 text-left dark:bg-meta-4'>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">Title</th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">Status</th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">Due Date</th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">Action</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc, index) => (
                  <tr key={index}>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark"><p className='text-sm'>{doc.title}</p></td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className='text-sm'>
                        <span className={`inline-block rounded-full px-2 py-1 text-xs font-semibold leading-5
                        ${doc.status === 'Draft' ? 'bg-warning bg-opacity-20 border border-warning text-warning' :
                            doc.status === 'In Progress' ? 'bg-secondary bg-opacity-20 border border-secondary text-secondary' :
                              doc.status === 'Under Review' ? 'bg-primary bg-opacity-20 border border-primary text-primary' :
                                doc.status === 'Approved' ? 'bg-success bg-opacity-20 border border-success text-success' :
                                  doc.status === 'Rejected' ? 'bg-danger bg-opacity-20 border border-danger text-danger' :
                                    'bg-gray-600 bg-opacity-20 border border-gray-600 text-gray-600'}`}>
                          {doc.status}
                        </span>
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark"><p className='text-sm'>{doc.due_date}</p></td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center">
                        <DocumentActions
                          doc={doc}
                          openEditModal={openEditModal}
                          onRouteSuccess={handleRouteSuccess}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {isModalOpen && (
        <AddNewDocument
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddSuccess={handleAddSuccess}
          onEditSuccess={handleEditSuccess}
          initialFormData={editItem}
          isEditMode={Boolean(editItem)}
        />
      )}
    </>
  );
};

MyDocuments.layout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default MyDocuments;