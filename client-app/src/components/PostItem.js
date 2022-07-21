import React from 'react'
import { Avatar, ImageListItem, ImageListItemBar, Typography } from "@mui/material";
import { AccessTime, Favorite } from "@mui/icons-material";
import { pink } from "@mui/material/colors";
import { Link } from 'react-router-dom';
import { DateTime, Duration } from 'luxon';
import { isoStringToRelativeTime } from '../assets/misc/isoStringToRelativeTime';

export const PostItem = (props) => {
    return (
        <div className='hover:shadow-pink-500 transition-all duration-300'>
            <ImageListItem className="relative" style={{ height: '100%' }}>
                <Link to={{ pathname: `/post-detail/${props.item.PostID}` }} className="absolute w-full h-full z-10" />
                {props.item.AttachmentType === 'Image' ? <img
                    src={props.item.FileURL}
                    srcSet={props.item.FileURL}
                    alt={props.item.Title}
                    loading="lazy"
                /> : <video
                    autoPlay
                    disablePictureInPicture
                    src={props.item.FileURL}
                    srcSet={props.item.FileURL}
                    alt={props.item.Title}
                    loading="lazy"
                />}
                <ImageListItemBar
                    position="bottom"
                    title={<div className="font-bold text-lg truncate">{props.item.Title}</div>}
                    subtitle={<div className="text-slate-300 flex gap-2 items-center">
                        <Avatar src={props.item.Uploader.AvatarUrl} alt="Username" sx={{ width: "30px", height: "30px" }} />
                        <div className="flex flex-col">
                            <Typography variant="caption" sx={{ fontSize: "14px" }}>{props.item.Uploader.Username}</Typography>
                            <Typography variant="caption" className="inline-flex items-center gap-1">
                                <AccessTime fontSize="small" />
                                <span className=" mt-1">
                                    {isoStringToRelativeTime(props.item.UploadTime)}
                                </span>
                                <span className="mt-1">
                                    &#8226;
                                </span>
                                <Favorite fontSize="small" sx={{ color: pink[100] }} />
                                <span className="mt-1">
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
