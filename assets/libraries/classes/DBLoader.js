class DBLoader extends FirebasePlus {
	constructor (configUrl = "assets/firebase.json", onload = () => {}) {
		let cfgLoader = new JSONLoader();
		
		super(cfgLoader.load(configUrl), onload);
	}
}