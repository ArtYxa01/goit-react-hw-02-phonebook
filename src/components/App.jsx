import bookContacts from  '../data/bookContacts'
import { nanoid } from 'nanoid';
import { ContactForm } from '../contactform/contactform';
import { Filter } from '../contactfilter/contactfilter';
import { ContactList } from '../contactlist/contactlist';

const contacts = bookContacts.contacts;

export class App extends React.Component {
  state = {
    contacts: [],
    filter: "",
  };
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  onRemoveContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  onAddContact = contactData => {
    const comparison = this.state.contacts.find(
      el => contactData.name.toLowerCase() === el.name.toLowerCase()
    );

    if (isExist) {
      alert(`${name} is already in contacts.`);
      return
    }
    const contact = {
      ...contactData,
      id: nanoid(),
    };
    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.target.value });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase()) ||
        contact.number.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = this.getFilteredContacts();
    return (
      <>
        <h1>Phonebook</h1>
        <ContactForm onAddContact={this.onAddContact} />
        <h2>Contacts</h2>
        {contacts.length !== 0 && (
          <Filter value={filter} onChange={this.changeFilter} />
        )}
        {contacts.length !== 0 && (
          <ContactList
            contacts={filteredContacts}
            onRemoveContact={this.onRemoveContact}
          />
        )}
      </>
    );
  }
}

