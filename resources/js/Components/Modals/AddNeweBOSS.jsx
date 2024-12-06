import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';
import CreatetableSelect from 'react-select/creatable';
import { Head } from '@inertiajs/react';

const AddNeweBOSS = ({ isOpen, onClose }) => {

    const [noSubmission, setNoSubmission] = useState(false);
    const [notApplicableDeadline, setNotApplicableDeadline] = useState(false);
    const [notApplicableSubmission, setNotApplicableSubmission] = useState(false);
    const [regions, setRegions] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [citiesMunicipalities, setCitiesMunicipalities] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [selectedProvince, setSelectedProvince] = useState(null);

    useEffect(() => {
        axios.get('/get-regions')
            .then(response => {
                setRegions(response.data.map(region => ({ value: region.reg_code, label: region.reg_desc })));
            })
            .catch(error => {
                console.error(error.response?.data?.message || 'Error fetching data');
            });
    }, []);

    const handleRegionChange = (selectedRegion) => {

        setSelectedRegion(selectedRegion);
        setProvinces('');
        setProvinces([]);
        setCitiesMunicipalities('');
        setCitiesMunicipalities([]);
        if (selectedRegion) {
            axios.get(`/get-provinces-by-region`, { params: { reg_code: selectedRegion.value } })
                .then(response => {
                    setProvinces(response.data.map(province => ({ value: province.prov_code, label: province.prov_desc })));
                })
                .catch(error => {
                    console.error(error.response?.data?.message || 'Error fetching data');
                });
        }
    }

    const handleProvinceChange = (selectedProvince) => {
        setSelectedProvince('');
        setSelectedProvince(selectedProvince);
        setCitiesMunicipalities('');
        setCitiesMunicipalities([]);
        if (selectedProvince) {
            axios.get(`/get-cities-municipalities-by-province`, { params: { prov_code: selectedProvince.value } })
                .then(response => {
                    setCitiesMunicipalities(response.data.map(city => ({ value: city.citymun_code, label: city.citymun_desc })));
                })
                .catch(error => {
                    console.error(error.response?.data?.message || 'Error fetching data');
                });
        }
    }

    const handleModalSubmit = async (e) => {
        e.preventDefault();
        console.log({
            region: selectedRegion?.label,
            province: selectedProvince?.label,
            cityMunicipality: citiesMunicipalities.find(city => city.value === e.target.citymun_code.value)?.label,
        });
    }
    return (
        <>
            <div className='fixed inset-0 z-auto flex items-center justify-center bg-black bg-opacity-50'>
                <div className='bg-white rounded-lg shadow-lg overflow-y-auto max-h-[75vh] w-full max-w-2xl p-6 dark:border-strokedark dark:bg-boxdark'>
                    <h2 className='text-lg font-semibold mb-4'>Add New Inspection</h2>
                    <form onSubmit={handleModalSubmit} className='space-y-4'>
                        <div className='grid grid-cols-1'>
                            <div>
                                <label htmlFor="date_of_inspection" className='block text-sm font-medium text-gray-700'>
                                    Date of Inspection
                                </label>
                                <input
                                    type="date"
                                    id="date_of_inspection"
                                    className='mt-1 px-4 p-2 w-full sm:w-1/2 rounded-md border border-slate-100 shadow-sm focus:outline-none focus:ring focus:ring-indigo-300 dark:bg-meta-4 sm:text-sm'
                                    required
                                />
                            </div>
                        </div>
                        <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
                            <div className='col-span-1'>
                                <label htmlFor="region" className='block text-sm font-medium text-gray-700'>
                                    Region
                                </label>
                                <Select
                                    options={regions}
                                    onChange={handleRegionChange}
                                    placeholder="Select Region"
                                    className='mt-1 px-4 p-2 w-full rounded-md border border-slate-100 shadow-sm focus:outline-none focus:ring focus:ring-indigo-300 dark:bg-meta-4 sm:text-sm'
                                    required
                                />
                            </div>
                            <div className='col-span-1'>
                                <label htmlFor="province" className='block text-sm font-medium text-gray-700'>
                                    Province
                                </label>
                                <Select
                                    options={provinces}
                                    onChange={handleProvinceChange}
                                    placeholder="Select Province"
                                    className='mt-1 px-4 p-2 w-full rounded-md border border-slate-100 shadow-sm focus:outline-none focus:ring focus:ring-indigo-300 dark:bg-meta-4 sm:text-sm'
                                    isDisabled={!selectedRegion}
                                    required
                                />
                            </div>
                            <div className='col-span-1'>
                                <label htmlFor="city_municipality" className='block text-sm font-medium text-gray-700'>
                                    City/Municipality
                                </label>
                                <Select
                                    options={citiesMunicipalities}
                                    placeholder="Select City/Municipality"
                                    className='mt-1 px-4 p-2 w-full rounded-md border border-slate-100 shadow-sm focus:outline-none focus:ring focus:ring-indigo-300 dark:bg-meta-4 sm:text-sm'
                                    isDisabled={!selectedProvince}
                                    required
                                />
                            </div>
                        </div>
                        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                            <div>
                                <label htmlFor="eboss_submission" className='block text-sm font-medium text-gray-700'>
                                    eBOSS Submission
                                </label>
                                <div className='flex items-center'>
                                    <input
                                        type="date"
                                        id="eboss_submission"
                                        className={`mt-1 p-2 w-full rounded-md border border-slate-100 px-4 py-2 ${noSubmission ? 'bg-gray-200 cursor-not-allowed' : ''} focus:outline-none focus:ring focus:ring-indigo-300 dark:bg-meta-4 sm:text-sm`}
                                        disabled={noSubmission}
                                        required={!noSubmission}
                                    />
                                    <label className='ml-3 flex items-center'>
                                        <input
                                            type="checkbox"
                                            checked={noSubmission}
                                            onChange={(e) => setNoSubmission(e.target.checked)}
                                            className="mr-2"
                                        />
                                        <span className='text-xs'>No Submission</span>
                                    </label>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="type_of_boss" className='block text-sm font-medium text-gray-700'>
                                    Type of BOSS
                                </label>
                                <input
                                    type="text"
                                    id="type_of_boss"
                                    className='mt-1 px-4 p-2 w-full rounded-md border border-slate-100 shadow-sm focus:outline-none focus:ring focus:ring-indigo-300 dark:bg-meta-4 sm:text-sm'
                                    required
                                />
                            </div>
                        </div>
                        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                            <div className='flex flex-col'>
                                <label htmlFor="deadline_of_action_plan" className='block text-sm font-medium text-gray-700'>
                                    Deadline of Action Plan
                                </label>
                                <div className='flex items-center gap-2 mt-1'>
                                    <input
                                        type="date"
                                        id="deadline_of_action_plan"
                                        className={`mt-1 px-4 p-2 w-full rounded-md border border-slate-100  ${notApplicableDeadline ? 'bg-gray-200 cursor-not-allowed' : ''} focus:outline-none focus:ring focus:ring-indigo-300 dark:bg-meta-4 sm:text-sm`}
                                        disabled={notApplicableDeadline}
                                        required={!notApplicableDeadline}
                                    />
                                    <label className='ml-3 flex items-center'>
                                        <input
                                            type="checkbox"
                                            checked={notApplicableDeadline}
                                            onChange={(e) => setNotApplicableDeadline(e.target.checked)}
                                            className="mr-2"
                                        />
                                        <span className='text-xs'>N/A</span>
                                    </label>
                                </div>
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="submission_of_action_plan" className='block text-sm font-medium text-gray-700'>
                                    Submission of Action Plan
                                </label>
                                <div className='flex items-center gap-2 mt-1'>
                                    <input
                                        type="date"
                                        id="submission_of_action_plan"
                                        className={`mt-1 px-4 p-2 w-full rounded-md border border-slate-100 ${notApplicableSubmission ? 'bg-gray-200 cursor-not-allowed' : ''} focus:outline-none focus:ring focus:ring-indigo-300 dark:bg-meta-4 sm:text-sm`}
                                        disabled={notApplicableSubmission}
                                        required={!notApplicableSubmission}
                                    />
                                    <label className='ml-3 flex items-center'>
                                        <input
                                            type="checkbox"
                                            checked={notApplicableSubmission}
                                            onChange={(e) => setNotApplicableSubmission(e.target.checked)}
                                            className="mr-2"
                                        />
                                        <span className='text-xs'>N/A</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                            <div>
                                <label htmlFor="remarks" className='block text-sm font-medium text-gray-700'>
                                    Remarks
                                </label>
                                <input
                                    type="text"
                                    id="remarks"
                                    className='mt-1 px-4 p-2 w-full rounded-md border border-slate-100 shadow-sm focus:outline-none focus:ring focus:ring-indigo-300 dark:bg-meta-4 sm:text-sm'
                                />
                            </div>
                            <div>
                                <label htmlFor="bplo_head" className='block text-sm font-medium text-gray-700'>
                                    BPLO Head
                                </label>
                                <input
                                    type="text"
                                    id="bplo_head"
                                    className='mt-1 px-4 p-2 w-full rounded-md border border-slate-100 shadow-sm focus:outline-none focus:ring focus:ring-indigo-300 dark:bg-meta-4 sm:text-sm'
                                />
                            </div>
                        </div>
                        <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
                            <div>
                                <label htmlFor="contact_no" className='block text-sm font-medium text-gray-700'>
                                    Contact No.
                                </label>
                                <input
                                    type="text"
                                    id="contact_no"
                                    className='mt-1 px-4 p-2 w-full rounded-md border border-slate-100 shadow-sm focus:outline-none focus:ring focus:ring-indigo-300 dark:bg-meta-4 sm:text-sm'
                                />
                            </div>
                            <div className='col-span-2 flex justify-end space-x-4'>
                                <button
                                    type='button'
                                    onClick={onClose}
                                    className='rounded bg-gray-200 py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-300'
                                >
                                    Cancel
                                </button>
                                <button
                                    type='submit'
                                    // disabled={loading}
                                    className='rounded bg-primary py-2 px-4 text-sm font-medium text-white hover:bg-opacity-90'
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AddNeweBOSS;