import React from "react";
import { Modal, Button } from "react-bootstrap";

const CarModal = ({ car, show, onClose, onDelete }) => {
  const handleDelete = () => {
    onDelete(car.id);
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Information du Voiture</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Voiture: {car.voiture}</p>
        <p>Date: {car.date}</p>
        <p>Coût: {car.Cout}</p>
        <p>Nom and Telephone: {car["Nom et Telephone"]}</p>
        <p>Information: {car.Information}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleDelete}>
          Supprimer
        </Button>
        <Button variant="secondary" onClick={onClose}>
          Fermer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CarModal;
