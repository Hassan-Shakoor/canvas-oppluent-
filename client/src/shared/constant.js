
import blackLogo from '../assets/logo/ORI-black logo.png'
import whiteLogo from '../assets/logo/ORI-white logo.png'
import blueLogo from '../assets/logo/ORI-blue logo.png'
import goldLogo from '../assets/logo/ORI-gold logo.png'

export const DISPLAY_DIRECTION = {
    VERTICAL: 'vertical',
    HORIZONTAL: 'horizontal'
};

export const ACCOUNT_INFORMATION = {
    PROFILE: 'profile',
    SETTINGS: 'settings'
}

export const LANGUAGE = {
    ENGLISH: "English",
    ESPANOL: "Español"
}

export const LOCAL_STORAGE = {
    USER_DATA: 'userData'
}


export const OBJECT_TYPE = {
    ITEXT: 'Text',
    IMAGE: 'Image',
    SHAPE: 'Shape',
    GROUP: 'Group',
}

export const BASE_URL = 'https://claircius-frontend.vercel.app/';

export const isEmailValid = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/;

export const SHAPES = [{
    title: 'donut.svg',
    url: '//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/20765/original/donut.svg?1688057071'
},
{
    title: 'Asset_1.svg',
    url: '//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/20370/original/Asset_1.svg?1687801686'
},
{
    title: 'half_circle_rectangle.svg',
    url: '//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/12737/original/half_circle_rectangle.svg?1676958828'
},
{
    title: '1 Star Rating',
    url: '//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/12452/original/Group_3467.svg?1675727765'
},
{
    title: '2 Star Rating',
    url: '//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/12451/original/Group_3466.svg?1675727741'
},
{
    title: '3 Star Rating',
    url: '//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/12450/original/Group_3465.svg?1675727714'
},
{
    title: '4 Star Rating',
    url: '//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/12449/original/Group_3463.svg?1675727668'
},
{
    title: '5 Star Rating',
    url: '//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/12448/original/Group_3464.svg?1675727639'
},
{
    title: 'rectangle.svg',
    url: '//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/12204/original/rectangle.svg?1674654820'
},
{
    title: 'rounded_square_svg.svg',
    url: '//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/12103/original/rounded_square_svg.svg?1673386135'
},
{
    title: 'parallelogram2.svg',
    url: '//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/12096/original/parallelogram2.svg?1673370327'
},
{
    title: 'parallelogram.svg',
    url: '//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/12092/original/parallelogram.svg?1673300125'
},
{
    title: 'shape_image.svg',
    url: '//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/10680/original/shape_image.svg?1669884354'
},
{
    title: 'shape_image.svg',
    url: '//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/10679/original/shape_image.svg?1669881873'
},
{
    title: 'shape_image_2.svg',
    url: '//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/10678/original/shape_image_2.svg?1669881873'
},
{
    title: 'Untitled-1.svg',
    url: '//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/10676/original/Untitled-1.svg?1669852025'
},
{
    title: 'Untitled-4.svg',
    url: '//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/10675/original/Untitled-4.svg?1669851678'
},
{
    title: 'shape.png',
    url: '//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/10674/thumb/shape.png?1669851519'
},
{
    title: "PERSONAL_LOGO_HERE.png",
    url: "//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/9961/thumb/PERSONAL_LOGO_HERE.png?1665611831"
},
{
    title: "no.svg",
    url: "//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/9605/original/no.svg?1662590027"
},
{
    title: "checkbox.svg",
    url: "//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/9604/original/checkbox.svg?1662590027"
},
{
    title: "checkmark.svg",
    url: "//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/9603/original/checkmark.svg?1662590027"
},
{
    title: "x.svg",
    url: "//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/9602/original/x.svg?1662590027"
},
{
    title: "empty_checkbox.svg",
    url: "//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/9601/original/empty_checkbox.svg?1662590027"
},
{
    title: "square_rounded_edge.svg",
    url: "//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/9265/original/square_rounded_edge.svg?1658173572"
},
{
    title: "oval.svg",
    url: "//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/9071/original/oval.svg?1654537926"
},
{
    title: "Gradient",
    url: "https://firebasestorage.googleapis.com/v0/b/opulent-reality.appspot.com/o/SK8euwF7Z2PaKM2FfLUwnEYzbEG3%2Fuploads%2FLovepik_com-380148632-black-transparent-vertical-linear-gradient-gradient-element-transparency-black-color-gradient.png?alt=media&token=1caadc37-34c0-4136-ada9-52f15b6f5743"
},
{
    title: "line-01.svg",
    url: "//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/6531/original/line-01.svg?1619568347"
},
{
    title: "line.svg",
    url: "//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/6530/original/line.svg?1619567979"
},
{
    title: "square.svg",
    url: "//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/6314/original/square.svg?1614980885"
},
{
    title: "rectangle.svg",
    url: "//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/6313/original/rectangle.svg?1614980885"
},
{
    title: "square_rounded_corners.svg",
    url: "//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/6312/original/square_rounded_corners.svg?1614980885"
},
{
    title: "square_outline_rounded_corners.svg",
    url: "//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/6311/original/square_outline_rounded_corners.svg?1614980885"
},
{
    title: "rectangle_rounded_corners.svg",
    url: "https://firebasestorage.googleapis.com/v0/b/opulent-reality.appspot.com/o/sadkjabsfkadasda-less-rounded-rectangle.svg?alt=media&token=f8abc6dc-10f4-4e6b-9912-ef057368d670"
},
{
    title: "rectangle_outline_rounded_corners.svg",
    url: "//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/6309/original/rectangle_outline_rounded_corners.svg?1614980885"
},
{
    title: "circle.svg",
    url: "https://firebasestorage.googleapis.com/v0/b/opulent-reality.appspot.com/o/g231e721he34243-circle-fill.svg?alt=media&token=7ff60486-fe3a-414e-bda1-3f41cb334b6c"
},
{
    title: "circle_outline.svg",
    url: "//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/6307/original/circle_outline.svg?1614980885"
},
{
    title: "circle_frame.svg",
    url: "//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/6306/original/circle_frame.svg?1614980885"
},
{
    title: "circle_frame_thick.svg",
    url: "//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/6305/original/circle_frame_thick.svg?1614980885"
},
{
    title: "triangle.svg",
    url: "//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/6304/original/triangle.svg?1614980854"
},
{
    title: "triangle_outline.svg",
    url: "//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/6303/original/triangle_outline.svg?1614980854"
},
{
    title: "triangle_rounded_corners.svg",
    url: "//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/6302/original/triangle_rounded_corners.svg?1614980854"
},
{
    title: "triangle_outline_rounded_corners.svg",
    url: "//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/6301/original/triangle_outline_rounded_corners.svg?1614980854"
},
{
    title: "pentagon.svg",
    url: "//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/6300/original/pentagon.svg?1614980854"
},
{
    title: "pentagon_outline.svg",
    url: "//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/6299/original/pentagon_outline.svg?1614980854"
},
{
    title: "hexagon.svg",
    url: "https://firebasestorage.googleapis.com/v0/b/opulent-reality.appspot.com/o/SK8euwF7Z2PaKM2FfLUwnEYzbEG3%2Fuploads%2Fhexagon-svgrepo-com.svg?alt=media&token=2ba7ce21-6f3c-4eb2-997a-f207bd8988c0"
},
{
    title: "hexagon_outline.svg",
    url: "//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/6297/original/hexagon_outline.svg?1614980854"
},
{
    title: "pentagon_frame.svg",
    url: "//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/6296/original/pentagon_frame.svg?1614980853"
},
{
    title: "hexagon_frame.svg",
    url: "//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/6295/original/hexagon_frame.svg?1614980853"
},
{
    title: "house.svg",
    url: "//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/6294/original/house.svg?1614980853"
}

    // ... you can add more image objects as needed
];

