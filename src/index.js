import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import Layout from "./components/Layout";
// import redux from "./redux";
import store from "./store/index";

ReactDOM.render(
	<Provider store={store}>
	    <Layout />
	</Provider>,
    document.getElementById("root")
);
