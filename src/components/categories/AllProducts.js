import React, { useEffect, useState, useRef } from 'react';
import { View, Text, FlatList } from 'react-native';
import { deviceWidth } from '../../utils/Dimensions';

export default function AllProducts(props) {
    const [status, setStatus] = useState(true)
    const [products, setProducts] = useState([])
    const controller = new AbortController()

    async function getApi() {
        await fetch('http://192.168.0.25:3000/products')
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(error => console.log(error))
            .finally(() => {
                setStatus(false)
                console.log('Done fetching...')
            })
    }

    useEffect(() => {
        getApi()
        return () => {
            controller.abort()
        }
    }, [])
    return (
        <View style={{ width: deviceWidth, backgroundColor: 'red' }}>
            <View style={{}}>
                <FlatList
                    data={products}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ backgroundColor: 'coral', width: deviceWidth / 2 - 30, height: 333, borderRadius: 15 }}>

                            </View>
                        </View>

                    )}
                />
            </View>
        </View>
    )
}