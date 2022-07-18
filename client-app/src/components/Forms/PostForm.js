import { Button, Form } from "react-bootstrap";

import { useRef, useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

import React from "react";
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
    type: [],
    link: [],
    file: [],
  });

  const PreviewFile = (props) => {
    let temp = "This type is not supported";
    if (props.type.includes("video")) {
      temp = (
        <video width="320" height="240" controls>
          <source src={props.link} type="video/mp4" />
        </video>
      );
    }

    if (props.type.includes("image")) {
      temp = <img alt="" src={props.link.toString()} width="320" />;
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
        AddPost(object);
      });
    });
  };

  async function SubmitFormHandler(e) {
    e.preventDefault();
    // UploadFile(attachmentFile.file);
    console.log(attachmentFile);
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
    const typeList = [];
    const linkList = [];
    const fileList = [];
    for (let i = 0; i < e.target.files.length; i++) {
      let fileReader = new FileReader();
      fileReader.readAsDataURL(e.target.files[0]);
      fileReader.onload = function () {
        typeList.push(e.target.files[i].type);
        linkList.push(fileReader.result.toString());
        fileList.push(e.target.files[i]);
      };
    }
    setAttachmentFile({
      type: typeList,
      link: linkList,
      file: fileList,
    });
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
    <div style={{ width: "70%", margin: "0 auto" }}>
      <Form onSubmit={SubmitFormHandler}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="title">Title</Form.Label>
          <Form.Control
            id="title"
            name="title"
            placeholder="Title of the post"
            type="text"
            ref={title}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="description">Description</Form.Label>
          <Form.Control
            id="description"
            name="description"
            placeholder="Description of the post"
            type="text"
            multiline
            ref={description}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="preview">Preview </Form.Label>
          <Form.Control
            ref={preview}
            id="preview"
            name="preview"
            type="text"
            as="textarea"
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>File</Form.Label>
          <Form.Control
            ref={attachment}
            onChange={PreviewAttachmentHandler}
            type="file"
            multiple
          />
        </Form.Group>
        {attachmentFile.link.length > 0 &&
          attachmentFile.link.map(function (x, i) {
            console.log(x);
            return (
              <PreviewFile
                key={x}
                link={x}
                type={attachmentFile.type[i]}
              ></PreviewFile>
            );
          })}
        <Button type="submit" variant="primary">
          Primary
        </Button>
      </Form>
    </div>
  );
};

export default PostForm;
