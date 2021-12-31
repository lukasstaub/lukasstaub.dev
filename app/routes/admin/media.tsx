import { files } from "@prisma/client";
import { useEffect } from "react";
import { ActionFunction, Form, json, Link, LoaderFunction, useActionData, useLoaderData, useTransition } from "remix";
import clientServer from "../../config/client.server";

export const loader: LoaderFunction = async () => {
    const files = await clientServer.files.findMany({
        orderBy: {
            timestamp: "desc",
        },
        select: {
            content_type: true,
            id: true,
            name: true,
        },
    });

    return files;
};

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();

    const id = formData.get("id") as string | null;

    if (!id)
        return json(
            { succuess: false },
            {
                status: 400,
            }
        );

    await clientServer.files.delete({
        where: {
            id: parseInt(id),
        },
    });

    return json({ success: true });
};

function Media() {
    const data = useLoaderData<files[]>();

    const actionData = useActionData();
    const transition = useTransition();

    const loading = transition.state === "submitting";

    useEffect(() => {
        if (actionData) {
            window.location.reload();
        }
    }, [actionData]);

    return (
        <div className="flex flex-col w-full h-full overflow-y-auto">
            <div className="h-[100px] p-4 w-full flex items-end mb-4 bg-gray-100 justify-between">
                <h1 className="text-4xl">Media</h1>
                <Link to="/admin/media/new" className="p-2 rounded-md bg-teal-600 text-white">
                    New File
                </Link>
            </div>
            <div className="p-4 mb-auto w-full">
                <table className="w-full rounded-md overflow-hidden">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="w-8 text-left border-gray-400 p-3">#</th>
                            <th className="w-64 text-left border-gray-400 p-3">Name</th>
                            <th className="w-64 text-left border-gray-400 p-3">Media Type</th>
                            <th className="w-64 text-right border-gray-400 p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((file, i) => {
                            return (
                                <tr key={file.id} className={(i + 1) % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                                    <td className="w-8 text-left border-gray-400 p-3">{file.id}</td>
                                    <td className="w-64 text-left border-gray-400 p-3">
                                        <a className="text-sky-600 underline" href={`/cdn/${file.name}`} target="_blank">
                                            {file.name}
                                        </a>
                                    </td>
                                    <td className="w-64 text-left border-gray-400 p-3">{file.content_type}</td>
                                    <td className="w-16 border-gray-400 p-3">
                                        <div className="flex justify-end w-full">
                                            <button
                                                className="bg-teal-600 rounded-md p-2 text-white ml-2"
                                                onClick={() => {
                                                    navigator.clipboard.writeText(`${window.location.host}/cdn/${file.name}`);
                                                    alert("Copied to Clipboard!");
                                                }}
                                            >
                                                Copy URL
                                            </button>
                                            <Form className="ml-2" method="post">
                                                <input name="id" value={file.id} readOnly className="hidden" />
                                                <button type="submit" className={`bg-red-600 rounded-md p-2 text-white`}>
                                                    Delete
                                                </button>
                                            </Form>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            {loading && (
                <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, right: 0, backgroundColor: "rgba(0,0,0,0.5)" }} className="flex items-center justify-center">
                    <div className="bg-white p-8 rounded-md">
                        <h1 className="text-4xl">Deleting...</h1>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Media;
