import React from "react";
import { View, ActivityIndicator }  from "react-native"
import { useContextApi } from "../../Helper/Index";
import SelectedItem from "./SelectedItem";

function WrapperItems() {
    const { products, loading } = useContextApi()
    return (
        <View style={{ flexDirection: 'row', rowGap: 5, columnGap: 15, flexWrap: 'wrap', alignItems: 'center', alignItems: 'center', paddingLeft: 11 }}>
            {loading ? (
                <View style={{ flex: 1, paddingTop: 10 }}>
                    <ActivityIndicator />
                </View>
            ) : (
                <>
                    {products.map((product, index) => <SelectedItem product={product} key={index} />)}
                </>
            )}
        </View>
    )
}
export default WrapperItems