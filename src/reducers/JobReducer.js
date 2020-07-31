import {
    RESET_FORM,
    DELETE_JOB,
    EDIT_BUTTON,
    SET_LOADING,
    FETCH_COMPLETE,
    HANDLE_INPUT_CHANGES,
    SUBMIT_COMPLETE,
    HANDLE_INPUT_TOOL
} from "./ActionJob";

const defaultFormValues = {
    id: undefined,
    name: '',
    tools:[]
};

const initialState = {
    isLoading: true,
    jobs: [],
    form: { ...defaultFormValues}
}

function jobReducer(state = initialState, action){
    const {type, payload} = action;

    switch (type) {
        case RESET_FORM:
            return { ...state, form: { ...defaultFormValues}};
        case DELETE_JOB:
            return { ...state, jobs: state.jobs.filter((job)=>job.id !== payload)};
        case EDIT_BUTTON:
            const job = state.jobs.find((job)=> job.id===payload);
            return {...state, form: { ...job}};
        case SET_LOADING:
            return{ ...state, isLoading:true};
        case FETCH_COMPLETE:
            return { ...state, isLoading:false, jobs:[ ...payload]};
        case HANDLE_INPUT_CHANGES:
            const {form} = state;
            const {inputName, inputValue} = payload;
            form[inputName] = inputValue;
            return { ...state, form:{ ...form}};
        case HANDLE_INPUT_TOOL:
            const tool = {
                id: payload.id
            }
            console.log(`TOOL : ${tool}`)
        case SUBMIT_COMPLETE:
            return { ...state, isLoading: false, form:{ ...defaultFormValues} };
        default:
            return { ...state};
    }
}

export default jobReducer;
