import { ACTION_TYPE } from "./action-type";

const initialState = {
    toggleSidebar: false,
    percentageTimePassed: 0,
    getTicketsLoading: false,
    getTicketsTxId: '',
    openModal: false,
    modalType: '',
}

const reducer = (state = initialState, action) => {
    console.log( action)
    if(action.type === ACTION_TYPE.TOGGLE_SIDEBAR) {
        return {
            ...state,
            toggleSidebar: action.value
        }
    }
    if(action.type === ACTION_TYPE.PERCANTAGE_TIME_PASSED) {
        return {
            ...state,
            percentageTimePassed: action.value
        }
    }
    if(action.type === ACTION_TYPE.GET_TICKETS_LOADING) {
        return {
            ...state,
            getTicketsLoading: action.value
        }
    }
    if(action.type === ACTION_TYPE.GET_TICKETS_TX_ID) {
        return {
            ...state,
            getTicketsTxId: action.value
        }
    }
    if(action.type === ACTION_TYPE.MODAL_OPEN) {
        return {
            ...state,
            openModal: action.value
        }
    }
    if(action.type === ACTION_TYPE.MODAL_TYPE) {
        return {
            ...state,
            modalType: action.value
        }
    }
    return state;
}

export default reducer;