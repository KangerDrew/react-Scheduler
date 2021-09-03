export function getAppointmentsForDay(state, day) {
  
  const appointmentArr = []

  for (const stateDay of state.days) {
    if (stateDay.name === day) {
      stateDay.appointments.forEach(id => appointmentArr.push(state.appointments[id]));
    }
  }

  return appointmentArr;

}


export function getInterview(state, interview) {
  if (interview) {
    const intId = interview.interviewer;
    return {...interview, interviewer:state.interviewers[intId]}
  }

  return null;

}