import React, { useState, useEffect } from "react";
import Group from "./Group";
import { Link } from "react-router-dom";
import { onAuthStateChanged  } from 'firebase/auth';
import { auth } from '../FirebaseAuthComp/firebase';
import { getDatabase, ref, set, onValue } from "firebase/database";


let userId = null;
onAuthStateChanged(auth, (user) => {
  if (user) {
    userId = user.uid; // User ID
    // Now you can use this `userId` to store or retrieve data in your Realtime Database
  } else {
    // User is signed out
  }
});
const categoryJSON = [];

function addObjectToFavorites(categories, id) {

  // Find the index of the "Favorites" category
  const favoritesIndex = categories.findIndex(item => item.title === "Favorites");
  // Find the index of the object with the provided id in any category
  const sourceCategoryIndex = categories.findIndex(item => item.subTitle.some(subItem => subItem.id === id));
  const sourceSubItemIndex = categories[sourceCategoryIndex].subTitle.findIndex(subItem => subItem.id === id);
  if (favoritesIndex !== -1 && sourceCategoryIndex !== -1 && sourceSubItemIndex !== -1) {
    // Create a deep copy of the object with the provided id
    const copiedObject = JSON.parse(JSON.stringify(categories[sourceCategoryIndex].subTitle[sourceSubItemIndex]));
    // Append the copied object to the "subTitle" array of the "Favorites" category
    categories[favoritesIndex].subTitle.push(copiedObject);
  } else {
    console.log("Category or object not found.");
  }
  return categories;
}

