import { useEffect } from "react";
import { ActionFunction, Form, Link, useActionData, useTransition } from "remix";

import newMediaActionServer from "../../utils/actions/newMediaAction.server";

export const action: ActionFunction = async ({ request }) => {
    return newMediaActionServer(request);
};

function NewMedia() {
    const actionData = useActionData();
    const transition = useTransition();

    const loading = transition.state === "submitting";

    useEffect(() => {
        if (actionData) {
            window.location.href = "/admin/media";
        }
    }, [actionData]);

    return (
        <div className="flex flex-col w-full h-full overflow-y-auto">
            <div className="h-[100px] p-4 w-full flex items-end mb-4 bg-gray-100 justify-between">
                <h1 className="text-4xl">Upload File</h1>
            </div>
            <Form className="flex items-center justify-between w-full p-4" method="post" encType="multipart/form-data">
                <input type="file" name="file" disabled={loading} />

                <div className="w-full flex justify-end">
                    {!loading && (
                        <Link to="/admin/media" className="bg-gray-600 text-white ml-4 p-2 text-lg rounded-md">
                            Cancel
                        </Link>
                    )}
                    <button type="submit" disabled={loading} className={`${loading ? "bg-gray-600 text-gray-400" : "bg-teal-600 text-white"} ml-4 p-2 text-lg rounded-md`}>
                        Save
                    </button>
                </div>
            </Form>
        </div>
    );
}

export default NewMedia;
