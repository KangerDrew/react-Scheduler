export function getAppointmentsForDay(state, day) {
  
  const appointmentArr = []

  for (const stateDay of state.days) {
    if (stateDay.name === day) {
      stateDay.appointments.forEach(id => appointmentArr.push(state.appointments[id]));
    }
  }

  return appointmentArr;

}
