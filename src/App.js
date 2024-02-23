import React, { useState,useEffect } from "react";
import Appointment from "./Calendar";
import _ from "lodash";
import moment from "moment";
import { Button, Col, Row } from "react-bootstrap";
import { Card, CardBody, CardHeader, CardHeaderToolbar } from "./components/partials/controls/card/Card";
import AddAppoinement from "./addApp";
import CarModal from "./showApp";

function App() {

  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [data, setData] = useState([]);
  const [showCarModal, setShowCarModal] = useState(false);

  const [selectedCar, setSelectedCar] = useState(null);

  // ...existing code

  const handleViewCarDetails = (car) => {
    setSelectedCar(car);
    setShowCarModal(true);
  };
  const handleCloseCarModal = () => {
    setShowCarModal(false);
  };
  
  useEffect(() => {
    const storedAppointments = localStorage.getItem('appointments');
    if (storedAppointments) {
      const parsedAppointments = JSON.parse(storedAppointments);
      setData(parsedAppointments);
    }
  }, [showAppointmentModal,showCarModal]);

  const handleDeleteAppointment = (id) => {
    const updatedData = data.filter((appointment) => appointment.id !== id);
    setData(updatedData);
    localStorage.setItem("appointments", JSON.stringify(updatedData));
    setShowCarModal(false);
  };

  const handleAddAppointment = () => {
    setShowAppointmentModal(true);
  };

  const handleCloseModal = () => {
    setShowAppointmentModal(false);
  };

  const loadEvents = (successCallback, failureCallback) => {
    console.log('data ===>',data)
    if (!_.isEmpty(data)) {
      const mapped_data = data.map((appointment) => ({
        appointment: appointment.id,
        appointment_detail:appointment,
        subject: appointment.voiture,
        isExpired: moment().isSameOrBefore(moment(`${appointment.date}`, "DD/MM/YYYY").toDate()),
        title: appointment.voiture,
        start: moment(`${appointment.date} 13:00:00`, "DD/MM/YYYY HH:mm:ss").toDate(),
      }));
      successCallback(mapped_data);
    }
  };

  return (
    <Row>
      <Col lg="12">
        <Card>
          <CardHeader title="Vrai-Cuir-Auto">
            <CardHeaderToolbar>
              <Button type="button" className="btn btn-sm btn-primary mx-2" onClick={handleAddAppointment}>
                Ajouter un Rendez-Vous
              </Button>
            </CardHeaderToolbar>
          </CardHeader>
          <CardBody>
            <div id="kt_calendar" className="fc fc-ltr fc-unthemed">
              <Appointment
                headerToolbar={{
                  left: "prev,next",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
                }}
                initialView="dayGridMonth"
                selectable={false}
                selectMirror={true}
                loadEvents={loadEvents}
                eventClick={(event)=>{handleViewCarDetails(event.event.extendedProps.appointment_detail)}}
                weekends={true}
              />
            </div>
          </CardBody>
        </Card>
      </Col>

      <AddAppoinement show={showAppointmentModal} onClose={handleCloseModal} />
      {selectedCar && (
        <CarModal car={selectedCar} show={showCarModal} onClose={handleCloseCarModal} onDelete={handleDeleteAppointment} />
      )}
    </Row>
  );
}

export default App;
