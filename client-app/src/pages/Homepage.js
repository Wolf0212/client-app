import { Button } from "@mui/material";
import { connect } from "react-redux";
import Navbar from "../components/UI/Navbar";
import PostForm from "../components/Forms/PostForm";
import ChangePasswordForm from "../components/Forms/ChangePasswordForm";

function Homepage({ count, incrementCountAsync }) {
  return (
    <div>
      <Navbar></Navbar>
    </div>
  );
}

const mapStateToProps = (dispatch) => ({
  count: dispatch.userModel.count,
});

const mapDispatchToProps = (dispatch) => ({
  incrementCountAsync: dispatch.userModel.incrementCountAsync,
});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
