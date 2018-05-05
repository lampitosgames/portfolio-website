let mainState = {
    variable0: "var0",
    variable1: "var1",
    variable2: 2
}

//Export an example class
export class DefaultUser {
    constructor(username) {
        //Set local username
        this.username = username;

        this.ManipulateStatefulChainable().SayHello();
    }

    ManipulateStatefulChainable() {
        //Do something in this object
        //Return this object so we can daisy chain functions
        return this;
    }

    SayHello() {
        return "Hello!";
    }
}

//Test function
const TestTheStateFunction = (inputVar) => {
    //This function will perform an action when called.  It has access to all
    //state variables above
    console.dir("Test Function Ran with " + inputVar + ". Main state variable says: " + mainState.variable1);
}

//Object where the keys are twitter usernames and the values are TwitterUser objects
let AppState = {
    mainState: mainState,
    defaultState: "Default State",
    testTheStateFunction: TestTheStateFunction
};

export default AppState;
