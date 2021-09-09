# Interview Scheduler Project

Interview Scheduler is a simple, single-page app that uses ReactJS to allow users to book and cancel interviews. We combine a concise API with a WebSocket server to build a realtime experience.  


## Layouts

!["Demo"](https://github.com/KangerDrew/react-Scheduler/blob/master/docs/demo.gif)


## Getting Started

1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the `npm install` command.
3. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8000/>.
4. Go to <http://localhost:8000/> in your browser.

## Primary Dependencies

- axios
- @testing-library/react-hooks
- react-test-renderer
- psql database

## Getting Started

1. Install all dependencies (using the `npm install` command).
2. Run the development web server using the `npm start` command. This should automatically open up the default browser to http://localhost:8000/
3. A request willl be made to the API server to load the appointments.
4. The website will display the days of the week on the leftmost column, and the appointments for that selected day on the main page.
5. A user can choose to create a new appointment from any of the available "empty" spot.
  - Doing so will display the form to enter the users name, the available interviewer for that day, and buttons to save/cancel the appointment.
6. Appointments can also be edited/cancelled by clicking the edit or delete button on the bottom right corner of the existing appointments.
7. If an error occurs while fetching data from the API, a message will appear on screen to notify that the operation was unsuccessful!