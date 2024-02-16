import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Poll } from "../models/PollModels";
import PollService from "../services/PollService";
import { Typography } from "@mui/material";

const PollForm = () => {
    const {id} = useParams(); 
    const initPoll : Poll = {
        id: '-',
        title: "",
        description: "",
        items: [],
        isAnonymous: false,
        isPrivate: false,
        createdAt: undefined,
        createdBy: undefined,
        closedAt: undefined,
        closedDate: undefined
    };
    const [poll, setPoll] = useState<Poll>(initPoll);


    useEffect(() => {
        PollService.getPoll(id)
        .then(data => {setPoll(data); console.log(data)})
        .catch((e) => console.log(e));
    }, []);

    return (
        <div>
            <Typography>{poll.id}</Typography>
            <Typography>{poll.createdBy ? poll.createdBy.username : '-'}</Typography>
            <Typography>{poll.title}</Typography>
        </div>
    )
}

export default PollForm