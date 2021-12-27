import React from "react"
import ReactDOM from "react-dom"
import {marsRovers as App} from "./controller.js"



// import { BrowserRouter as Router } from "react-router-dom"

ReactDOM.render(
  <React.StrictMode>
    {/* <Router> */}
    <App />
    {/* </Router> */}
  </React.StrictMode>,
  document.getElementById("root")
)


