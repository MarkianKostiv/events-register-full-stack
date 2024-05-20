import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Events from "../src/pages/events/Events";
import EventRegistration from "./pages/events/EventRegistration";
import EventParticipants from "./pages/events/EventParticipants";
import "./App.css";

function App() {
  return (
    <div className='App w-full h-full flex flex-col items-center justify-center'>
      <Router>
        <div className='w-full gap-4 flex items-center pl-6 pt-4 pb-4 bg-[#CAE2E1]'>
          <Link to='/'>Main</Link>
        </div>
        <Routes>
          <Route
            path='/'
            element={<Events />}
          />
          <Route
            path='/event/register/:id'
            element={<EventRegistration />}
          />
          <Route
            path='/event/view/:id'
            element={<EventParticipants />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
