import { UploadHandler } from "@remix-run/node/formData";
import { json, unstable_parseMultipartFormData } from "remix";
import clientServer from "../../config/client.server";
import getUser from "../getUser";

export default async function (request: Request) {
    const user = await getUser(request);

    if (!user || !user.user) return json({ success: false }, { status: 400 });

    const uploadHandler: UploadHandler = async (args) => {
        try {
            const buf: Buffer = await new Promise((res, rej) => {
                var bufs: Uint8Array[] = [];
                args.stream.on("data", (d) => {
                    bufs.push(d);
                });
                args.stream.on("end", function () {
                    var buf = Buffer.concat(bufs);
                    res(buf);
                });
                args.stream.on("error", function () {
                    rej("File not readable.");
                });
            });

            const file = await clientServer.files.create({
                data: {
                    content_type: args.mimetype,
                    data: buf,
                    name: args.filename,
                    user_id: user.user.id,
                },
            });

            return `/cdn/${file.name}`;
        } catch (e: any) {
            return undefined;
        }
    };

    const data = await unstable_parseMultipartFormData(request, uploadHandler);

    return data.get("file");
}
