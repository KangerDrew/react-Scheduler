import React from "react";
import "./DayListItem.scss";
import classNames from 'classnames/bind';


export default function DayListItem(props) {

  const dayListClass = classNames('day-list__item',
    {'day-list__item--full':(props.spots === 0)},
    {'day-list__item--selected':props.selected});

  return (
    <li
      className={dayListClass} 
      onClick={() => props.setDay(props.name)}
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{props.spots}</h3>
    </li>
  );
}