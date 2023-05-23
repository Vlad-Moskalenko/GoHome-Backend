const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactPath = path.join(__dirname, './contacts.json');

const listContacts = async () => {
  const list = await fs.readFile(contactPath);
  return JSON.parse(list);
};

const getContactById = async contactId => {
  const list = await listContacts();
  return list.find(contact => contact.id === contactId);
};

const removeContact = async contactId => {};

const addContact = async body => {
  const list = await listContacts();
  const newContact = { id: nanoid(), ...body };
  list.unshift(newContact);
  await fs.writeFile(contactPath, JSON.stringify(list, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
