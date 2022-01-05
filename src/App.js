import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Contacts from "./components/Contacts";
import CallHistory from "./components/CallHistory";
import Sms from "./components/Sms";
import AddContact from "./components/AddContact";
import Calling from "./components/Calling";
import "./App.css";

function App() {
  return (
    <main className="container">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Contacts />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/history" element={<CallHistory />} />
        </Route>
        <Route path="/sms" element={<Sms />} />
        <Route path="/addcontact" element={<AddContact />} />
        <Route path="/calling" element={<Calling />} />
      </Routes>
    </main>
  );
}

export default App;
