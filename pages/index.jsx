import Layout from "components/layout";
import React, { useState } from "react";
import { nanoid } from 'nanoid';
import data from "public/mock-data.json";
import {ChakraNextImage} from "components/utils"

const App = () => {
  const [contacts, setContacts] = useState(data);
  /*const [addFormData, setAddFormData] = useState({
    fullName : "",
    address : "",
    phoneNumber : "",
    email : "",
  });

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData};
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      id: nanoid() ,
      fullName: addFormData.fullName,
      address: addFormData.address,
      phoneNumber: addFormData.phoneNumber,
      email: addFormData.email
    };

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  };*/

  return (
  <div className="app-container">
    <table>
      <tbody>
        {contacts.map((contact)=> (
        <tr>
          <ChakraNextImage src={contact.image} width="250" height = "250"></ChakraNextImage>
          <td>{contact.fullName}</td>
          <td>{contact.address}</td>
          <td>{contact.phoneNumber}</td>
          <td>{contact.email}</td>
        </tr>
        ))}
      </tbody>
    </table>
    
    {
    /*
    <h2>Aggiungi un ristorante</h2>
    <form onSubmit={handleAddFormSubmit}>
      <input 
      type="text" 
      name="fullName" 
      required="required"
      placeholder="Inserisci un nome..."
      onChange={handleAddFormChange}
      />
      <input 
      type="text" 
      name="address" 
      required="required"
      placeholder="Inserisci una via..."
      onChange={handleAddFormChange}
      />
      <input 
      type="text" 
      name="phoneNumber" 
      required="required"
      placeholder="Inserisci un numero..."
      onChange={handleAddFormChange}
      />
      <input 
      type="email" 
      name="email" 
      required="required"
      placeholder="Inserisci una mail..."
      onChange={handleAddFormChange}
      />
      <button type="submit">Aggiungi</button>
    </form>
    */
    }

  </div>
  )
}

export default function Home() {
  return (
    <Layout>
      {
        App()
      }
    </Layout>
  );
}
