import React from "react";
import classNames from "classnames";
type BinBtnProps = {
  onClick: ()=>void;
  className: string;
  children: any;
}
const AddToBin: React.FC<BinBtnProps> = ({ onClick, className, children }) =>{
  return (
    <button onClick = {onClick} className={classNames("button", className)}>{children}</button>
  );
}
export default AddToBin;
