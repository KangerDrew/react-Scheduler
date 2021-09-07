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

    return (axios.put(`/api/appointments/${id}`, {interview})
    .then(response => setState({...state, appointments})))

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

    return (axios.delete(`/api/appointments/${id}`)
    .then(response => setState({...state, appointments})))

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

  const updateSpots = function() {
    const newDays = []
    
    for(const aDay of state.days) {
      let spotCounter = 0;
      const appointArrForDay = getAppointmentsForDay(state, aDay["name"])
      for(const anAppointment of appointArrForDay) {
        if(anAppointment["interview"] === null) spotCounter += 1
      }

      const updatedDay = {...aDay, spots:spotCounter};
      newDays.push(updatedDay)

    }

    setState({...state, days:newDays});
  }

  useEffect(() => {
    updateSpots()
  }, [state.appointments])


  return {state, setDay, bookInterview, cancelInterview}
}