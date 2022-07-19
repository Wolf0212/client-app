import { Button, Paper, Typography, TextField, FormControl, Select, MenuItem, Checkbox, ListItemText, Tooltip, Backdrop, CircularProgress, InputLabel, OutlinedInput } from "@mui/material";
import { useRef, useState } from "react";
import axios from "axios";
import Navbar from "../components/UI/Navbar";
import { API_URL } from "../api/agent";
import { Assessment, Info, Settings } from "@mui/icons-material";
import { categoryList } from "../assets/misc/categoryList";
import { convertNameToId } from "../assets/misc/categoryList";
import { toast } from "react-toastify";
import { UploadFile } from "../assets/misc/fileUploader";

export const PostForm = ({ history }) => {
  const title = useRef();
  const description = useRef();
  const preview = useRef();

  const [attachmentFile, setAttachmentFile] = useState({
    type: null,
    link: null,
    file: null,
  });

  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState([]);

  const handleCatChange = (event) => {
    const {
      target: { value },
    } = event;
    setCategories(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const PreviewFile = () => {
    let temp = "This type of file is not supported";
    if (attachmentFile.type.includes("video")) {
      temp = (
        <video className="w-full h-full" controls>
          <source src={attachmentFile.link.toString()} type="video/mp4" />
        </video>
      );
      document.getElementById("placeholder").style.display = "none";
    }

    if (attachmentFile.type.includes("image")) {
      temp = <img alt="" src={attachmentFile.link.toString()} className="w-full h-full" />;
      document.getElementById("placeholder").style.display = "none";
    }
    document.getElementById("placeholder").style.display = "none";
    return temp;
  };

  function PreviewAttachmentHandler(e) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(e.target.files[0]);
    fileReader.onload = function () {
      if (!e.target.files[0].type.includes("image") && !e.target.files[0].type.includes("video")) {
        toast.error("This type of file is not supported!");
      }
      else {
        setAttachmentFile({
          type: e.target.files[0].type,
          link: fileReader.result.toString(),
          file: e.target.files[0],
        });
      }
    };
  }

  async function SubmitFormHandler(e) {
    try {
      setLoading(true);
      e.preventDefault();
      const url = await UploadFile(attachmentFile.file);
      const attachmentType = attachmentFile.type.includes("image") ? 2 : 1;
      const payload = {
        title: title.current.value,
        description: description.current.value,
        fileUrl: url,
        attachmentType: attachmentType,
        preview: preview.current.value,
        status: 0,
        tagMaps: convertNameToId(categories),
      }
      await AddPost(payload);
      setLoading(false);
      history.push("/");
    }
    catch {
      toast.error("Error submitting your post, check all your fields and try again.")
      setLoading(false);
    }
  }

  async function AddPost(o) {
    await axios
      .post(API_URL + "/posts", o)
      .then((response) => {
        toast.success("Your post has been created!")
      });
  }

  return (
    <div>
      <Navbar></Navbar>
      <form onSubmit={SubmitFormHandler} className="w-full md:w-11/12 lg:w-10/12 mx-auto lg:p-10 md:p-5 sm:p-2">
        <Backdrop open={loading} sx={{ zIndex: "9999" }}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <Paper elevation={4} className="p-6 border">
              <Typography className="text-neutral-700 flex justify-center items-center" variant="h4" fontWeight="bold">
                <Assessment fontSize="large" />
                Post's data
              </Typography>
              <TextField fullWidth inputRef={title} placeholder="An eye-catching title..." label="Title" margin="normal" />
              <TextField multiline inputRef={description} fullWidth placeholder="What is your post about?" rows={8} label="Description" margin="normal" />
              <hr className="mt-4 mb-4" />
              <div className="text-lg font-bold text-neutral-600 mb-2 flex items-center gap-1">
                <Tooltip arrow placement="top" title="Media content for your post">
                  <Info />
                </Tooltip>
                Choose attachment
              </div>
              <div className="flex justify-between align-center">
                <input
                  required
                  accept="image/*,video/*"
                  type="file"
                  className="mb-4 block w-full text-sm text-slate-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    transition-all
                    duration-300
                    file:bg-pink-100 file:text-pink-400
                    hover:file:bg-pink-200
                    hover:drop-shadow-lg"
                  onChange={PreviewAttachmentHandler}
                />
              </div>
              <div id="placeholder" className="border-dashed border w-full h-56 flex items-center justify-center text-neutral-600">
                Preview your attachment here
              </div>
              {attachmentFile.link != null && (
                <div className="flex items-center justify-center">
                  <PreviewFile></PreviewFile>
                </div>
              )}
            </Paper>
          </div>
          <div className="col-span-1">
            <Paper elevation={4} className="p-6 border">
              <Typography className="text-neutral-700 flex justify-center items-center" variant="h4" fontWeight="bold">
                <Settings fontSize="large" />
                Settings
              </Typography>
              <FormControl fullWidth margin="normal">
                <InputLabel id="catSelectLabel">Category</InputLabel>
                <Select
                  labelId="catSelectLabel"
                  id="catSelect"
                  multiple
                  value={categories}
                  onChange={handleCatChange}
                  renderValue={(selected) => selected.join(', ')}
                  input={<OutlinedInput label="Category" />}
                >
                  {categoryList.map((category) => (
                    <MenuItem key={category.id} value={category.name}>
                      <Checkbox checked={categories.indexOf(category.name) > -1} />
                      <ListItemText primary={category.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField multiline inputRef={preview} fullWidth margin="normal" placeholder="Preview about your post" rows={3} label="Preview" helperText="Preview help people get to know your post!" />

              <Button variant="contained" fullWidth type="submit" sx={{ mt: "16px;" }} >Create post</Button>
            </Paper>
          </div>
        </div>
      </form>
    </div>

  );
};

