import React, { useState, useEffect } from "react";
import Group from "./Group";
import { Link } from "react-router-dom";
import { getAuth,onAuthStateChanged  } from 'firebase/auth';
import { auth } from '../FirebaseAuthComp/firebase';
import axios from 'axios';
import { getDatabase, ref, set, get, onValue } from "firebase/database";


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
/*const categoryJSON = [
  {
    title: "Favorites",
    subTitle: [
      {id : 52, name: "Most Popular Templates"}
    ]
  },
  {
    title: "Brand Assets",
    subTitle: [
      { id: 1, name: "Logos" },
      { id: 2, name: "Magnetic Signs" },
      { id: 3, name: "Name Tags" }
    ]
  },
  {
    title: "Digital",
    subTitle: [
      { id: 4, name: "Email Signatures" },
      { id: 5, name: "HTML Email Newsletters" },
      { id: 6, name: "HTML Email Signatures" },
      { id: 32, name: "Instagram Stories", 
          subList: [
              { id: 32, name: "Browse All" },
              { id: 33, name: "Branding" },
              { id: 34, name: "Holidays" },
              { id: 35, name: "Listing" },
              { id: 36, name: "Recognition" }
          ]
      },
      { id: 8, name: "Office Social Media" },
      { id: 37, name: "Social Media Banners",
          subList: [
              { id: 37, name: "Browse All" },
              { id: 38, name: "Branding" },
              { id: 39, name: "Holidays" },
              { id: 40, name: "Listing" },
              { id: 41, name: "Real Estate Tips" },
              { id: 42, name: "Recognition" }
            ]
      },
      { id: 10, name: "Social Media Posts" }
    ]
  },
  {
    title: "Luxury",
    subTitle: [
      { id: 11, name: "Business Cards" },
      { id: 12, name: "Email Newsletter Campaigns" },
      { id: 13, name: "Email Signatures" },
      { id: 14, name: "Instagram Stories" },
      { id: 15, name: "Postcards" },
      { id: 16, name: "Property Brochure" },
      { id: 17, name: "Property Flyers" },
      { id: 18, name: "Social Media" }
    ]
  },
  {
    title: "Print",
    subTitle: [
      { id: 43, name: "Business Cards",
          subList: [
              { id: 43, name: "Browse All" },
              { id: 44, name: "Horizontal - 3.5\" x 2\"" },
              { id: 45, name: "Vertical - 3.5\" x 2\"" }
            ]
      },
      { id: 20, name: "Buyer's Guides" },
      { id: 21, name: "Door Hangers" },
      { id: 22, name: "For Sale Signs" },
      { id: 23, name: "Letterheads" },
      { id: 24, name: "Open House Signs" },
      { id: 46, name: "Postcards",
          subList: [
              { id: 46, name: "Browse All" },
              { id: 47, name: "6\" x 11\"" },
              { id: 48, name: "6\" x 9\"" }
            ]
      },
      { id: 26, name: "Property Brochures" },
      { id: 49, name: "Property Flyers",
          subList: [
              { id: 49, name: "Browse All" },
              { id: 50, name: "Double Sided" },
              { id: 51, name: "Single Sided" }
            ]
      },
      { id: 28, name: "Recruiting Packet" },
      { id: 29, name: "Sign Rider" },
      { id: 30, name: "Thank You Cards" },
      { id: 31, name: "Tri-Folds" }
    ]
  }
];*/

function addObjectToFavorites(categories, id) {
  debugger;
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
  debugger;
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
function fetchCategoryJSONFromFirebase(userId) {
  const database = getDatabase();
  const categoryRef = ref(database, `userJson/${userId}`);
  
  return get(categoryRef).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available");
      return null;
    }
  }).catch((error) => {
    console.error("Error fetching data:", error);
    return null;
  });
}

  function CategorySideBar(){

    useEffect(() => {
      // Reference to the user's category data in the database
      const database = getDatabase();
      const userJsonRef = ref(database, 'userJson/' + userId);
    
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
      debugger;
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
        set(ref(database, 'userJson/' + userId), updatedCategories).then(() => {
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
        set(ref(database, 'userJson/' + userId), updatedCategories).then(() => {
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
        set(ref(database, 'userJson/' + userId), updatedCategories).then(() => {
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