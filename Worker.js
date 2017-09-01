self.addEventListener("message", (event) => {
	let data = event.data;

	switch (data.TYPE) {
		case "NOTIFICATION":
			let notify = new Notification(data.value.title, {
				body: data.value.content,
				icon: data.value.icon
			}); notify.addEventListener("click", (res) => {
				res.currentTarget.close();
			});

			break;
	}
});