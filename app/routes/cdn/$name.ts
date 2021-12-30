import { LoaderFunction } from "remix";
import client from "../../config/client.server";

export const loader: LoaderFunction = async ({ params }) => {
    const file = await client.files.findFirst({
        where: { name: params.name },
    });

    if (!file) return new Response("Not Found", { status: 404 });

    return new Response(file.data, {
        status: 200,
        headers: {
            "Content-Type": file.content_type,
        },
    });
};
