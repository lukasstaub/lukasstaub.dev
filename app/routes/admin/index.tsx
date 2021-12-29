import { useContext } from "react";
import { Links, LinksFunction } from "remix";
import { AuthContext } from "../admin";

function Admin() {
    const context = useContext(AuthContext);

    return <main className="">Hello world!</main>;
}

export default Admin;
