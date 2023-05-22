export const SET_TOYS = 'SET_TOYS'
export const ADD_TOY = 'ADD_TOY'

const initialState = {
    toys: []
}

export function toyReducer(state = initialState, action) {
    let toys

    switch (action.type) {
        case SET_TOYS:
            return { ...state, toys: action.toys }
        default:
            return state
    }
}