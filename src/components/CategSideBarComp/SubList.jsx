import React from "react";

function SubList(props){

  function handleClick(event){
    props.onSubItemClick(props.subTitle);
}

    return(
        <li className="groups__tag animation-appear-list-item-enter-done" onClick={handleClick}>
        <span className={props.active ? "groups__tag-title groups__tag-title_selected" : "groups__tag-title"}>
          <svg className="icon v2-icon v2-icon-file">
            <use href="#v2-icon-file" xlinkHref="#v2-icon-file" />
          </svg>
          {props.subTitle}
        </span>
      </li>
    )
}

export default SubList;