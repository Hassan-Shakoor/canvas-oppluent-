import { ACCOUNT_INFORMATION } from "../../shared/constant"
import ProfileBody from "./ProfileBody"
import SettingsBody from "./SettingsBody"

function AccountInformationBody({ mode, userProfileData }) {

    return (
      <>
        {mode === ACCOUNT_INFORMATION.PROFILE ? <ProfileBody profile={userProfileData} /> : <SettingsBody setting={userProfileData} />}
      </>
    );
  }
  

export default AccountInformationBody