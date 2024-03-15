import React from "react";
import { useTranslation } from 'react-i18next';

function TermsOfUse() {

  const { t } = useTranslation()

  return (
    <div className="container">
      <div className="terms-page">
        <div className="terms-page__content">
          <div
            className="terms-page__left-border"
            style={{
            background: "linear-gradient(rgb(202, 182, 125), rgb(31, 31, 31))"
          }}/>
          <div className="terms-page__content-header">
            <img
              className="terms-page__account-logo"
              src="https://dnhf8bus4lv8r.cloudfront.net/system/tcgimarketing.com/account/platform_logo/original/platform_logo_login_1-1-1.png?1661778656"
              alt="logo"/>
            <h1 className="terms-page__page-title">{t("TermsOfUse.title")}</h1>
          </div>
          <div className="terms-page__body">
            <p className="terms-page__welcome">{t("TermsOfUse.welcome")}</p>
            <div className="terms-page__text">
              <p>
                <br/>
              </p>
              <p>
                <strong
                  style={{
                  backgroundColor: "transparent"
                }}>
                  1) {t("TermsOfUse.userAcceptance")}{" "}
                </strong>
              </p>
              <p>
                <span
                  style={{
                  backgroundColor: "transparent"
                }}>
                  {t("TermsOfUse.desc1")}
                </span>
              </p>
              <p>
                <span
                  style={{
                  backgroundColor: "transparent"
                }}>
                  {t("TermsOfUse.desc2")}
                </span>
              </p>
              <p>
                <span
                  style={{
                  backgroundColor: "transparent"
                }}>
                  {t("TermsOfUse.desc3")}
                </span>
              </p>
              <p>
                <br/>
              </p>
              <p>
                <strong
                  style={{
                  backgroundColor: "transparent"
                }}>
                  2) {t("TermsOfUse.theServices")}
                </strong>
              </p>
              <p>
                <span
                  style={{
                  backgroundColor: "transparent"
                }}>
                  {t("TermsOfUse.service1")}
                </span>
              </p>
              <p>
                <br/>
              </p>
              <p>
                <strong
                  style={{
                  backgroundColor: "transparent"
                }}>
                  3) {t("TermsOfUse.accessAndOwnership")}
                </strong>
              </p>
              <p>
                <span
                  style={{
                  backgroundColor: "transparent"
                }}>
                  {t("TermsOfUse.accessPoint1")}
                </span>
              </p>
              <p>
                <span
                  style={{
                  backgroundColor: "transparent"
                }}>
                  {t("TermsOfUse.accessPoint2")}
                </span>
              </p>
              <p>
                <br/>
              </p>
              <p>
                <strong
                  style={{
                  backgroundColor: "transparent"
                }}>
                  4) {t("TermsOfUse.userAccountAndCredentials")}
                </strong>
              </p>
              <p>
                <span
                  style={{
                  backgroundColor: "transparent"
                }}>
                  {t("TermsOfUse.userAccountPoint1")}
                </span>
              </p>
              <p>
                <span
                  style={{
                  backgroundColor: "transparent"
                }}>
                  {t("TermsOfUse.userAccountPoint2")}
                </span>
              </p>
              <p>
                <span
                  style={{
                  backgroundColor: "transparent"
                }}>
                  {t("TermsOfUse.userAccountPoint3")}
                </span>
              </p>
              <p>
                <span
                  style={{
                  backgroundColor: "transparent"
                }}>
                  {t("TermsOfUse.userAccountPoint4")}
                </span>
              </p>
              <p>
                <br/>
              </p>
              <p>
                <strong
                  style={{
                  backgroundColor: "transparent"
                }}>
                  5) {t("TermsOfUse.userPrivacy")}
                </strong>
              </p>
              <p>
                <span
                  style={{
                  backgroundColor: "transparent"
                }}>
                  {t("TermsOfUse.userPrivacyPoint1")}
                </span>
              </p>
              <p>
                <br/>
              </p>
              <p>
                <strong
                  style={{
                  backgroundColor: "transparent"
                }}>
                  6) {t("TermsOfUse.userPersonalInfo")}
                </strong>
              </p>
              <p>
                <span
                  style={{
                  backgroundColor: "transparent"
                }}>
                  {t("TermsOfUse.userPersonalInfoPoint1")}
                </span>
              </p>
              <p>
                <br/>
              </p>
              <p>
                <strong
                  style={{
                  backgroundColor: "transparent"
                }}>
                  7) User’s Use of the Platform
                </strong>
              </p>
              <p>
                <span
                  style={{
                  backgroundColor: "transparent"
                }}>
                  When using Maxa’s Platform, User is responsible for its use of the Platform.
                  Further, User agrees to the following:
                </span>
              </p>
              <ul>
                <li className="ql-align-justify">
                  <span
                    style={{
                    backgroundColor: "transparent"
                  }}>
                    User may not copy, distribute, access, or disclose any part of the Platform in
                    any medium, including without limitation by any automated or non-automated
                    “scraping”;
                  </span>
                </li>
                <li className="ql-align-justify">
                  <span
                    style={{
                    backgroundColor: "transparent"
                  }}>
                    User may not attempt to interfere with, compromise the system integrity or
                    security, or decipher any transmissions to or from the servers running the
                    Platform;
                  </span>
                </li>
                <li className="ql-align-justify">
                  <span
                    style={{
                    backgroundColor: "transparent"
                  }}>
                    User may not use any robot, spider, crawler, scraper or other automated means or
                    interface not provided by Maxa to access the Platform or to extract data;
                  </span>
                </li>
                <li className="ql-align-justify ql-indent-1">
                  <span
                    style={{
                    backgroundColor: "transparent"
                  }}>
                    User may not use automated bots or other software to send more messages through
                    Maxa’s Platform than humanly possible;
                  </span>
                </li>
                <li>
                  <span
                    style={{
                    backgroundColor: "transparent"
                  }}>
                    User may not use the Platform on a computer that is used to operate nuclear
                    facilities, life support, or other mission critical applications where life or
                    property may be at stake;
                  </span>
                </li>
                <li>
                  <span
                    style={{
                    backgroundColor: "transparent"
                  }}>
                    User may not decompile, reverse engineer, disassemble, modify, rent, sell,
                    lease, loan, distribute, or create derivative works or improvements to the
                    Platform or any portion of it;
                  </span>
                </li>
                <li>
                  <span
                    style={{
                    backgroundColor: "transparent"
                  }}>
                    User may not access Maxa’s Platform in an attempt to build a similar or other
                    competitive product;
                  </span>
                </li>
                <li>
                  <span
                    style={{
                    backgroundColor: "transparent"
                  }}>
                    User may not use the Platform in an unlawful manner;
                  </span>
                </li>
                <li className="ql-align-justify">
                  <span
                    style={{
                    backgroundColor: "transparent"
                  }}>
                    User may not take any action that imposes, or may impose at Maxa’s sole
                    discretion, an unreasonable or disproportionately large load on Maxa’s
                    infrastructure;&nbsp;
                  </span>
                </li>
                <li className="ql-align-justify">
                  <span
                    style={{
                    backgroundColor: "transparent"
                  }}>
                    User may not collect or harvest any personally identifiable information,
                    including account names, except where permitted, from the Platform;
                  </span>
                </li>
                <li className="ql-align-justify">
                  <span
                    style={{
                    backgroundColor: "transparent"
                  }}>
                    User may not impersonate any person or entity or misrepresent User’s affiliation
                    with a person or entity;
                  </span>
                </li>
                <li className="ql-align-justify">
                  <span
                    style={{
                    backgroundColor: "transparent"
                  }}>
                    User may not violate or infringe other people's or user’s intellectual property,
                    privacy, or other contractual rights while using Maxa’s Platform;
                  </span>
                </li>
                <li className="ql-align-justify ql-indent-1">
                  <span
                    style={{
                    backgroundColor: "transparent"
                  }}>
                    User may not violate any requirements, procedures, policies or regulations of
                    networks connected to Maxa;
                  </span>
                </li>
                <li>
                  <span
                    style={{
                    backgroundColor: "transparent"
                  }}>
                    User may not sell, lease, loan, distribute, transfer, or sublicense the Platform
                    or access to it or derive income from the use or provision of the Platform
                    unless enabled through the functionality of Maxa’s Platform;&nbsp;
                  </span>
                </li>
                <li className="ql-align-justify">
                  <span
                    style={{
                    backgroundColor: "transparent"
                  }}>
                    User may not interfere with or disrupt the Platform;
                  </span>
                </li>
                <li className="ql-align-justify">
                  <span
                    style={{
                    backgroundColor: "transparent"
                  }}>
                    User may not violate any US state or federal laws or regulations and User will
                    be solely responsible for such violations;&nbsp;
                  </span>
                </li>
                <li className="ql-align-justify">
                  <span
                    style={{
                    backgroundColor: "transparent"
                  }}>
                    User agrees not to use the Platform in any way that is: misleading, unlawful,
                    defamatory, obscene, invasive, threatening, or harassing.
                  </span>
                </li>
                <li>
                  <span
                    style={{
                    backgroundColor: "transparent"
                  }}>
                    User agrees that it will not hold Maxa responsible for User’s use of the
                    Platform; and
                  </span>
                </li>
                <li className="ql-align-justify ql-indent-1">
                  <span
                    style={{
                    backgroundColor: "transparent"
                  }}>
                    User agrees not to cause, or aid in, the disruption, destruction, manipulation,
                    removal, disabling, or impairment of any portion of the Platform, including the
                    de-indexing or de-caching of any portion of the Platform from a third party’s
                    website, such as by requesting its removal from a search engine.
                  </span>
                </li>
                <li>
                  <span
                    style={{
                    backgroundColor: "transparent"
                  }}>
                    User agrees not to perpetuate offensive User Content (as defined below)
                    including but not limited to comments or interactions related to gender, gender
                    identity and expression, age, sexual orientation, disability, physical
                    appearance, race, ethnicity, hate speech, or religious beliefs;
                  </span>
                </li>
                <li>
                  <span
                    style={{
                    backgroundColor: "transparent"
                  }}>
                    User agrees not to promote any activity that is illegal, promotes violence,
                    misleading, unlawful, defamatory, obscene, invasive, threatening, harassing, or
                    overtly controversial or political materials;
                  </span>
                </li>
                <li>
                  <span
                    style={{
                    backgroundColor: "transparent"
                  }}>
                    User agrees not to do anything that threatens, exploits or otherwise harms
                    children or third parties;
                  </span>
                </li>
                <li>
                  <span
                    style={{
                    backgroundColor: "transparent"
                  }}>
                    User agrees not to do anything that is inaccurate, fraudulent, misleading, or
                    otherwise untruthful;
                  </span>
                </li>
                <li>
                  <span
                    style={{
                    backgroundColor: "transparent"
                  }}>
                    User agrees not to deliberately intimidate, defame,&nbsp;bully, harass or stalk
                    other users;
                  </span>
                </li>
                <li>
                  <span
                    style={{
                    backgroundColor: "transparent"
                  }}>
                    User agrees not to promote any User Content or activity that is harmful,
                    obscene, or indecent including but not limited to nudity, violence, gore,
                    pornography, or sexually explicit or indecent;
                  </span>
                </li>
                <li>
                  <span
                    style={{
                    backgroundColor: "transparent"
                  }}>
                    User agrees not to violate any third party intellectual property rights;
                  </span>
                </li>
                <li>
                  <span
                    style={{
                    backgroundColor: "transparent"
                  }}>
                    User agrees not to violate any user or third party privacy rights or rights to
                    confidentiality; and
                  </span>
                </li>
                <li>
                  <span
                    style={{
                    backgroundColor: "transparent"
                  }}>
                    User agrees not to post any User Content that would be considered spam,
                    unlicensed advice, or is unsolicited marketing.
                  </span>
                </li>
              </ul>
              <p>
                <span
                  style={{
                  backgroundColor: "transparent"
                }}>
                  If User is discovered to be undertaking any of the aforementioned actions, then
                  User’s privileges to use Maxa’s Platform may at Maxa’s discretion be terminated
                  or suspended.&nbsp;Additionally, if Maxa believes that User’s actions may harm
                  Maxa, a user, or a third party Maxa may suspend or terminate User’s use of the
                  Platform.&nbsp;Generally, Maxa will provide an explanation for any suspension or
                  termination of User’s use of any of the Platform, but Maxa reserves the right to
                  suspend or terminate any account at any time without notice or explanation.
                </span>
              </p>
              <p>
                <br/>
              </p>
              <p>
                <strong
                  style={{
                  backgroundColor: "transparent"
                }}>
                  8) User Content
                </strong>
              </p>
              <p>
                <span
                  style={{
                  backgroundColor: "transparent"
                }}>
                  User’s ability to submit or transmit any information through the Platform,
                  including but not limited to data, written content, images, text, audiovisual
                  recordings, multimedia files, or any other information will be referred to as
                  “User Content” throughout this Agreement. Please be aware that Maxa is not
                  required to host, display, migrate, or distribute any of User’s User Content and
                  Maxa may refuse to accept or transmit any User Content.&nbsp;User agrees that
                  User is solely responsible for any User Content submitted and User releases Maxa
                  from any liability associated with any User Content submitted. Maxa takes no
                  responsibility for any User Content submitted to the Platform and makes no
                  endorsements related to any User Content whether express or implied. Any User
                  Content found to be in violation of this Agreement or that Maxa determines to be
                  harmful to the Platform may be modified, edited, or removed at Maxa’s
                  discretion.&nbsp;
                </span>
              </p>
              <p>
                <span
                  style={{
                  backgroundColor: "transparent"
                }}>
                  When submitting any User Content to Maxa’s Platform User represents and warrants
                  that User owns all rights to the User Content, User has paid any fees to use or
                  license the User Content, or, otherwise, User has the permission and right to
                  use any User Content. Furthermore, User represents and warrants that all User
                  Content is legal and the User Content does not interfere with any third party
                  rights or obligations.
                </span>
              </p>
              <p>
                <span
                  style={{
                  backgroundColor: "transparent"
                }}>
                  When User submits any User Content to Maxa, User grants Maxa, its partners,
                  affiliates, users, representatives and assigns a non-exclusive, unlimited,
                  fully-paid, royalty-free, irrevocable, world-wide, universal, transferable,
                  assignable license to display, distribute, store, broadcast, transmit,
                  reproduce, modify, prepare derivative works, or use and reuse all or part of
                  User’s User Content for any purpose deemed by Maxa.&nbsp;Additionally, User
                  grants to Maxa a worldwide, perpetual, irrevocable, royalty-free license to use
                  and incorporate into the Platform any suggestion, enhancement request,
                  recommendation, correction or other feedback provided by User relating to the
                  operation of Maxa’s Platform.
                </span>{" "}
                Maxa reserves the right to remove, delete, modify, screen, edit, or refuse any
                User Content for any reason or no reason, and with or without notice to User.
                Where any User Content is submitted Maxa shall store such User Content in a
                secure and confidential manner that is compliant with Maxa’s internal storage
                policies.
              </p>
              <p>
                <br/>
              </p>
              <p>
                <strong
                  style={{
                  backgroundColor: "transparent"
                }}>
                  9)&nbsp;Marketing and Publicity
                </strong>
              </p>
              <p>
                User agrees that the license granted{" "}
                <span
                  style={{
                  backgroundColor: "rgb(178, 178, 0)"
                }}>
                  within Section 8
                </span>{" "}
                of this Agreement allows Maxa to advertise or use for its business purposes any
                User Content submitted by User or a third party in connection with the Services
                or the Platform.&nbsp;Further, User grants Maxa the right to use User’s name,
                image, voice, persona, photo, performance, likeness, personal information,
                company name, and/or logo without any further compensation in conjunction with
                the User Content submitted.&nbsp;Where requested, User agrees to reasonably
                cooperate in executing any publicity releases related to Maxa’s use of any
                associated User Content.
              </p>
              <p>
                <br/>
              </p>
              <p>
                <strong
                  style={{
                  backgroundColor: "transparent"
                }}>
                  10) Platform Availability
                </strong>
              </p>
              <p>
                <span
                  style={{
                  backgroundColor: "transparent"
                }}>
                  Although Maxa tries to provide continuous availability to User, Maxa does not
                  guarantee that the Platform will always be available, work, or be accessible at
                  any particular time.&nbsp;Specifically, Maxa does not guarantee any uptime or
                  specific availability of the Platform.&nbsp;User agrees and acknowledges that
                  User’s uses or remote access to the Platform may not always be either 100%
                  reliable or available.&nbsp;Only Users who are eligible to use the Platform may
                  do so and Maxa may refuse service or terminate User’s access at any
                  time.&nbsp;Maxa cannot guarantee that anything found on the Platform will work
                  to the functionality desired by User or give User any desired
                  results.&nbsp;&nbsp;
                </span>
              </p>
              <p>
                <br/>
              </p>
              <p>
                <strong
                  style={{
                  backgroundColor: "transparent"
                }}>
                  11) Modification of Platform&nbsp;
                </strong>
              </p>
              <p>
                <span
                  style={{
                  backgroundColor: "transparent"
                }}>
                  Maxa reserves the right to alter, modify, update, or remove the Platform or any
                  portions thereof, at any time at Maxa’s discretion.&nbsp;Maxa may conduct such
                  modifications to Maxa’s Platform for security reasons, intellectual property,
                  legal reasons, or various other reasons at Maxa’s discretion, and Maxa is not
                  required to explain such modifications or provide User access to previous
                  versions of Maxa’s Platform.&nbsp;For example, Maxa may provide updates to fix
                  security flaws, or to respond to legal demands.&nbsp;Please note that this is a
                  non-binding illustration of how Maxa might exercise Maxa’s rights under this
                  section, and nothing in this section obligates Maxa to take measures to update
                  the Platform for security, legal or other purposes.
                </span>
              </p>
              <p>
                <br/>
              </p>
              <p>
                <strong
                  style={{
                  backgroundColor: "transparent"
                }}>
                  12) Intellectual Property
                </strong>
              </p>
              <p>
                <span
                  style={{
                  backgroundColor: "transparent"
                }}>
                  The name “Maxa”, the Maxa Platform along with the design of the Maxa Platform
                  and any text, writings, images, templates, scripts, graphics, audiovisual
                  recordings, multimedia, interactive features and any trademarks or logos
                  contained therein ("Marks"), are owned by or licensed to Maxa, subject to
                  copyright and other intellectual property rights under US and foreign laws and
                  international conventions.&nbsp;Maxa reserves all rights not expressly granted
                  in and to the Platform. User agree to not engage in the use, copying, or
                  distribution of anything contained within the Platform unless Maxa has given
                  express written permission.
                </span>
              </p>
              <p>
                <br/>
              </p>
              <p>
                <strong
                  style={{
                  backgroundColor: "transparent"
                }}>
                  13) Idea Submission
                </strong>
              </p>
              <p>
                <span
                  style={{
                  backgroundColor: "transparent"
                }}>
                  Maxa values User feedback and where applicable User may submit ideas, content,
                  artwork, suggestions, or other works (“Submissions”) to Maxa. Where User submits
                  any Submission, User agrees that: (1) User Submissions and their contents will
                  automatically become the property of Maxa, without any compensation to User; (2)
                  where such a grant in sub-section (1) is not possible, User Submission shall be
                  subject to the User Content license grant as stated within this Agreement; (3)
                  Maxa may use or redistribute the Submissions and their contents for any purpose
                  and in any way; (4) there is no obligation for Maxa to review the Submission;
                  and (5) there is no obligation to keep any Submissions confidential. The sole
                  purpose of this policy is to avoid potential misunderstandings or disputes when
                  Maxa’s products might seem similar to ideas User submitted to Maxa.
                </span>
              </p>
              <p>
                <br/>
              </p>
              <p>
                <strong
                  style={{
                  backgroundColor: "transparent"
                }}>
                  14) Disclaimer
                </strong>
              </p>
              <p>
                <span
                  style={{
                  backgroundColor: "transparent"
                }}>
                  MAXA PROVIDES THE SERVICES, THE PLATFORM, AND MAXA INTELLECTUAL PROPERTY “AS IS”
                  AND “AS AVAILABLE”, WITHOUT ANY EXPRESS, IMPLIED, OR STATUTORY WARRANTIES OF
                  TITLE, MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NONINFRINGEMENT, OR
                  ANY OTHER TYPE OF WARRANTY OR GUARANTEE.&nbsp;NO DATA, DOCUMENTATION OR ANY
                  OTHER INFORMATION PROVIDED BY MAXA OR OBTAINED BY USER FROM OR THROUGH THE
                  SERVICES –WHETHER ORAL OR WRITTEN – CREATES OR IMPLIES ANY WARRANTY FROM MAXA TO
                  USER.
                </span>
                <strong
                  style={{
                  backgroundColor: "transparent"
                }}></strong>
                <span
                  style={{
                  backgroundColor: "transparent"
                }}>
                  &nbsp;MAXA DISCLAIMS ANY KNOWLEDGE OF, AND DOES NOT GUARANTEE: (a) THE ACCURACY,
                  RELIABILITY, OR CORRECTNESS OF ANY DATA PROVIDED THROUGH THE SERVICES; (b) THAT
                  THE SERVICES WILL MEET USER’S SPECIFIC BUSINESS NEEDS OR REQUIREMENTS; (c) THAT
                  THE SERVICES WILL BE AVAILABLE AT ANY PARTICULAR TIME OR LOCATION, OR WILL
                  FUNCTION IN AN UNINTERRUPTED MANNER OR BE SECURE; (d) THAT MAXA WILL CORRECT ANY
                  DEFECTS OR ERRORS IN THE SERVICE,&nbsp;DOCUMENTATION, OR DATA; OR (e) THAT THE
                  SERVICES ARE FREE OF VIRUSES OR OTHER HARMFUL CODE. USE OF THE SERVICES IS DONE
                  AT USER’S OWN RISK – USER IS SOLELY RESPONSIBLE FOR ANY DAMAGE TO USER’S
                  PROPERTY, LOSS OF DATA, OR ANY OTHER LOSS THAT RESULTS FROM SUCH USE, ACCESS, OR
                  DOWNLOAD OF THE SERVICES. USER UNDERSTANDS THAT MAXA MAKES NO GUARANTEES TO USER
                  REGARDING ANY SERVICES
                </span>
                <strong
                  style={{
                  backgroundColor: "transparent"
                }}>.
                </strong>
                <span
                  style={{
                  backgroundColor: "transparent"
                }}>
                  MAXA DISCLAIMS ANY AND ALL LIABILITY FOR THE ACTS, OMISSIONS AND CONDUCT OF ANY
                  THIRD PARTIES IN CONNECTION WITH OR RELATED TO USER’S USE OF THE PLATFORM AND/OR
                  ANY SERVICES.&nbsp;&nbsp;MAXA DOES NOT CONTROL ANY THIRD PARTY LINKS, SERVICES,
                  GOODS, RESOURCES AND INFORMATION ON THE PLATFORM.&nbsp;TO THE EXTENT PERMITTED
                  BY APPLICABLE LAW, MAXA MAKES NO WARRANTIES&nbsp;REGARDING THIRD PARTY SERVICES,
                  GOODS, RESOURCES AND INFORMATION INCLUDING, WITHOUT LIMITATION, WARRANTIES OF
                  FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY AND NON-INFRINGEMENT AND WILL
                  NOT BE LIABLE FOR USER’S USE OF OR RELIANCE ON SUCH THIRD PARTY SERVICES, GOODS,
                  RESOURCES OR INFORMATION.
                </span>
              </p>
              <p>
                <span
                  style={{
                  backgroundColor: "transparent"
                }}>
                  NOTHING IN THIS AGREEMENT OPERATES TO EXCLUDE, RESTRICT OR MODIFY THE
                  APPLICATION OF ANY IMPLIED CONDITION, WARRANTY OR GUARANTEE, OR THE EXERCISE OF
                  ANY RIGHT OR REMEDY, OR THE IMPOSITION OF ANY LIABILITY UNDER LAW WHERE TO DO SO
                  WOULD: (A) CONTRAVENE THAT LAW; OR (B) CAUSE ANY TERM OF THIS AGREEMENT TO BE
                  VOID.
                </span>
              </p>
              <p>
                <br/>
              </p>
              <p>
                <strong>15) No Endorsement of Third Party Services</strong>
              </p>
              <p>
                Aside from the Platform and Services, Maxa may make available other services
                through the Platform which may include the services subject to the Maxa SaaS
                Agreement, which is incorporated by reference into this Agreement if applicable
                to User. USER (WHETHER AS AN OWNER, END USER, OR OTHERWISE) ACKNOWLEDGES THAT
                THE PLATFORM MAY ALLOW USERS TO INTERACT WITH OR PROVIDE&nbsp;THIRD PARTY
                SERVICES DIRECTLY FROM ONE USER TO ANOTHER USERS (“THIRD PARTY
                SERVICES”).&nbsp;USER AGREES THAT MAXA DOES NOT PROVIDE ANY THIRD PARTY SERVICES
                AND DOES NOT RECOMMEND OR ENDORSE ANY USER OFFERING ANY THIRD PARTY
                SERVICES.&nbsp;ALL USERS PROVIDING THIRD PARTY SERVICES ARE INDEPENDENT
                CONTRACTORS WHO ARE NOT EMPLOYED BY MAXA OR MAXA’S AFFILIATES.&nbsp;MAXA HAS NO
                RESPONSIBILITY OR LIABILITY FOR ANY THIRD PARTY SERVICES PROVIDED TO ANY USERS,
                INCLUDING, BUT NOT LIMITED TO, A WARRANTY OR CONDITION OF GOOD AND WORKMANLIKE
                SERVICES, WARRANTY OF FITNESS FOR A PARTICULAR PURPOSE OR COMPLIANCE WITH ANY
                LAW, REGULATION, OR CODE. MAXA IS NOT AFFILIATED WITH, ENDORSED OR SPONSORED BY
                ANY USER AND. BY USING THE MAXA PLATFORM OR SERVICES, THE USER AGREES TO HOLD
                MAXA FREE FROM ANY RESPONSIBILITY FOR ANY LIABILITY OR DAMAGE THAT MIGHT ARISE
                OUT OF THE THIRD PARTY SERVICES.&nbsp;MAXA IS NOT RESPONSIBLE FOR THE CONDUCT,
                WHETHER ONLINE OR OFFLINE, OF ANY USER AND WILL NOT BE LIABLE FOR ANY CLAIM,
                INJURY OR DAMAGE ARISING IN CONNECTION WITH OR USE OF ANY THIRD PARTY SERVICES.
              </p>
              <p>
                <span
                  style={{
                  backgroundColor: "transparent"
                }}>
                  THE QUALITY OF ANY THIRD PARTY SERVICES IS ENTIRELY THE RESPONSIBILITY OF THE
                  USER WHO ULTIMATELY PROVIDES SUCH THIRD PARTY SERVICES. USER AGREES THAT BY
                  USING THE MAXA PLATFORM OR SERVICES, USER MAY BE EXPOSED TO THIRD PARTY SERVICES
                  THAT ARE POTENTIALLY DANGEROUS, OFFENSIVE, HARMFUL TO MINORS, UNSAFE OR
                  OTHERWISE OBJECTIONABLE, AND THAT USE OF SUCH THIRD PARTY SERVICES IS AT USER’S
                  OWN RISK
                </span>
              </p>
              <p>
                <br/>
              </p>
              <p>
                <strong
                  style={{
                  backgroundColor: "transparent"
                }}>
                  16) Limitation of Liability
                </strong>
              </p>
              <p>
                <span
                  style={{
                  backgroundColor: "transparent"
                }}>
                  TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL MAXA, ITS
                  PROCESSORS, SUPPLIERS, LICENSORS, VENDORS, OR ANY AFFILIATES (AND EACH OF THEIR
                  RESPECTIVE AFFILIATES, AGENTS, DIRECTORS AND EMPLOYEES) BE LIABLE FOR ANY
                  INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR EXEMPLARY DAMAGES,
                  INCLUDING WITHOUT LIMITATION DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE, DATA OR
                  OTHER INTANGIBLE LOSSES, THAT RESULT FROM THE USE OF, INABILITY TO USE, OR
                  UNAVAILABILITY OF THE SERVICE OR PLATFORM. IN NO EVENT WILL THE TOTAL AGGREGATE
                  LIABILITY OF MAXA, NOR ANY OF ITS EMPLOYEES, REPRESENTATIVES, AGENTS,
                  VOLUNTEERS, ATTORNEYS, MANAGERS, LICENSORS, AFFILIATES, BUSINESS PARTNERS,
                  SUPPLIERS, CONTRACTORS, R VENDORS, ARISING FROM, RELATING TO, OR CONNECTED WITH
                  THE SERVICES, THIS AGREEMENT, OR USER’S USE OF THE PLATFORM EXCEED $10,000.00
                  USD OR THE FEES PAID TO MAXA&nbsp;BY USER IN THE SIX MONTHS PRECEDING THE EVENT
                  GIVING RISE TO THE CLAIM, WHICHEVER IS GREATER.
                </span>
              </p>
              <p>
                <span
                  style={{
                  backgroundColor: "transparent"
                }}>
                  THIS LIMITATION OF LIABILITY SECTION APPLIES WHETHER THE ALLEGED LIABILITY IS
                  BASED ON CONTRACT, TORT, NEGLIGENCE, STRICT LIABILITY, OR ANY OTHER BASIS, EVEN
                  IF MAXA HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. THE FOREGOING
                  LIMITATION OF LIABILITY SHALL APPLY TO THE FULLEST EXTENT PERMITTED BY LAW IN
                  THE APPLICABLE JURISDICTION.
                </span>
              </p>
              <p>
                <br/>
              </p>
              <p>
                <strong
                  style={{
                  backgroundColor: "transparent"
                }}>17) Release</strong>
              </p>
              <p>
                <span
                  style={{
                  backgroundColor: "transparent"
                }}>
                  If User has a dispute arising from, related to, or connected with User’s use of
                  the Services or Platform, or the information, content, documents materials or
                  products made available through the Services or Platform, User hereby releases
                  Maxa and its subsidiaries, affiliates, officers, directors, shareholders,
                  employees, representatives, agents, volunteers, attorneys, managers, licensors,
                  business partners and each of their respective successors and assigns from all
                  claims, demands, causes of action, liabilities, legal fees and costs, and
                  damages (actual and consequential) of every kind and nature, known and unknown,
                  suspected or unsuspected, arising out of or in any way connected with such
                  disputes.&nbsp;IF USER IS A CALIFORNIA RESIDENT, USER WAIVES CALIFORNIA CIVIL
                  CODE SECTION 1542, WHICH SAYS: “A GENERAL RELEASE DOES NOT EXTEND TO CLAIMS
                  WHICH THE CREDITOR DOES NOT KNOW OR SUSPECT TO EXIST IN HIS OR HER FAVOR AT THE
                  TIME OF EXECUTING THE RELEASE, WHICH IF KNOWN BY HIM OR HER MUST HAVE MATERIALLY
                  AFFECTED HIS OR HER SETTLEMENT WITH THE DEBTOR.”
                </span>
              </p>
              <p>
                <br/>
              </p>
              <p>
                <strong
                  style={{
                  backgroundColor: "transparent"
                }}>
                  18) Indemnity
                </strong>
              </p>
              <p>
                <span
                  style={{
                  backgroundColor: "transparent"
                }}>
                  User will indemnify, defend and hold Maxa and Maxa’s vendors, contractors,
                  affiliates, agents, directors, officers, employees, and partners harmless (and
                  with respect to Maxa’s affiliates, their respective employees, directors,
                  agents, affiliates and representatives) from and against any and all claims,
                  costs, losses, damages, judgments, tax assessments, penalties, interest, and
                  expenses (including without limitation reasonable attorneys' fees) arising out
                  of any claim, action, audit, investigation, inquiry, or other proceeding
                  instituted by a third party person or entity that arises out of or relates to:
                  (a) any actual or alleged breach of&nbsp;this Agreement or any associated Maxa
                  policies, including without limitation any violation of Maxa’s policies; (b)
                  User’s wrongful or improper use of the Service or Platform; (c) any transaction
                  User may partake in using the Services or Platform; (d) any liability Maxa
                  incurs that results from User’s use of the Services or Platform, (e) User’s
                  violation of any third-party right, including without limitation any right of
                  privacy, publicity rights or intellectual property rights; (f) User’s violation
                  of applicable Laws (defined below);&nbsp;(g) User’s interactions with any third
                  party, any act or omission by another user, or User’s use of any Third Party
                  Services; and (h) any Permitted User or other party's access and/or use of the
                  Services or Platform with User’s unique username, password or other appropriate
                  security code.&nbsp;Maxa reserves the right to assume the exclusive defense and
                  control of any matter subject to indemnification by User.
                </span>
              </p>
              <p>
                <br/>
              </p>
              <p>
                <strong
                  style={{
                  backgroundColor: "transparent"
                }}>
                  19) Copyrights
                </strong>
              </p>
              <p>
                <span
                  style={{
                  backgroundColor: "transparent"
                }}>
                  Maxa takes copyright infringement very seriously.&nbsp;If User believes that any
                  content owned by User has been infringed upon please send Maxa a message which
                  contains:
                </span>
              </p>
              <ul>
                <li>
                  <span
                    style={{
                    backgroundColor: "transparent"
                  }}>
                    User’s full legal name.
                  </span>
                </li>
                <li>
                  <span
                    style={{
                    backgroundColor: "transparent"
                  }}>
                    The name of the party whose copyright has been infringed, if different from
                    User’s name.
                  </span>
                </li>
                <li>
                  <span
                    style={{
                    backgroundColor: "transparent"
                  }}>
                    The name and description of the work that is being infringed.
                  </span>
                </li>
                <li>
                  <span
                    style={{
                    backgroundColor: "transparent"
                  }}>
                    The location on Maxa’s Platform of the infringing copy.
                  </span>
                </li>
                <li>
                  <span
                    style={{
                    backgroundColor: "transparent"
                  }}>
                    A statement that User has a good faith belief that use of the copyrighted work
                    described above is not authorized by the copyright owner (or by a third party
                    who is legally entitled to do so on behalf of the copyright owner) and is not
                    otherwise permitted by law.
                  </span>
                </li>
                <li>
                  <span
                    style={{
                    backgroundColor: "transparent"
                  }}>
                    A statement that User swears, under penalty of perjury, that the information
                    contained in this notification is accurate and that User is the copyright owner
                    or has an exclusive right in law to bring infringement proceedings with respect
                    to its use.
                  </span>
                </li>
              </ul>
              <p>
                <span
                  style={{
                  backgroundColor: "transparent"
                }}>
                  User must sign this notification and send it to Maxa’s Copyright Agent:
                  Copyright Agent of Maxa, support@maxadesigns.com.
                </span>
              </p>
              <p>
                <u style={{
                  backgroundColor: "transparent"
                }}>Counter Notice</u>
              </p>
              <p>
                <span
                  style={{
                  backgroundColor: "transparent"
                }}>
                  In the event that User receives a notification from Maxa stating content posted
                  by User has been subject to a copyright takedown notice, User may respond by
                  filing a counter-notice pursuant to the DMCA.&nbsp;User’s counter-notice must
                  contain the following:
                </span>
              </p>
              <ul>
                <li>
                  <span
                    style={{
                    backgroundColor: "transparent"
                  }}>
                    User’s full legal name, address, email and physical or electronic signature.
                  </span>
                </li>
                <li>
                  <span
                    style={{
                    backgroundColor: "transparent"
                  }}>
                    The notification reference number (if applicable).
                  </span>
                </li>
                <li>
                  <span
                    style={{
                    backgroundColor: "transparent"
                  }}>
                    Identification of the material and its location before it was removed.
                  </span>
                </li>
                <li>
                  <span
                    style={{
                    backgroundColor: "transparent"
                  }}>
                    A statement under penalty of perjury that the material was removed by mistake or
                    misidentification.
                  </span>
                </li>
                <li>
                  <span
                    style={{
                    backgroundColor: "transparent"
                  }}>
                    User’s consent to the jurisdiction of a federal court in the district where User
                    lives (if User resides in the U.S.), or User’s consent to the jurisdiction of a
                    federal court in the nearest district where User is located (if User is not in
                    the US).
                  </span>
                </li>
                <li>
                  <span
                    style={{
                    backgroundColor: "transparent"
                  }}>
                    User’s consent to accept service of process from the party who submitted the
                    takedown notice.
                  </span>
                </li>
              </ul>
              <p>
                <span
                  style={{
                  backgroundColor: "transparent"
                }}>
                  Please be aware that Maxa may not take any action regarding User’s
                  counter-notice unless User’s notification strictly complies with the foregoing
                  requirements.&nbsp;User must send this counter-notice in accordance with the
                  takedown notice instructions above.
                </span>
              </p>
              <p>
                <br/>
              </p>
              <p>
                <strong
                  style={{
                  backgroundColor: "transparent"
                }}>
                  20) Choice of Law
                </strong>
              </p>
              <p>
                <span
                  style={{
                  backgroundColor: "transparent"
                }}>
                  This Agreement and any Dispute (as defined below) will be governed by California
                  law and/or applicable federal law (including the Federal Arbitration Act) as
                  applied to agreements entered into and to be performed entirely within
                  California, without regard to its choice of law or conflicts of law principles
                  that would require application of law of a different jurisdiction.
                </span>
              </p>
              <p>
                <br/>
              </p>
              <p>
                <strong
                  style={{
                  backgroundColor: "transparent"
                }}>21) Disputes</strong>
              </p>
              <p>
                <strong
                  style={{
                  backgroundColor: "transparent"
                }}>
                  a. Informal Negotiations.
                </strong>
                <span
                  style={{
                  backgroundColor: "transparent"
                }}>
                  {" "}
                  If a dispute of any kind arises, Maxa wants to understand and address User’s
                  concerns quickly and to User’s satisfaction. Please contact Maxa support at
                  support@maxadesigns.com with any dispute. If Maxa cannot resolve User’s
                  concerns, Maxa agrees to an informal dispute resolution process requiring an
                  attempt to negotiate any dispute (except those “Disputes,” as defined below and
                  expressly excluded below) informally for at least thirty (30) days before
                  initiating any arbitration or court proceeding.&nbsp;&nbsp;
                </span>
              </p>
              <p>
                <strong
                  style={{
                  backgroundColor: "transparent"
                }}>
                  b. Binding Arbitration
                </strong>
                <span
                  style={{
                  backgroundColor: "transparent"
                }}>
                  . Notwithstanding any other provision in this Agreement, and except as otherwise
                  set forth in this section, User and Maxa agrees to arbitrate all “Disputes,”
                  defined as any claim, controversy or dispute (whether involving contract, tort,
                  equitable, statutory or any other legal theory) between User and Maxa, including
                  but not limited to any claims relating in any way to this Agreement (including
                  its breach, termination and interpretation), any other aspect of User’s
                  relationship with Maxa, Maxa’s advertising, and any use of Maxa’s Platform or
                  Services. “Disputes” also include any claims that arose before this Agreement
                  and that may arise after termination of this Agreement. Notwithstanding the
                  foregoing, User or Maxa may choose to pursue a claim in court and not by
                  arbitration if User fails to timely pay any amounts due or satisfy any payment
                  obligation owed to Maxa.&nbsp;Maxa may assign User’s account for collection to a
                  collection agency, and the collection agency may pursue in any court of
                  competent jurisdiction any claim that is strictly limited to the collection of
                  past due amounts and any interest or cost of collection permitted by law or this
                  Agreement.
                </span>
              </p>
              <p>
                <span
                  style={{
                  backgroundColor: "transparent"
                }}>
                  ANY ARBITRATION UNDER THIS AGREEMENT WILL BE ONLY BE ON AN INDIVIDUAL BASIS;
                  CLASS ARBITRATIONS, CLASS ACTIONS, PRIVATE ATTORNEY GENERAL ACTIONS, AND
                  CONSOLIDATION WITH OTHER ARBITRATIONS ARE NOT PERMITTED, AND USER IS WAIVING
                  USER’S RIGHTS TO HAVE USER’S CASE DECIDED BY A JURY AND TO PARTICIPATE IN A
                  CLASS ACTION AGAINST MAXA. If any provision of this arbitration agreement is
                  found unenforceable, the unenforceable provision shall be severed, and the
                  remaining arbitration terms shall be enforced (but in no case shall there be a
                  class arbitration). All Disputes shall be resolved finally and exclusively by
                  binding individual arbitration with a single arbitrator administered by the
                  American Arbitration Association (www.adr.org) (“AAA”) according to this
                  provision and the applicable arbitration rules. To initiate an arbitration
                  proceeding, an arbitration claim must be submitted by the claimant (the
                  “Claimant”) to the AAA, and a written Demand for Arbitration must be provided to
                  the other party (the “Opposing Party”), pursuant to the AAA Rules.&nbsp;A form
                  for initiating arbitration proceedings is available on the AAA's website at
                  www.adr.org. The Federal Arbitration Act, 9 U.S.C. §§ 1-16 (“FAA”), fully
                  applies. Arbitration hearings will be held in Los Angeles, California or any
                  other location that is mutually agreed upon by User and Maxa. User or Maxa may
                  elect to have the arbitration conducted by telephone, video conference, or based
                  solely on written submissions, which election shall be binding on User and Maxa
                  subject to the arbitrator's discretion to require an in-person hearing, if the
                  circumstances warrant. Attendance at an in-person hearing may be made by
                  telephone or video conference by User or by Maxa, unless the arbitrator requires
                  otherwise.&nbsp;
                </span>
              </p>
              <p>
                <span
                  style={{
                  backgroundColor: "transparent"
                }}>
                  A single arbitrator will be mutually selected by Maxa and User, and shall be (i)
                  a practicing attorney licensed to practice law in California or a retired judge;
                  and (ii) selected from the arbitrators on the AAA’s roster of commercial dispute
                  arbitrators who have a background in online commerce or consumer law (or if
                  there are no such arbitrators, then from the arbitrators on the AAA’s roster of
                  commercial dispute arbitrators) (collectively, the “Arbitrator
                  Requirements”).&nbsp;If User and Maxa cannot mutually agree upon an arbitrator
                  within ten (10) days of the Opposing Party’s receipt of the Demand for
                  Arbitration from the Claimant, then the AAA shall appoint a single arbitrator
                  that satisfies the Arbitrator Requirements. The arbitrator will follow the law
                  and will give effect to any applicable statutes of limitation. The prevailing
                  party shall be entitled to an award of the costs and expenses of the
                  arbitration, including reasonable attorneys’ fees and expert witness fees. The
                  award rendered by the arbitrator shall be final and binding upon User and Maxa.
                  A judgment on the award may be entered and enforced in any court of competent
                  jurisdiction.&nbsp;Maxa may, in its sole discretion, commence an action in any
                  state or federal court of competent jurisdiction within the County of Los
                  Angeles, California, for any monetary amounts that User owes to Maxa (each, an
                  “Action”).&nbsp;User hereby waives any objection to jurisdiction or venue, or
                  any defense claiming lack of jurisdiction or improper venue, in any Action
                  brought by Maxa in such courts.
                </span>
              </p>
              <p>
                <span
                  style={{
                  backgroundColor: "transparent"
                }}>
                  User and Maxa agrees and acknowledge that this Agreement evidences a transaction
                  involving interstate commerce and that the FAA shall govern the interpretation,
                  enforcement, and proceedings pursuant to the arbitration clause in this
                  Agreement. USER FURTHER ACKNOWLEDGES, UNDERSTANDS, AND AGREES THAT USER AND MAXA
                  ARE EACH WAIVING THEIR RESPECTIVE RIGHTS TO A TRIAL BY JURY AS TO DISPUTES
                  HEREUNDER AND THAT USER IS WAIVING USER’S RIGHT TO PARTICIPATE IN ANY CLASS
                  ACTION PROCEEDING ARISING FROM THIS AGREEMENT.
                </span>
              </p>
              <p>
                <span
                  style={{
                  backgroundColor: "transparent"
                }}>
                  The arbitration provisions shall not apply to (i) any claim related to actual or
                  threatened infringement, misappropriation or violation of a party’s copyrights,
                  trademarks, trade secrets, patents, or other intellectual property rights; (ii)
                  any claim seeking emergency injunctive relief based on exigent circumstances
                  (including but not limited to imminent danger or commission of a crime, hacking,
                  or cyber-attack).
                </span>
              </p>
              <p>
                <br/>
              </p>
              <p>
                <strong
                  style={{
                  backgroundColor: "transparent"
                }}>
                  22) Severability
                </strong>
              </p>
              <p>
                <span
                  style={{
                  backgroundColor: "transparent"
                }}>
                  In the event that a provision of this Agreement is found to be unlawful,
                  conflicting with another provision of the Agreement, or otherwise unenforceable,
                  the Agreement will remain in force as though it had been entered into without
                  that unenforceable provision being included in it.
                </span>
              </p>
              <p>
                <span
                  style={{
                  backgroundColor: "transparent"
                }}>
                  If two or more provisions of this Agreement or any other agreement User may have
                  with Maxa are deemed to conflict with each other’s operation, Maxa shall have
                  the sole right to elect which provision remains in force.&nbsp;&nbsp;
                </span>
              </p>
              <p>
                <br/>
              </p>
              <p>
                <strong
                  style={{
                  backgroundColor: "transparent"
                }}>
                  23) Non-Waiver
                </strong>
              </p>
              <p>
                <span
                  style={{
                  backgroundColor: "transparent"
                }}>
                  Maxa reserves all rights permitted to Maxa under this Agreement as well as under
                  the provisions of any applicable law.&nbsp;Maxa’s non-enforcement of any
                  particular provision or provisions of this Agreement or any applicable law
                  should not be construed as a waiver of Maxa’s right to enforce that same
                  provision under the same or different circumstances at any time in the future.
                </span>
              </p>
              <p>
                <br/>
              </p>
              <p>
                <strong
                  style={{
                  backgroundColor: "transparent"
                }}>
                  24) Assignment and Survival
                </strong>
              </p>
              <p>
                <span
                  style={{
                  backgroundColor: "transparent"
                }}>
                  User may not assign User’s rights and/or obligations under this Agreement to any
                  other party without Maxa’s prior written consent.&nbsp;Maxa may assign Maxa’s
                  rights and/or obligations under this Agreement to any other party at Maxa
                  discretion.&nbsp;All portions of this Agreement that would reasonably be
                  believed to survive termination shall survive and remain in full force upon
                  termination, including but not limited to the Limitation of Liabilities,
                  Representation and Warranties, Disclaimers, User Content,&nbsp;Choice of Law,
                  Indemnification, Access, all End User obligations, and Arbitration sections.
                </span>
              </p>
              <p>
                <br/>
              </p>
              <p>
                <strong
                  style={{
                  backgroundColor: "transparent"
                }}>
                  25) Termination
                </strong>
              </p>
              <p>
                <span
                  style={{
                  backgroundColor: "transparent"
                }}>
                  Maxa may terminate User’s access to the Platform or Services if Maxa determines
                  the following: (1) User has violated any applicable Laws while using the
                  Platform or Services; (2) User has violated any portion of this Agreement or any
                  of the Services or Platform policies; or (3) where Maxa believes User’s current
                  or future actions may legally harm Maxa, Maxa’s business interests or a relevant
                  third party, at Maxa’s discretion.&nbsp;In the event of termination, Maxa will
                  strive to provide User with a timely explanation; however, Maxa is not required
                  to do so.&nbsp;&nbsp;
                </span>
              </p>
              <p>
                <span
                  style={{
                  backgroundColor: "transparent"
                }}>
                  User may terminate this Agreement by closing User’s Account at any time upon
                  thirty (30) days’ notice to Maxa. Closing User’s account does not relieve User
                  from any obligations User may have to Maxa or a third party pursuant to this
                  Agreement.
                </span>
              </p>
              <p>
                <br/>
              </p>
              <p>
                <strong
                  style={{
                  backgroundColor: "transparent"
                }}>
                  26) Entire Agreement
                </strong>
              </p>
              <p>
                <span
                  style={{
                  backgroundColor: "transparent"
                }}>
                  This Agreement along with the Privacy Policy and any other supporting agreements
                  provided by Maxa constitute the complete and exclusive understanding and
                  agreement between the parties regarding the subject matter herein and supersede
                  all prior or contemporaneous agreements or understandings written or oral,
                  relating to its subject matter.&nbsp;Where User has entered into this Agreement
                  and the Maxa SaaS Agreement, where the two agreements directly conflict the Maxa
                  SaaS Agreement shall supersede and control.&nbsp;Any waiver, modification or
                  amendment of any provision of this Agreement will be effective only if in
                  writing and signed by a duly authorized representative of each party.&nbsp;Where
                  this Agreement conflicts with Maxa’s Privacy Policy or any other documentation
                  listed on Maxa’s Platform this Agreement shall supersede and
                  control.&nbsp;&nbsp;
                </span>
              </p>
              <p>
                <br/>
              </p>
              <p>
                <strong
                  style={{
                  backgroundColor: "transparent"
                }}>
                  27) Amendments
                </strong>
              </p>
              <p>
                <span
                  style={{
                  backgroundColor: "transparent"
                }}>
                  Maxa may amend this Agreement from time to time.&nbsp;When Maxa amends this
                  Agreement, Maxa will update this page and indicate the date that it was last
                  modified or Maxa may email User a notification of said update or
                  change.&nbsp;User may refuse to agree to the amendments, but if User decides to
                  not accept or consent to the amendments, then User must immediately cease using
                  Maxa’s Platform or Services.&nbsp;
                </span>
              </p>
              <p>
                <br/>
              </p>
              <p>
                <strong
                  style={{
                  backgroundColor: "transparent"
                }}>
                  28) Force Majeure
                </strong>
              </p>
              <p>
                <span
                  style={{
                  backgroundColor: "transparent"
                }}>
                  Maxa will not be liable or responsible for any delays in the Services, for
                  failing to provide its Services or to operate the Platform or provide the
                  Services as a result of any event beyond its reasonable control, including,
                  without limitation, adverse weather conditions, internet outage or interruption
                  of service, power or telecommunications outage, fire, flood, civil disobedience,
                  government-ordered business closures, labor disruptions, strikes, lockouts,
                  freight embargoes, terrorism, natural disaster, war, pandemics, or acts of God.
                </span>
              </p>
              <p>
                <br/>
              </p>
              <p>
                <strong
                  style={{
                  backgroundColor: "transparent"
                }}>
                  29) Electronic Communications
                </strong>
              </p>
              <p>
                <span
                  style={{
                  backgroundColor: "transparent"
                }}>
                  The communications between User and Maxa requires electronic means, whether User
                  visits the Platform or sends Maxa e-mails, or whether Maxa posts notices on the
                  Platform or communications with User via mobile notifications or
                  e-mail.&nbsp;For contractual purposes, User (1) consents to receive
                  communications from Maxa in an electronic form; and (2) agrees that all terms,
                  conditions, agreements, notices, disclosures, and other communications that Maxa
                  provides to User electronically satisfies any legal requirement that such
                  communications would satisfy if it were to be in writing.&nbsp;The foregoing
                  does not affect User’s statutory rights.
                </span>
              </p>
              <p>
                <br/>
              </p>
              <p>
                <strong
                  style={{
                  backgroundColor: "transparent"
                }}>
                  30) Export Controls
                </strong>
              </p>
              <p>
                <span
                  style={{
                  backgroundColor: "transparent"
                }}>
                  The Platform and the underlying information and technology may not be
                  downloaded, accessed, or otherwise exported or re-exported (1) into (or to a
                  national or resident of) any country to which the U.S. has currently embargoed
                  goods; or (2) to anyone on the U.S. Treasury Department's list of Specially
                  Designated Nationals or the U.S. Commerce Department's Table of Deny Orders. By
                  downloading or using the Platform, User agrees to the foregoing and User
                  represents and warrants that User is not located in, under the control of, or a
                  national or resident of any such country or on any such list, and that User will
                  otherwise comply with all applicable export control laws.
                </span>
              </p>
              <p>
                <br/>
              </p>
              <p>
                <strong
                  style={{
                  backgroundColor: "transparent"
                }}>
                  31) Platform Issues and Notices&nbsp;
                </strong>
              </p>
              <p>
                <span
                  style={{
                  backgroundColor: "transparent"
                }}>
                  Where User has any questions, issues, or if User is having trouble accessing or
                  using the Platform or Services, please contact Maxa at support@maxadesigns.com
                  or the address below.
                </span>
              </p>
              <p>
                <span
                  style={{
                  backgroundColor: "transparent"
                }}>
                  Where any notices are required to be delivered, User’s address for such notices
                  is User’s billing address, with an email copy to the email address that User has
                  provided to Maxa. Maxa’s address for such notices is:
                </span>
              </p>
              <p>Maxa Designs, Inc.</p>
              <p>310 14th Street</p>
              <p>Huntington Beach, CA 92648</p>
              <p>Email: support@maxadesigns.com</p>
              <p>
                <br/>
              </p>
              <p>
                <strong
                  style={{
                  backgroundColor: "transparent"
                }}>
                  32) California Users
                </strong>
              </p>
              <p>
                <span
                  style={{
                  backgroundColor: "transparent"
                }}>
                  Pursuant to California Civil Code Section 1789.3, any questions about pricing,
                  complaints, or inquiries about Maxa must be sent to Maxa’s agent for notice as
                  set forth above.
                </span>
              </p>
              <p>
                Lastly, if User is a California User, then User is also entitled to the
                following specific consumer rights notice:{" "}
                <span
                  style={{
                  backgroundColor: "transparent"
                }}>
                  The Complaint Assistance Unit of the Division of Consumer Services of the
                  California Department of Consumer Affairs may be contacted in writing at 1625
                  North Market Blvd., Sacramento, CA 95834, or by telephone at (916) 445-1254 or
                  (800) 952-5210.
                </span>
              </p>
              <p>
                <br/>
              </p>
              <p>
                <strong
                  style={{
                  backgroundColor: "transparent"
                }}>
                  33) Additional Terms For End Users
                </strong>
              </p>
              <p>
                <span
                  style={{
                  backgroundColor: "transparent"
                }}>
                  Where a User uses any Services or Platform, including but not limited to
                  portions of the Services or Platform subject to the Maxa SaaS Agreement, such
                  User shall be deemed an “End User”.&nbsp;End Users shall be subject to the
                  additional terms as set forth within this Agreement. As an End User, End User
                  may be able to use the Platform or Services to enter into transactions with
                  another User or End User.
                </span>
              </p>
              <p>
                <br/>
              </p>
              <p>
                <strong
                  style={{
                  backgroundColor: "transparent"
                }}>
                  34) Service Requirements; Limitations and Restrictions; Prohibited Businesses
                  and Activities
                </strong>
              </p>
              <p>
                <span
                  style={{
                  backgroundColor: "transparent"
                }}>
                  User must use the Services or Platform in a lawful manner, and must obey all
                  laws, rules, and regulations including but not limited to the US federal and
                  state laws (“Laws”) applicable to User’s use of the Services or Platform, and in
                  compliance in all respects with any additional rules of the payment processors
                  or banks that are utilized by Maxa to provide the Services or Platform. User may
                  not use the Platform or Services to enable any person (including User) to
                  benefit any activities Maxa has identified as a prohibited business or activity
                  (collectively, “Prohibited Businesses”), which include any services for the
                  benefit of a country, organization, entity, or person embargoed or blocked by
                  any government, including those on sanctions lists identified by the United
                  States Office of Foreign Asset Control (OFAC). If User is uncertain whether a
                  category of business or activity is prohibited or have questions about how these
                  restrictions apply to User, please contact Maxa.&nbsp;
                </span>
              </p>
              <p>
                <br/>
              </p>
              <p>
                <strong
                  style={{
                  backgroundColor: "transparent"
                }}>
                  35) Limitations on Maxa’s Responsibility
                </strong>
              </p>
              <p>
                <span
                  style={{
                  backgroundColor: "transparent"
                }}>
                  Neither Maxa nor any other third party makes any representations or guarantees
                  regarding Maxa’s users or End Users utilizing the Service or Platform. Use of
                  Maxa’s Platform or Service in no way represents any endorsement by Maxa, of
                  User’s, a user’s, or an End User’s existence, legitimacy, ability, policies,
                  practices, or ability to pay. Maxa does not have control of, or liability for,
                  goods or services that are paid for with or by way of use of the Services or
                  Platform.&nbsp;Although Maxa offers the Platform or Services, Maxa is not a
                  “money transmitter” as defined under
                </span>{" "}
                31 CFR 103.11(uu)(5) or any other United States federal or state law and User or
                End User shall not use Maxa or any Platform or Services offered by Maxa as a
                “money transmitter”.
              </p>
              <p>
                <br/>
              </p>
              <p>
                <strong
                  style={{
                  backgroundColor: "transparent"
                }}>
                  36) Not A Party
                </strong>
              </p>
              <p>
                <span
                  style={{
                  backgroundColor: "transparent"
                }}>
                  Maxa is not a party to any contract or agreements created between or among User
                  and another user or End User, each of whom are solely responsible for such
                  contractual relationship.&nbsp;User agrees that it is solely responsible for
                  verifying each user or End User it is interacting with, and verifying all
                  elements of any transactions initiated with such user or End User, including
                  transaction details and any errors or omissions.&nbsp;User is solely responsible
                  for any losses that it may incur for any reason including but not limited
                  to&nbsp;an inaccuracy, error, or fraud that may be incurred through the use of
                  the Services or Platform, including without limitation, User’s failure to verify
                  any transactions prior to using the Platform or Services.
                </span>
              </p>
              <p>
                <br/>
              </p>
              <p>
                <strong
                  style={{
                  backgroundColor: "transparent"
                }}>
                  37) User’s Representations and Warranties
                </strong>
              </p>
              <p>
                <span
                  style={{
                  backgroundColor: "transparent"
                }}>
                  By accepting the terms of this Agreement, User represents and warrants that: (a)
                  User is eligible to register and use the Platform or Services and has the
                  authority to execute and perform the obligations required by this Agreement; (b)
                  any information User provides Maxa about User’s business is accurate,
                  up-to-date, and complete; (c) User has a currently existing contractual
                  relationship with Maxa and the transactions undertaken are for permitted
                  products, services, or donations, and any related information accurately
                  describes the transaction contemplated; (d) User will act in good faith to
                  resolve all disputes with Maxa or any other user or End User; (e) User will
                  comply with all Laws applicable to User’s business and to the use of the
                  Platform or Services; (f) User’s employees, contractors and agents will at all
                  times act consistently with the terms of this Agreement; (g) User will not use
                  the Services or Platform for personal, or family or household purposes, for
                  peer-to-peer money transmission; (h) User has obtained all requisite
                  authorizations and approvals to consent to this Agreement; (i) User has
                  authorized Maxa to withdraw any relevant funds or Fees, subject to Maxa’s SaaS
                  Agreement, for which User has designated a payment method, including but not
                  limited to withdrawals through the National Automated Clearing House (“ACH”);
                  and (j) User will not use the Services or Platform, directly or indirectly, for
                  any fraudulent or illegal undertaking, or in any manner that interferes with the
                  normal operation of the Services or Platform.
                </span>
              </p>
              <p>
                <br/>
              </p>
              <p>
                <strong
                  style={{
                  backgroundColor: "transparent"
                }}>38) Fees</strong>
              </p>
              <p>
                <span
                  style={{
                  backgroundColor: "transparent"
                }}>
                  Maxa currently collects “Fees” from Users for their use of portions of the
                  Platform or Services, subject to Maxa’s SaaS Agreement, and Maxa reserves all
                  rights to charge any other portions of the Platform or Services in the
                  future.&nbsp;Where User participates in a transaction using a credit card with
                  Maxa, Maxa’s third party payment processors may charge a credit card processing
                  fee.
                </span>
              </p>
              <p>
                <br/>
              </p>
              <p>
                <strong
                  style={{
                  backgroundColor: "transparent"
                }}>
                  39) Third Party Rules
                </strong>
              </p>
              <p>
                <span
                  style={{
                  backgroundColor: "transparent"
                }}>
                  Maxa may use third party vendors or software providers (“Networks”) to assist in
                  processing transactions for a User using the Services or Platform, or to provide
                  any Services or Platform.&nbsp;User agrees to abide by all Network rules and
                  instructions from such Networks when utilizing Maxa’s Platform or
                  Services.&nbsp;Where such Network rules conflict with this Agreement, this
                  Agreement shall control and supersede.
                </span>
              </p>
              <p>
                <br/>
              </p>
              <p>
                <strong
                  style={{
                  backgroundColor: "transparent"
                }}>
                  40) Right to Audit
                </strong>
              </p>
              <p>
                <span
                  style={{
                  backgroundColor: "transparent"
                }}>
                  Where requested by Maxa, User shall cooperate with any reasonable requests to
                  audit financial books and records of User in relation to User’s use of the
                  Services or Platform.
                </span>
              </p>
              <p>
                <br/>
              </p>
              <p>
                <strong
                  style={{
                  backgroundColor: "transparent"
                }}>41) Taxes</strong>
              </p>
              <p>
                <span
                  style={{
                  backgroundColor: "transparent"
                }}>
                  Maxa does not collect taxes for any transactions, User agrees to pay for any
                  taxes due and owing for any transactions made through the Services or
                  Platform.&nbsp;User agrees to comply with any requests to submit any tax
                  documentation, as requested by Maxa and shall reasonably assist Maxa with any
                  requests related to its tax compliance.&nbsp;User agrees that Maxa cannot and
                  will not provide User with any tax advice; any such questions should be directed
                  to User’s tax attorney or other tax professional.&nbsp;
                </span>
              </p>
              <p>
                <br/>
              </p>
              <p>
                <strong
                  style={{
                  backgroundColor: "transparent"
                }}>
                  42) No Agency
                </strong>
              </p>
              <p>
                <span
                  style={{
                  backgroundColor: "transparent"
                }}>
                  Nothing in this Agreement will be construed to create a partnership, joint
                  venture, agency, or employer-employee relationship. During the course of this
                  Agreement, User may not attempt to obligate Maxa in any manner or hold itself
                  out to be a representative of Maxa in any capacity.&nbsp;For purposes of this
                  Agreement, Maxa is solely a contractor to User or End User with respect to the
                  rights, restrictions and obligations set forth in this Agreement, and is not a
                  contracting party to any contractual relationship between and among User or End
                  User and other users of the Maxa Platform or Services.&nbsp;&nbsp;
                </span>
              </p>
              <p>
                <br/>
              </p>
              <p>
                <span
                  style={{
                  backgroundColor: "transparent"
                }}>
                  These terms were last updated on May 25, 2020.
                </span>
              </p>
              <p>
                <br/>
              </p>
            </div>
          </div>
          <div className="terms-page__footer">
            <h5 className="terms-page__support">Contact us</h5>
            <div className="terms-page__text">
              <p>
                <br/>
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default TermsOfUse;