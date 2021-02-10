import { BigNumber } from "ethers";
import { POOL_INFORMATION } from "../constants/pool-information";
import { ACTION_TYPE } from "./action-type";
import { POOL_TYPE } from "./pool-type";

const initialState = {
    connectedWalletAddress: '',
    connected: false,
    connectedWalletName: '',
    provider: null,
    connectedNetwork: '',
    chainId: 1,
    selectedMenuItem: 0,
    toggleSidebar: false,
    openModal: false,
    modalType: { modalType: '', poolType: '' },
    library: null,
    mainTokenBalance: 0,


    [POOL_TYPE.COMMUNITY_REWARD_POOL]: {
        TITLE: POOL_INFORMATION.COMMUNITY_REWARD_POOL.TITLE,
        URL: POOL_INFORMATION.COMMUNITY_REWARD_POOL.URL,
        YIELD_SOURCE: POOL_INFORMATION.COMMUNITY_REWARD_POOL.YIELD_SOURCE,
        DESCRIPTION1: POOL_INFORMATION.COMMUNITY_REWARD_POOL.DESCRIPTION1,
        DESCRIPTION2: POOL_INFORMATION.COMMUNITY_REWARD_POOL.DESCRIPTION2,

        percentageTimePassed: 0,
        getTicketsLoading: false,
        getTicketsTxId: '',

        prizePeriodEnds: 0,
        prizePeriodStartedAt: 0,
        prizePoolRemainingSeconds: 0,
        playerData: [],
        currentWeekPrize: BigNumber.from('0'),

        prizePoolContract: null,
        mainAssetTokenContract: null,
        ticketsContract: null,
        prizeStrategyContract: null,
        mainAssetContract: null,
        numberOfWinners: BigNumber.from('0'),

        ticketsBalance: 0,
        totalTicketAmount: 0,
        previousAwards: [],
        allDeposits: [],
        allWithdraws: [],

        mainTokenAllowance: 0,
        withdrawTxId: '',
        withdrawLoading: false,

        ticketDepositHandler: null,
        ticketWithdrawHandler: null,
        allowTicketHandler: null,
        calculateEarlyExitFee: null, 
    },
    [POOL_TYPE.NEW_POOL]: {
        TITLE: POOL_INFORMATION.STAKE_POOL.TITLE,
        URL: POOL_INFORMATION.STAKE_POOL.URL,
        YIELD_SOURCE: POOL_INFORMATION.STAKE_POOL.YIELD_SOURCE,
        DESCRIPTION1: POOL_INFORMATION.STAKE_POOL.DESCRIPTION1,
        DESCRIPTION2: POOL_INFORMATION.STAKE_POOL.DESCRIPTION2,

        percentageTimePassed: 0,
        getTicketsLoading: false,
        getTicketsTxId: '',

        prizePeriodEnds: 0,
        prizePeriodStartedAt: 0,
        prizePoolRemainingSeconds: 0,
        playerData: [],
        currentWeekPrize: BigNumber.from('0'),

        prizePoolContract: null,
        mainAssetTokenContract: null,
        ticketsContract: null,
        prizeStrategyContract: null,
        mainAssetContract: null,

        ticketsBalance: 0,
        totalTicketAmount: 0,
        previousAwards: [],
        allDeposits: [],
        allWithdraws: [],
        numberOfWinners: BigNumber.from('0'),

        mainTokenAllowance: 0,

        withdrawTxId: '',
        withdrawLoading: false,

        ticketDepositHandler: null,
        ticketWithdrawHandler: null,
        allowTicketHandler: null,
        calculateEarlyExitFee: null, 
    },

}

