import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Poll } from "../models/PollModels";
import PollService from "../services/PollService";
import { Typography } from "@mui/material";

const PollForm = () => {
    const {id} = useParams(); 
    const [poll, setPoll] = useState<Poll>();
    useEffect(() => {
        PollService.getPoll(id)
        .then(data => {setPoll(data)})
        .catch((e) => console.log(e));
    }, []);

    return (
        <div>
            <Typography>{poll.id}</Typography>
            <Typography>{poll.createdBy.username}</Typography>
            <Typography>{poll.title}</Typography>
        </div>
    )
}

export default PollForm