import React from 'react'
import { Avatar, ImageListItem, ImageListItemBar, Typography } from "@mui/material";
import { AccessTime, Favorite } from "@mui/icons-material";
import { pink } from "@mui/material/colors";

export const PostItem = (props) => {
    
    return (
        <div className='hover:shadow-pink-500 transition-all duration-300'>
            <ImageListItem className="relative" style={{ height: '100%' }}>
                <a href="/post-detail" className="absolute w-full h-full" />
                <img
                    src={props.item.img}
                    srcSet={props.item.img}
                    alt={props.item.title}
                    loading="lazy"
                />
                <ImageListItemBar
                    
                    position="bottom"
                    title={<div className="font-bold text-lg truncate">Title of the post</div>}
                    subtitle={<div className="text-slate-300 flex gap-2 items-center">
                        <Avatar alt="Username" sx={{ width: "30px", height: "30px" }} />
                        <div className="flex flex-col">
                            <Typography variant="caption" sx={{ fontSize: "14px" }}>Username</Typography>
                            <Typography variant="caption" className="flex items-center">
                                <AccessTime fontSize="small" />
                                <span className="mr-1">
                                    12/02/2001 &#8226;
                                </span>
                                <Favorite fontSize="small" sx={{ color: pink[100] }} />
                                <span className="ml-1 mr-1">
                                    200 
                                </span>
                            </Typography>
                        </div>
                    </div>}
                />
            </ImageListItem>
        </div>
    )
}
