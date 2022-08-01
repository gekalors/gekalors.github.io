import React from "react";
import classNames from "classnames";
type BinProps = {
  className: string;
  children: any;
}
const BinFunc: React.FC<BinProps> = ({className, children }) =>{
  
  return (
    <button className={classNames("button", className)}>
      {children}
    </button>
  );
}
export default BinFunc;
