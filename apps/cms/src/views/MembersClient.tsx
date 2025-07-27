'use client'

import { Button, Gutter } from "@payloadcms/ui";
import { useState } from "react";
import classes from './MembersClient.module.scss'

export function MembersClient() {
  const [searchInput, setSearchInput] = useState('')
  const [members, setMembers] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)

  const handleSearch = async () => {
    if (!searchInput) return

    setLoading(true)
    setStatusMessage('Searching...')
    setMembers([])

    try {
      const result = await fetch('/api/membership/search?query=' + encodeURIComponent(searchInput), {
        method: 'GET',
        credentials: 'include',
      })

      const json = await result.json()
      setMembers(json.members || [])
      setStatusMessage(json.message || 'Searched members.')
    } catch (e) {
      console.error(e)
      setStatusMessage('Failed search members.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Gutter>
      <h1>Search Members</h1>
      <p>Lookup member information by name or email</p>
      <br />

      <div>
        <input 
          type='search'
          placeholder='Search by name or email'
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      <Button onClick={handleSearch} disabled={!searchInput || loading}>
        {loading ? 'Searching...' : 'Search'}
      </Button>

      {statusMessage && <>
        <p>{statusMessage}</p>
        <br />
      </>}

      {members.length > 0 && (
        <div>
          <table className={classes.table}>
            <thead>
              <tr>
                <th>Email</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Active</th>
                <th>Start</th>
                <th>Expiration</th>
                <th>Language</th>
                <th>Ref</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.id}>
                  <td>{member.email}</td>
                  <td>{member.name}</td>
                  <td>{member.phone}</td>
                  <td>{member.address}</td>
                  <td>{member.active ? 'Yes' : 'No'}</td>
                  <td>{member.startDate ? new Date(member.startDate).toLocaleDateString() : ''}</td>
                  <td>{member.expiresAt ? new Date(member.expiresAt).toLocaleDateString() : ''}</td>
                  <td>{member.language}</td>
                  <td>{member.ref}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Gutter>
  )
}
