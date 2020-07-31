import { RESET_FORM, DELETE_TOOLS, EDIT_BUTTON, SET_LOADING, FETCH_COMPLETE, HANDLE_INPUT_CHANGES, SUBMIT_COMPLETE } from "./ActionsTools";

const defaultFormValues = {
    id: undefined,
    name: '',
    partNumber:'',
    serialNumber:''

};

const initialState = {
    isLoading: true,
    toolss: [],
    form: { ...defaultFormValues}
}

function toolsReducer(state = initialState, action){
    const {type, payload} = action;

    switch (type) {
        case RESET_FORM:
            return { ...state, form: { ...defaultFormValues}};
        case DELETE_TOOLS:
            return { ...state, toolss: state.toolss.filter((tools)=>tools.id !== payload)};
        case EDIT_BUTTON:
            const tools = state.toolss.find((tools)=> tools.id===payload);
            return {...state, form: { ...tools}};
        case SET_LOADING:
            return{ ...state, isLoading:true};
        case FETCH_COMPLETE:
            return { ...state, isLoading:false, toolss:[ ...payload]};
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

export default toolsReducer;