function removeObjectFromFavorites(categories, idToRemove) {
  // Find the index of the "Favorites" category
  const favoritesIndex = categories.findIndex(item => item.title === "Favorites");

  if (favoritesIndex !== -1) {
    // Find the index of the object to remove in the "subTitle" array of the "Favorites" category
    const itemIndex = categories[favoritesIndex].subTitle.findIndex(subItem => subItem.id === idToRemove);
    console.log(itemIndex);
    if (itemIndex !== -1) {
      // Remove the object from the "subTitle" array of the "Favorites" category
      categories[favoritesIndex].subTitle.splice(itemIndex, 1);
    } else {
      console.log(`Item with id ${idToRemove} not found in the Favorites.`);
    }
  } else {
    console.log("Favorites category not found.");
  }

  return categories;
}
  function CategorySideBar(){

    useEffect(() => {
      // Reference to the user's category data in the database
      const database = getDatabase();
      const userJsonRef = ref(database, userId +'/userJson');
    
      // Set up the onValue listener to update the state when data changes
      const unsubscribe = onValue(userJsonRef, (snapshot) => {
        const updatedCategories = snapshot.val();
        if (updatedCategories) {
          setCategories(updatedCategories);
    
          // Update the isFavorite state based on fetched data
          const favorites = updatedCategories.find(category => category.title === 'Favorites');
          if (favorites) {
            const favoriteIds = favorites.subTitle.map(subItem => subItem.id);
            setFavorite(favoriteIds);
          }
        }
      });
    
      // Cleanup the listener when the component unmounts
      return () => {
        unsubscribe();
      };
    }, [userId]); // Only run the effect when userId changes
    
  
    // Categories JSON State
    const [categories, setCategories] = useState(categoryJSON);
    // State for Side List which are added to Favorites
    const [isFavorite, setFavorite] = useState([])
    // State For My Designs
    const [isDesignClicked , setDesignClicked] = useState(true)
    // Store the state of which list item is selected inside List Category
    const [activeList, setActiveList] = useState(null);
    // React State in which we can store value of selected item title so can be placed in search PlaceHolder.
    const [isPlaceholder,setPlaceholder] = useState(null);

    // Function to add an item to favorites
    function addToFavorites(itemId) {
  
      if (isFavorite.includes(itemId)) {
        console.log("yes item included in fv alroeady: "+itemId);
        // Item is already in favorites, remove it
        const updatedFavorites = isFavorite.filter(id => id !== itemId);
        setFavorite(updatedFavorites);
        
        // Remove the item from the "Favorites" category
        const updatedCategories = removeObjectFromFavorites([...categories], itemId);
        setCategories(updatedCategories);
        
        // Update the favorites in Firebase Realtime Database
        const database = getDatabase();
        set(ref(database, userId +'/userJson'), updatedCategories).then(() => {
          // Success.
        }).catch((error) => {
          console.log(error);
        });
      } else {
        console.log("no item included in fv alroeady: "+itemId);
        // Item is not in favorites, add it
        setFavorite(prevFavorites => [...prevFavorites, itemId]);
        
        // Copy the categories and update the state
        const updatedCategories = addObjectToFavorites([...categories], itemId);
        setCategories(updatedCategories);
        
        // Update the favorites in Firebase Realtime Database
        const database = getDatabase();
        set(ref(database, userId +'/userJson'), updatedCategories).then(() => {
          // Success.
        }).catch((error) => {
          console.log(error);
        });
      }
    }
  
    // Function to remove an item from favorites
    const removeFromFavorites = (itemId) => {
      if (isFavorite.includes(itemId)) {
        console.log("included in favourites: "+itemId);
        setFavorite(isFavorite.filter(id => id !== itemId));
        const updatedCategories = removeObjectFromFavorites([...categories], itemId);
        setCategories(updatedCategories);
        
        // Update the favorites in Firebase Realtime Database
        const database = getDatabase();
        set(ref(database, userId +'/userJson'), updatedCategories).then(() => {
          // Success.
        }).catch((error) => {
          console.log(error);
        });
      }
    };
    
    // Handler for Above State
    function handlePlaceholder(item){
      setPlaceholder(item)
    }
    function handleSelectedList(item){
      setActiveList(item)
      setDesignClicked(false)
    }
    function handleDesignClick(){
      setDesignClicked(true)
      setActiveList(null);
    }
  // Render the SideTitle components dynamically using map()
  const sideTitles = categories.map((category, index) => (
    <Group
    key={index}
    groupTitle={category.title}
    subTitle={category.subTitle}
    handlePlaceholder={handlePlaceholder}
    handleSelectedList={handleSelectedList}
    activeList={activeList}
    isFavorite={isFavorite}
    addToFavorites={addToFavorites}
    removeFromFavorites={removeFromFavorites}
  />
  ));

    return(
          <aside className="page__sidebar">
              <div className="sidebar-dashboard">
                  <div className="groups">
                  <div className="container">
                      <div className="groups__item">
                      <Link aria-current="page" className={isDesignClicked ? "groups__title groups__title_hovered groups__title_active" : "groups__title groups__title_hovered"} to="/categories" onClick={handleDesignClick}>My Designs</Link>
                      </div>
                  </div>
                  </div>
                  <div className="container">
                  <div className="sidebar-dashboard__search">
                      <div className="row">
                      <div className="col">
                          <div className="sidebar-dashboard__search-title">Templates</div>
                      </div>
                      <div className="col-auto" />
                      </div>
                      <div className="search-input_expanded search-input">
                      <label htmlFor="search">
                          <svg className="icon v2-icon v2-icon-loupe search-input__icon">
                          <use href="#v2-icon-loupe" xlinkHref="#v2-icon-loupe" />
                          </svg>
                      </label>
                      <div className>
                          <input autoComplete="off" id="search" name="search" placeholder={isPlaceholder === null ? "Search" : "Search in " + isPlaceholder} type="search" className="search-input__input"  />
                      </div>
                      </div>
                  </div>
                  </div>
                  <div className="sidebar-dashboard__categories">
                  <div className="groups groups_scrollable">
                      <div className="container">
                      {/* Rendering All The Components of Side title */}
                      <>{sideTitles}</>
                      </div>
                  </div>
                  </div>
                  <div className="container">
                  <div className="sidebar-dashboard__tutorials">
                      <a className="sidebar-dashboard__btn" href="/tutorials">
                      <svg className="icon v2-icon v2-icon-document">
                          <use href="#v2-icon-document" xlinkHref="#v2-icon-document" />
                      </svg>Knowledge Center </a>
                  </div>
                  </div>
              </div>
              </aside>
    )
}

export default CategorySideBar;