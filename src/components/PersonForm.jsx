import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { CREATE_PERSON } from '../queries'
import { ALL_PERSONS } from '../queries'
import { useApolloClient } from '@apollo/client'

const PersonForm = ({ setError }) => {
	const [name, setName] = useState('')
	const [phone, setPhone] = useState('')
	const [street, setStreet] = useState('')
	const [city, setCity] = useState('')

	const client = useApolloClient()
	const result = client.readQuery({ query: ALL_PERSONS })

	/* if (result) {
		// The query result is in the 'result' variable
		console.log(result)
	} else {
		console.log("Query not found in cache.")
	} */

	const [createPerson] = useMutation(CREATE_PERSON, {
		onError: (error) => {
			const messages = error.graphQLErrors[0].message
			setError(messages)
		},

		/* update: (cache, response) => {
			console.log(cache)
			cache.updateQuery({ query: ALL_PERSONS }, ({ allPersons }) => {
				console.log(allPersons)
				return {
					allPersons: allPersons.concat(response.data.addPerson),
				}
			})
		}, */
	})


	const submit = (event) => {
		event.preventDefault()

		createPerson({
			variables: {
				name, street, city,
				phone: phone.length > 0 ? phone : undefined
			}
		})

		setName('')
		setPhone('')
		setStreet('')
		setCity('')
	}


	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={submit}>
				<div>
					name <input value={name}
						onChange={({ target }) => setName(target.value)}
					/>
				</div>
				<div>
					phone <input value={phone}
						onChange={({ target }) => setPhone(target.value)}
					/>
				</div>
				<div>
					street <input value={street}
						onChange={({ target }) => setStreet(target.value)}
					/>
				</div>
				<div>
					city <input value={city}
						onChange={({ target }) => setCity(target.value)}
					/>
				</div>
				<button type='submit'>add!</button>
			</form>
		</div>
	)
}

export default PersonForm