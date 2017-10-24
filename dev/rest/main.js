let csl = null;

window.addEventListener("DOMContentLoaded", () => {
	csl = new JSCAFD();
	csl.log(Base);
	csl.log(Base.send);

	DOM("#Base_send").addEventListener("click", () => {
		try {
			Base.send(DOM("#Base_send-Arg1").value);
		} catch (err) {
			csl.log(err);
		}
	});
});