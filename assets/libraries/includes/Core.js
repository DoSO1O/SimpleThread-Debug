window.base = parent.base || {};
window.terminal = parent.terminal || {};
window.locales = parent.locales || {};



try {
	terminal.postMessage({ code: "Code-Connected" });
	terminal.postMessage({ code: "Code-RequestLocales", data: localStorage.getItem("com.GenbuProject.SimpleThread.currentLocales") });
	terminal.postMessage({ code: "Code-RequestHasLogined" });
} catch (error) {
	location.href = "/SimpleThread-Debug/Error/403.10/";
}

window.addEventListener("message", (event) => {
	let message = event.data || {};
		message.code = message.code || "",
		message.data = !(message.data != false && !message.data) ? message.data : "";

	switch (message.code) {
		case "Code-SendLocalesToPage":
			let content = document.documentElement.outerHTML;

			for (let key in message.data) {
				content = content.replace(new RegExp("/\${" + key + "}/g"), message.data[key]);
			}

			break;
	}
});

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