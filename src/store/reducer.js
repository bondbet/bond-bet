import { BigNumber } from "ethers";
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
    prizePoolRemainingSeconds:0,
    playerData: [],
    currentWeekPrize: BigNumber.from('0'),

    prizePoolContract:null,
	mainAssetTokenContract:null,
	ticketsContract:null,
	prizeStrategyContract:null,
    mainAssetContract:null,

    ticketsBalance:0,
    totalTicketAmount:0,
    previousAwards:[],
    allDeposits:[],
    allWithdraws:[],
}

const reducer = (state = initialState, action) => {
  
    if(action.type === ACTION_TYPE.TICKETS_BALANCE) {
        return {
            ...state,
            ticketsBalance: action.value
        }
    }
    if(action.type === ACTION_TYPE.TOTAL_TICKET_AMOUNT) {
        return {
            ...state,
            totalTicketAmount: action.value
        }
    }
    if(action.type === ACTION_TYPE.PREVIOUS_AWARDS) {
        return {
            ...state,
            previousAwards: action.value
        }
    }
    if(action.type === ACTION_TYPE.ALL_DEPOSITS) {
        return {
            ...state,
            allDeposits: action.value
        }
    }
    if(action.type === ACTION_TYPE.ALL_WITHDRAWS) {
        return {
            ...state,
            allWithdraws: action.value
        }
    }

    if(action.type === ACTION_TYPE.PRIZE_POOL_CONTRACT) {
        return {
            ...state,
            prizePoolContract: action.value
        }
    }
    if(action.type === ACTION_TYPE.MAIN_ASSET_TOKEN_CONTRACT) {
        return {
            ...state,
            mainAssetTokenContract: action.value
        }
    }
    if(action.type === ACTION_TYPE.TICKETS_CONTRACT) {
        return {
            ...state,
            ticketsContract: action.value
        }
    }
    if(action.type === ACTION_TYPE.PRIZE_STRATEGY_CONTRACT) {
        return {
            ...state,
            prizeStrategyContract: action.value
        }
    }
    if(action.type === ACTION_TYPE.MAIN_ASSET_CONTRACT) {
        return {
            ...state,
            mainAssetContract: action.value
        }
    }
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
    if(action.type === ACTION_TYPE.CURRENT_WEEK_PRIZE) {
        return {
            ...state,
            currentWeekPrice: action.value
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
    if(action.type === ACTION_TYPE.PLAYER_DATA) {
        return {
            ...state,
            playerData: action.value
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