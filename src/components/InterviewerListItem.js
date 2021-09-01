import React from "react";
import "./InterviewerListItem.scss"
import classNames from 'classnames/bind';


export default function InterviewerListItem(props) {

  const interviewItemClass = classNames("interviewers__item",
    {"interviewers__item--selected":props.selected})


  return (
    <li
      className={interviewItemClass}
      onClick={() => props.setInterviewer(props.id)}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );


}