class LangLoader extends JSONLoader {
	constructor () { super() }

	/**
	 * 指定されたurlからローカライズデータを読み込む
	 * @memberof LangLoader
	 * 
	 * @param {String} lang
	 */
	load (lang) {
		super.load(`/SimpleThread-Debug/assets/locales/${lang}.json`);
	}
}