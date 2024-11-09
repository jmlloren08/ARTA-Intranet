import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

const Settings = () => {
    return (
        <>
            <div className="mx-auto max-w-270">
            <Breadcrumb pageName="Settings" />
            <p>This page is currently under development.</p>
            </div>
        </>
    );
};

Settings.layout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default Settings;
