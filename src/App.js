import Calendar from "./Components/Calendar";
import events from "./Data/events.json";

function App() {
  return <Calendar eventsData={events}></Calendar>;
}

export default App;
