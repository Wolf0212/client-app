import { Button, FormControl, InputLabel, MenuItem, Paper, Select } from '@mui/material'
import { FilterListOutlined } from "@mui/icons-material";
import React from 'react'
import { pink } from '@mui/material/colors';

export const FilterBar = () => {
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    return (
        <Paper elevation={4} className="p-5 flex gap-4 flex-col">
            <div className="flex items-center justify-center gap-3 font-semibold text-2xl">
                <FilterListOutlined></FilterListOutlined>
                Filter
            </div>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Tag</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Tag"
                    onChange={handleChange}
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Tag</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Tag"
                    onChange={handleChange}
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
            <Button variant="contained" sx={{ backgroundColor: pink[100] }}>Filter</Button>
        </Paper>
    )
}