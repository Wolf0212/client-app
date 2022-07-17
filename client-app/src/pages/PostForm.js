import { FormControl, Button, Paper, Typography, Input, TextField, Divider } from "@mui/material";
import { useRef, useState } from "react";
import axios from "axios";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../auth/Firebase";
import Navbar from "../components/UI/Navbar";
import { API_URL } from "../api/agent";
import { Assessment } from "@mui/icons-material";

export const PostForm = () => {
  const title = useRef();
  const description = useRef();
  const preview = useRef();
  const attachment = useRef();

  const [attachmentFile, setAttachmentFile] = useState({
    type: null,
    link: null,
    file: null,
  });

  const PreviewFile = () => {
    let temp = "This type is not supported";
    if (attachmentFile.type.includes("video")) {
      temp = (
        <video className="w-full h-full" controls>
          <source src={attachmentFile.link.toString()} type="video/mp4" />
        </video>
      );
    }

    if (attachmentFile.type.includes("image")) {
      temp = <img alt="" src={attachmentFile.link.toString()} className="w-full h-full" />;
    }
    return temp;
  };

  const UploadFile = async (file) => {
    if (!file) return;
    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed", () => {
      return getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        const object = {
          title: title.current.value,
          description: description.current.value,
          attachmentType: attachmentFile.type.includes("image") ? 2 : 1,
          fileURL: url,
          preview: preview.current.value,
        };
        console.log(object);
        AddPost(object);
      });
    });
  };

  async function SubmitFormHandler(e) {
    e.preventDefault();
    UploadFile(attachmentFile.file);
  }

  async function AddPost(o) {
    return axios
      .post(API_URL, o)
      .then((response) => console.log(response));
  }

  function PreviewAttachmentHandler(e) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(e.target.files[0]);
    fileReader.onload = function () {
      setAttachmentFile({
        type: e.target.files[0].type,
        link: fileReader.result.toString(),
        file: e.target.files[0],
      });
    };
  }

  return (
    <div>
      <Navbar></Navbar>
      <form onSubmit={SubmitFormHandler} className="w-full md:w-11/12 lg:w-10/12 mx-auto lg:p-10 md:p-5 sm:p-2">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <Paper elevation={4} className="p-6 border">
              <Typography className="text-neutral-700 flex justify-center items-center" variant="h4" fontWeight="bold">
                <Assessment fontSize="large" />
                Post's data
              </Typography>
              <div className="text-lg font-bold text-neutral-600">Title of your post</div>
              <TextField size="small" fullWidth margin="dense" ref={title} placeholder="Title of your post" />
              <div className="text-lg font-bold text-neutral-600 mt-3">Description</div>
              <TextField multiline ref={description} size="small" fullWidth margin="dense" placeholder="What is your post about?" rows={6} />
              <hr className="mt-4 mb-4" />
              <div className="text-lg font-bold text-neutral-600 mb-2">
                Choose attachment
              </div>
              <input
                multiple
                ref={attachment}
                accept="*/*"
                type="file"
                className="mb-4 block w-full text-sm text-slate-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    transition-all
                    duration-300
                    file:bg-pink-100 file:text-pink-400
                    hover:file:bg-pink-200
                    hover:drop-shadow-lg"
                onChange={PreviewAttachmentHandler}
              />
              {attachmentFile.link != null && (
                <div className="flex items-center justify-center">
                  <PreviewFile></PreviewFile>
                </div>
              )}
            </Paper>

          </div>
          <div className="col-span-1">
            <Paper variant="outlined"><Button variant="contained" fullWidth type="submit">Submit</Button></Paper>

          </div>
        </div>


      </form>
    </div>

  );
};

