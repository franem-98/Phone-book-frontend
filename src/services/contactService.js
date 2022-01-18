import http from "./httpService";

export function getContacts() {
  return http.get("/contacts");
}

export function deleteContact(id) {
  return http.delete(`/contacts/${id}`);
}

export function saveContact(contact) {
  return http.post("/contacts", contact);
}
