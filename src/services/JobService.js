import client from "../../src/shared/http-client/Client";


export async function getJob() {
    const { data } = await client.get('/job');

    return data;
}

export async function getSingleJob(id) {
    const { data: { data } } = await client.get(`/job/${id}`);

    return data;
}

export async function createJob(job) {
    const { data: { data } } = await client.post('/admin/job', job);
    return data;
}

export async function updateJob(job) {
    const { data: { data } } = await client.put('/admin/job', job);

    return data;
}

export async function deleteJob(id) {
    const { data: { data } } = await client.delete(`/admin/job/${id}`);

    return data;
}