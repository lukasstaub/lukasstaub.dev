import { useEffect } from "react";
import { Form, useActionData, useTransition } from "remix";
import { Actions } from "../utils/actions";

function Authenticate() {
    const data = useActionData();
    const transition = useTransition();

    const loading = transition.state === "submitting";

    useEffect(() => {
        if (data?.success) {
            window.location.reload();
        }
    }, [data]);

    return (
        <div className="h-full w-full flex flex-col items-center justify-center">
            <img className="w-48 mb-4" src="/assets/LS@1024.svg" />
            <h1 className="text-4xl my-8">lukasstaub.dev - Login</h1>
            <Form method="post" className="flex flex-col w-full lg:w-[500px]">
                <label htmlFor="username">
                    Username
                    <input className="mb-8 p-2 rounded-lg border-2 border-gray-400 w-full" required name="username" id="username" disabled={loading} />
                </label>
                <label htmlFor="password">
                    Password
                    <input className="mb-8 p-2 rounded-lg border-2 border-gray-400 w-full" required name="password" type="password" disabled={loading} />
                </label>

                <input name="perform" value={Actions.AUTHENTICATE} style={{ display: "none" }} readOnly />

                <button className={`bg-gray-600 ${loading ? "text-gray-400" : "text-white"} rounded-lg p-2 mt-4`} type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </Form>
        </div>
    );
}

export default Authenticate;
