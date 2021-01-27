import { ACTION_TYPE } from "./action-type";

const initialState = {
    toggleSidebar: false,
    percentageTimePassed: 0,
    getTicketsLoading: false,
    getTicketsTxId: '',
    openModal: false,
    modalType: '',
    prizePeriodEnds: 0,
    prizePeriodStartedAt:0,
    prizePoolRemainingSeconds:0

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
    if(action.type === ACTION_TYPE.PRIZE_PERIOD_ENDS) {
        return {
            ...state,
            prizePeriodEnds: action.value
        }
    }
    if(action.type === ACTION_TYPE.PRIZE_PERIOD_STARTED_AT) {
        return {
            ...state,
            prizePeriodStartedAt: action.value
        }
    }
    if(action.type === ACTION_TYPE.PRIZE_POOL_REMAINING_SECONDS) {
        return {
            ...state,
            prizePoolRemainingSeconds: action.value
        }
    }
    return state;
}

export default reducer;