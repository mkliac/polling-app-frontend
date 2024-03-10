import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Poll } from "../models/PollModels";
import { User } from "../models/UserModel";
import { getPolls } from "../services/PollService";
import PollWidget from "./PollWidget";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { selectPolls } from "../redux/reducers/PollSlice";
import { selectUser } from "../redux/reducers/AuthSlice";

const PollsWidget = () => {
  const user = useAppSelector(selectUser);
  const polls: Poll[] = useAppSelector(selectPolls);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPolls());
  }, []);

  return (
    <>
      {polls.map((poll) => (
        <PollWidget initPoll={poll} key={poll.id} />
      ))}
    </>
  );
};

export default PollsWidget;
