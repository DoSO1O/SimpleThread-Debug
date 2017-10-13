window.addEventListener("DOMContentLoaded", () => {
	let watchers = [];

	DOM('@Dialog').forEach((dialog) => {
		dialogPolyfill.registerDialog(dialog);

		if (dialog.querySelector('Button[Data-Action="Dialog_Submit"]')) {
			dialog.addEventListener("keydown", (event) => {
				if (event.ctrlKey && event.keyCode == 13) dialog.querySelector('Button[Data-Action="Dialog_Submit"]').click();
			});
		}

		dialog.querySelectorAll('Dialog *[Required]').forEach((input) => {
			input.addEventListener("input", () => {
				let result = true;

				dialog.querySelectorAll('Dialog *[Required]').forEach(requiredField => {
					if (requiredField.value.replace(/\s/g, "").length == 0) {
						result = false;
						return;
					}
				});

				if (result) {
					dialog.querySelector('Button[Data-Action="Dialog_Submit"]').classList.remove("mdl-button--disabled");
				} else {
					dialog.querySelector('Button[Data-Action="Dialog_Submit"]').classList.add("mdl-button--disabled");
				}
			});
		});
		
		dialog.querySelectorAll('Dialog Button[Data-Action="Dialog_Close"]').forEach((btn) => {
			btn.addEventListener("click", () => {
				btn.offsetParent.close();
			});
		});
	});


	
	DOM("#Dialogs_Profile_DeleteConfirmer_Content_Email_Input").addEventListener("input", () => {
		if (DOM("#Dialogs_Profile_DeleteConfirmer_Content_Email_Input").value == base.user.email) {
			DOM("#Dialogs_Profile_DeleteConfirmer_Btns_Yes").classList.remove("mdl-button--disabled");
		} else {
			DOM("#Dialogs_Profile_DeleteConfirmer_Btns_Yes").classList.add("mdl-button--disabled");
		}
	});

	DOM("#Dialogs_Profile_DeleteConfirmer_Btns_Yes").addEventListener("click", (event) => {
		if (!event.currentTarget.classList.contains("mdl-button--disabled")) {
			if (DOM("#Dialogs_Profile_DeleteConfirmer_Content_Email_Input").value == base.user.email) {
				base.delete();
			} else {
				DOM("#Dialogs_Profile_DeleteConfirmer_Content_Email").classList.add("is-invalid");
			}
		}
	});



	watchers["Dialogs_Profile_InfoViewer_UID"] = {
		valueObj: { value: "" },
		watcher: null
	}; watchers["Dialogs_Profile_InfoViewer_UID"].watcher = new DOM.Watcher({
		target: watchers["Dialogs_Profile_InfoViewer_UID"].valueObj,
		onGet: () => { watchers["Dialogs_Profile_InfoViewer_UID"].valueObj.value = DOM("#Dialogs_Profile_InfoViewer_UID").value },

		onChange: (watcher) => {
			base.Database.get(base.Database.ONCE, `users/${watcher.newValue}`, (res) => {
				DOM("#Dialogs_Profile_InfoViewer_Content_Photo").dataset.uid = watcher.newValue,
				DOM("#Dialogs_Profile_InfoViewer_Content_Info_Name").textContent = res.userName,
				DOM("#Dialogs_Profile_InfoViewer_Content_Info_Detail").textContent = res.detail;

				while (DOM("#Dialogs_Profile_InfoViewer_Content_Info_Links").childNodes.length > 0) DOM("#Dialogs_Profile_InfoViewer_Content_Info_Links").childNodes[0].remove();
				
				if (res.links) {
					for (let i = 0; i < res.links.length; i++) {
						let link = new Components.Dialogs.Profile.InfoViewer.Links.Link(res.links[i].name, res.links[i].url);

						DOM("#Dialogs_Profile_InfoViewer_Content_Info_Links").appendChild(link);
					}
				}
			});
		}
	});



	DOM("#Dialogs_Thread_InfoInputer_Btns_OK").addEventListener("click", (event) => {
		if (!event.currentTarget.classList.contains("mdl-button--disabled")) {
			base.Database.transaction("threads", (res) => {
				let now = new Date().getTime();

				base.Database.set("threads/" + res.length, {
					title: DOM("#Dialogs_Thread_InfoInputer_Content_Name_Input").value,
					overview: DOM("#Dialogs_Thread_InfoInputer_Content_Overview_Input").value,
					detail: DOM("#Dialogs_Thread_InfoInputer_Content_Detail_Input").value,

					jobs: {
						Owner: (() => {
							let owner = {}; owner[base.user.uid] = "";
							return owner;
						})(),

						Admin: {

						}
					},

					createdAt: now,
					
					data: [
						{
							uid: base.user.uid,
							content: DOM("#Dialogs_Thread_InfoInputer_Content_Name_Input").value,
							createdAt: now
						}
					],

					password: ""
				});
				
				DOM("#Dialogs_Thread_InfoInputer").close();
				parent.document.querySelector("IFrame.mdl-layout__content").src = "Thread/Viewer/?tid=" + res.length;
			});
		}
	});



	DOM("#Dialogs_Thread_PasswordConfirmer_Btns_OK").addEventListener("click", (event) => {
		if (!event.currentTarget.classList.contains("mdl-button--disabled")) {
			if (DOM("#Dialogs_Thread_PasswordConfirmer_Content_Password_Input").value == DOM("#Dialogs_Thread_PasswordConfirmer_Password").value) {
				//DOM("$IFrame.mdl-layout__content").src = DOM("#Dialogs_Thread_PasswordConfirmer_Link").value;
			} else {
				DOM("#Dialogs_Thread_PasswordConfirmer_Content_Password").classList.add("is-invalid");
			}
		}
	});

	DOM("#Dialogs_Thread_PasswordConfirmer_Btns_Cancel").addEventListener("click", (event) => {
		DOM("$IFrame.mdl-layout__content").src = "/SimpleThread-Debug/Thread/";
	});



	watchers["Dialogs_Thread_InfoViewer_TID"] = {
		valueObj: { value: "0" },
		watcher: null
	}; watchers["Dialogs_Thread_InfoViewer_TID"].watcher = new DOM.Watcher({
		target: watchers["Dialogs_Thread_InfoViewer_TID"].valueObj,
		onGet: () => { watchers["Dialogs_Thread_InfoViewer_TID"].valueObj.value = DOM("#Dialogs_Thread_InfoViewer_TID").value },

		onChange: (watcher) => {
			base.Database.get(base.Database.ONCE, `threads/${watcher.newValue}`, (res) => {
				DOM("#Dialogs_Thread_InfoViewer_Content_Name").textContent = res.title,
				DOM("#Dialogs_Thread_InfoViewer_Content_Overview").textContent = res.overview,
				DOM("#Dialogs_Thread_InfoViewer_Content_Detail").textContent = res.detail;

				URL.filter(DOM("#Dialogs_Thread_InfoViewer_Content_Overview").textContent).forEach((urlString) => {
					DOM("#Dialogs_Thread_InfoViewer_Content_Overview").innerHTML = DOM("#Dialogs_Thread_InfoViewer_Content_Overview").innerHTML.replace(urlString, `<A Href = "${urlString}" Target = "_blank">${urlString}</A>`);
				});
	
				URL.filter(DOM("#Dialogs_Thread_InfoViewer_Content_Detail").textContent).forEach((urlString) => {
					DOM("#Dialogs_Thread_InfoViewer_Content_Detail").innerHTML = DOM("#Dialogs_Thread_InfoViewer_Content_Detail").innerHTML.replace(urlString, `<A Href = "${urlString}" Target = "_blank">${urlString}</A>`);
				});
			});
		}
	});

	

	DOM("#Dialogs_Thread_Poster_Btns_OK").addEventListener("click", (event) => {
		if (!event.currentTarget.classList.contains("mdl-button--disabled")) {
			base.Database.transaction("threads/" + DOM("#Dialogs_Thread_Poster_TID").value + "/data", (res) => {
				base.Database.set("threads/" + DOM("#Dialogs_Thread_Poster_TID").value + "/data/" + res.length, {
					uid: base.user.uid,
					content: DOM("#Dialogs_Thread_Poster_Content_Text_Input").value,
					createdAt: new Date().getTime()
				});

				DOM("#Dialogs_Thread_Poster_Btns_OK").classList.add("mdl-button--disabled"),
				DOM("#Dialogs_Thread_Poster_Content_Text").classList.remove("is-dirty"),
				DOM("#Dialogs_Thread_Poster_Content_Text_Input").value = "";
				
				DOM("#Page").contentDocument.querySelector("#FlowPanel_Btns_CreatePost").removeAttribute("Disabled");
				
				DOM("#Dialogs_Thread_Poster").close();
			});
		}
	});

	DOM("#Dialogs_Thread_Poster_Btns_Cancel").addEventListener("click", () => {
		DOM("#Dialogs_Thread_Poster_Btns_OK").classList.add("mdl-button--disabled"),
		DOM("#Dialogs_Thread_Poster_Content_Text").classList.remove("is-dirty"),
		DOM("#Dialogs_Thread_Poster_Content_Text_Input").value = "";

		DOM("#Page").contentDocument.querySelector("#FlowPanel_Btns_CreatePost").removeAttribute("Disabled");
	});



	for (let watcherName in watchers) DOM.Watcher.addWatcher(watchers[watcherName].watcher);
});