import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { v4 as uuidv4 } from "uuid"; // Import UUID library for generating unique IDs
import appointmentsData from "./Appointments.json";
import axios from "axios";

const AddAppointment = ({ show, onClose }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [formData, setFormData] = useState({
    id: 0,
    voiture: "",
    date: "",
    Cout: "",
    "Nom et Telephone": "",
    Information: ""
  });

  const handleCloseModal = () => {
    onClose();
  };


  const handleSaveAppointment = () => {
    const newId = uuidv4();
  
    const newAppointment = {
      id: newId,
      voiture: formData.voiture,
      date: formData.date,
      Cout: formData.Cout,
      "Nom et Telephone": formData["Nom et Telephone"],
      Information: formData.Information
    };
  
    try {
      // Get existing appointments from localStorage
      const existingAppointments = localStorage.getItem("appointments");
      const parsedAppointments = existingAppointments ? JSON.parse(existingAppointments) : [];
  
      // Add the new appointment to the existing list
      parsedAppointments.push(newAppointment);
  
      // Save the updated list of appointments to localStorage
      localStorage.setItem("appointments", JSON.stringify(parsedAppointments));
  
      onClose();
    } catch (error) {
      // Handle any error that occurs during saving to localStorage
      console.error("Error saving appointment:", error);
    }
  };
  

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setFormData({ ...formData, date: date.toLocaleDateString("en-GB") }); // Update the "date" field in the form data
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value }); // Update the respective field in the form data
  };

  return (
    <Modal show={show} onHide={handleCloseModal} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Ajouter un Rendez-Vous</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>

          <Form.Group controlId="formVoiture">
            <Form.Label>Voiture</Form.Label>
            <Form.Control type="text" placeholder="Enter Voiture" name="voiture" value={formData.voiture} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group controlId="formDate">
            <Form.Label>Date</Form.Label>
            <br />
            <DatePicker selected={selectedDate} onChange={handleDateChange} dateFormat="dd/MM/yyyy" />
          </Form.Group>
          <Form.Group controlId="formCout">
            <Form.Label>Coût</Form.Label>
            <Form.Control type="text" placeholder="Enter Cout" name="Cout" value={formData.Cout} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group controlId="formNomTel">
            <Form.Label>Nom et Telephone</Form.Label>
            <Form.Control type="text" placeholder="Enter Nom et Telephone" name="Nom et Telephone" value={formData["Nom et Telephone"]} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group controlId="formInformation">
            <Form.Label>Information</Form.Label>
            <Form.Control type="text" placeholder="Enter Information" name="Information" value={formData.Information} onChange={handleInputChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Fermer
        </Button>
        <Button variant="primary" onClick={handleSaveAppointment}>
          Enregister le Rendez-Vous
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddAppointment;
