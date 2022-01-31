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
  if (contact._id) {
    const body = { ...contact };
    delete body._id;
    return http.patch(`/contacts/${contact._id}`, body);
  }
  return http.post("/contacts", contact);
}
