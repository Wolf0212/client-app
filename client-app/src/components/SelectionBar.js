import React from 'react'
import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { categoryList } from "../assets/misc/categoryList";
import { connect } from 'react-redux';
import { convertNameToId } from '../assets/misc/categoryList';

const SelectionBar = ({ getPostList }) => {
    const [sort, setSort] = useState("Newest");
    const [categories, setCategories] = useState([]);

    const handleCatChange = (event) => {
        setCategories(event.target.value);
    };

    const handleChange = (event) => {
        setSort(event.target.value);
        if (event.target.value === 'Newest') {
            getPostList("?$expand=Uploader&$filter=Active eq true&$orderBy=UploadTime desc")
        }
        else if (event.target.value === 'Oldest') {
            getPostList("?$expand=Uploader&$filter=Active eq true&$orderBy=UploadTime")
        }
    }

    return (
        <div className="flex justify-between mb-6 gap-2">
            <FormControl sx={{ m: 1, minWidth: 120, flexDirection: "row", alignItems: 'center', gap: "6px" }} size="small">
                <span className="font-bold">Sort by: </span>
                <InputLabel id="sort-select-label"></InputLabel>
                <Select
                    labelId='sort-select-label'
                    label=" "
                    value={sort}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem value={"Newest"}>Newest</MenuItem>
                    <MenuItem value={"Oldest"}>Oldest</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{ m: 1, width: 200, flexDirection: "row", alignItems: 'center', gap: "6px" }}>
                <span className="font-bold">Tags: </span>
                <InputLabel id="category-select-label"></InputLabel>
                <Select
                    labelId='category-select-label'
                    label=" "
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

const mapDispatchToProps = (dispatch) => ({
    getPostList: dispatch.postModel.getPostList,
})

export default connect(null, mapDispatchToProps)(SelectionBar)
