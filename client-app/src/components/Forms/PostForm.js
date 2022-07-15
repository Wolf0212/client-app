import { Box, Input, InputLabel, FormControl, Button } from "@mui/material";

import { useRef, useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

import axios from "axios";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../auth/Firebase";

const PostForm = () => {
  const title = useRef();
  const description = useRef();
  const preview = useRef();
  const attachment = useRef();
  const navigate = useHistory();

  const [attachmentFile, setAttachmentFile] = useState({
    type: null,
    link: null,
    file: null,
  });

  const PreviewFile = () => {
    let temp = "This type is not supported";
    if (attachmentFile.type.includes("video")) {
      temp = (
        <video width="320" height="240" controls>
          <source src={attachmentFile.link.toString()} type="video/mp4" />
        </video>
      );
    }

    if (attachmentFile.type.includes("image")) {
      temp = <img alt="" src={attachmentFile.link.toString()} width="320" />;
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

  function AddPost(o) {
    return axios
      .post("https://localhost:44321/odata/Posts", o, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
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

  const setAxiosDefaultHeader = () => {
    axios.defaults.headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
  };

  useEffect(() => {
    setAxiosDefaultHeader();
  });

  return (
    <form onSubmit={SubmitFormHandler}>
      <FormControl fullWidth margin="dense">
        <InputLabel htmlFor="title">Title</InputLabel>
        <Input
          id="title"
          name="title"
          placeholder="Title of the post"
          type="text"
          inputRef={title}
        ></Input>
      </FormControl>
      <FormControl fullWidth margin="dense">
        <InputLabel htmlFor="description">Description</InputLabel>
        <Input
          id="description"
          name="description"
          placeholder="Description of the post"
          type="text"
          multiline
          inputRef={description}
        ></Input>
      </FormControl>
      <FormControl fullWidth margin="dense">
        <InputLabel htmlFor="preview">Preview </InputLabel>
        <Input
          inputRef={preview}
          id="preview"
          name="preview"
          type="text"
          multiline
        ></Input>
      </FormControl>
      <div>
        <FormControl margin="dense">
          <Button variant="contained" component="label">
            Upload file
            <input
              ref={attachment}
              hidden
              accept="*/*"
              multiple
              type="file"
              onChange={PreviewAttachmentHandler}
            />
          </Button>
        </FormControl>
      </div>
      {attachmentFile.link != null && (
        <div>
          <PreviewFile></PreviewFile>
        </div>
      )}
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default PostForm;
