import { Link } from "react-router-dom"

export function ToyPreview({ toy }) {
    console.log('renderign toy preview: ')
    console.log('toy: ', toy)
    return (
        <section className="toy-preview">
            <h1>toy preview</h1>
            <h2>{toy.name}</h2>
        </section>
    )
}