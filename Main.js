window.base = null;
window.wThread = new Worker("Worker.js");

window.addEventListener("DOMContentLoaded", () => {
	base = new FirebasePlus({
		apiKey: window.atob("QUl6YVN5QTYydVBrTjZXTlY0MW9XV3pPZGlJVE1iQkY5UkRZT2hN"),
		authDomain: "simple-thread.firebaseapp.com",
		databaseURL: "https://simple-thread.firebaseio.com",
		projectId: "simple-thread",
		storageBucket: "simple-thread.appspot.com",
		messagingSenderId: window.atob("NjQ2NTI3MzA2ODAz")
	}, (user) => {
		if (user) {
			base.Database.getInfo(base.Database.ONCE, "users/" + user.uid, (res) => {
				if (!res.exists()) {
					base.Database.set("users/" + user.uid, {
						gplusName: user.providerData[0].displayName,
						gplusPhoto: user.photoURL,
						userName: user.providerData[0].displayName,
						detail: "",
						links: []
					});

					document.querySelector("#Dialogs_Account_CreateNotify").showModal();
				}

				DOM('@A[UUID="ProfilePhoto-Btn"]').forEach((btn) => {
					btn.dataset.uid = base.user.uid;
				});

				base.Database.update("users/" + user.uid, {
					gplusName: user.providerData[0].displayName,
					gplusPhoto: user.photoURL
				});
			});

			DOM("#Header_SignInOut").textContent = "Sign Out";
		} else {
			DOM('@*[Data-TagID="ProfilePhoto--Btn"]').forEach((btn) => {
				btn.setAttribute("Disabled", "");
			});
		}

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



	DOM("$IFrame#Page").addEventListener("load", () => {
		!DOM("#Drawer") || DOM("#Drawer").classList.remove("is-visible"),
		!DOM("$Div.mdl-layout__obfuscator") || DOM("$Div.mdl-layout__obfuscator").classList.remove("is-visible");

		if (DOM("$IFrame#Page").contentWindow.location.pathname != "/SimpleThread-Debug/Thread/Viewer/") DOM("#Header_Title").textContent = "Simple Thread";
	});

	DOM("#Header_SignInOut").addEventListener("click", () => {
		switch (DOM("#Header_SignInOut").textContent) {
			case "Sign In":
				base.signIn(["https://www.googleapis.com/auth/plus.login"]);
				break;
				
			case "Sign Out":
				base.signOut();
				break;
				
			default:
				alert("Got to Default.");
				break;
		}
	});
});

Notification.requestPermission(function (state) {
	/*switch (state) {
		case "default":
			break;
			
		case "granted":
			console.info("通知の許可が確認されました");
			break;
			
		case "denied":
			console.warn("通知の許可が確認されません");
			break;
	}*/
});