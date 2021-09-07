import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from './DayList';
import Appointment from "components/Appointment/index";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  
  const setDay = day => setState({ ...state, day });
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);

  useEffect(()=> {
    const linkDays = '/api/days';
    const linkAppointments = '/api/appointments';
    const linkInterviewers = "/api/interviewers";
    Promise.all([
      axios.get(linkDays),
      axios.get(linkAppointments),
      axios.get(linkInterviewers)
    ])
      .then((all) => {
        const days = all[0].data;
        const appointments = all[1].data;
        const interviewers = all[2].data;
        setState(prev => ({...prev, days, appointments, interviewers}))
      })
  },[])


  // Function below allow us to change the local state when we book an interview
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    setState({...state, appointments})
    return axios.put(`/api/appointments/${id}`, {"interview":{...interview}})
    
  }

  // Function below deletes local interview and makes axios request to delete
  // existing interview as well.
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    setState({...state, appointments})
    return axios.delete(`/api/appointments/${id}`)

  }

  const appointmentArr = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return <Appointment 
              key={appointment.id}
              {...appointment}
              interview={interview}
              interviewers={dailyInterviewers}
              bookInterview={bookInterview}
              cancelInterview={cancelInterview}
            />
  })

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
        {appointmentArr}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
