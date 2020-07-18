import React, { Component } from 'react';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import ContactFilter from '../ContactFilter/ContactFilter';

import createId from '../../utils/createId';
import localStorageData from '../../utils/localStorage';
import styles from '../../styles/Phonebook.module.css';

class Phonebook extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    this.loadContacts();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      this.saveContacts();
    }
  }

  saveContacts = () => {
    localStorageData.saveData('phonebook', this.state.contacts);
  };

  loadContacts = () => {
    const persistedContacts = localStorageData.loadData('phonebook');
    if (persistedContacts) {
      this.setState({ contacts: persistedContacts });
    }
  };

  handleAddContact = ({ name, number }) => {
    const { contacts } = this.state;
    if (contacts.some(contact => contact.name === name)) {
      alert(`${name} is already in contacts`);
      return;
    }

    this.setState(({ contacts }) => ({
      contacts: [
        ...contacts,
        {
          id: createId(),
          name,
          number,
        },
      ],
    }));
  };

  handleFilterChange = ({ filter }) => {
    this.setState({
      filter,
    });
  };

  handleDeleteContact = id => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== id),
    }));
  };

  filterContacts = () => {
    const { contacts, filter } = this.state;
    const filteredByContact = filter
      ? contacts.filter(contact => contact.name.includes(filter))
      : contacts;
    return filteredByContact;
  };

  render() {
    const { contacts } = this.state;
    return (
      <div className={styles.phonebook}>
        <h1 className={styles.title}>Phonebook</h1>
        <ContactForm onAdd={this.handleAddContact} />
        <h2 className={styles.title}>Contacts</h2>
        {contacts.length >= 2 && (
          <ContactFilter onFilterChange={this.handleFilterChange} />
        )}
        {contacts.length > 0 && (
          <ContactList
            contacts={this.filterContacts()}
            onDelete={this.handleDeleteContact}
          />
        )}
      </div>
    );
  }
}

export default Phonebook;
