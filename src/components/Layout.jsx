import React from "react";
import { Outlet, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faAddressBook,
  faUserPlus,
  faCommentAlt,
  faPhone,
  faListAlt,
} from "@fortawesome/free-solid-svg-icons";

function Layout() {
  return (
    <>
      <div className="footer">
        <Link to="/dial">
          <FontAwesomeIcon icon={faPhone} />
        </Link>
        <Link to="/contacts">
          <FontAwesomeIcon icon={faAddressBook} />
        </Link>
        <Link to="/contacts/new">
          <FontAwesomeIcon icon={faUserPlus} />
        </Link>
        <Link to="/callhistory">
          <FontAwesomeIcon icon={faClock} />
        </Link>
        <Link to="/newsms">
          <FontAwesomeIcon icon={faCommentAlt} />
        </Link>
        <Link to="/smshistory">
          <FontAwesomeIcon icon={faListAlt} />
        </Link>
      </div>
      <Outlet />
    </>
  );
}

export default Layout;
