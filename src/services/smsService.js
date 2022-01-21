import http from "./httpService";

export function getMessages() {
  return http.get("/smshistory");
}

export function getMessage(id) {
  return http.get(`/smshistory/${id}`);
}

export function sendMessage(message) {
  return http.post("/smshistory", message);
}

export function deleteMessage(id) {
  return http.delete(`/smshistory/${id}`);
}
