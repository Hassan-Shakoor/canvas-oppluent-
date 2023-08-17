import React, { createFactory, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DashboardHeader from './DashboardHeader';
import Template from './Template';

const categoriesData = [
  {
    "id": 1,
    "subHeading": "",
    "template": [
      {
        "id": 1,
        "cardTitle": "TCG Logos",
        "favorite": false,
        "imageUrl": "/images/logo.png",
        "modified": "2023-08-17", // Add the modified date here
        "created": "2023-08-16"  // Add the created date here
      },
      {
        "id": 2,
        "cardTitle": "Email Signature",
        "favorite": true,
        "imageUrl": "/images/Email_Signature-0 (1).jpg",
        "modified": "2023-08-17", // Add the modified date here
        "created": "2023-08-15"  // Add the created date here
      },
      {
        "id": 3,
        "cardTitle": "Email Signature",
        "favorite": false,
        "imageUrl": "/images/Email_Signature-0 (2).jpg",
        "modified": "2023-08-17", // Add the modified date here
        "created": "2023-08-14"  // Add the created date here
      }
    ]
  },
  {
    "id": 4,
    "subHeading": "500 x 125",
    "template": [
      {
        "id": 1,
        "cardTitle": "Email Signature",
        "favorite": false,
        "imageUrl": "/images/Email_Signature-0.jpg",
        "modified": "2023-08-17", // Add the modified date here
        "created": "2023-08-16"  // Add the created date here
      },
      {
        "id": 2,
        "cardTitle": "Email Signature",
        "favorite": true,
        "imageUrl": "/images/Email_Signature-0 (1).jpg",
        "modified": "2023-08-17", // Add the modified date here
        "created": "2023-08-15"  // Add the created date here
      },
      {
        "id": 3,
        "cardTitle": "Email Signature",
        "favorite": false,
        "imageUrl": "/images/Email_Signature-0 (2).jpg",
        "modified": "2023-08-17", // Add the modified date here
        "created": "2023-08-14"  // Add the created date here
      }
    ]
  },
  {
    "id": 5,
    "subHeading": "HTML Email Newsletters are now available! HTML Email Newsletter Templates are built with code to be pasted or exported to your favorite email sender or CRM instead of just an image.",
    "template": [
      {
        "id": 4,
        "cardTitle": "HTML Email Newsletter",
        "favorite": true,
        "imageUrl": "/images/HTML_Email_Newsletter.jpg",
        "modified": "2023-08-17", // Add the modified date here
        "created": "2023-08-13"  // Add the created date here
      },
      {
        "id": 5,
        "cardTitle": "HTML Email Newsletter",
        "favorite": false,
        "imageUrl": "/images/HTML_Email_Newsletter (1).jpg",
        "modified": "2023-08-17", // Add the modified date here
        "created": "2023-08-12"  // Add the created date here
      },
      {
        "id": 6,
        "cardTitle": "Just Listed HTML Email Newsletter",
        "favorite": false,
        "imageUrl": "/images/Just_Listed_HTML_Email_Newsletter.jpg",
        "modified": "2023-08-17", // Add the modified date here
        "created": "2023-08-11"  // Add the created date here
      }
    ]
  }
];


function CategoryContent() {
  // Id Passed to the component from URL Parameter
  const { id } = useParams();
  // Keeping the State of JSON. So, whenever JSON changes it rerender.
  const [category , setCategory] = useState(null)
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const fetchedCategory = await categoriesData.find(category => category.id === parseInt(id));

        if (fetchedCategory) {
          setCategory(fetchedCategory);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCategoryData();
  }, [id]);

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  return (
    
    <div className="page__content">
      {id? 
        <div className="container">
        {/* Top Header */}
            <div className="dashboard-header">
        {/* Sorting Panel */}
                <div className="dashboard-header__top-panel">
                    <div className="dashboard-header__left-panel"></div>
                    <div className="dashboard-header__right-panel">
                    </div>
                </div>
        {/* Header Paragraph */}
                <div className="dashboard-header__description">{category.subHeading}</div>
            </div>
        {/* Templates */}
        <div className='infinite-scroll-component__outerdiv'>
          <div className='infinite-scroll-component' style={{ height: "auto", overflow: "auto" }}>
            <div className='waterfall-component'>
              <span>
              <div className="template-grid-container" style={{gridTemplateColumns: 'repeat(4, auto)'}}>
                {category.template.map((item, index) => (
                  <Template key={index} cardTitle = {item.cardTitle} imageUrl = {item.imageUrl}/>
                ))}
              </div>
              </span>
            </div>
          </div>
        </div>
        </div>
        :
        <DashboardHeader/>
      }
    </div>
    );
}

export default CategoryContent;