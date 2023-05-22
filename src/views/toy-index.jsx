import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { ToyFilter } from "../cmps/toy-filter"
import { ToyList } from '../cmps/toy-list'

export function ToyIndex() {
    const dispatch = useDispatch()
    const toys = useSelector((storeState) => storeState.toyModule.toys)
    // console.log('index - toys: ', toys)

    
    
    return (
        <section className="toy-index">
            <h1>Find the right toy for <span>you</span></h1>
            <main>
                <Link to={`/toy/edit`}>Add Toy</Link>
                <ToyFilter />
                <ToyList 
                toys={toys}
                />
            </main>
        </section>
    )
}