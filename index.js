const redux = require('redux')
const immer = require('immer')

const reduxLogger = require('redux-logger')
const logger = reduxLogger.createLogger()

const CAKE_ORDERED = "CAKE_ORDERED"
const RESTOCK_CAKE = "RESTOCK_CAKE"
const ICECREAM_ORDERED = "ICECREAM_ORDERED"
const ICECREAM_RESTOCKED = "ICECREAM_RESTOCKED"

function orderCake() {
    return {
        type: CAKE_ORDERED,
        payload: 1
    }
}

function restockCake(qty = 1) {
    return {
        type: RESTOCK_CAKE,
        payload: qty
    }
}
function orderIcecream(qty = 1) {
    return {
        type: ICECREAM_ORDERED,
        payload: qty
    }
}

function restockIcecream(qty = 1) {
    return {
        type: ICECREAM_RESTOCKED,
        payload: qty
    }
}

const intitalCakeState = {
    numOfCakes: 10,
}
const intitalIcecreamState = {
    numOfIcecreams: 20
}

const cakeReducer = (state = intitalCakeState, action) => {
    switch (action.type) {
        case CAKE_ORDERED:
            // return {
            //     ...state,
            //     numOfCakes: state.numOfCakes - 1
            // }
            return immer.produce(state, (draft) => {
                draft.numOfCakes = state.numOfCakes - 1
            })
        case RESTOCK_CAKE:
            // return {
            //     ...state,
            //     numOfCakes: state.numOfCakes + action.payload
            // }
            return immer.produce(state, (draft) => {
                draft.numOfCakes = state.numOfCakes + action.payload
            })
        default:
            return state
    }
}
const icecreamReducer = (state = intitalIcecreamState, action) => {
    switch (action.type) {
        case ICECREAM_ORDERED:
            return immer.produce(state, (draft) => {
                draft.numOfIcecreams = state.numOfIcecreams - action.payload
            })
        case ICECREAM_RESTOCKED:
            return immer.produce(state, (draft) => {
                draft.numOfIcecreams = state.numOfIcecreams + action.payload
            })
        default:
            return state
    }
}

const rootReducer = redux.combineReducers({
    cake: cakeReducer,
    icecream: icecreamReducer
})

const store = redux.createStore(rootReducer, redux.applyMiddleware(logger))
console.log("Initial State ", store.getState())

const actions = redux.bindActionCreators({
    orderCake,
    restockCake,
    orderIcecream,
    restockIcecream
}, store.dispatch)

const unsubscribe = store.subscribe(() => { })

actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.restockCake(3)

actions.orderIcecream()
actions.orderIcecream()
actions.restockIcecream(2)

unsubscribe()