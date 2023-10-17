import React, { useState, useEffect, useContext, useReducer, useCallback, useRef } from "react";
import { cartReducer, initialState } from "./reducer/CartReducer";
import { addressReducer, initialStateAddress } from "./reducer/AddressReducer";


const contextApi = React.createContext()
const useContextApi = () => {
    return useContext(contextApi)
}

const categoryContext = React.createContext()
const useCategories = () => {
    return useContext(categoryContext)
}

const statusBarContext = React.createContext()
const useStatusBar = () => {
    return useContext(statusBarContext)
}


function Provider({ children }) {
    const onViewCallBack = useCallback((viewableItems)=> {
        console.log(viewableItems)
        // Use viewable items in state or as intended
    }, []) // any dependencies that require the function to be "redeclared"
  
    const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 }).current
    // useReducer for cart here...
    const [state, dispatch] = useReducer(cartReducer, initialState)
    const bagTotal = () => {
        const total = state.cart.reduce((total, item) => (total += item.quantity * item.price), 0);
        state.totalAmount = total === 0 ? 0 : total + state.chargeFee;
        return total;
    };
    // useReducer for address here...
    const [stateAddress, dispatchAddress] = useReducer(addressReducer, initialStateAddress)
    const selectedAddress = stateAddress.address.filter(status => status.completed === true)
    // status bar starts here...
    const StatusBarStyle = ['auto', 'inverted', 'light', 'dark']
    const statusStyle = useState(StatusBarStyle[0])[0]
    const shopLogoBackground = useState(false)[0]
    // status bar ends here...

    // useStates starts here...
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [popupMessage, setPopupMessage] = useState(false)
    const [fname, setFname] = useState('')
    const [number, setNumber] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [region, setRegion] = useState('')
    const [zcode, setZcode] = useState('')
    const [country, setCountry] = useState('')
    const [editData, setEditData] = useState('')
    const [showCountryModal, setShowCountryModal] = useState(false)
    const [showPaymentConfirmation, setShowPaymentConfirmation] = useState(false)
    const [showHelpCenter, setShowHelpCenter] = useState(false)
    // useStates ends here...

    // categories starts here...
    const filterFunction = (array, category) => {
        return array.filter(item => item.category === category);

    }
    const processors = filterFunction(products, 'processor');
    const motherboards = filterFunction(products, 'motherboard');
    const graphicCards = filterFunction(products, 'gpu');
    const laptops = filterFunction(products, 'laptop');
    const monitors = filterFunction(products, 'monitor');
    const coolers = filterFunction(products, 'cooler');
    const storageDevices = filterFunction(products, 'storage');
    const powerSupplies = filterFunction(products, 'psu');
    const cases = filterFunction(products, 'case');
    const fullSets = filterFunction(products, 'package');
    const headphones = filterFunction(products, 'headphone');
    // categories ends here...

    // api fetch start here...
    const controller = new AbortController()
    async function getApi() {
        await fetch('http://192.168.0.25:3000/products')
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(error => console.log(error))
            .finally(() => {
                setLoading(false)
                console.log('Done fetching...')
            })
    }

    useEffect(() => {
        getApi()
        return () => {
            controller.abort()
        }
    }, [])
    // api fetch ends here...

    return (
        <contextApi.Provider
            value={{
                showHelpCenter,
                setShowHelpCenter,
                showPaymentConfirmation,
                setShowPaymentConfirmation,
                showCountryModal,
                setShowCountryModal,
                editData,
                setEditData,
                fname,
                number,
                address,
                city,
                region,
                zcode,
                country,
                setFname,
                setNumber,
                setAddress,
                setCity,
                setRegion,
                setZcode,
                setCountry,

                products,
                loading,
                state,
                dispatch,
                bagTotal,
                stateAddress,
                dispatchAddress,
                selectedAddress,
                popupMessage,
                setPopupMessage
            }}>
            <statusBarContext.Provider value={{ statusStyle, shopLogoBackground, onViewCallBack,  viewConfigRef}}>
                <categoryContext.Provider value={{
                    processors,
                    motherboards,
                    graphicCards,
                    laptops,
                    monitors,
                    coolers,
                    storageDevices,
                    powerSupplies,
                    cases,
                    fullSets,
                    headphones
                }}>
                        {children}
                </categoryContext.Provider>
            </statusBarContext.Provider>
        </contextApi.Provider>
    )
}

export {
    Provider,
    useContextApi,
    useStatusBar,
    useCategories,
}