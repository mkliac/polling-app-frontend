import { Divider, Typography } from "@mui/material";
import { useState } from "react";
import { Poll, PollItem } from "../models/PollModels";
import { useAppDispatch } from "../redux/hook";
import { vote } from "../services/PollService";
import LoadingContent from "./LoadingContent";
import PollItemsButton from "./PollItemsButton";
import WidgetWrapper from "./WidgetWrapper";

const PollWidget = ({ initPoll }: { initPoll: Poll }) => {
  const [myPoll, setMyPoll] = useState<Poll>(initPoll);
  const dispatch = useAppDispatch();
  const [checkItemId, setCheckItemId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const onVote = (item: PollItem) => {
    setIsLoading(true);
    dispatch(vote({ id: myPoll.id, itemId: item.id }))
      .unwrap()
      .then((res) => {
        setMyPoll(res);
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
        {myPoll.title}
      </Typography>
      <Typography paragraph sx={{ mt: "0.5rem", textAlign: "left" }}>
        {myPoll.description}
      </Typography>
      <Divider />
      <br />
      <PollItemsButton
        poll={myPoll}
        onVote={onVote}
        checkItemId={checkItemId}
      />
      {isLoading && <LoadingContent />}
    </WidgetWrapper>
  );
};

export default PollWidget;
