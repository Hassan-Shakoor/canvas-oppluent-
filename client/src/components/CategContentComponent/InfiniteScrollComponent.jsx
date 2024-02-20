import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import DesignTemplate from './DesignTemplate';
import FolderComponent from './FolderComponent';
import { getFolders } from '../../services/firebase/getFolders';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUID } from '../../store/app/User/userPreference';


const InfiniteScrollComponent = ({ category, gridColumn, userId }) => {

    const uid = useSelector(selectUID)
    const isFoldersKeywordPresent = window.location.href.includes('folders');
    const { id } = useParams();
    const [folder, setFolder] = useState(null)
    const [folders, setFolders] = useState([])
    const [folderId, setFolderId] = useState('')


    // const category = {
    //     id: 32,
    //     subHeading: "",
    //     template: [{
    //         cardTitle: "Just Sold",
    //         created: "2023-09-01",
    //         favorite: false,
    //         id: 323,
    //         imageUrl: "/images/Just_Sold-0 (1).jpg",
    //         modified: "2023-09-01",
    //         storage_url: ["https://firebasestorage.googleapis.com/v0/b/clarious-f4f45.appspot.com/o/images%2FJust_Sold-0%20(1).jpg?alt=media&token=7d0c8f0e-801d-42d9-b6d4-f7f6c2352a42"]
    //     }]
    // };

    useEffect(() => {
        const fetchData = async () => {
            if (id === undefined || isFoldersKeywordPresent) {
                try {
                    console.log('Fetching folders...');
                    const fetchedFolders = await getFolders(uid);
                    if (isFoldersKeywordPresent) {
                        const folder = fetchedFolders.find(folder => folder.id === id)
                        setFolder(folder)
                    }
                    setFolders(fetchedFolders);

                    console.log('Folders fetched successfully:', fetchedFolders);
                } catch (error) {
                    console.error('Error fetching folders:', error);
                }
            }
        };
        fetchData();

        console.log(category)

    }, [])

    return (
        <>
            {!isFoldersKeywordPresent ? (
                <div className="infinite-scroll-component__outerdiv">
                    <div className="infinite-scroll-component" style={{ height: 'auto', overflow: 'auto' }}>
                        <div className="MuiMasonry-root css-by147d">
                            {category?.length > 0 ? (
                                <div className="template-grid-container" style={{ gridTemplateColumns: `repeat(${gridColumn}, auto)` }}>
                                    {folders?.length > 0 ?
                                        folders?.map((folder, index) => (
                                            <div style={{ order: 1 }} key={index}>
                                                <div className="">
                                                    <div className="" draggable={true}>
                                                        <FolderComponent folderTitle={folder.name}
                                                            folderId={folder.id}
                                                            templates={folder?.template}
                                                            itemCount={folder?.template ? folder?.template?.length : 0}
                                                            gridColumn={gridColumn} />
                                                    </div>
                                                </div>
                                            </div>
                                        )) : <></>
                                    }

                                    {category?.map((item, index) => (
                                        <div style={{ order: index % 3 + 1 }} key={index}>
                                            <div className="">
                                                <div className="" draggable="true">
                                                    <DesignTemplate key={index} item={item} gridColumn={gridColumn} userId={userId} categoryId={category.id} />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="empty-data-set" data-test="empty-data-set" style={{ paddingTop: '20%' }}>
                                    <div className="empty-data-set__icon-wrapper">
                                        <img
                                            src="https://dnhf8bus4lv8r.cloudfront.net/new-packs/assets/512dae34bbe771ada018.svg"
                                            alt="designs"
                                            className="empty-data-set__icon"
                                        />
                                    </div>
                                    <div className="empty-data-set__label">No Templates</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) :
                (<>
                    <div className="dashboard-header__folder-title" style={{ marginBottom: '20px' }}>
                        <FontAwesomeIcon icon="fa-regular fa-folder" /> <span style={{ fontWeight: 900, marginLeft: '4px' }}> {folder?.name}</span></div >
                    <div className="template-grid-container" style={{ gridTemplateColumns: `repeat(${gridColumn}, auto)` }}>

                        {
                            folder?.template?.length > 0 ?
                                folder?.template?.map((item, index) => (
                                    <div style={{ order: index % 3 + 1 }} key={index}>
                                        <div className="">
                                            <div className="" draggable="true">
                                                <DesignTemplate key={index} item={item} gridColumn={gridColumn} userId={userId} categoryId={category.id} />
                                            </div>
                                        </div>
                                    </div>
                                )) : <div className="empty-data-set" data-test="empty-data-set" style={{ paddingTop: '20%' }}>
                                    <div className="empty-data-set__icon-wrapper">
                                        <img
                                            src="https://dnhf8bus4lv8r.cloudfront.net/new-packs/assets/512dae34bbe771ada018.svg"
                                            alt="designs"
                                            className="empty-data-set__icon"
                                        />
                                    </div>
                                    <div className="empty-data-set__label">No Templates</div>
                                </div>
                        }
                    </div>
                </>)

            }
        </>
    );

};

export default InfiniteScrollComponent;
