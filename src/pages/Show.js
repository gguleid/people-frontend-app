import { useEffect, useState } from "react";



function Show({ match, history, people, updatePeople, deletePeople }){
    const [ editForm, setEditForm ] = useState({
        name:"",
        title:"",
        image:""
    });

    const [ person, setPerson ] = useState(null)

    useEffect(() => {   
        if(people) {
            const id = match.params.id
            const person = people.find(p => p._id === id);
            setPerson(person);
            setEditForm(person);
        }
    }, [ people, match ])

    const loading = () => {
        return <h1>Loading...</h1>
    }
    
    const loaded = () => {
        return (
            <div>
                <h1>{person.name}</h1>
                <img src={person.image} alt={person.name} />
                <h2>{person.title}</h2>
                <button onClick={()=> handleDelete(person._id)}>Cut {person.name}</button>
            </div>);
        }

    const handleChange = (event) => {
        setEditForm({...editForm, [event.target.name]: event.target.value});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const { _id, name, title, image } = editForm;
        updatePeople({ name, title, image}, _id);
       
    }

    const handleDelete = (id) => {
        deletePeople(id);
        history.push('/');
       
    }

    return  (
        <div>
            {person ? loaded() : loading()}
            <form onSubmit={handleSubmit}> 
                <input 
                    type="text" 
                    name="name" 
                    value={editForm.name} 
                    placeholder="name" 
                    onChange={handleChange}
                />
                <input 
                    type="text" 
                    name="title" 
                    value={editForm.title} 
                    placeholder="title" 
                    onChange={handleChange}
                />
                <input 
                    type="text" 
                    name="image" 
                    value={editForm.image} 
                    placeholder= "image URL" 
                    onChange={handleChange}
                />
                <input 
                    type="submit" 
                    value="Edit Person"
                />
            </form>
        </div>
        )
}

export default Show;