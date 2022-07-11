import React from "react";
import classNames from "classnames";
function AddToBin({ onClick, className, children }) {
  return (
    <button onClick = {onClick} className={classNames("button", className)}>{children}</button>
  );
}
export default AddToBin;
