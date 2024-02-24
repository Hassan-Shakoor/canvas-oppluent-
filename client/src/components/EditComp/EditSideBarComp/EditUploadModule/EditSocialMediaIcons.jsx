import React from 'react';

const MediaLibrary = () => {
  // Assuming you have an array of media library items
  const mediaLibraryItems = [
    {
      title: 'Photo_Insert.svg',
      imageUrl: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/33577/original/Photo_Insert.svg?1697772245',
    },
    {
      title: 'google-my-business_1.png',
      imageUrl: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/32165/thumb/google-my-business_1.png?1696653194',
    },
    {
      title: 'google-my-business_2.png',
      imageUrl: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/32164/thumb/google-my-business_2.png?1696653193',
    },
    {
      title: 'google_my_business_3.png',
      imageUrl: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/32163/thumb/google_my_business_3.png?1696653193',
    },
    {
      title: 'transparent_photo_insert.png',
      imageUrl: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26521/thumb/transparent_photo_insert.png?1692907108',
    },
    {
      title: 'dark_grey_Equal_Housing_logo.png',
      imageUrl: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26519/thumb/dark_grey_Equal_Housing_logo.png?1692907108',
    },
    {
      title: 'dark_grey_Realtor_logo.png',
      imageUrl: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26518/thumb/dark_grey_Realtor_logo.png?1692907108',
    },
    {
      title: 'YouTube_FullLogo.png',
      imageUrl: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26517/thumb/YouTube_FullLogo.png?1692907108',
    },
    {
      title: 'YouTube_Icon_Transparent-01.png',
      imageUrl: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26516/thumb/YouTube_Icon_Transparent-01.png?1692907107',
    },
    {
      title: 'tiktok_icon_2.png',
      imageUrl: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26515/thumb/tiktok_icon_2.png?1692907107',
    },
    {
      title: 'tiktok_icon_3.png',
      imageUrl: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26514/thumb/tiktok_icon_3.png?1692907107',
    },
    {
      title: 'tiktok_icon.png',
      imageUrl: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26513/thumb/tiktok_icon.png?1692907107',
    },
    {
      title: 'vimeo_icon_2.png',
      imageUrl: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26512/thumb/vimeo_icon_2.png?1692907107',
    },
    {
      title: 'vimeo_logo_2.jpg',
      imageUrl: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26511/thumb/vimeo_logo_2.jpg?1692907107',
    },
    {
      title: 'vimeo_icon_1.png',
      imageUrl: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26510/thumb/vimeo_icon_1.png?1692907107',
    },
    {
      title: 'vimeo_logo1.jpg',
      imageUrl: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26509/thumb/vimeo_logo1.jpg?1692907107',
    },
    {
      title: 'icons8-zoom.png',
      imageUrl: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26508/thumb/icons8-zoom.png?1692907106',
    },
    {
      title: 'icons8-zoom_2.png',
      imageUrl: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26507/thumb/icons8-zoom_2.png?1692907106',
    },
    {
      title: 'Facebook-Live.png',
      imageUrl: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26506/thumb/Facebook-Live.png?1692907106',
    },
    {
      title: 'Facebook-Logo.png',
      imageUrl: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26505/thumb/Facebook-Logo.png?1692907106',
    },
    {
      title: 'chat-glyph.png',
      imageUrl: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26504/thumb/chat-glyph.png?1692907106',
    },
    {
      title: 'chat_icon.png',
      imageUrl: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26503/thumb/chat_icon.png?1692907106',
    },
    {
      title: 'chat_bubble_glyph.png',
      imageUrl: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26502/thumb/chat_bubble_glyph.png?1692907106',
    },
    {
      title: 'chat_bubble_gif.gif',
      imageUrl: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26501/thumb/chat_bubble_gif.gif?1692907106',
    },
    {
      title: 'full_screen_icon.png',
      imageUrl: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26500/thumb/full_screen_icon.png?1692907106',
    },
    {
      title: 'full_screen_glyph.png',
      imageUrl: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26499/thumb/full_screen_glyph.png?1692907106',
    },
    {
      title: 'Full_screen2_icon.png',
      imageUrl: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26498/thumb/Full_screen2_icon.png?1692907106',
    },
    {
      title: 'full_screen2_glyph.png',
      imageUrl: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26497/thumb/full_screen2_glyph.png?1692907106',
    },
    {
      title: 'iconfinder_globe_world_370926.png',
      imageUrl: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26496/thumb/iconfinder_globe_world_370926.png?1692907106',
    },
    {
      title: 'iconfinder_cog_setting_gear_preferences_370929.png',
      imageUrl: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26495/thumb/iconfinder_cog_setting_gear_preferences_370929.png?1692907106',
    },
    {
      title: 'iconfinder_arrow_forward_next_right_direction_370924.png',
      imageUrl: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26494/thumb/iconfinder_arrow_forward_next_right_direction_370924.png?1692907105',
    },
    {
      title: 'iconfinder_arrow_back_previous_left_direction_370925.png',
      imageUrl: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26493/thumb/iconfinder_arrow_back_previous_left_direction_370925.png?1692907105',
    },
    {
      title: 'iconfinder_Filter_370928.png',
      imageUrl: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26492/thumb/iconfinder_Filter_370928.png?1692907105',
    },
    {
      title: 'iconfinder_music_370923.png',
      imageUrl: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26491/thumb/iconfinder_music_370923.png?1692907105',
    },
    {
      title: 'iconfinder_like_favorite_heart_370922.png',
      imageUrl: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26490/thumb/iconfinder_like_favorite_heart_370922.png?1692907105',
    },
    {
      title: 'iconfinder_share_social_network_social_media_370927.png',
      imageUrl: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26489/thumb/iconfinder_share_social_network_social_media_370927.png?1692907105',
    },
    {
      title: 'iconfinder_YouTube_370920.png',
      imageUrl: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26488/thumb/iconfinder_YouTube_370920.png?1692907105',
    },
    {
      title: 'iconfinder_Instagram_370919.png',
      imageUrl: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26487/thumb/iconfinder_Instagram_370919.png?1692907105',
    },
    {
      title: 'iconfinder_Twitter_370921.png',
      imageUrl: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26486/thumb/iconfinder_Twitter_370921.png?1692907105',
    },
    {
      title: 'iconfinder_Google_Chrome_1298719.png',
      imageUrl: '//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26458/thumb/iconfinder_Google_Chrome_1298719.png?1692907100',
    },
  ];
  

  return (
    <div className="media-library__container-wrapper">
      <div className="media-library__container" id="library-scroll-target-27658008-3c05-4817-9d5a-7849539f434f">
        <div className="infinite-scroll-component__outerdiv">
          <div className="infinite-scroll-component " style={{ height: 'auto', overflow: 'auto' }}>
            <div className="">
              <div className="MuiMasonry-root css-icyffi">
                {mediaLibraryItems.map((item, index) => (
                  <div key={index} className="media-library__item-container" style={{ order: index + 1 }}>
                    <div className="media-library__image" draggable="true" title={item.title}>
                      <img className="media-library__image-thumbnail" src={item.imageUrl} alt={item.title} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaLibrary;
