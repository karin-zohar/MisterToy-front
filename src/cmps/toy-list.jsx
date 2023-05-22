import { Link } from "react-router-dom"
import { ToyPreview } from "./toy-preview"

export function ToyList({ toys }) {
    console.log('toys: ', toys)
    return (
        <section className="toy-list">
            <h2>toy list</h2>
            <ul>
                {toys.map(toy => 
                    <li key={toy._id}>
                        {console.log('toy._id: ', toy._id)}
                        <ToyPreview toy={toy} />
                        <div>
                            {/* <button onClick={onRemoveToy(toy._id)}>x</button> */}
                            <button><Link to={`/toy/${toy._id}`} >Details</Link></button>
                        </div>

                    </li>
                )}
            </ul>
        </section>
    )
}