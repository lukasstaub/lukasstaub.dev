import { Outlet } from "remix";

function AdminLayout() {
    return (
        <div>
            <Outlet />
        </div>
    );
}

export default AdminLayout;
