import React, {useEffect} from "react";
import { useLocation, useParams } from "react-router-dom";
import { getDatabase, ref, onValue } from "firebase/database";


const DesignPublicShare = () => {
  const [templateData, setTemplateData] = React.useState(null);
  const param = useParams();


console.log({templateData})
  const fetchDataFromDatabase = () => {
    const database = getDatabase();
    const userJsonRef = ref(database, param.userId + '/templateData');
    onValue(userJsonRef, (snapshot) => {
      const updatedCategories = snapshot.val();
      if (updatedCategories) {
        console.log({updatedCategories})
        updatedCategories.forEach((item, index)=>{
          if(item.id == parseInt(param.categoryId)){
            item.template.forEach((item2, index2)=>{
              if(item2.id == parseInt(param.templateId)){
                setTemplateData(item2)
              }
            })
          }
        })
      }
    });
  };

  useEffect(() => {
    fetchDataFromDatabase();
  }, [param.categoryId, param.templateId])
  

  return (
    <div className="design-public-share">
      <div className="design-public-share__content">
        <div
          className="design-public-share__left-border"
          style={{
            background: "linear-gradient(rgb(202, 182, 125), rgb(31, 31, 31))",
          }}
        ></div>
        <div className="button-set button-set_right mb-3">
          <a href={`${templateData?.imageUrl}`} download className="btn__text">
            <button type="button" className="btn btn__text">
              <svg className="icon v2-icon v2-icon-download">
                <use
                  href="#v2-icon-download"
                  xlinkHref="#v2-icon-download"
                ></use>
              </svg>
              Download
            </button>
          </a>
        </div>
        <img
          className="design-public-share__design-image"
          src={`${templateData?.imageUrl}`}
          alt="Template"
        />
      </div>
    </div>
  );
};

export default DesignPublicShare;
