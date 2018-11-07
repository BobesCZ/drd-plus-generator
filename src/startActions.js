import store from "./store/index";
import translations from "./translations";
import changeInfo from "./actions/changeInfo";

export default function startActions() {

	// Set initial name to Random peasant
	store.dispatch( changeInfo({ key: "name", value: translations["default-name"] + Math.floor(Math.random() * 100)}) )

	// jQuery init plugins
	$(function () {
		$('[data-toggle="popover"]').popover();
	});
};