const reducer = (state = initialState, action) => {
    const poolAccessor = action.poolType;
    if (action.type === ACTION_TYPE.CONNECTED_WALLET_ADDRESS) {
        return {
            ...state,
            connectedWalletAddress: action.value
        }
    }
    if (action.type === ACTION_TYPE.LIBRARY) {
        return {
            ...state,
            library: action.value
        }
    }
    if (action.type === ACTION_TYPE.CONNECTED) {
        return {
            ...state,
            connected: action.value
        }
    }
    if (action.type === ACTION_TYPE.TOGGLE_SIDEBAR) {
        return {
            ...state,
            toggleSidebar: action.value
        }

    }
    if (action.type === ACTION_TYPE.CONNECTED_WALLET_NAME) {
        return {
            ...state,
            connectedWalletName: action.value
        }
    }
    if (action.type === ACTION_TYPE.PROVIDER) {
        return {
            ...state,
            provider: action.value
        }
    }
    if (action.type === ACTION_TYPE.CONNECTED_NETWORK) {
        return {
            ...state,
            connectedNetwork: action.value
        }
    }
    if (action.type === ACTION_TYPE.CHAIN_ID) {
        return {
            ...state,
            chainId: action.value
        }
    }
    if (action.type === ACTION_TYPE.MAIN_TOKEN_BALANCE) {
        return {
            ...state,
            mainTokenBalance: action.value
        }
    }   
    if (action.type === ACTION_TYPE.MODAL_OPEN) {

        return {
            ...state,
            openModal: action.value
        }
    }
    if (action.type === ACTION_TYPE.MODAL_TYPE) {
        return {
            ...state,
            modalType: action.value

        }
    }
    if (action.type === ACTION_TYPE.SELECTED_MENU_ITEM) {
        return {
            ...state,
            selectedMenuItem: action.value
        }
    }

    if (action.type === ACTION_TYPE.MAIN_TOKEN_ALLOWANCE) {
        return {
            ...state,
            [poolAccessor]: {
                ...state[poolAccessor],
                mainTokenAllowance: action.value
            }
        }
    }

    if (action.type === ACTION_TYPE.NUMBER_OF_WINNERS) {
        return {
            ...state,
            [poolAccessor]: {
                ...state[poolAccessor],
                numberOfWinners: action.value
            }
        }
    }
    if (action.type === ACTION_TYPE.WITHDRAW_TX_ID) {
        return {
            ...state,
            [poolAccessor]: {
                ...state[poolAccessor],
                withdrawTxId: action.value
            }
        }
    }
    if (action.type === ACTION_TYPE.WITHDRAW_LOADING) {
        return {
            ...state,
            [poolAccessor]: {
                ...state[poolAccessor],
                withdrawLoading: action.value
            }
        }
    }

    if (action.type === ACTION_TYPE.TICKETS_BALANCE) {
        return {
            ...state,
            [poolAccessor]: {
                ...state[poolAccessor],
                ticketsBalance: action.value
            }
        }
    }
    if (action.type === ACTION_TYPE.TOTAL_TICKET_AMOUNT) {
        return {
            ...state,
            [poolAccessor]: {
                ...state[poolAccessor],
                totalTicketAmount: action.value
            }
        }
    }
    if (action.type === ACTION_TYPE.PREVIOUS_AWARDS) {
        return {
            ...state,
            [poolAccessor]: {
                ...state[poolAccessor],
                previousAwards: action.value
            }
        }
    }
    if (action.type === ACTION_TYPE.ALL_DEPOSITS) {
        return {
            ...state,
            [poolAccessor]: {
                ...state[poolAccessor],
                allDeposits: action.value
            }
        }
    }
    if (action.type === ACTION_TYPE.ALL_WITHDRAWS) {
        return {
            ...state,
            [poolAccessor]: {
                ...state[poolAccessor],
                allWithdraws: action.value
            }
        }
    }

    if (action.type === ACTION_TYPE.PRIZE_POOL_CONTRACT) {
        return {
            ...state,
            [poolAccessor]: {
                ...state[poolAccessor],
                prizePoolContract: action.value
            }
        }
    }
    if (action.type === ACTION_TYPE.MAIN_ASSET_TOKEN_CONTRACT) {
        return {
            ...state,
            [poolAccessor]: {
                ...state[poolAccessor],
                mainAssetTokenContract: action.value
            }
        }
    }
    if (action.type === ACTION_TYPE.TICKETS_CONTRACT) {
        return {
            ...state,
            [poolAccessor]: {
                ...state[poolAccessor],
                ticketsContract: action.value
            }
        }
    }
    if (action.type === ACTION_TYPE.PRIZE_STRATEGY_CONTRACT) {
        return {
            ...state,
            [poolAccessor]: {
                ...state[poolAccessor],
                prizeStrategyContract: action.value
            }
        }
    }
    if (action.type === ACTION_TYPE.MAIN_ASSET_CONTRACT) {
        return {
            ...state,
            [poolAccessor]: {
                ...state[poolAccessor],
                mainAssetContract: action.value
            }
        }
    }

    if (action.type === ACTION_TYPE.PERCANTAGE_TIME_PASSED) {
        return {
            ...state,
            [poolAccessor]: {
                ...state[poolAccessor],
                percentageTimePassed: action.value
            }
        }
    }
    if (action.type === ACTION_TYPE.CURRENT_WEEK_PRIZE) {

        return {
            ...state,
            [poolAccessor]: {
                ...state[poolAccessor],
                currentWeekPrice: action.value
            }
        }
    }
    if (action.type === ACTION_TYPE.GET_TICKETS_LOADING) {

        return {
            ...state,
            [poolAccessor]: {
                ...state[poolAccessor],
                getTicketsLoading: action.value
            }
        }
    }
    if (action.type === ACTION_TYPE.GET_TICKETS_TX_ID) {

        return {
            ...state,
            [poolAccessor]: {
                ...state[poolAccessor],
                getTicketsTxId: action.value
            }
        }
    }

    if (action.type === ACTION_TYPE.PRIZE_PERIOD_ENDS) {
        return {
            ...state,
            [poolAccessor]: {
                ...state[poolAccessor],
                prizePeriodEnds: action.value
            }
        }
    }
    if (action.type === ACTION_TYPE.PRIZE_PERIOD_STARTED_AT) {
        return {
            ...state,
            [poolAccessor]: {
                ...state[poolAccessor],
                prizePeriodStartedAt: action.value
            }
        }
    }
    if (action.type === ACTION_TYPE.PLAYER_DATA) {
        return {
            ...state,
            [poolAccessor]: {
                ...state[poolAccessor],
                playerData: action.value
            }
        }
    }
    if (action.type === ACTION_TYPE.PRIZE_POOL_REMAINING_SECONDS) {
        return {
            ...state,
            [poolAccessor]: {
                ...state[poolAccessor],
                prizePoolRemainingSeconds: action.value
            }
        }
    }
    if (action.type === ACTION_TYPE.TICKET_DEPOSIT_HANDLER) {
        return {
            ...state,
            [poolAccessor]: {
                ...state[poolAccessor],
                ticketDepositHandler: action.value
            }
        }
    }
    if (action.type === ACTION_TYPE.TICKET_WITHDRAW_HANDLER) {
        return {
            ...state,
            [poolAccessor]: {
                ...state[poolAccessor],
                ticketWithdrawHandler: action.value
            }
        }
    }
    if (action.type === ACTION_TYPE.ALLOW_TICKET_HANDLER) {
        return {
            ...state,
            [poolAccessor]: {
                ...state[poolAccessor],
                allowTicketHandler: action.value
            }
        }
    }
    if (action.type === ACTION_TYPE.CALCULATE_EARLY_EXIT_FEE) {
        return {
            ...state,
            [poolAccessor]: {
                ...state[poolAccessor],
                calculateEarlyExitFee: action.value
            }
        }
    }
    return state;
}

export default reducer;