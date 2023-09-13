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

	if (result) {
		// The query result is in the 'result' variable
		console.log(result)
	} else {
		console.log("Query not found in cache.")
	}





	const [createPerson] = useMutation(CREATE_PERSON, {
		onError: (error) => {
			const messages = error.graphQLErrors[0].message
			setError(messages)
		},
		/* We have to update the cache of the Apollo client on creating new persons. We can update it using the mutation's refetchQueries option to define that the ALL_PERSONS query is done again.This approach is pretty good, the drawback being that the query is always rerun with any updates.
		It is possible to optimize the solution by handling updating the cache ourselves. This is done by defining a suitable update callback for the mutation, which Apollo runs after the mutation
		
		update is a function that receives two parameters:
			 - cache: This parameter represents the Apollo Client cache, which is a client- side data store that holds your application's data.
			 - response: This parameter contains the response data from the mutation.
		
		Inside the update function, you use the cache.updateQuery method to update the cache.You provide an object with the query property set to the query you want to update.In this case, you're updating the ALL_PERSONS query.
		
		Within the update function for the query, you destructure the allPersons field from the existing cache data.This field represents an array of persons in application.
		
		You return an object that represents the updated data for the allPersons field.In this case, you use the concat method to append the new person data(from the response.data.addPerson) to the existing list of persons.
		
		So, when a new person is successfully added through the createPerson mutation, the update callback function ensures that the local cache is updated by appending the new person to the existing list of persons retrieved by the ALL_PERSONS query.This helps keep the local cache consistent with the data on the server, which can be particularly useful in scenarios where you want to display the updated data in your UI without making an additional network request. */
		update: (cache, response) => {
			console.log(cache)
			cache.updateQuery({ query: ALL_PERSONS }, ({ allPersons }) => {
				console.log(allPersons)
				return {
					allPersons: allPersons.concat(response.data.addPerson),
				}
			})
		},
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