import React, { useState } from "react"
import moment from "moment"

import FullCalendar from "@fullcalendar/react"

// plugin
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import listPlugin from "@fullcalendar/list"
import interactionPlugin from "@fullcalendar/interaction"





const Appointment = ({ isFetching,loadEvents, ...props }) => {

  const [prevDateRange, setPrevDateRange] = useState({})
  const loadEventsCallback = (info, successCallback, failureCallback) => {
    loadEvents(successCallback, failureCallback)
  }


  return (
    <FullCalendar
      className="fc fc-ltr fc-unthemed"
      plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek"
      }}
      initialView="dayGridMonth"
      editable={false}
      selectable={true}
      selectMirror={true}
      events={loadEventsCallback}

      weekends={true}
      {...props}
    />
  )
}


export default Appointment
