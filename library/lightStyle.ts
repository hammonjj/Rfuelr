import { StyleSheet } from "react-native";

const lightStyle = StyleSheet.create<any>({
    vehiclePicker: {
        backgroundColor: '#DCDCDC',
        width: "65%",
        marginHorizontal: 60,
    },
    datePicker: {
        marginTop: 20,
        width: "65%",
    },
    buttonStyle: {
        backgroundColor: '#DCDCDC',
    },
    gasInputContainer: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        background: '#fff',
        alignItems: 'center',
        justifyContent: "space-evenly",

        marginTop: 10,
        marginLeft: 10,
        marginRight: 10
    },
    gasInputLabel: {
        fontSize: 20,
        width: "25%"
    },
    gasInputTextInput: {
        height: 50,
        padding: 13,
        fontSize: 20,
        width: "65%",
        borderRadius: 50,
        backgroundColor: '#DCDCDC',
        marginBottom: 5
    },
    gasInputVehicleDropdown: {
        width: "65%",
        borderRadius: 50,
        backgroundColor: '#DCDCDC',
    },
    gasInputSubmit: {
        width: "65%",
        left: "50%"
    }
});

export default lightStyle;