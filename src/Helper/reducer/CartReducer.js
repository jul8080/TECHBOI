import { ACTIONS } from "./actions/CartActions";

const initialState = {
    cart: [],
    bagTotal: 0,
    totalAmount: 0,
    chargeFee: 0,
};

function cartReducer(state, action) {
    switch (action.type) {
        case ACTIONS.ADD_TO_CART: {
            const checkIndex = state.cart.findIndex((item) => item.id === action.payload.id);
            if (checkIndex === -1) {
                return {
                    ...state,
                    cart: [...state.cart, { ...action.payload, quantity: 1 }]
                }
            }
            return {
                ...state,
                quantity: state.cart.map(item => item.id === action.payload.id ? item.quantity++ : item)
            }

        }
        case ACTIONS.REMOVE_TO_CART: {
            return state
        }
        case ACTIONS.INCREASE_QTY: {
            return {
                ...state,
                cart: state.cart.map(item => item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item)
            }
        }
        case ACTIONS.DECREASE_QTY: {
            if (action.payload.quantity === 1) {
                return {
                    ...state,
                    cart: state.cart.filter(item => item.id !== action.payload.id)
                }
            } else {
                return {
                    ...state,
                    cart: state.cart.map(item => item.id === action.payload.id ? { ...item, quantity: item.quantity - 1 } : item)
                }
            }
        }
    }
    throw Error(`Unknown action: ${action.type}`);
}

export { cartReducer, initialState }
