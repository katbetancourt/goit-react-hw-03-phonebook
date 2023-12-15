import React, { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import styles from './App.module.css';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
    name: '',
    number: '',
  };

  setFilter = value => {
    console.log('Filter Value:', value);
    this.setState({ filter: value });
  };

  addContact = newContact => {
    if (
      this.state.contacts.some(
        contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
      )
    ) {
      alert(`¡${newContact.name} ya está en la agenda!`);
      return;
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { filter, contacts } = this.state;
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div
        className={styles.container}
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          fontSize: 16,
          color: '#010101',
        }}
      >
        <div>
          <h1>Agenda de Contactos</h1>
          <ContactForm addContact={this.addContact} />

          <h2>Contactos</h2>
          <Filter value={filter} onChange={value => this.setFilter(value)} />
          <ContactList
            contacts={filteredContacts}
            onDelete={this.deleteContact}
          />
        </div>
      </div>
    );
  }
}

export default App;
