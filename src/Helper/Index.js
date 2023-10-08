import React, { useState, useEffect, useContext } from "react";


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
    
    // status bar starts here...
    const StatusBarStyle = ['auto', 'inverted', 'light', 'dark']
    const statusStyle = useState(StatusBarStyle[0])[0]
    const shopLogoBackground = useState(false)[0]
    // status bar ends here...

    // useStates starts here...
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
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
        <contextApi.Provider value={{ products, loading }}>
            <statusBarContext.Provider value={{ statusStyle, shopLogoBackground }}>
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
    useCategories
}