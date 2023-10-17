import { ACTIONS } from "./actions/CartActions";


const address = [
    { id: 1, name: 'Jul Punding', number: '09993093146', address: 'Block 75', city: 'Davao City', region: 'Dvo. Del Sur', zcode: '8000', country: 'Philippines', completed: true }
]

const initialStateAddress = {
    address: address,
    statusForm: false
}

function addressReducer(state, action) {
    switch (action.type) {
        case ACTIONS.ADD_ADDRESS: {
            return {
                address: [
                    ...state.address,
                    {
                        id: state.address.length + 1,
                        name: action.payload.name,
                        number: action.payload.number,
                        address: action.payload.address,
                        city: action.payload.city,
                        region: action.payload.region,
                        zcode: action.payload.zcode,
                        country: action.payload.country,
                        completed: false,
                    },
                ],
            };
        }
        case ACTIONS.EDIT_ADDRESS: {
            return {
                address: state.address.map((person) =>
                    person.id === action.payload.id
                        ? {
                            ...person,
                            name: action.payload.name,
                            number: action.payload.number,
                            address: action.payload.address,
                            city: action.payload.city,
                            region: action.payload.region,
                            zcode: action.payload.zcode,
                            country: action.payload.country,
                        }
                        : person
                ),
            };
        }
        case ACTIONS.TOGGLE_COMPLETED: {
            return {
                address: state.address.map((person, index) =>
                    index === action.payload
                        ? { ...person, completed: true }
                        : { ...person, completed: false }
                ),
                selected: 0,
            };
        }
    }
    throw Error(`Unknown action: ${action.type}`);
}

export {
    initialStateAddress,
    addressReducer,

}