window.base = parent.base || {};
window.terminal = parent.terminal || {};



/*if (!base.Database) {
	location.href = "/SimpleThread-Debug/Error/403.10/";
}*/

try {
	terminal.postMessage({ code: "Code-Connected" });
} catch (error) {
	location.href = "/SimpleThread-Debug/Error/403.10/";
}

window.addEventListener("DOMContentLoaded", () => {
	DOM('@A[Href]:Not([Target]):Not([Href^="javascript:"])').forEach((elem) => {
		elem.addEventListener("click", (event) => {
			event.preventDefault();

			parent.document.querySelector("IFrame.mdl-layout__content").src = elem.href;
		});
	});

	parent.document.querySelector("IFrame#Page").contentWindow.addEventListener("beforeunload", () => {
		parent.document.querySelectorAll("Dialog[Open]").forEach((dialog) => {
			dialog.close();
		});
	});
});