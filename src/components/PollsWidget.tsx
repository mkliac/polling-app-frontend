import { CircularProgress } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Poll, PollFitlerType } from "../models/PollModels";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { selectUser } from "../redux/reducers/AuthSlice";
import { selectPollStatus } from "../redux/reducers/PollSlice";
import { getPolls } from "../services/PollService";
import { APIStatus } from "../types/ApiStatusType";
import LoadingContent from "./LoadingContent";
import PollWidget from "./PollWidget";

const PollsWidget = () => {
  const user = useAppSelector(selectUser);
  const [polls, setPolls] = useState<Poll[]>([]);
  const status = useAppSelector(selectPollStatus);
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageNumber, setPageNumber] = useState(-1);
  const [hasMore, setHasMore] = useState(true);
  const search = searchParams.get("search");
  const filterType = searchParams.get("filterType") as PollFitlerType;
  const searchUserId = searchParams.get("userId");

  const fetchPolls = (pageNumber: number) => {
    dispatch(getPolls({ search, filterType, pageNumber, userId: searchUserId }))
      .unwrap()
      .then((res) => {
        if (res.length === 0) setHasMore(() => false);
        setPolls((prevPolls) => [...prevPolls, ...res]);
      });
  };
  useEffect(() => {
    setPageNumber(-1);
  }, [search, filterType, searchUserId]);

  useEffect(() => {
    if (pageNumber === -1) {
      setPolls(() => []);
      setPageNumber(0);
      setHasMore(() => true);
      return;
    }
    fetchPolls(pageNumber);
  }, [pageNumber]);

  const observer = useRef<any>();
  const lastBookElementRef = useCallback(
    (node) => {
      if (status === APIStatus.LOADING) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [status, hasMore]
  );

  const removePoll = (id: string) => {
    setPolls((prevPolls) => prevPolls.filter((poll) => poll.id !== id));
  };

  return (
    <>
      {polls.map((poll, index) =>
        polls.length === index + 1 ? (
          <div ref={lastBookElementRef} key={poll.id}>
            <PollWidget initPoll={poll} removePoll={removePoll} />
          </div>
        ) : (
          <PollWidget initPoll={poll} key={poll.id} removePoll={removePoll} />
        )
      )}
      {status === APIStatus.LOADING &&
        (polls.length === 0 ? <LoadingContent /> : <CircularProgress />)}
    </>
  );
};

export default PollsWidget;
