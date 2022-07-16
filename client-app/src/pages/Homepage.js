import { Button, Grid, IconButton, ImageList, ImageListItem, ImageListItemBar, Paper, TextField, Typography } from "@mui/material";
import { connect } from "react-redux";
import Navbar from "../components/UI/Navbar";
import PostForm from "../components/Forms/PostForm";
import ChangePasswordForm from "../components/Forms/ChangePasswordForm";
import { Container } from "@mui/system";
import { Favorite, FavoriteBorder, Filter, FilterListOutlined } from "@mui/icons-material";
import { pink } from "@mui/material/colors";
import { FilterBar } from "../components/Forms/FilterBar"

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1549388604-817d15aa0110',
    title: 'Bed',
  },
  {
    img: 'https://images.unsplash.com/photo-1525097487452-6278ff080c31',
    title: 'Books',
  },
  {
    img: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6',
    title: 'Sink',
  },
  {
    img: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3',
    title: 'Kitchen',
  },
  {
    img: 'https://images.unsplash.com/photo-1588436706487-9d55d73a39e3',
    title: 'Blinds',
  },
  {
    img: 'https://images.unsplash.com/photo-1574180045827-681f8a1a9622',
    title: 'Chairs',
  },
  {
    img: 'https://images.unsplash.com/photo-1530731141654-5993c3016c77',
    title: 'Laptop',
  },
  {
    img: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61',
    title: 'Doors',
  },
  {
    img: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7',
    title: 'Coffee',
  },
  {
    img: 'https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee',
    title: 'Storage',
  },
  {
    img: 'https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62',
    title: 'Candle',
  },
  {
    img: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4',
    title: 'Coffee table',
  },
];

function Homepage({ count, incrementCountAsync }) {
  return (
    <div>
      <Navbar></Navbar>
      <div className="w-3/4 lg:w-full flex justify-center pl-10 pr-10">
        <Grid container className="pt-10 mb-10 justify-center" spacing={4}>
          <Grid item xs={9}>
            <div className="flex flex-col">

            </div>
            <ImageList variant="standard" cols={4} gap={16}>
              {itemData.map((item) => (
                <ImageListItem className="relative" key={item.img}>
                  <a href="/post-detail" className="absolute w-full h-full" />
                  <img
                    src={item.img}
                    srcSet={item.img}
                    alt={item.title}
                    loading="lazy"
                  />
                  <ImageListItemBar
                    position="bottom"
                    title={<div className="font-bold text-lg">Title of the post</div>}
                    subtitle={<div className="text-slate-300">This is subtitle</div>}
                    actionIcon={
                      <IconButton sx={{ color: pink[100] }}>
                        <FavoriteBorder />
                      </IconButton>
                    }
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Grid>
          <Grid item xs={3}>
            <FilterBar />
          </Grid>
        </Grid>
      </div>
    </div >
  );
}

const mapStateToProps = (dispatch) => ({
  count: dispatch.userModel.count,
});

const mapDispatchToProps = (dispatch) => ({
  incrementCountAsync: dispatch.userModel.incrementCountAsync,
});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
