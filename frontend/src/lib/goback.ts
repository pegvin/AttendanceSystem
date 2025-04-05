import { goto } from "$app/navigation";
import { page } from "$app/state";

function _CalcPrevious(url: string) {
	let ret = url.substring(0, url.lastIndexOf('/'));
	return ret ? ret : "/";
}

export default function(times: number = 1) {
	let backURL = _CalcPrevious(page.url.pathname);
	for (let i = 0; i < times - 1; i++) {
		backURL = _CalcPrevious(backURL);
	}
	if (backURL) {
		goto(backURL);
	}
}
