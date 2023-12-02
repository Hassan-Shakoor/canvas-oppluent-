import { ACCOUNT_INFORMATION } from "../../shared/constant"
import ProfileBody from "./ProfileBody"
import SettingsBody from "./SettingsBody"

function AccountInformationBody({ mode }) {
    return (
      <>
        {mode === ACCOUNT_INFORMATION.PROFILE ? <ProfileBody /> : <SettingsBody />}
      </>
    );
  }
  

export default AccountInformationBody