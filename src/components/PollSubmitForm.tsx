import { Add, Delete } from "@material-ui/icons";
import { Button, Card, CardContent, Grid, IconButton, Switch, TextField } from "@mui/material"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { SavePollRequest } from "../models/PollModels";
import PollService from "../services/PollService";

const PollSubmitForm = () => {
    const [items, setItems] = useState([]);
    const [request] = useState<SavePollRequest>(
        {title: '', 
        description: '', 
        items: [], 
        isPrivate: false,
        isAnonymous: false,
        closedDate: undefined});
    
    const removeItem = (index) => {
        setItems(items.filter((_, i) => i !== index));
    }

    const addItem = (newItem) => {
        setItems([...items, newItem]);
    }

    const changeItem = (newVal, index) => {
        let newItems = [...items];
        newItems[index] = newVal;
        setItems(newItems);
    }

    const submitRequest = (request:SavePollRequest) => {
        request.items = items;
        PollService.savePoll(request).then((res) => console.log(res));
    }

    return (
        <div>
            <Card style={{maxWidth: 450, padding: "20px 5px", margin: "0 auto"}}>
                <CardContent>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Title" required placeholder="Title must not be empty" 
                                        onChange={(e) => {request.title=e.target.value}}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth multiline rows={4} label="Description" placeholder="(Optional)" 
                                        onChange={(e) => {request.description=e.target.value}}/>
                        </Grid>
                        {items.map((item, idx) => 
                            <Grid container spacing={1} item key={idx}>
                                <Grid item xs key={idx}>
                                    <TextField value={item} fullWidth onChange={(e) => {changeItem(e.target.value, idx)}} />
                                </Grid>
                                <Grid item style={{width: 48}}>
                                    <IconButton key={idx} onClick={() => {removeItem(idx)}}>
                                        <Delete />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        )}
                        <Grid item xs={12}>
                            <IconButton onClick={() => {addItem('')}}>
                                <Add />
                            </IconButton>
                        </Grid>
                        <Grid item xs={12}>
                            <Switch onChange={(e) => {request.isPrivate=e.target.checked}}/>
                            <Switch onChange={(e) => {request.isAnonymous=e.target.checked}}/>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                {/* TODO: add date to request */}
                                {/* <DatePicker onChange={(e) => {setRequest({...request, closedDate: e.value})}}/> */}
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" onClick={() => submitRequest(request)}>Submit</Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    )
}

export default PollSubmitForm