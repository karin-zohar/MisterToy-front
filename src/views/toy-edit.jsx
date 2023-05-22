import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'

import { saveToy } from "../store/toy.actions"
import { toyService } from "../services/toy.service"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"

export function ToyEdit() {
    const params = useParams()
    const toyToEdit = useSelector((storeState) => storeState.toyModule.toys.find(toy => toy._id === params.toyId)) || toyService.getEmptyToy()
    const [updatedToy, setUpdatedToy] = useState(toyToEdit)
    const navigate = useNavigate()

    useEffect(() => {
        console.log('params: ', params)
        if (!params.toyId) {
            return
        }
        console.log('loading toy')
        loadToy()
    },[])

    function loadToy() {
        toyService.getById(params.toyId)
            .then((toy) => setUpdatedToy(toy))
            .catch((err) => {
                console.log('Had issues in toy details', err)
                navigate('/toy')
            })
    }

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setUpdatedToy((prevToy) => ({ ...prevToy, [field]: value }))
    }

    function onSaveToy(ev) {
        ev.preventDefault()
        saveToy(updatedToy)
            .then((toy) => {
                console.log('toy saved', toy);
                showSuccessMsg('Toy saved!')
                navigate('/toy')
            })
            .catch(err => {
                console.log('err', err)
                showErrorMsg('Cannot save toy')
            })
    }

    const { name, price, inStock } = updatedToy

    return (
        <section className="toy-edit">
            <h2>{toyToEdit._id ? 'Edit this toy' : 'Add a new toy'}</h2>
            <form onSubmit={onSaveToy}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="enter toy name"
                    value={name}
                    autoFocus
                    onChange={handleChange}
                />

                <label htmlFor="price">Price:</label>
                <input
                    type="number"
                    name="price"
                    id="price"
                    placeholder="0.00"
                    value={price}
                    onChange={handleChange}
                />

                <label htmlFor="inStock">In Stock</label>
                <input
                    type="checkbox"
                    name="inStock"
                    id="inStock"
                    value={inStock}
                    onChange={handleChange}
                />

                <div>
                    <button>{toyToEdit._id ? 'Save' : 'Add'}</button>
                    <Link to="/toy">Cancel</Link>
                </div>
            </form>
        </section>
    )

}