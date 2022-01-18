import http from "./httpService";

export function getCallHistory() {
  return http.get("/callhistory");
}

export function addCallToHistory(call) {
  return http.post("/callhistory", call);
}

export function deleteCall(id) {
  return http.delete(`/callhistory/${id}`);
}
