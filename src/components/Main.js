import { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router';
import Show from '../pages/Show';
import Index from '../pages/Index';


function Main(props){
    const [ people, setPeople ] = useState(null);

    const URL = "https://pacific-cliffs-75067.herokuapp.com/people/";

    const getPeople = async () => {
        const response = await fetch (URL);
        const data = await response.json();
        setPeople(data);
    };

    const createPeople = async (person) => {
        await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "Application/json",
            },
            body: JSON.stringify(person),
        });
        getPeople();
    };

    const updatePeople = async (person, id) => {
        await fetch(URL + id, {
            method: "PUT",
            headers: {
                "Content-Type": "Application/json",
            },
            body: JSON.stringify(person),
        });
        getPeople();
    };

    const deletePeople = async id => {
        await fetch(URL + id, {
            method: "delete",
        });
        getPeople();
    };

    useEffect(() => getPeople(), []);

    return (
    <div>
        <Switch>
            <Route exact path="/">
                <Index people={people} createPeople={createPeople} />
            </Route>
            <Route
                path="/people/:id"
                render={(rp) => (<Show 
                    {...rp}
                    people={people}
                    updatePeople={updatePeople}
                    deletePeople={deletePeople}
                    /> )}        
            >
            </Route>
        </Switch>
    </div>
    );
}

export default Main;