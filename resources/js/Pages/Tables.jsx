import Breadcrumb from '../Components/Breadcrumbs/Breadcrumb';
import TableOne from '../Components/Tables/TableOne';
import TableThree from '../Components/Tables/TableThree';
import TableTwo from '../Components/Tables/TableTwo';

const Tables = () => {
  return (
    <>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
        <TableOne />
        <TableTwo />
        <TableThree />
      </div>
    </>
  );
};

export default Tables;
