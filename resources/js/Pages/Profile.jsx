import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

const Profile = () => {
  return (
    <>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Profile" />
        <p>This page is currently under development.</p>
      </div>
    </>
  );
};

Profile.layout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default Profile;