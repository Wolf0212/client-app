import { Bookmark, BookmarkAddOutlined } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";

const BookmarkButton = ({
  match,
  removeBookmark,
  bookmarkPost,
  getBookmarkPost,
}) => {
  useEffect(() => {
    const payloadGet = {
      PostID: match.params.id,
      UserID: localStorage.getItem("uid"),
    };
    getBookmarkPost(payloadGet).then(
      () => {
        setIsBookmarked(true);
      },
      () => {
        setIsBookmarked(false);
      }
    );
  });
  const [isBookmarked, setIsBookmarked] = useState(undefined);
  const AddBookmark = () => {
    const payloadCreate = {
      postID: match.params.id,
      description: " ",
    };
    bookmarkPost(payloadCreate).then(() => {
      toast.success("Bookmarked!");
      setIsBookmarked(true);
    });
  };

  const RemoveBookmark = () => {
    removeBookmark(match.params.id).then(() => {
      toast.success("Bookmark has been removed!");
      setIsBookmarked(false);
    });
  };

  if (isBookmarked === false || isBookmarked === undefined) {
    return (
      <button
        type="button"
        className="hover:text-pink-400 duration-300 transition-all flex justify-center items-center gap-1 font-bold border-neutral-400 border-r pr-4"
        onClick={AddBookmark}
      >
        <BookmarkAddOutlined />
        Bookmark this post
      </button>
    );
  } else if (isBookmarked === true) {
    return (
      <button
        type="button"
        className="text-pink-400 duration-300 transition-all flex justify-center items-center gap-1 font-bold border-neutral-400 border-r pr-4"
        onClick={RemoveBookmark}
      >
        <Bookmark />
        Bookmarked
      </button>
    );
  }
};

const mapDispatchToProps = (dispatch) => ({
  bookmarkPost: dispatch.postModel.bookmarkPost,
  removeBookmark: dispatch.postModel.removeBookmark,
  getBookmarkPost: dispatch.postModel.getBookmarkPost,
});

export default withRouter(connect(null, mapDispatchToProps)(BookmarkButton));
