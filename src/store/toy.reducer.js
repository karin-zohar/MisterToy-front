export const SET_TOYS = 'SET_TOYS'
export const REMOVE_TOY = 'REMOVE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'
export const SET_FILTER_BY = 'SET_FILTER_BY'
export const SET_SORT_BY = 'SET_SORT_BY'
export const SET_IS_LOADING = 'SET_IS_LOADING'


const initialState = {
    toys: [],
    isLoading: false,
    filterBy: {},
    sortBy: {}
}

export function toyReducer(state = initialState, action) {
    let toys
    let filterBy
    let sortBy

    switch (action.type) {
        case SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading } 
        case SET_TOYS:
            return { ...state, toys: action.toys }
        case REMOVE_TOY:
            toys = state.toys.filter(t => t._id !== action.toyId)
            return { ...state, toys }
        case ADD_TOY:
            toys = [...state.toys, action.toy]
            return { ...state, toys }
        case UPDATE_TOY:
            toys = state.toys.map(toy => toy._id === action.toy._id ? action.toy : toy)
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