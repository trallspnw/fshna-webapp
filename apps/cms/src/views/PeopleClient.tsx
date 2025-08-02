'use client'

import { Button, Gutter } from "@payloadcms/ui";
import { useState } from "react";
import classes from './PeopleClient.module.scss'
import { PersonForm } from "./PersonForm";
import { person } from "../../generated/prisma";
import { Modal } from "./Modal";

/**
 * Custom admin view used for CRUD people operations.
 */
export function PeopleClient() {
  const [searchInput, setSearchInput] = useState('')
  const [persons, setPersons] = useState<person[]>([])
  const [loading, setLoading] = useState(false)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)
  const [selectedPerson, setSelectedPerson] = useState<person | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [pendingDeletePerson, setPendingDeletePerson] = useState<person | null>(null)

  const openModal = (person?: person) => {
    setSelectedPerson(person || null)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedPerson(null)
  }

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

      const data = await result.json()
      setPersons(data.persons || [])
      setStatusMessage(data.message || 'Searched people.')
    } catch (e) {
      console.error(e)
      setStatusMessage('Failed search people.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!pendingDeletePerson) return

    setStatusMessage(`Deleting ${pendingDeletePerson.name || pendingDeletePerson.email}...`)
    try {
      const result = await fetch(`/api/person/${pendingDeletePerson.id}`, {
        method: 'DELETE',
        credentials: 'include',
      })

      if (result.ok) {
        setPersons(previous => previous.filter(p => p.id !== pendingDeletePerson.id))
        setStatusMessage('Person deleted.')
      } else {
        setStatusMessage('Failed to delete person.')
      }
    } catch (e) {
      console.error(e)
      setStatusMessage('Error deleting person.')
    } finally {
      setPendingDeletePerson(null)
    }
  }

  return (
    <Gutter>
      <h1>Manage Person Records</h1>
      <br />
      <h2>New Person</h2>
      <Button onClick={() => openModal()}>Create</Button>

      <h2>Manage Existing People</h2>
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
                      onClick={() => openModal(person)}
                    />
                    <Button 
                      size='small' 
                      icon='x' 
                      buttonStyle='transparent' 
                      tooltip='Delete' 
                      onClick={() => setPendingDeletePerson(person)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        title={selectedPerson ? 'Edit Person' : 'New Person'}
      >
        <PersonForm
          person={selectedPerson || undefined}
          onSuccess={() => {
            closeModal()
            handleSearch()
          }}
        />
      </Modal>

      <Modal 
        isOpen={!!pendingDeletePerson} 
        onClose={() => setPendingDeletePerson(null)} 
        title="Confirm Deletion"
      >
        <p>
          Are you sure you want to delete{'\u00A0'}
          <strong>{pendingDeletePerson?.name || pendingDeletePerson?.email}</strong>?
        </p>
        <p>This will also delete associated subscriptions and memberships.</p>
        <br />
        <div className={classes.deletionOptions}>
          <Button onClick={handleDelete} buttonStyle="primary">
            Yes
          </Button>
          <Button onClick={() => setPendingDeletePerson(null)} buttonStyle="secondary">
            Cancel
          </Button>
        </div>
      </Modal>

    </Gutter>
  )
}
