window.base = parent.base || {};
window.wThread = parent.wThread || {};

window.addEventListener("DOMContentLoaded", () => {
	if (!base.Database) {
		location.href = "/SimpleThread-Debug/Error/403.10/";
	}

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