import { faRedo, faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import HeadPageComponent from "../../components/layout/headpage/headpage";
import ButtonUI from "../../components/ui/button/button";
import ContentFormatButton from "../../components/ui/toggle-format/toggle-format";
import "./members.scss";
import MembersTab from "./members-tab";
import { svGetMembers } from "../../services/members.service";
import { appActions } from "../../store/app-slice";

const Members = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation("members-page");
  const language = useSelector((state) => state.app.language);
  const [tabSelect, setTabSelect] = useState("");
  const [refreshData, setRefreshData] = useState(0);
  const [membersData, setMembersData] = useState([]);

  useEffect(() => {
    dispatch(appActions.isSpawnActive(true));
    svGetMembers().then((res) => {
      if (res.status) {
        const members_data = res.data?.map((d) => {
          console.log(d)
          return {
            id: d.id,
            apple_id: d.apple_id,
            facebook_id: d.facebook_id,
            member_name: d.member_name,
            firstname: d.firstname,
            google_id: d.google_id,
            lastname: d.lastname,
            line_id: d.line_id,
            member_note: d.member_note,
            member_status: d.member_status,
            member_verify_at: d.member_verify_at,
            profile_image: d.profile_image
          };
        });
        setMembersData(members_data);
      } else {
        setMembersData([]);
      }
      dispatch(appActions.isSpawnActive(false));
    });
  }, [refreshData, language, tabSelect]);

  return (
    <section id="members-page">
      <HeadPageComponent
        h1={"MembersPage"}
        icon={<FontAwesomeIcon icon={faTag} />}
        breadcrums={[{ title: "MembersPage", link: false }]}
      />
      <div className="card-control fixed-width">
        <div className="card-head">
          <div className="head-action">
            <h2 className="head-title">
              <ButtonUI
                onClick={() => setRefreshData(refreshData + 1)}
                on="create"
                isLoading={false}
                icon={<FontAwesomeIcon icon={faRedo} />}
              >
                {t("Fetch")}
              </ButtonUI>
            </h2>
          </div>
        </div>

        <MembersTab
          setRefreshData={setRefreshData}
          tabSelect={tabSelect}
          membersData={membersData}
          setTabSelect={setTabSelect}
        />
      </div>
    </section>
  );
};

export default Members;
