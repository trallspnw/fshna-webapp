'use client'

import { Button, Gutter } from "@payloadcms/ui";
import { useState } from "react";
import classes from './PeopleClient.module.scss'

export function PeopleClient() {
  const [searchInput, setSearchInput] = useState('')
  const [persons, setPersons] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)

  const handleSearch = async () => {
    if (!searchInput) return

    setLoading(true)
    setStatusMessage('Searching...')
    setPersons([])

    try {
      const result = await fetch('/api/person/search?query=' + encodeURIComponent(searchInput), {
        method: 'GET',
        credentials: 'include',
      })

      const json = await result.json()
      setPersons(json.persons || [])
      setStatusMessage(json.message || 'Searched people.')
    } catch (e) {
      console.error(e)
      setStatusMessage('Failed search people.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Gutter>
      <h1>Manage Person Records</h1>
      <p>Lookup people by name or email</p>
      <br />

      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSearch()
        }}
      >
        <div>
          <input 
            type="search"
            placeholder="Search by name or email"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <Button 
          type="submit"
          disabled={!searchInput || loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </Button>
      </form>

      {statusMessage && <>
        <p>{statusMessage}</p>
        <br />
      </>}

      {persons.length > 0 && (
        <div>
          <table className={classes.table}>
            <thead>
              <tr>
                <th>Email</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Created</th>
                <th>Language</th>
                <th>Ref</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {persons.map((person) => (
                <tr key={person.id}>
                  <td>{person.email}</td>
                  <td>{person.name}</td>
                  <td>{person.phone}</td>
                  <td>{person.address}</td>
                  <td>{person.createdAt ? new Date(person.createdAt).toLocaleDateString() : ''}</td>
                  <td>{person.language}</td>
                  <td>{person.ref}</td>
                  <td>
                    <Button 
                      size='small' 
                      icon='edit' 
                      buttonStyle='transparent' 
                      tooltip='Edit' 
                    />
                    <Button 
                      size='small' 
                      icon='x' 
                      buttonStyle='transparent' 
                      tooltip='Delete' 
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Gutter>
  )
}
