import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";
import ButtonUI from "../../../components/ui/button/button";
import { useSelector } from "react-redux";

import "./member-modal.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faPencil, faRedo } from "@fortawesome/free-solid-svg-icons";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select
} from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers";
import SwalUI from "../../../components/ui/swal-ui/swal-ui";
import { svChangeStatusMember } from "../../../services/members.service";

const MemberModal = (props) => {
  const { t } = useTranslation("member-cate-page");
  const { memberShow, memberModal, setMemberModal, setRefreshData } = props;
  const [memberStatus, setMemberStatus] = useState(memberShow.member_status);

  const statusList = [
    {
      status: "Pending",
      value: "pending"
    },
    {
      status: "Confirm",
      value: "confirm"
    },
    {
      status: "Banned",
      value: "banned"
    }
  ];

  const handlerSave = () => {
    const formSave = {
      status: memberStatus
    };
    svChangeStatusMember(memberShow.id, formSave).then((res) => {
      setMemberModal(false);
      SwalUI({ status: res.status, description: res.description });
      if (res.status) {
        setRefreshData((prev) => prev + 1);
      }
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Modal
        open={memberModal}
        onClose={(e) => setMemberModal(false)}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box id="member-modal">
          <section id="member-page">
            <div className="card-control">
              <div className="card-head">
                <div className="head-action">
                  <h2 className="head-title">
                    <FontAwesomeIcon icon={faPencil} />{" "}
                    {t("memberStatusChange")}
                  </h2>
                </div>
              </div>
              <div className="card-body">
                <Box
                  component="form"
                  noValidate
                  autoComplete="off"
                  sx={{ "& .MuiTextField-root": { m: 1 } }}
                >
                  <div className="member-details">
                    <h3 className="member-detail-title">{t("ChangeStatus")}</h3>
                    <div className="input-full">
                      <FormControl
                        sx={{ m: 1, minWidth: 200 }}
                        size="small"
                        className="form-control"
                      >
                        <InputLabel id="label-member-type">
                          {t("SelectMemberStatus")}
                        </InputLabel>
                        <Select
                          labelId="member-type"
                          id="member-type"
                          value={memberStatus}
                          label={t("SelectMemberStatus")}
                          onChange={(e) => setMemberStatus(e.target.value)}
                        >
                          <MenuItem value={""} disabled>
                            {t("Select")}
                          </MenuItem>
                          {statusList.map((p) => (
                            <MenuItem key={p.value} value={p.value}>
                              {p.status}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                </Box>

                <div className="btn-action">
                  <ButtonUI
                    onClick={() => handlerSave()}
                    loader={true}
                    className="btn-save"
                    on="save"
                    width="md"
                  />
                  <ButtonUI
                    onClick={() => setMemberModal(false)}
                    icon={<FontAwesomeIcon icon={faRedo} />}
                    className="btn-cancel"
                    on="cancel"
                    width="md"
                  />
                </div>
              </div>
            </div>
          </section>
        </Box>
      </Modal>
    </LocalizationProvider>
  );
};

export default MemberModal;
