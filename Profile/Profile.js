terminal.addEventListener("message", (event) => {
	let message = event.data || {};
		message.code = message.code || "",
		message.data = !(message.data != false && !message.data) ? message.data : "";

	switch (message.code) {
		case "Code-SendHasLogined":
			if (!message.data) location.href = "/SimpleThread-Debug/Error/401/";
			break;
	}
});

window.addEventListener("DOMContentLoaded", () => {
	DOM("#Profile_Photo").dataset.uid = base.user.uid;

	DOM("#Profile_Info_URL").childNodes[0].querySelector('Span.mdl-list__item-primary-content').dataset.locales = "profile.url";
	locales.applyToElement(DOM("#Profile_Info_URL").childNodes[0].querySelector('Span.mdl-list__item-primary-content'));

	DOM("#Profile_Info_URL_Add").addEventListener("click", () => {
		DOM("#Profile_Info_URL").childNodes[DOM("#Profile_Info_URL").childNodes.length - 1].querySelector('Span.mdl-list__item-primary-content > *:nth-Child(1) > Label').dataset.locales = "profile.url.title",
		DOM("#Profile_Info_URL").childNodes[DOM("#Profile_Info_URL").childNodes.length - 1].querySelector('Span.mdl-list__item-primary-content > *:nth-Child(2) > Label').dataset.locales = "profile.url.value";
		locales.applyToElement(DOM("#Profile_Info_URL").childNodes[DOM("#Profile_Info_URL").childNodes.length - 1].querySelector('Span.mdl-list__item-primary-content > *:nth-Child(1) > Label')),
		locales.applyToElement(DOM("#Profile_Info_URL").childNodes[DOM("#Profile_Info_URL").childNodes.length - 1].querySelector('Span.mdl-list__item-primary-content > *:nth-Child(2) > Label'));
	});

	

	base.Database.get(base.Database.ONCE, "users", (res) => {
		for (let uid in res) {
			let photoStyle = new Components.Styles.ProfilePhotoManager(uid, res[uid].gplusPhoto);
			
			document.head.appendChild(photoStyle);
		}
	});

	base.Database.get(base.Database.INTERVAL, "users/" + base.user.uid, (res) => {
		res.links = res.links || [];

		DOM("#Profile_Info_Name").classList.add("is-dirty"),
		DOM("#Profile_Info_Name-Input").value = res.userName;
		DOM("#Profile_Info_Detail").classList.add("is-dirty"),
		DOM("#Profile_Info_Detail-Input").value = res.detail;

		(() => {
			let clientListLength = DOM("#Profile_Info_URL").dataset.listlength;

			if (res.links.length - clientListLength > 0) {
				for (let i = 0; i < res.links.length - clientListLength; i++) {
					DOM("#Profile_Info_URL_Add").click();
				}
			} else {
				for (let i = 0; i < clientListLength - res.links.length; i++) {
					DOM("#Profile_Info_URL").children[0].querySelector('Button[ID*="Remove"]').click();
				}
			}

			for (let i = 0; i < res.links.length; i++) {
				let currentList = DOM("#Profile_Info_URL").querySelector('Li[Data-ItemID="' + i + '"]');
					currentList.querySelectorAll("Div").forEach((container) => {
						container.classList.add("is-dirty");
					});
					
					currentList.querySelector('Input[Data-FieldID="0"]').value = res.links[i].name,
					currentList.querySelector('Input[Data-FieldID="1"]').value = res.links[i].url;
			}
		})();
	});



	DOM("#Profile_Info_Btns_Save").addEventListener("click", () => {
		base.Database.update("users/" + base.user.uid, {
			userName: DOM("#Profile_Info_Name-Input").value,
			detail: DOM("#Profile_Info_Detail-Input").value,

			links: (() => {
				let links = [];

				for (let i = 0; i < DOM("#Profile_Info_URL").dataset.listlength; i++) {
					let currentList = DOM("#Profile_Info_URL").querySelector('Li[Data-ItemID="' + i + '"]');

					links.push({
						name: currentList.querySelector('Input[Data-FieldID="0"]').value,
						url: currentList.querySelector('Input[Data-FieldID="1"]').value
					});
				}

				return links;
			})()
		});
	});



	let doc = parent.document;

	DOM("#Profile_Info_Btns_Save").addEventListener("click", () => {
		doc.querySelector("#Dialogs_Profile_ChangeNotify").showModal();
	});

	DOM("#Profile_Info_Btns_Delete").addEventListener("click", () => {
		doc.querySelector("#Dialogs_Profile_DeleteConfirmer").showModal();
	});
});