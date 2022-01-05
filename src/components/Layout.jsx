import React from "react";
import { Outlet, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faAddressBook,
  faUserPlus,
  faCommentAlt,
} from "@fortawesome/free-solid-svg-icons";

function Layout() {
  return (
    <>
      <div className="footer">
        <Link to="/contacts">
          <FontAwesomeIcon icon={faAddressBook} />
        </Link>
        <Link to="/history">
          <FontAwesomeIcon icon={faClock} />
        </Link>
        <Link to="/sms">
          <FontAwesomeIcon icon={faCommentAlt} />
        </Link>
        <Link to="/addcontact">
          <FontAwesomeIcon icon={faUserPlus} />
        </Link>
      </div>
      <Outlet />
    </>
  );
}

export default Layout;
