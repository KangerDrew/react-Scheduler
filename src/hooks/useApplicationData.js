import {useState, useEffect} from "react";
import axios from "axios";


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
    .then(response => {return appointments /* this is where setState used to be */}))
    .then(response => {
      const appointments = response;
      let dayID = NaN;
      for (const aDay of state.days) {
        for(const app of aDay.appointments) {
          if (app === id) {
            dayID = aDay.id;
          }
        }
      }
      return [dayID, appointments];
    })
    .then(response => {
      const targetIndex = response[0] - 1;
      const appointments = response[1];
      const days = [...state.days];
      const dayToBeUpdated = days[targetIndex];
      const updatedDay = {...dayToBeUpdated, spots: dayToBeUpdated.spots - 1};
      days.splice(targetIndex, 1, updatedDay);
      console.log(state.days);
      console.log(days);
      setState(prev =>{return {...state, days, appointments}})
    })
      
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
    .then(response => {return appointments} /* this is where setState used to be */ ))
    .then(response => {
      const appointments = response;
      let dayID = NaN;
      for (const aDay of state.days) {
        for(const app of aDay.appointments) {
          if (app === id) {
            dayID = aDay.id;
          }
        }
      }
      return [dayID, appointments];
    })
    .then(response => {
      const targetIndex = response[0] - 1;
      const appointments = response[1];
      const days = [...state.days];
      const dayToBeUpdated = days[targetIndex];
      const updatedDay = {...dayToBeUpdated, spots: dayToBeUpdated.spots + 1};
      days.splice(targetIndex, 1, updatedDay);
      console.log(state.days);
      console.log(days);
      setState(prev =>{return {...state, days, appointments}})
    })


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


  return {state, setDay, bookInterview, cancelInterview}
}