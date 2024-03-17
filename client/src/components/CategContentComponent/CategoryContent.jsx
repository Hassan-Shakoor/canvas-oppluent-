// ** Import Libraries
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// ** Import Custom Components
import DashboardHeader from './DashboardHeader';
import Template from './Template';
import TemplateSort from './TemplateSort';

// ** Firebase
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../configs/firebase';
import { getDatabase, ref, set, onValue } from "firebase/database";
import { useTranslation } from 'react-i18next';
import SpinnerContainer from '../Loader/SpinnerContainer';

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

  const { t } = useTranslation()

  // ** States
  const [loading, setLoading] = useState(true);
  const [gridColumn, setGridColumn] = useState(3)
  const [sortTemplate, setSortTemplate] = useState('Default')
  const { id } = useParams();
  const isFoldersKeywordPresent = window.location.href.includes('folders');
  const [userJson, setUserJson] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [category, setCategory] = useState({
    id: 0,
    subHeading: '',
    template: [],
  });

  const fetchDataFromDatabase = () => {
    const database = getDatabase();
    const userJsonRef = ref(database, userId + '/templateData');

    onValue(userJsonRef, (snapshot) => {
      const updatedCategories = snapshot.val();
      if (updatedCategories) {
        setCategoriesData(updatedCategories);
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
    setLoading(true);
    fetchDataFromDatabase();
    fetchUserJsonDataFromDatabase();
    setLoading(false);
  }, [userId]);

  function updateFavorite(id) {
    const updatedCategoriesData = [...categoriesData]; // Create a copy of categoriesData
    const updatedUserJson = [...userJson];
    // Find the template in the categoriesData and update its favorite status
    let isFavoriteAdded = false;
    updatedCategoriesData.forEach(category => {
      const template = category.template?.find(template => template.id === id);
      if (template) {
        console.log(template.favorite);
        const originalFavoriteStatus = template.favorite; // Store the original favorite status
        template.favorite = !template.favorite;

        // If the template is now marked as favorite and was previously not in id:53, move it to the category with id 53
        if (template.favorite && category.id !== 53) {
          const targetCategory = updatedCategoriesData.find(cat => cat.id === 53);
          console.log(targetCategory);
          if (targetCategory) {
            targetCategory.template = targetCategory.template || []; // Create an empty array if template is undefined
            targetCategory.template.push(template);
            isFavoriteAdded = true;
          }
        } else if (!template.favorite && originalFavoriteStatus) { // If the template is marked as not favorite and was previously favorite
          // Remove the template from the category with id 53
          const targetCategory = updatedCategoriesData.find(cat => cat.id === 53);
          if (targetCategory) {
            targetCategory.template = targetCategory.template.filter(tmpl => tmpl.id !== id);
          }
        }
      }
    });

    // Check if there are any favorite templates left in the "Favorite Templates" folder
    const favoriteTemplatesCategory = updatedCategoriesData.find(cat => cat.id === 53);

    if (favoriteTemplatesCategory) {
      // If there are favorite templates, add or update the "Favorite Templates" subtitle in userJson
      const favoritesTitle = updatedUserJson.find(cat => cat.title === "Favorites");
      const favoriteTemplatesSubtitle = {
        id: 53,
        name: "Favorite Templates"
      };

      if (isFavoriteAdded && !favoritesTitle.subTitle.some(sub => sub.id === favoriteTemplatesSubtitle.id)) {
        favoritesTitle.subTitle = [...favoritesTitle.subTitle, favoriteTemplatesSubtitle];
      } else if (!isFavoriteAdded && favoritesTitle.subTitle.some(sub => sub.id === favoriteTemplatesSubtitle.id)) {
        // Check if there are any remaining favorite templates
        const areFavoriteTemplatesRemaining = favoriteTemplatesCategory.template && favoriteTemplatesCategory.template.length > 0;
        if (!areFavoriteTemplatesRemaining) {
          // Remove the "Favorite Templates" subtitle from userJson
          favoritesTitle.subTitle = favoritesTitle.subTitle.filter(sub => sub.id !== favoriteTemplatesSubtitle.id);
        }
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

  function handleColumn(number) {
    setGridColumn(number)
  }

  function handleSortTemplate(order) {
    setSortTemplate(order)
  }

  // Fetch the template data based on the id parameter
  useEffect(() => {
    setLoading(true);
    setCategory({
      id: 0,
      subHeading: '',
      template: [],
    })
    if (id === undefined) {
      console.log(categoriesData)
      const fetchedCategory = categoriesData
        .flatMap(category => category?.template?.filter(template => template.isMyDesign === true) || []);


      if (fetchedCategory) {
        setCategory(fetchedCategory);
        console.log(fetchedCategory)
      }
    }
    if (id !== undefined) {
      // console.log(categoriesData)
      const fetchedCategory = categoriesData.find(category => category.id === parseInt(id));

      if (fetchedCategory) {
        setCategory(fetchedCategory);
        console.log(fetchedCategory)
      }
    }
    setTimeout(() => {

      setLoading(false);
    }, 1000);
  }, [id, categoriesData]);

  // Sorting Effect
  useEffect(() => {
    setLoading(true);
    if (sortTemplate === 'Modified') {
      // Sort the templates by modified date
      const sortedTemplates = (id ? [...category?.template] : [...category]).sort((a, b) => new Date(b.modified) - new Date(a.modified));
      if (id) {
        setCategory(prevCategory => ({
          ...prevCategory,
          template: sortedTemplates
        }))
      } else {
        setCategory([...sortedTemplates])
      }

    } else if (sortTemplate === 'Created') {
      // Sort the templates by created date
      const sortedTemplates = (id ? [...category?.template] : [...category]).sort((a, b) => new Date(a.created) - new Date(b.created));
      if (id) {
        setCategory(prevCategory => ({
          ...prevCategory,
          template: sortedTemplates
        }))
      } else {
        setCategory(sortedTemplates)
      }
    } else if (sortTemplate === 'Default') {
      // Fetch category data only once on component mount
      const fetchCategoryData = async () => {
        try {
          const fetchedCategory = await categoriesData?.find(category => category.id === parseInt(id));
          if (fetchedCategory) {
            setCategory(fetchedCategory);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchCategoryData();
    } else if (sortTemplate === 'Name A - Z') {
      // Sort the templates by card title in ascending order
      const sortedTemplates = (id ? [...category?.template] : [...category]).sort((a, b) => a.cardTitle.localeCompare(b.cardTitle));
      if (id) {
        setCategory(prevCategory => ({
          ...prevCategory,
          template: sortedTemplates
        }))
      } else {
        setCategory([...sortedTemplates])
      }
    } else {
      // Sort the templates by card title in descending order
      const sortedTemplates = (id ? [...category?.template] : [...category]).sort((a, b) => b.cardTitle.localeCompare(a.cardTitle));
      if (id) {
        setCategory(prevCategory => ({
          ...prevCategory,
          template: sortedTemplates
        }))
      } else {
        setCategory(sortedTemplates)
      }
    }
    setLoading(false);
  }, [sortTemplate]);

  return (
    <div className="page__content">
      {id && !isFoldersKeywordPresent && (!loading ?
        <div className="container">
          {/* Top Header */}
          <div className="dashboard-header">
            {/* Sorting Panel */}
            <TemplateSort gridColumn={gridColumn} handleColumn={handleColumn} handleSortTemplate={handleSortTemplate} />
            {/* Header Paragraph */}
            <div className="dashboard-header__description">{category.subHeading}</div>
          </div>
          {/* Templates */}
          <div className='infinite-scroll-component__outerdiv'>
            <div className='infinite-scroll-component' style={{ height: "auto", overflow: "auto" }}>
              <div className='waterfall-component'>
                {/* <span> */}
                {category?.template?.length > 0 ?
                  <div className="template-grid-container" style={{ gridTemplateColumns: "repeat(" + gridColumn + ", auto)" }}>
                    {category.template?.map((item, index) => (
                      <Template key={index} item={item} gridColumn={gridColumn} updateFavorite={updateFavorite} userId={userId} categoryId={category.id} />
                    ))}
                  </div>
                  :
                  <div className="empty-data-set" data-test="empty-data-set" style={{ paddingTop: '20%' }}>
                    <div className="empty-data-set__icon-wrapper">
                      <img
                        src="https://dnhf8bus4lv8r.cloudfront.net/new-packs/assets/512dae34bbe771ada018.svg"
                        alt="designs"
                        className="empty-data-set__icon"
                      />
                    </div>
                    <div className="empty-data-set__label">{t("noTemplates")}</div>
                  </div>}
                {/* </span> */}
              </div>
            </div>
          </div>
        </div> : <SpinnerContainer loading={loading} />)}
      {(!id || isFoldersKeywordPresent) && (loading ? <SpinnerContainer loading={loading} /> : <DashboardHeader category={category} gridColumn={gridColumn} userId={userId} handleSortTemplate={handleSortTemplate} handleColumn={handleColumn} />)}
    </div>
  );
}

export default CategoryContent;