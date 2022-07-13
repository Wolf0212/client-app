import { Button } from "@mui/material"
import { connect } from "react-redux"

function Homepage({ count, incrementCountAsync }) {
    return (
        <div>
            <Button variant="outlined" onClick={() => {
                incrementCountAsync(1);
                alert("clicked");
            }}  >Click me</Button>
            <h1>{count} clicked</h1>
        </div>
        
    )
}


const mapStateToProps = (dispatch) => ({
    count: dispatch.userModel.count,
})

const mapDispatchToProps = (dispatch) => ({
    incrementCountAsync: dispatch.userModel.incrementCountAsync,
})

export default connect(mapStateToProps, mapDispatchToProps)(Homepage)
