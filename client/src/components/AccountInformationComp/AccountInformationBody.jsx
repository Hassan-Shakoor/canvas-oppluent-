import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import { ACCOUNT_INFORMATION } from "../../shared/constant"
import ProfileBody from "./ProfileBody"
import SettingsBody from "./SettingsBody"
import { fetchProfile, selectProfile } from "../../store/app/AccountInformation/profile"
import { fetchUserSetting, selectUserSetting } from "../../store/app/AccountInformation/setting"

function AccountInformationBody({ mode }) {
  const dispatch = useDispatch()
  const userProfileData = useSelector(selectProfile)
  const userSettingData = useSelector(selectUserSetting)


  useEffect(() => {
    if(mode === ACCOUNT_INFORMATION.PROFILE){
      dispatch(fetchProfile())
    }else{
      dispatch(fetchUserSetting())
    }
  }, [dispatch])

    return (
      <>
        {mode === ACCOUNT_INFORMATION.PROFILE ? <ProfileBody profile={userProfileData} /> : <SettingsBody setting={userSettingData} />}
      </>
    );
  }
  

export default AccountInformationBody