import { Button } from "@mui/material";
import { connect } from "react-redux";
import Navbar from "../components/UI/Navbar";
import ChangePasswordForm from "../components/Forms/ChangePasswordForm";

function Homepage({ count, incrementCountAsync }) {
  return (
    <div>
      <Navbar></Navbar>
      <Button
        variant="outlined"
        onClick={() => {
          incrementCountAsync(1);
          alert("clicked");
        }}
      >
        Click me
      </Button>
      <h1>{count} clicked</h1>
      <ChangePasswordForm></ChangePasswordForm>
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
