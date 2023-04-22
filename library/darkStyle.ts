import { Dimensions, StyleSheet } from "react-native";

const screenDimensions = Dimensions.get("screen");

const darkStyle = StyleSheet.create<any>({
    //Global CSS Styles
    container: {
        flex: 1,
        backgroundColor: '#1e1e1e',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    text: {
        color: '#fff',
        fontSize: 18,
    },
    dropDownContainer: {
        width: '90%',
        height: 50,
        marginBottom: 20,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 'auto'
    },
    dropDown: {
        width: '90%',
        backgroundColor: '#3D3D3D',
        borderWidth: 0,
        paddingLeft: 10,
    },
    dropDownItem: {
        justifyContent: 'flex-start',
    },
    dropDownLabel: {
        color: '#fff',
        fontSize: 16,
    },
    dropDownPicker: {
        backgroundColor: '#1e1e1e',
        borderWidth: 0,
    },
    sectionHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        paddingHorizontal: 10,
        width: '100%',
    },

    //Dashboard Cards
    cardContainer: {
        flex: 1,
        margin: 5,
        backgroundColor: '#23272A',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        height: 100
    },
    cardTitle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    cardValue: {
        color: '#FAD02C',
        fontSize: 24,
        fontWeight: 'bold',
    },

    //Dashboard Container
    dashboardContainer: {
        flex: 1,
        backgroundColor: '#1E1E1E',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    dashboardCardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    dashboardCardValue: {
        fontSize: 24,
        color: '#FF8C00',
        fontWeight: 'bold',
    },

    //Rounded Button
    button: {
        alignItems: 'center',
        backgroundColor: '#ff6347',
        borderRadius: 25,
        justifyContent: 'center',
        height: 50,
        width: 150,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },

    //Metrics Page
    tableStyle: {
        marginVertical: 10,
        marginHorizontal: 10,
        backgroundColor: '#3D3D3D',
    },
    tableText: {
        marginTop: 6,
        marginBottom: 6,
        marginLeft: 2,
        marginRight: 2,
        color: '#fff',
    },
    settingsContainer: {
        marginTop: 10,
        width: screenDimensions.width,
    },

    //Settings Page
    settingsPageContainer: {
        flex: 1,
        backgroundColor: '#1e1e1e',
        alignItems: 'center',
        justifyContent: 'space-between',

        width: screenDimensions.width,
        flexDirection: "row",
        flexWrap: "wrap",
        paddingHorizontal: 10,
        paddingTop: 20,
    },

    //Submit Page
    submitPageContainer: {
        flex: 1,
        backgroundColor: '#1e1e1e',
        alignItems: 'center',
        justifyContent: 'space-between',

        width: screenDimensions.width,
        flexDirection: "row",
        flexWrap: "wrap",
        paddingHorizontal: 10,
    },



    //Old Crappy CSS Styles
    gasInputContainer: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        backgroundColor: '#6C718C',
        alignItems: 'center',
        justifyContent: "space-evenly",

        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        width: screenDimensions.width,
    },
    vehiclePicker: {
        backgroundColor: '#DCDCDC',
        width: "65%",
        marginHorizontal: 60,
    },
    datePicker: {
        marginTop: 20,
        width: "85%",
        //backgroundColor: '#DCDCDC',
    },
    buttonStyle: {
        backgroundColor: '#DCDCDC',
    },
    gasInputLabel: {
        fontSize: 20,
        width: "25%"
    },
    gasInputTextInput: {
        height: 50,
        padding: 13,
        fontSize: 20,
        width: "75%",
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

export default darkStyle;