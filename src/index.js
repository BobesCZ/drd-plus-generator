import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import Layout from "./components/Layout";
import store from "./store/index";

import startActions from "./startActions";

startActions();

ReactDOM.render(
	<Provider store={store}>
	    <Layout />
	</Provider>,
    document.getElementById("root")
);
