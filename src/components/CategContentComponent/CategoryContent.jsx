import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DashboardHeader from './DashboardHeader';
import Template from './Template';
import TemplateSort from './TemplateSort';

const categoriesData = [
  {
    "id": 1,
    "subHeading": "",
    "template": [
      {
        "id": 7,
        "cardTitle": "TCG Logos",
        "favorite": false,
        "imageUrl": "/images/logo.png",
        "modified": "2023-08-17", // Add the modified date here
        "created": "2023-08-16"  // Add the created date here
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
  const [gridColumn, setGridColumn] = useState(4)
  const [sortTemplate,setSortTemplate] = useState('Default')
  const { id } = useParams();
  // Keeping the State of JSON. So, whenever JSON changes it rerender.
  const [category , setCategory] = useState(null)
  const [isLoading, setIsLoading] = useState(true);

  // Update Template Favorite Status
  function updateFavorite(id){
    let tempArr = category
    const templateIndex = tempArr.template.findIndex(template => template.id === id);
    if (templateIndex !== -1) {
      tempArr.template[templateIndex].favorite = !tempArr.template[templateIndex].favorite;
    }
    setCategory({...category,template: tempArr.template})
  }

  function handleColumn(number){
    setGridColumn(number)
}

  function handleSortTemplate(order){
    setSortTemplate(order)
  }

  // Whenever it detect that id changes it fetch object according to that JSON
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

  // Sorting Effect
  useEffect(()=>{
    if (sortTemplate === 'Modified'){
      console.log("Modified");
      let tempHold = [...category.template].sort((a, b) => new Date(b.modified) - new Date(a.modified));
      setCategory(prevCategory => ({
        ...prevCategory,
        template: tempHold}))
    }else if(sortTemplate === 'Created'){
      console.log("Created");
      console.log(...category.template);
      let tempHold = [...category.template].sort((a, b) => new Date(a.created) - new Date(b.created));
      setCategory(prevCategory => ({
        ...prevCategory,
        template: tempHold}))
    }else if(sortTemplate === 'Default'){
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
    }else if(sortTemplate === 'Name A - Z'){
      let tempHold = [...category.template].sort((a, b) => a.cardTitle.localeCompare(b.cardTitle));
      setCategory(prevCategory => ({
        ...prevCategory,
        template: tempHold}))
    }else{
      let tempHold = [...category.template].sort((a, b) => b.cardTitle.localeCompare(a.cardTitle));
      setCategory(prevCategory => ({
        ...prevCategory,
        template: tempHold}))
    }
  },[sortTemplate])
  
  if (isLoading) {
    return <h1>Loading</h1>;
  }

  return (
    <div className="page__content">
      {id ? 
        <div className="container">
        {/* Top Header */}
            <div className="dashboard-header">
        {/* Sorting Panel */}
                <TemplateSort gridColumn={gridColumn} handleColumn={handleColumn} handleSortTemplate={handleSortTemplate}/>
        {/* Header Paragraph */}
                <div className="dashboard-header__description">{category.subHeading}</div>
            </div>
        {/* Templates */}
        <div className='infinite-scroll-component__outerdiv'>
          <div className='infinite-scroll-component' style={{ height: "auto", overflow: "auto" }}>
            <div className='waterfall-component'>
              <span>
              {/* Change the number of Grid Column depending upon grid column state */}
              <div className="template-grid-container" style={{ gridTemplateColumns: "repeat(" + gridColumn + ", auto)" }}>
                {category.template.map((item, index) => (
                  <Template key={index} item = {item} gridColumn={gridColumn} updateFavorite={updateFavorite}/>
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