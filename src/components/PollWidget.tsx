import { Divider, Typography } from "@mui/material";
import { useState } from "react";
import { Poll, PollItem } from "../models/PollModels";
import { useAppDispatch } from "../redux/hook";
import { vote } from "../services/PollService";
import LoadingContent from "./LoadingContent";
import PollItemsButton from "./PollItemsButton";
import WidgetWrapper from "./WidgetWrapper";

const PollWidget = ({ initPoll }: { initPoll: Poll }) => {
  const [poll, setPoll] = useState<Poll>(initPoll);
  const [checkItemId, setCheckItemId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const onVote = (item: PollItem) => {
    setIsLoading(true);
    dispatch(vote({ id: poll.id, itemId: item.id }))
      .unwrap()
      .then((res) => {
        setPoll(res);
        setCheckItemId(item.id);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <WidgetWrapper m="2rem 0" position="relative">
      <Typography variant="h4" sx={{ mt: "1rem", textAlign: "left" }}>
        {poll.title}
      </Typography>
      <Typography paragraph sx={{ mt: "0.5rem", textAlign: "left" }}>
        {poll.description}
      </Typography>
      <Divider />
      <br />
      <PollItemsButton poll={poll} onVote={onVote} checkItemId={checkItemId} />
      {isLoading && <LoadingContent />}
    </WidgetWrapper>
  );
};

export default PollWidget;
