import React from 'react';
import { useParams } from 'react-router-dom';
import DashboardHeader from './DashboardHeader';

function CategoryContent() {
  const { id } = useParams();

  // Use the `id` to fetch and display the relevant content
  let result

  switch (true){
    case id >= 1 && id <= 51:
      result =( 
      <>
        <div className="container">
          <h1 className="dashboard-title">Welcome to Your Dashboard, {id} </h1>  
        </div>
      </>)
      break;
    default:
      result = <DashboardHeader/>
  }


  return (
    <div className="page__content">
        {result}
    </div>
    );
}

export default CategoryContent;