import { Bookmark, BookmarkAddOutlined } from '@mui/icons-material'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { toast } from 'react-toastify'

const BookmarkButton = ({ match, removeBookmark, bookmarkPost, bookmarkStatus }) => {
    const [isBookmarked, setIsBookmarked] = useState(bookmarkStatus);
    const AddBookmark = () => {
        const payloadCreate = {
            postID: match.params.id,
            description: " "
        }
        bookmarkPost(payloadCreate).then(() => {
            toast.success("Bookmarked!");
            setIsBookmarked(true);
        })
    }

    const RemoveBookmark = () => {
        removeBookmark(match.params.id).then(() => {
            toast.success("Bookmark has been removed!");
            setIsBookmarked(false);
        })
    }

    if (isBookmarked === false) {
        return (
            <button
                type='button'
                className='hover:text-pink-400 duration-300 transition-all flex justify-center items-center gap-1 font-bold border-neutral-400 border-r pr-4'
                onClick={AddBookmark}
            >
                <BookmarkAddOutlined />
                Bookmark this post
            </button>
        )
    }
    else {
        return (
            <button
                type='button'
                className='text-pink-400 duration-300 transition-all flex justify-center items-center gap-1 font-bold border-neutral-400 border-r pr-4'
                onClick={RemoveBookmark}
            >
                <Bookmark />
                Bookmarked
            </button>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    bookmarkPost: dispatch.postModel.bookmarkPost,
    removeBookmark: dispatch.postModel.removeBookmark,
})

export default withRouter(connect(null, mapDispatchToProps)(BookmarkButton));