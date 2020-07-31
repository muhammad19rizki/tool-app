import client from "../../src/shared/http-client/Client";


export async function getAssignment() {
    const { data } = await client.get('/planner/assignment');

    return data;
}

export async function getSingleAssignment(id) {
    const { data: { data } } = await client.get(`assignment/${id}`);

    return data;
}

export async function createAssignment(assignment) {
    const { data: { data } } = await client.post('/planner/assignment', assignment);
    return data;
}

export async function updateAssignment(assignment) {
    const { data: { data } } = await client.put('/planner/assignment', assignment);

    return data;
}

export async function deleteAssignment(id) {
    const { data: { data } } = await client.delete(`/planner/assignment/${id}`);

    return data;
}