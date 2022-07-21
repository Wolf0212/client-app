import React from 'react'
import { Checkbox, FormControl, ListItemText, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { categoryList } from "../assets/misc/categoryList";
import { connect } from 'react-redux';

const SelectionBar = ({ getPostList, postList }) => {
    const [sort, setSort] = useState("Newest");
    const [categories, setCategories] = useState([]);

    const handleCatChange = (event) => {
        const {
            target: { value },
        } = event;
        setCategories(
            typeof value === 'string' ? value.split(',') : value,
        );
        getPostList("");
    };

    const handleChange = (event) => {
        setSort(event.target.value);
    }
    return (
        <div className="flex justify-between mb-6 gap-2">
            <FormControl sx={{ m: 1, minWidth: 120, flexDirection: "row", alignItems: 'center', gap: "6px" }} size="small">
                <span className="font-bold">Sort by: </span>
                <Select
                    value={sort}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem value={"Newest"}>Newest</MenuItem>
                    <MenuItem value={"Hottest"}>Hottest</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{ m: 1, width: 300, flexDirection: "row", alignItems: 'center', gap: "6px" }}>
                <span className="font-bold">Categories: </span>
                <Select
                    className="grow truncate"
                    id="demo-multiple-checkbox"
                    multiple
                    value={categories}
                    onChange={handleCatChange}
                    renderValue={(selected) => selected.join(', ')}
                    size="small"
                >
                    {categoryList.map((category) => (
                        <MenuItem key={category.id} value={category.name}>
                            <Checkbox checked={categories.indexOf(category.name) > -1} />
                            <ListItemText primary={category.name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}

const mapStateToProps = (dispatch) => ({
    postList: dispatch.postModel.postList,
})

const mapDispatchToProps = (dispatch) => ({
    getPostList: dispatch.postModel.getPostList,
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectionBar)
