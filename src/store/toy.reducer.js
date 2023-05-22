export const SET_TOYS = 'SET_TOYS'
export const REMOVE_TOY = 'REMOVE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'
export const SET_FILTER_BY = 'SET_FILTER_BY'
export const SET_SORT_BY = 'SET_SORT_BY'


const initialState = {
    toys: [],
    filterBy: {},
    sortBy: {}
}

export function toyReducer(state = initialState, action) {
    let toys
    let filterBy
    let sortBy

    switch (action.type) {
        case SET_TOYS:
            return { ...state, toys: action.toys }
        case REMOVE_TOY:
            toys = state.toys.filter(t => t.id !== action.toyId)
            return { ...state, toys }
        case ADD_TOY:
            toys = [...state.toys, action.toy]
            return { ...state, toys }
        case UPDATE_TOY:
            toys = state.toys.map(toy => toy.id === action.toy.id ? action.toy : toy)
            return { ...state, toys }
        case SET_FILTER_BY:
            filterBy = { ...state.filterBy, ...action.filterToEdit }
            return { ...state, filterBy }
        case SET_SORT_BY:
            sortBy = { ...state.sortBy, ...action.sortToEdit }
            return { ...state, sortBy }

        default:
            return { ...state }
    }
}