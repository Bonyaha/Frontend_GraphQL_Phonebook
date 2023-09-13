import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { FIND_PERSON } from '../queries'


const Person = ({ person, onClose }) => {
	return (
		<div>
			<h2>{person.name}</h2>
			<div>
				{person.address.street} {person.address.city}
			</div>
			<div>{person.phone}</div>
			<button onClick={onClose}>close</button>
		</div>
	)
}

const Persons = ({ persons }) => {
	const [nameToSearch, setNameToSearch] = useState(null)
	const result = useQuery(FIND_PERSON, {
		variables: { nameToSearch },
		skip: !nameToSearch,/* When the button show address of a person is pressed, the name of the person is set to state nameToSearch
This causes the component to re-render itself. On render the query FIND_PERSON that fetches the detailed information of a user is executed if the variable nameToSearch has a value. When user is not interested in seeing the detailed info of any person, the state variable nameToSearch is null and the query is not executed. */
	})


	if (nameToSearch && result.data) {
		return (
			<Person
				person={result.data.findPerson}
				onClose={() => setNameToSearch(null)}
			/>
		)
	}

	return (
		<div>
			<h2>Persons</h2>
			{persons.map(p =>
				<div key={p.name}>
					{p.name} {p.phone}
					<button onClick={() => setNameToSearch(p.name)}>
						show address
					</button>
				</div>
			)}
		</div>
	)
}

export default Persons