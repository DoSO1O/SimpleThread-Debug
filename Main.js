window.base = new DBLoader("/SimpleThread-Debug/assets/firebase.json", (user) => {
	if (user) {
		DOM("#Header_SignInOut").dataset.locales = "main.signOut";

		base.Database.getInfo(base.Database.ONCE, "users/" + user.uid, (res) => {
			DOM('@A[UUID="ProfilePhoto-Btn"]').forEach((btn) => {
				btn.dataset.uid = base.user.uid;
			});

			if (!res.exists()) {
				base.Database.set("users/" + user.uid, {
					gplusName: user.providerData[0].displayName,
					gplusPhoto: user.photoURL,
					userName: user.providerData[0].displayName,
					detail: "",
					links: []
				});

				DOM("#Dialogs_Account_CreateNotify").showModal();
			} else {
				base.Database.update("users/" + user.uid, {
					gplusName: user.providerData[0].displayName,
					gplusPhoto: user.photoURL
				});
			}
		});
	} else {
		window.addEventListener("DOMContentLoaded", () => {
			DOM('@*[UUID="ProfilePhoto-Btn"]').forEach((btn) => {
				btn.setAttribute("Disabled", "");
			});
		});
	}

	locales.applyToElement(DOM("#Header_SignInOut"));

	base.Database.get(base.Database.ONCE, "users", (res) => {
		for (let uid in res) {
			let photoStyle = new Components.Styles.ProfilePhotoManager(uid, res[uid].gplusPhoto);
			
			document.head.appendChild(photoStyle);
		}
	});



	let querys = location.querySort();

	if (querys.TID) {
		DOM("$IFrame.mdl-layout__content").src = "Thread/Viewer/?tid=" + querys.TID;
	}
});

window.terminal = (() => {
	let terminal = new Worker("Terminal.js");
		terminal.addEventListener("message", (event) => {
			let message = event.data || {};
				message.code = message.code || "",
				message.data = !(message.data != false && !message.data) ? message.data : "";

			switch (message.code) {
				case "Code-SendHasLogined_1":
					terminal.postMessage({
						code: "Code-SendHasLogined_2",
						data: base.user ? true : false
					});

					break;
			}
		});

	return terminal;
})();

window.locales = (() => {
	let locales = new LangLoader();
		locales.load(localStorage.getItem("com.GenbuProject.SimpleThread.currentLang"));

	return locales;
})();



window.addEventListener("DOMContentLoaded", () => {
	DOM("$IFrame#Page").addEventListener("load", () => {
		!DOM("#Drawer") || DOM("#Drawer").classList.remove("is-visible"),
		!DOM("$Div.mdl-layout__obfuscator") || DOM("$Div.mdl-layout__obfuscator").classList.remove("is-visible");

		if (DOM("$IFrame#Page").contentWindow.location.pathname != "/SimpleThread-Debug/Thread/Viewer/") locales.applyToElement(DOM("#Header_Title"));
	});

	DOM("#Header_SignInOut").addEventListener("click", () => {
		switch (DOM("#Header_SignInOut").dataset.locales) {
			case "main.signIn":
				base.signIn(["https://www.googleapis.com/auth/plus.login"]);
				break;
				
			case "main.signOut":
				base.signOut();
				break;
				
			default:
				alert("Got to Default.");
				break;
		}
	});
});