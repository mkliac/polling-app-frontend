import { Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Poll, PollItem } from "../models/PollModels";
import PollItemsButton from "./PollItemsButton";
import WidgetWrapper from "./WidgetWrapper";
import { useAppDispatch} from "../redux/hook";
import { vote } from "../services/PollService";

const PollWidget = ({ initPoll }: { initPoll: Poll }) => {
  const [myPoll, setMyPoll] = useState<Poll>(initPoll);
  const dispatch = useAppDispatch();
  const [checkItemId, setCheckItemId] = useState<string>("");

  const onVote = (item: PollItem) => {
    dispatch(vote({ id: myPoll.id, itemId: item.id }))
    .unwrap()
    .then((res) => {
      setMyPoll(res);
      setCheckItemId(item.id);
    })
    .catch((err) => {
      console.log(err);
    });
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Typography variant="h4" sx={{ mt: "1rem", textAlign: "left" }}>
        {myPoll.title}
      </Typography>
      <Typography paragraph sx={{ mt: "0.5rem", textAlign: "left" }}>
        {myPoll.description}
      </Typography>
      <Divider />
      <br />
      <PollItemsButton poll={myPoll} onVote={onVote} checkItemId={checkItemId}/>
    </WidgetWrapper>
  );
};

export default PollWidget;
