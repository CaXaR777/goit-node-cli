const { program } = require('commander');
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();
// const limit = options.first ? 1 : undefined;
// console.log(program.args[0].split(options.separator, limit));

const {listContacts, getContactById, removeContact, addContact} = require('./src/contacts')


// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactsList = await listContacts();
      return console.table(contactsList);

    //   break;

    case "get":
      const foundContact = await getContactById(id);
      return console.log(foundContact);
      // break;

    case "add":
      const addedContact = await addContact(name, email, phone)
     return console.log(addedContact);

    case "remove":
      const remove = await removeContact(id);
      return console.log(remove);
      // break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

// invokeAction({action: 'list' });
// invokeAction({action: 'get', id: 'AeHIrLTr6JkxGE6SN-0Rw' });
// invokeAction({action: 'remove', id: 'AeHIrLTr6JkxGE6SN-0Rw' });
// invokeAction({action: 'add', name: 'yooou', email: 'cool@gmail.com', phone: '+1488'});
invokeAction(options);