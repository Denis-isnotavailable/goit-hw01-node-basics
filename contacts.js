const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("db/contacts.json");

async function listContacts() {    
    try {
        const list = await fs.readFile(contactsPath, "utf-8");
        console.table(JSON.parse(list));
        return JSON.parse(list);
    } catch (e) {
        console.log(e);
    }    
}

async function getContactById(contactId) {
    try {
        const list = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
        const contact = list.find(contact => contact.id === contactId);
        console.table(contact);
        return contact;
    } catch (e) {
        console.log(e);
    }
}

async function removeContact(contactId) {
    try {
        const list = JSON.parse(await fs.readFile(contactsPath, "utf-8"));

        const index = list.findIndex(contact => contact.id === contactId);
        list.splice(index, 1);
        await fs.writeFile(contactsPath, JSON.stringify(list), "utf-8");

        console.table(list);
        return list;
    } catch (e) {
        console.log(e);
    }
}

async function addContact(name, email, phone) {
    try {
        const list = JSON.parse(await fs.readFile(contactsPath, "utf-8"));

        const id = maxId(list);
        const contact = { id, name, email, phone };
        list.push(contact);
        await fs.writeFile(contactsPath, JSON.stringify(list), "utf-8");

        console.table(list);
        return list;
        
    } catch (e) {
        console.log(e);
    }
}


module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}

function maxId(list) {
    let maxId = Number(list[0].id);   

    for (let i = 1; i < list.length; i += 1) {
        if (Number(list[i].id) > maxId) {
            maxId = Number(list[i].id);          
        }
    }
    
    return String(maxId + 1);
}