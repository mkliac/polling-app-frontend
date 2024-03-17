import {
  Box
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PollWidget from "../components/PollWidget";
import { Poll } from "../models/PollModels";
import { useAppDispatch } from "../redux/hook";
import { getPoll } from "../services/PollService";

const PollForm = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [poll, setPoll] = useState<Poll>(undefined);

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

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={{ maxWidth: "32rem" }}>
        {poll && <PollWidget initPoll={poll} />}
      </Box>
    </Box>
  );
};

export default PollForm;
