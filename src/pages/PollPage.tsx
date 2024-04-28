import {
  AddBox,
  Home,
  Logout
} from "@mui/icons-material";
import {
  Box,
  useMediaQuery
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CustomButtomNavigation, {
  CustomButtomNavigationActionModel,
} from "../components/CustomButtomNavigation";
import CustomSpeedDial from "../components/CustomSpeedDial";
import PollWidget from "../components/PollWidget";
import { Poll } from "../models/PollModels";
import { useAppDispatch } from "../redux/hook";
import { setLogout } from "../redux/reducers/AuthSlice";
import { getPoll } from "../services/PollService";

const PollForm = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [poll, setPoll] = useState<Poll>(undefined);
  const navigate = useNavigate();
  const matches = useMediaQuery("(min-width:650px)");

  useEffect(() => {
    dispatch(getPoll(id))
      .unwrap()
      .then((res) => {
        setPoll(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const actions: CustomButtomNavigationActionModel[] = [
    {
      icon: <Logout />,
      label: "Logout",
      onClick: () => {
        dispatch(setLogout());
      },
    },
    {
      icon: <AddBox />,
      label: "Create Poll",
      onClick: () => {
        navigate("/create-poll");
      },
    },
    {
      icon: <Home />,
      label: "Home",
      onClick: () => {
        navigate("/home");
      },
    },
  ];

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={{ width: "32rem" }}>
        {poll && <PollWidget initPoll={poll} removePoll={(id) => {}} />}
      </Box>

      {matches ? (
        <CustomSpeedDial actions={actions} />
      ) : (
        <CustomButtomNavigation actions={actions} />
      )}
    </Box>
  );
};

export default PollForm;
