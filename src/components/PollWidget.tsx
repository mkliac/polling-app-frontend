import { Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Poll, PollItem } from "../models/PollModels";
import PollItemsButton from "./PollItemsButton";
import WidgetWrapper from "./WidgetWrapper";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { selectPoll } from "../redux/reducers/PollSlice";
import { vote } from "../services/PollService";

const PollWidget = ({ poll }: { poll: Poll }) => {
  const [myPoll, setMyPoll] = useState<Poll>(poll);
  const dispatch = useAppDispatch();
  const activePoll = useAppSelector(selectPoll);
  const [checkItemId, setCheckItemId] = useState<string>("");

  const onVote = (item: PollItem) => {
    dispatch(vote({ id: myPoll.id, itemId: item.id })).then((res) => {
      if (res.meta.requestStatus === "fulfilled")
        setCheckItemId(item.id);
    });
  };

  useEffect(() => {
    if (activePoll && activePoll.id === myPoll.id)
      setMyPoll(activePoll);
  }, [activePoll]);

  return (
    <WidgetWrapper m="2rem 0">
      <Typography variant="h4" sx={{ mt: "1rem", textAlign: "left" }}>
        {poll.title}
      </Typography>
      <Typography paragraph sx={{ mt: "0.5rem", textAlign: "left" }}>
        {poll.description}
      </Typography>
      <Divider />
      <br />
      <PollItemsButton poll={myPoll} onVote={onVote} checkItemId={checkItemId}/>
    </WidgetWrapper>
  );
};

export default PollWidget;
