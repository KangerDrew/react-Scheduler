import {useState, useEffect} from "react";
import axios from "axios";
import { getAppointmentsForDay } from "../helpers/selectors";


export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

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

    const days = updateSpots(state, appointments);

    return (axios.put(`/api/appointments/${id}`, {interview})
    .then(response => setState({...state, days, appointments})))

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

    const days = updateSpots(state, appointments);

    return (axios.delete(`/api/appointments/${id}`)
    .then(response => setState({...state, days, appointments})))

  }
  
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

  const setDay = day => setState({ ...state, day });



  // The below function takes the modified appointments
  // object from cancelInterview or bookInterview and
  // returns a new array to be set as days in the state
  // object.

  const updateSpots = function(state, appointments) {
    const newDays = []

    for(const aDay of state.days) {
      let spotCounter = 0;
      const appointArrForDay = []
      aDay.appointments.forEach(id => appointArrForDay.push(appointments[id]));

      for(const anAppointment of appointArrForDay) {
        if(anAppointment["interview"] === null) spotCounter += 1
      }

      const updatedDay = {...aDay, spots:spotCounter};
      newDays.push(updatedDay)

    }
    return newDays
  }


  return {state, setDay, bookInterview, cancelInterview}
}