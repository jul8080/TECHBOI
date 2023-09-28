import GradientText from "react-native-gradient-texts";


const LinearGText = (props) => {
    const { text, startValueX, startValueY, endValueX, endValueY, firstColor, secondColor, width, fontSize } = props
    return (
        <>
            <GradientText
                text={text}
                fontSize={fontSize}
                start={{ x: startValueX, y: startValueY }}
                end={{ x: endValueX, y: endValueY }}
                width={width}
                // locations={{ x: locationX, y: locationY }}
                isGradientFill
                gradientColors={[firstColor, secondColor]}
            />
        </>
    )
}

export default LinearGText