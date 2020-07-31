import client from "../../src/shared/http-client/Client";


export async function getTools() {
    const { data } = await client.get('/tools');
    console.log(`DATA : `, data);
    return data;
}

export async function getSingleTools(id) {
    const { data: { data } } = await client.get(`/tools/${id}`);

    return data;
}

export async function createTools(tools) {
    const { data: { data } } = await client.post('/admin/tools', tools);
    return data;
}

export async function updateTools(tools) {
    const { data: { data } } = await client.put('/admin/tools', tools);

    return data;
}

export async function deleteTools(id) {
    const { data: { data } } = await client.delete(`/admin/tools/${id}`);

    return data;
}