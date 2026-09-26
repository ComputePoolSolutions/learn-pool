import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function PortalLayout({ role, children }) {

    return (
        <div className="portal">

            <Topbar />

            <div className="portal-body">

                <Sidebar role={role} />

                <main className="main-content">

                    {children}

                </main>

            </div>

        </div>
    );
}

export default PortalLayout;