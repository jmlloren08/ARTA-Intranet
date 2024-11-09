import Header from '../Components/Header/index';
import Sidebar from '../Components/Sidebar/index';
import { useState } from 'react';

const SiteLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="flex-1">
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <main>{children}</main>
            </div>
        </div>
    );
};

export default SiteLayout;