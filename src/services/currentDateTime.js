import moment from "moment";

const getCurrentDateTime = () => {
  return moment().format("DD/MM/YYYY HH:mm").toString();
};

export default getCurrentDateTime;
