import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Contacts from "./components/Contacts";
import CallHistory from "./components/CallHistory";
import NewSms from "./components/NewSms";
import SmsHistory from "./components/SmsHistory";
import AddContact from "./components/AddContact";
import Calling from "./components/Calling";
import Dial from "./components/Dial/Dial";
import "./App.css";

function App() {
  return (
    <main className="container">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Contacts />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/history" element={<CallHistory />} />
          <Route path="/smshistory" element={<SmsHistory />} />
        </Route>
        <Route path="/newsms" element={<NewSms />} />
        <Route path="/addcontact" element={<AddContact />} />
        <Route path="/calling/:id" element={<Calling />} />
        <Route path="/dial" element={<Dial />} />
      </Routes>
    </main>
  );
}

export default App;
