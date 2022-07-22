import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { pink } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";

const LikeButton = ({ match, removeLike, likePost, getCurrentPostLike }) => {
  useEffect(() => {
    const payloadGet = {
      PostID: match.params.id,
      UserID: localStorage.getItem("uid"),
    };
    getCurrentPostLike(payloadGet).then(
      () => {
        setIsLiked(true);
      },
      () => {
        setIsLiked(false);
      }
    );
  });
  const [isLiked, setIsLiked] = useState(undefined);
  const AddLike = () => {
    const payloadCreate = {
      postID: match.params.id,
    };
    likePost(payloadCreate).then(() => {
      toast.success("Liked");
      setIsLiked(true);
    });
  };
  const RemoveLike = () => {
    removeLike(match.params.id).then(() => {
      toast.success("Unliked");
      setIsLiked(false);
    });
  };
  if (isLiked === false || isLiked === undefined) {
    return (
      <IconButton size="large" className="p-0" onClick={AddLike}>
        <FavoriteBorder fontSize="inherit" />
      </IconButton>
    );
  } else if (isLiked === true) {
    return (
      <IconButton size="large" className="p-0" onClick={RemoveLike}>
        <Favorite fontSize="inherit" sx={{ color: pink[200] }} />
      </IconButton>
    );
  }
};

const mapDispatchToProps = (dispatch) => ({
  likePost: dispatch.postModel.likePost,
  removeLike: dispatch.postModel.removeLike,
  getCurrentPostLike: dispatch.postModel.getCurrentPostLike,
});

export default withRouter(connect(null, mapDispatchToProps)(LikeButton));
