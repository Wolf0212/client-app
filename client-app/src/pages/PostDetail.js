import { async } from '@firebase/util'
import { Add, ArrowBackIosNew, BookmarkAddOutlined, ChatBubble, ChatBubbleOutline, CloudDownloadOutlined, DiamondOutlined, Favorite, FavoriteBorder, ReportOutlined } from '@mui/icons-material'
import { Avatar, Backdrop, Chip, CircularProgress, IconButton, Link, TextField, Tooltip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { toast } from 'react-toastify'
import Navbar from '../components/UI/Navbar'

const PostDetail = ({ getPostById, match, post }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPostById(match.params.id).then(() => setLoading(false), (error) => {
            toast.error('Failed to load post')
            console.log(error)
        });
    }, [setLoading])

    return (
        <div>
            <Navbar></Navbar>
            {loading === true ?
                <Backdrop
                    sx={{ color: '#fff', zIndex: 9999 }}
                    open={true}
                >
                    <CircularProgress color="inherit" />
                </Backdrop> :
                <div className="h-screen max-h-[calc(100vh-136px)] bg-slate-100">
                    {/* Content view */}
                    <div className='art-stage px-[100px] py-6 h-full relative'>
                        <div className='flex justify-center items-center h-full'>
                            <div className="file-wrapper  h-full bg-slate-100 flex justify-center items-center">
                                <img className='max-h-full shadow-lg' src={post.fileURL} alt='art-content' />
                            </div>
                            <div className='absolute top-0 right-0 left-0 bottom-0 h-full w-full py-6 text-neutral-50 opacity-5 hover:text-black hover:opacity-100 transition-all duratin-500'>
                                <Link href="/" color='inherit' underline='none' className='transition-all duration-300 hover:text-pink-400 hidden justify-center items-center gap-1 left-[27px] relative px-4 lg:inline-flex'>
                                    <ArrowBackIosNew fontSize='small' />
                                    <span className='font-bold'>Home</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                    {/* Action bar */}
                    <div className='flex items-center h-[72px] pl-8 pr-2 w-full xl:w-1/2 lg:w-4/5 mx-auto'>
                        <div className='cursor-pointer flex justify-center items-center gap-1 font-bold border-neutral-400 border-r pr-4' onClick={() => alert('clicked!')}>
                            <BookmarkAddOutlined />
                            Bookmark this post
                        </div>
                        <div className='flex justify-center items-center gap-1 font-bold border-neutral-400 border-r px-4'>
                            <ChatBubbleOutline />
                            Comment
                        </div>
                        <div className='flex justify-center items-center gap-1 font-bold border-neutral-400 px-4'>
                            <DiamondOutlined />
                            Donate
                        </div>
                        <div className='flex justify-center items-center gap-3 font-bold border-neutral-400 ml-auto px-4'>
                            <Tooltip arrow title="Like" placement="top">
                                <IconButton size="large" className='p-0'>
                                    <FavoriteBorder fontSize='inherit' />
                                </IconButton>
                            </Tooltip>
                            <Tooltip arrow title="Download file" placement="top">
                                <IconButton size="large" className='p-0'>
                                    <CloudDownloadOutlined fontSize='inherit' />
                                </IconButton>
                            </Tooltip>
                            <Tooltip arrow title="Report this post" placement="top">
                                <IconButton size="large" className='p-0'>
                                    <ReportOutlined fontSize='inherit' />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                    {/* Post information */}
                    <div className='w-full px-8 xl:w-1/2 lg:w-4/5 mx-auto'>
                        {/* Post statisctic */}
                        <div className='post-info flex justify-center items-center mt-4 gap-3 grow mb-8'>
                            <a href="#">
                                <Avatar alt="Avatar" src='Avatar' sx={{ width: '54px', height: '54px' }} />
                            </a>
                            <div className='flex grow items-between'>
                                <div className='flex flex-col grow gap-1'>
                                    <header className='flex justify-between items-center'>
                                        <span className='text-[32px] leading-[32px] font-bold'>This is title of the post</span>
                                        <span className='text-neutral-600 mt-2'>
                                            Published: a day ago
                                        </span>
                                    </header>
                                    <div className="subheader">
                                        <span className='mr-1'>
                                            by
                                        </span>
                                        <Link href="#" className="font-bold" color="inherit">Username</Link>
                                        <span className='ml-4 cursor-pointer text-pink-400 gap-[1px] inline-flex text-xs font-bold justify-center items-end leading-[12px]' onClick={() => { alert('Follow') }}>
                                            <Add sx={{ fontSize: "13px" }} />
                                            FOLLOW
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Post general stat */}
                        <div className='flex gap-[16px] text-sm text-neutral-500 mb-6 mt-6 general-info'>
                            <div className='flex gap-2'>
                                <Favorite fontSize='small' />
                                200 Likes
                            </div>
                            <div className='flex gap-2'>
                                <ChatBubble fontSize='small' />
                                200 Comments
                            </div>
                        </div>
                        {/* Category List */}
                        <div className='tag-list flex gap-2 mb-4'>
                            <a href="#" alt='searchCat'>
                                <Chip label="Category 1" variant='outlined' clickable>
                                </Chip>
                            </a>
                            <a href="#" alt='searchCat'>
                                <Chip label="Category 1" variant='outlined' clickable>
                                </Chip>
                            </a>
                            <a href="#" alt='searchCat'>
                                <Chip label="Category 1" variant='outlined' clickable>
                                </Chip>
                            </a>
                        </div>
                        {/* Content of the post */}
                        <div className='my-6'>
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna
                            aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                            ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                            aute irure dolor in reprehenderit in voluptate velit esse
                            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                        </div>
                        {/* Comment section */}
                        <div className='mt-8'>
                            <div className='font-bold uppercase mb-8'>
                                78 Comments
                            </div>
                            <div className='flex gap-2 mb-4'>
                                <a href='#'>
                                    <Avatar alt="Username" />
                                </a>
                                <TextField multiline className='grow' label=" " rows={5} placeholder="Write a comment" helperText="Press enter to submit" />
                            </div>
                            {/* Comments -> can use map method here */}
                            <div className='flex gap-2 mb-4'>
                                <a href='#'>
                                    <Avatar alt="Username" />
                                </a>
                                <div className="flex flex-col grow">
                                    <div className="flex flex-col grow bg-pink-100 pt-2 px-[12px] pb-[16px]  border-pink-100 rounded-md">
                                        <div className="flex gap-2 items-baseline mb-1">
                                            <a href='#' className='font-bold hover:text-black'>Username</a>
                                            &#8226;
                                            <span className='font-extralight text-xs'>
                                                One day ago
                                            </span>
                                        </div>
                                        <div>
                                            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                                            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                                            quae ab illo inventore veritatis et quasi architecto beatae vita
                                            e dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas s
                                            it aspernatur aut odit aut fugit, sed quia consequuntur magni dolo
                                            res eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam es
                                            t, qui dolorem ipsum quia dolor sit amet, consectetur, adipisc
                                            i velit, sed quia non numquam eius modi tempora incidunt ut labore
                                            et dolore magnam aliquam quaerat voluptatem. U
                                        </div>
                                    </div>

                                    {/* Action bar */}
                                    <div className='flex text-sm text-neutral-500'>
                                        <Tooltip arrow title="Like" placement="top">
                                            <IconButton>
                                                <FavoriteBorder />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip arrow title="Report this post" placement="top">
                                            <IconButton>
                                                <ReportOutlined />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

        </div >
    )
}

const mapDispatchToProps = (dispatch) => ({
    getPostById: dispatch.postModel.getPostById,
})

const mapStateToProps = (state) => ({
    post: state.postModel.post,
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetail));
