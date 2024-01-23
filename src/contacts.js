const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

const randomId = function (length = 6) {
    return Math.random()
      .toString(36)
      .substring(2, length + 2);
  };

async function listContacts() {
  // console.log(__dirname)
  const data = await fs.readFile(contactsPath, "utf8");
  return await JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contactFound = contacts.find((contact) => contact.id === contactId);
  return contactFound || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const contactFound = contacts.find((contact) => contact.id === contactId);
  const contactIndexFound = contacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (contactIndexFound === -1) {
    return null;
  }
  contacts.splice(contactIndexFound, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contactFound;
}

async function addContact(name, email, phone) {
    const contacts = await listContacts();
  const user = {
    id: randomId(),
    name: name,
    email: email,
    phone: phone,
  };
  contacts.push(user);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return user
}

module.exports = { listContacts, getContactById, removeContact, addContact };