export const SOCIAL_MEDIA_ICONS = [
    {
        title: 'Photo_Insert.svg',
        url: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/33577/original/Photo_Insert.svg?1697772245',
    },
    {
        title: 'google-my-business_1.png',
        url: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/32165/thumb/google-my-business_1.png?1696653194',
    },
    {
        title: 'google-my-business_2.png',
        url: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/32164/thumb/google-my-business_2.png?1696653193',
    },
    {
        title: 'google_my_business_3.png',
        url: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/32163/thumb/google_my_business_3.png?1696653193',
    },
    {
        title: 'transparent_photo_insert.png',
        url: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26521/thumb/transparent_photo_insert.png?1692907108',
    },
    {
        title: 'dark_grey_Equal_Housing_logo.png',
        url: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26519/thumb/dark_grey_Equal_Housing_logo.png?1692907108',
    },
    {
        title: 'dark_grey_Realtor_logo.png',
        url: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26518/thumb/dark_grey_Realtor_logo.png?1692907108',
    },
    {
        title: 'YouTube_FullLogo.png',
        url: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26517/thumb/YouTube_FullLogo.png?1692907108',
    },
    {
        title: 'YouTube_Icon_Transparent-01.png',
        url: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26516/thumb/YouTube_Icon_Transparent-01.png?1692907107',
    },
    {
        title: 'tiktok_icon_2.png',
        url: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26515/thumb/tiktok_icon_2.png?1692907107',
    },
    {
        title: 'tiktok_icon_3.png',
        url: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26514/thumb/tiktok_icon_3.png?1692907107',
    },
    {
        title: 'tiktok_icon.png',
        url: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26513/thumb/tiktok_icon.png?1692907107',
    },
    {
        title: 'vimeo_icon_2.png',
        url: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26512/thumb/vimeo_icon_2.png?1692907107',
    },
    {
        title: 'vimeo_logo_2.jpg',
        url: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26511/thumb/vimeo_logo_2.jpg?1692907107',
    },
    {
        title: 'vimeo_icon_1.png',
        url: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26510/thumb/vimeo_icon_1.png?1692907107',
    },
    {
        title: 'vimeo_logo1.jpg',
        url: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26509/thumb/vimeo_logo1.jpg?1692907107',
    },
    {
        title: 'icons8-zoom.png',
        url: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26508/thumb/icons8-zoom.png?1692907106',
    },
    {
        title: 'icons8-zoom_2.png',
        url: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26507/thumb/icons8-zoom_2.png?1692907106',
    },
    {
        title: 'Facebook-Live.png',
        url: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26506/thumb/Facebook-Live.png?1692907106',
    },
    {
        title: 'Facebook-Logo.png',
        url: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26505/thumb/Facebook-Logo.png?1692907106',
    },
    {
        title: 'chat-glyph.png',
        url: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26504/thumb/chat-glyph.png?1692907106',
    },
    {
        title: 'chat_icon.png',
        url: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26503/thumb/chat_icon.png?1692907106',
    },
    {
        title: 'chat_bubble_glyph.png',
        url: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26502/thumb/chat_bubble_glyph.png?1692907106',
    },
    {
        title: 'chat_bubble_gif.gif',
        url: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26501/thumb/chat_bubble_gif.gif?1692907106',
    },
    {
        title: 'full_screen_icon.png',
        url: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26500/thumb/full_screen_icon.png?1692907106',
    },
    {
        title: 'full_screen_glyph.png',
        url: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26499/thumb/full_screen_glyph.png?1692907106',
    },
    {
        title: 'Full_screen2_icon.png',
        url: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26498/thumb/Full_screen2_icon.png?1692907106',
    },
    {
        title: 'full_screen2_glyph.png',
        url: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26497/thumb/full_screen2_glyph.png?1692907106',
    },
    {
        title: 'iconfinder_globe_world_370926.png',
        url: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26496/thumb/iconfinder_globe_world_370926.png?1692907106',
    },
    {
        title: 'iconfinder_cog_setting_gear_preferences_370929.png',
        url: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26495/thumb/iconfinder_cog_setting_gear_preferences_370929.png?1692907106',
    },
    {
        title: 'iconfinder_arrow_forward_next_right_direction_370924.png',
        url: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26494/thumb/iconfinder_arrow_forward_next_right_direction_370924.png?1692907105',
    },
    {
        title: 'iconfinder_arrow_back_previous_left_direction_370925.png',
        url: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26493/thumb/iconfinder_arrow_back_previous_left_direction_370925.png?1692907105',
    },
    {
        title: 'iconfinder_Filter_370928.png',
        url: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26492/thumb/iconfinder_Filter_370928.png?1692907105',
    },
    {
        title: 'iconfinder_music_370923.png',
        url: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26491/thumb/iconfinder_music_370923.png?1692907105',
    },
    {
        title: 'iconfinder_like_favorite_heart_370922.png',
        url: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26490/thumb/iconfinder_like_favorite_heart_370922.png?1692907105',
    },
    {
        title: 'iconfinder_share_social_network_social_media_370927.png',
        url: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26489/thumb/iconfinder_share_social_network_social_media_370927.png?1692907105',
    },
    {
        title: 'iconfinder_YouTube_370920.png',
        url: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26488/thumb/iconfinder_YouTube_370920.png?1692907105',
    },
    {
        title: 'iconfinder_Instagram_370919.png',
        url: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26487/thumb/iconfinder_Instagram_370919.png?1692907105',
    },
    {
        title: 'iconfinder_Twitter_370921.png',
        url: 'https://dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26486/thumb/iconfinder_Twitter_370921.png?1692907105',
    },
    {
        title: 'iconfinder_Google_Chrome_1298719.png',
        url: '//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/26458/thumb/iconfinder_Google_Chrome_1298719.png?1692907100',
    },
];

export const CLAIRCIUS_LOGO = [
    {
        title: "Logo_White.png",
        url: whiteLogo
    },
    {
        title: "Logo_Gold.png",
        url: goldLogo
    },
    {
        title: "Logo_Black.png",
        url: blackLogo
    },
    {
        title: "Logo_Blue.png",
        url: blueLogo
    },
];


