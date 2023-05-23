import { storageService } from './async-storage.service.js'

const STORAGE_KEY = 'toyDB'
const LABELS = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
    'Outdoor', 'Battery Powered']

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    getDefaultSort,
    getLabels
}

function query(filterBy = {}, sort = {}) {
    console.log('filterBy: ', filterBy)
    console.log('sort: ', sort)
    // return axios.get(BASE_URL).then(res => res.data)
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            let filteredToys = toys
            if (filterBy.name) {
                const regExp = new RegExp(filterBy.name, 'i')
                filteredToys = filteredToys.filter(toy => regExp.test(toy.name))
            }
            
            if (filterBy.price) {
                filteredToys = filteredToys.filter(toy => toy.price <= filterBy.price )
            }

            if (filterBy.inStock) {
                filteredToys = filteredToys.filter(toy => toy.inStock)
            }
            
            const { sortBy, desc } = sort
            if (sortBy === 'name') {
                filteredToys.sort((a,b) => desc * a.name.localeCompare(b.name))
            }
            else if (sortBy === 'createdAt') {
                filteredToys.sort((a, b) => desc * (new Date(b.createdAt) - new Date(a.createdAt) ))
            }
            else {
                filteredToys.sort((a,b) => desc * (b[sortBy] - a[sortBy]) )
            }

            return filteredToys
        })
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}
function remove(toyId) {
    // return Promise.reject('Not now!')
    return storageService.remove(STORAGE_KEY, toyId)
}
function save(toy) {
    const method = (toy._id) ? 'put' : 'post'
    return storageService[method](STORAGE_KEY, toy)
    // when switching to backend - remove the next line
    // toy.owner = userService.getLoggedinUser()
}

function getEmptyToy() {
    return {
        name: '',
        price: '',
        labels: [],
        createdAt: new Date(),
        inStock: true,
    }
}

function getDefaultFilter() {
    return {
        name: '',
        inStock: '',
        labels: ''
    }
}

function getDefaultSort() {
    return {
        sortBy: 'createdAt',
        desc: 1
    }
}

function getLabels() {
    return LABELS
}