import {
    RESET_FORM,
    EDIT_BUTTON,
    SET_LOADING,
    FETCH_COMPLETE,
    HANDLE_INPUT_CHANGES,
    SUBMIT_COMPLETE,
    DELETE_ASSIGNMENT
} from "./ActionAssignment";

const defaultFormValues = {
    id: undefined,
    jobDeskNumber: '',
    jobName:'',
    typeJob:'',
    aircraftReg:'',
    // date:'',
    reference:'',
    status:''
    // account:{}

};

const initialState = {
    isLoading: true,
    assignments: [],
    form: { ...defaultFormValues}
}

function assignmentReducer(state = initialState, action){
    const {type, payload} = action;

    switch (type) {
        case RESET_FORM:
            return { ...state, form: { ...defaultFormValues}};
        case DELETE_ASSIGNMENT:
            return { ...state, assignments: state.assignments.filter((assignment)=>assignment.id !== payload)};
        case EDIT_BUTTON:
            const assignment = state.assignments.find((assignment)=> assignment.id===payload);
            return {...state, form: { ...assignment}};
        case SET_LOADING:
            return{ ...state, isLoading:true};
        case FETCH_COMPLETE:
            return { ...state, isLoading:false, assignments:[ ...payload]};
        case HANDLE_INPUT_CHANGES:
            const {form} = state;
            const {inputName, inputValue} = payload;

            form[inputName] = inputValue;
            return { ...state, form:{ ...form}};
        case SUBMIT_COMPLETE:
            return { ...state, isLoading: false, form:{ ...defaultFormValues} };
        default:
            return { ...state};
    }
}

export default assignmentReducer;
