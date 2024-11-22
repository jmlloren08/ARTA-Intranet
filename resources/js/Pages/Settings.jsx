import DeleteUserForm from '../Pages/Profile/DeleteUserForm';
import UpdatePasswordForm from '../Pages/Profile/UpdatePasswordForm';
import { Head } from '@inertiajs/react';
import DefaultLayout from '../layout/DefaultLayout';
import { ToastContainer } from 'react-toastify';
import Breadcrumb from '@/Components/Breadcrumbs/Breadcrumb';

const Settings = () => {
    return (
        <>
            <Head title="Settings" />
            <ToastContainer />
            <div className="mx-auto max-w-270">
                <Breadcrumb pageName="Settings" />
            </div>
            <div>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>
                    <div className="p-4 sm:p-8 bg-white rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </>
    );
}

Settings.layout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default Settings;
