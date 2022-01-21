import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Contacts from "./components/Contacts";
import CallHistory from "./components/CallHistory";
import NewSms from "./components/NewSms";
import SmsHistory from "./components/SmsHistory";
import ContactForm from "./components/ContactForm";
import Calling from "./components/Calling";
import Dial from "./components/Dial/Dial";
import Sms from "./components/Sms";
import NotFound from "./common/NotFound";
import "./App.css";

function App() {
  return (
    <main className="container">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Contacts />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/callhistory" element={<CallHistory />} />
          <Route path="/smshistory" element={<SmsHistory />} />
          <Route path="/smshistory/:id" element={<Sms />} />
        </Route>
        <Route path="/newsms" element={<NewSms />} />
        <Route path="/contacts/:id" element={<ContactForm />} />
        <Route path="/calling/:number" element={<Calling />} />
        <Route path="/dial" element={<Dial />} />
        <Route path="/notfound" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default App;
