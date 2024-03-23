import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Poll, PollFitlerType } from "../models/PollModels";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { selectUser } from "../redux/reducers/AuthSlice";
import { selectPollStatus, selectPolls } from "../redux/reducers/PollSlice";
import { getPolls } from "../services/PollService";
import { APIStatus } from "../types/ApiStatusType";
import LoadingOverlay from "./LoadingOverlay";
import PollWidget from "./PollWidget";

const PollsWidget = () => {
  const user = useAppSelector(selectUser);
  const polls: Poll[] = useAppSelector(selectPolls);
  const status = useAppSelector(selectPollStatus);
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search");
  const filterType = searchParams.get("filterType") as PollFitlerType;

  useEffect(() => {
    dispatch(getPolls({ search, filterType }));
  }, []);

  return (
    <>
      {status === APIStatus.SUCCESS &&
        polls.map((poll) => <PollWidget initPoll={poll} key={poll.id} />)}
      {status === APIStatus.LOADING && <LoadingOverlay isLoading={true} />}
    </>
  );
};

export default PollsWidget;
