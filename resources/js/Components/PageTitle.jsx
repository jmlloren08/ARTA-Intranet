import { useEffect } from 'react'
import { usePage } from '@inertiajs/react'

const PageTitle = ({ title }) => {
  const { url } = usePage();

  useEffect(() => {
    document.title = title;
  }, [url, title]);

  return null; // This component doesn't render anything
};

export default PageTitle;
