import React from "react";
import { Link } from "react-router-dom";

function SubList(props){

  function handleClick(event){
    props.onSubItemClick(props.subTitle);
}

    return(
        <li className="groups__tag animation-appear-list-item-enter-done" >
        <Link to={`/categories/${props.id}`} className={props.active ? "groups__tag-title groups__tag-title_selected" : "groups__tag-title"} onClick={handleClick}>
          <svg className="icon v2-icon v2-icon-file">
            <use href="#v2-icon-file" xlinkHref="#v2-icon-file" />
          </svg>
          {props.subTitle}
        </Link>
      </li>
    )
}

export default SubList;