window.base = parent.base || {};
window.terminal = parent.terminal || {};
window.locales = parent.locales;



try {
	terminal.postMessage({ code: "Code-Connected" });
	terminal.postMessage({ code: "Code-RequestHasLogined" });
} catch (error) {
	location.href = "/SimpleThread-Debug/Error/403.10/";
}

window.addEventListener("DOMContentLoaded", () => {
	parent.applyLocales.call(this);

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

window.addEventListener("DOMNodeInserted", (event) => {
	//console.log(event);

	//parent.applyLocales(event.relatedNode);
})