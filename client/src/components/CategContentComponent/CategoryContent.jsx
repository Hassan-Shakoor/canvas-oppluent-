// ** Import Libraries
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// ** Import Custom Components
import DashboardHeader from './DashboardHeader';
import Template from './Template';
import TemplateSort from './TemplateSort';
import SpinnerOverlay from '../Loader/SpinnerOverlay';

// ** Firebase
import { onAuthStateChanged  } from 'firebase/auth';
import { auth } from '../FirebaseAuthComp/firebase';
import { getDatabase, ref, set, onValue } from "firebase/database";

let userId = null;
onAuthStateChanged(auth, (user) => {
  if (user) {
    userId = user.uid;
    // Now you can use this `userId` to store or retrieve data in your Realtime Database
  } else {
    // User is signed out
  }
});


function CategoryContent() {
  // ** States
  const [gridColumn, setGridColumn] = useState(4)
  const [sortTemplate,setSortTemplate] = useState('Default')
  const { id } = useParams();
  const [userJson, setUserJson] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [category, setCategory] = useState({
    id: 0,
    subHeading: '',
    template: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  
  console.log(useParams())

  const fetchDataFromDatabase = () => {
    const database = getDatabase();
    const userJsonRef = ref(database, userId + '/templateData');
  
    onValue(userJsonRef, (snapshot) => {
      const updatedCategories = snapshot.val();
      if (updatedCategories) {
        setCategoriesData(updatedCategories);
        //console.log("Template Data: ", updatedCategories);
      }
    });
  };
  
  const fetchUserJsonDataFromDatabase = () => {
    const database = getDatabase();
    const userJsonRef = ref(database, userId + '/userJson');
  
    onValue(userJsonRef, (snapshot) => {
      const updatedCategories = snapshot.val();
      if (updatedCategories) {
        setUserJson(updatedCategories);
      }
    });
  };
  useEffect(() => {
    fetchDataFromDatabase();
    fetchUserJsonDataFromDatabase();
  }, [userId]); 
  
  function updateFavorite(id) {
    const updatedCategoriesData = [...categoriesData]; // Create a copy of categoriesData
    const updatedUserJson = [...userJson];
    console.log("updated User Json: "+ updatedUserJson);
    // Find the template in the categoriesData and update its favorite status
    let isFavoriteAdded = false;
    updatedCategoriesData.forEach(category => {
      const template = category.template?.find(template => template.id === id);
      if (template) {
        const originalFavoriteStatus = template.favorite; // Store the original favorite status
        template.favorite = !template.favorite;
  
        // If the template is now marked as favorite and was previously not in id:53, move it to the category with id 53
        if (template.favorite && category.id !== 53) {
          const targetCategory = updatedCategoriesData.find(cat => cat.id === 53);
          if (targetCategory) {
            targetCategory.template = targetCategory.template || []; // Create an empty array if template is undefined
            targetCategory.template.push(template);
            isFavoriteAdded = true;
            //targetCategory.template?.push(template);
          }
        } else if (!template.favorite && originalFavoriteStatus) { // If the template is marked as not favorite and was previously favorite
          // Remove the template from the category with id 53
          const targetCategory = updatedCategoriesData.find(cat => cat.id === 53);
          if (targetCategory) {
            targetCategory.template = targetCategory.template.filter(tmpl => tmpl.id !== id);
          }
          //const idfiftyThree = template = category.template?.find(template => template.id === 53);
          const template = category.template?.find(template => template.id === 53);
          if(!template){
            console.log("undefined id no 53");
          }
        }
      }
    });
    const favoritesTitle = updatedUserJson.find(cat => cat.title === "Favorites");
    const favoriteTemplatesSubtitle = {
      id: 53,
      name: "Favorite Templates"
    };
    // Update the state with the modified categoriesData
    if (favoritesTitle) {
      if (isFavoriteAdded) {
        if (!favoritesTitle.subTitle.some(sub => sub.id === favoriteTemplatesSubtitle.id)) {
          favoritesTitle.subTitle = [...favoritesTitle.subTitle, favoriteTemplatesSubtitle];
        }
      } else {
        favoritesTitle.subTitle = favoritesTitle.subTitle.filter(sub => sub.id !== favoriteTemplatesSubtitle.id);
      }
    }
    setUserJson(updatedUserJson);
    setCategoriesData(updatedCategoriesData);
    // Update the templateData in the Firebase Realtime Database
    const database = getDatabase();
    const templateDataref = ref(database, userId + '/templateData');
    const userJsonRef = ref(database, userId + '/userJson');
    set(templateDataref, updatedCategoriesData); // Update the templateData in the database
    set(userJsonRef, updatedUserJson); // Update the userJson in the database
  }
  
  function handleColumn(number){
    setGridColumn(number)
}

  function handleSortTemplate(order){
    setSortTemplate(order)
  }

  // Fetch the template data based on the id parameter
  useEffect(() => {
    if (id !== undefined){const fetchedCategory = categoriesData.find(category => category.id === parseInt(id));
    
    if (fetchedCategory) {
      setCategory(fetchedCategory);
      setIsLoading(false);
    }}
  }, [id, categoriesData]);

  // Sorting Effect
  useEffect(()=>{
    if (sortTemplate === 'Modified'){
      let tempHold = [...category.template].sort((a, b) => new Date(b.modified) - new Date(a.modified));
      setCategory(prevCategory => ({
        ...prevCategory,
        template: tempHold}))
    }else if(sortTemplate === 'Created'){
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
  
  // if (isLoading) {
  //   <SpinnerOverlay/>
  // }

  return (
    <div className="page__content">
      {id &&
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
                {category.template && category.template.map((item, index) => (
                  <Template key={index} item = {item} gridColumn={gridColumn} updateFavorite={updateFavorite}/>
                ))}
              </div>
              </span>
            </div>
          </div>
        </div>
        </div>}
        {!id && <DashboardHeader/>}
    </div>
    );
}

export default CategoryContent;