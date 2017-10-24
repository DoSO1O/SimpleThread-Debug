window.addEventListener("DOMContentLoaded", () => {
	document.body.appendChild(new Text(Base));

	DOM("#Base_send").addEventListener("click", () => {
		try {
			Base.send(DOM("#Base_send-Arg1").value);
		} catch (err) {
			document.body.appendChild(new Text(err));
		}
	});
});