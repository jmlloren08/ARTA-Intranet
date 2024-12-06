import React, { useState } from 'react';
import DefaultLayout from '../../../layout/DefaultLayout';
import Breadcrumb from '../../../Components/Breadcrumbs/Breadcrumb';
import { Head } from '@inertiajs/react';

const NewDocument = () => {

  const [formData, setFormData] = useState({
    title: '',
    type: '',
    description: '',
    category: '',
    status: 'draft',
    dueDate: '',
    assignedTo: '',
    file: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  }

  return (
    <>
      <Head title="DMS" />
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Create New Document" />
        <h2 className='text-xl font-semibold mb-4'>Create a New Document</h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label htmlFor="title" className='block text-sm font-medium text-gray-700'>Document Title</label>
            <input
              type='text'
              id='title'
              name='title'
              value={formData.title}
              onChange={handleChange}
              required
              className='mt-1 block w-full p-2 border border-gray-300 rounded-md'
            />
          </div>
          <div>
            <label htmlFor="type" className='block text-sm font-medium text-gray-700'>Document Type</label>
            <select
              id='type'
              name='type'
              value={formData.type}
              onChange={handleChange}
              required
              className='mt-1 block w-full p-2 border border-gray-300 rounded-md'
            >
              <option value="">Select Document Type</option>
              <option value="word">Word</option>
              <option value="excel">Excel</option>
              <option value="ppt">Powerpoint</option>
              <option value="pdf">PDF</option>
            </select>
          </div>
          <div>
            <label htmlFor="description" className='block text-sm font-medium text-gray-700'>Description</label>
            <textarea
              id='description'
              name='description'
              value={formData.description}
              onChange={handleChange}
              className='mt-1 block w-full p-2 border border-gray-300 rounded-md'
              rows={4}
            />
          </div>
          <div>
            <label htmlFor="category" className='block text-sm font-medium text-gray-700'>Category</label>
            <input
              type='text'
              id='category'
              name='category'
              value={formData.category}
              onChange={handleChange}
              className='mt-1 block w-full p-2 border border-gray-300 rounded-md'
            />
          </div>
          <div>
            <label htmlFor="status" className='block text-sm font-medium text-gray-700'>Status</label>
            <select
              id='status'
              name='status'
              value={formData.status}
              onChange={handleChange}
              required
              className='mt-1 block w-full p-2 border border-gray-300 rounded-md'
            >
              <option value="draft">Draft</option>
              <option value="in-progress">In Progress</option>
              <option value="pending-review">Pending Review</option>
            </select>
          </div>
          <div>
            <label htmlFor="dueDate" className='block text-sm font-medium text-gray-700'>Due Date</label>
            <input
              type='date'
              id='dueDate'
              name='dueDate'
              value={formData.dueDate}
              onChange={handleChange}
              className='mt-1 block w-full p-2 border border-gray-300 rounded-md'
            />
          </div>
          <div>
            <label htmlFor="assignedTo" className='block text-sm font-medium text-gray-700'>Assigned To</label>
            <input
              type='text'
              id='assignedTo'
              name='assignedTo'
              value={formData.assignedTo}
              onChange={handleChange}
              className='mt-1 block w-full p-2 border border-gray-300 rounded-md'
            />
          </div>
          <div>
            <label htmlFor="file" className='block text-sm font-medium text-gray-700'>Upload Document</label>
            <input
              type='file'
              id='file'
              name='file'
              onChange={handleFileChange}
              className='mt-1 block w-full p-2 border border-gray-300 rounded-md'
              required
            />
          </div>
          <div>
            <button
              type='submit'
              className='mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md'
            >
              Create Document
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

NewDocument.layout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default NewDocument;