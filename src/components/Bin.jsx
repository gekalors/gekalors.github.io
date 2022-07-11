import React from "react";
import classNames from "classnames";
function _BinFunc({ onClick, className, children }) {
  
  return (
    <button onClick={onClick} className={classNames("button", className)}>
      {children}
    </button>
  );
}
export default _BinFunc;
