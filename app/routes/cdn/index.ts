import { ActionFunction, LoaderFunction } from "remix";

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();

    console.log(formData);
};
