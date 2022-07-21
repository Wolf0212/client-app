import { Backdrop, CircularProgress, Grid } from "@mui/material";
import Navbar from "../components/UI/Navbar";
import { PostItem } from "../components/PostItem";
import SelectionBar from "../components/SelectionBar";
import { connect } from 'react-redux'
import { useEffect, useState } from "react";

function Homepage({ postList, getPostList }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await getPostList("?$expand=Uploader");
    }
    fetchData();
    setLoading(false);
  }, [getPostList])

  return (
    <div>
      <Navbar></Navbar>
      {loading === true ? <Backdrop
        sx={{ color: '#d1d1d1', zIndex: "9999" }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop> : <div className="w-full md:w-11/12 lg:w-10/12 pl-10 pr-10 flex justify-center mx-auto">
        <Grid container className="pt-10 mb-10 justify-center" spacing={4}>
          <Grid item>
            <SelectionBar />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {postList.map((item) => {
                console.log(item);
                return <PostItem key={item.PostID} item={item} />
              })}
            </div>
          </Grid>
        </Grid>
      </div>}
    </div >
  );
}

const mapStateToProps = (dispatch) => ({
  postList: dispatch.postModel.postList,
})

const mapDispatchToProps = (dispatch) => ({
  getPostList: dispatch.postModel.getPostList,
})

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
