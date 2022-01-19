import http from "./httpService";

export function getContacts() {
  return http.get("/contacts");
}

export function getContact(id) {
  return http.get(`/contacts/${id}`);
}

export function deleteContact(id) {
  return http.delete(`/contacts/${id}`);
}

export function saveContact(contact) {
  if (contact.id) {
    const body = { ...contact };
    delete body.id;
    return http.put(`/contacts/${contact.id}`, body);
  }
  return http.post("/contacts", contact);
}
