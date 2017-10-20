let doc = parent.document;

class Components {
	static get componentsDoc () {
		let doc = DOM("Body");

		try {
			doc.innerHTML = DOM.xhr({
				type: "GET",
				url: "/SimpleThread-Debug/assets/libraries/includes/Components.html",
				doesSync: false
			}).response;
		} catch (error) {}

		return doc;
	}

	static get componentIds () {
		return {
			Styles: {
				ProfilePhotoManager: {
					ROOT: '[UUID="Styles_ProfilePhoto--Manager"]'
				}
			},

			Dialogs: {
				Profile: {
					InfoViewer: {
						ROOT: '#Dialogs_Profile_InfoViewer',
						PHOTO: '#Dialogs_Profile_InfoViewer_Content_Photo',
						NAME: '#Dialogs_Profile_InfoViewer_Content_Info_Name',
						DETAIL: '#Dialogs_Profile_InfoViewer_Content_Info_Detail',

						LINKS: {
							ROOT: '#Dialogs_Profile_InfoViewer_Content_Info_Links',
							LINK: '[UUID="Dialogs_Profile_InfoViewer_Content_Info_Links_Link"]'
						}
					}
				}
			},

			Threadlist: {
				ROOT: '#Threadlist',

				THREAD: {
					ROOT: '[UUID="Threadlist_Thread"]',
					SECURED: '[UUID="Threadlist_Thread-Secured"]'
				}
			},

			Thread: {
				ROOT: '#Thread',
				POST: '[UUID="Thread_Post"]'
			}
		}
	}



	static get Styles () {
		return {
			ProfilePhotoManager: (() => {
				function ProfilePhotoManager (uid, photoUrl) {
					try {
						if (!this.constructor) throw new TypeError("Please use the 'new' operator, the component can't be called as a function.");
						
						let component = document.importNode(Components.componentsDoc.querySelector(`*${Components.componentIds.Styles.ProfilePhotoManager.ROOT}`), true);
						
						let componentWrapper = DOM("ComponentWrapper");
							componentWrapper.appendChild(component);

							componentWrapper.firstElementChild.outerHTML = componentWrapper.firstElementChild.outerHTML.replaces([
								[/\${uid}/g, uid || ""],
								[/\${photoUrl}/g, photoUrl || "/favicon.ico"]
							]);
							
						return componentWrapper.firstElementChild;
					} catch (error) {}
				}; ProfilePhotoManager.prototype = Object.create(null, {
					constructor: { value: ProfilePhotoManager }
				});
		
				return ProfilePhotoManager;
			})()
		}
	}
	
	static get Dialogs () {
		return {
			Profile: {
				InfoViewer: {
					Links: {
						Link: (() => {
							function Link (urlTitle, url) {
								try {
									if (!this.constructor) throw new TypeError("Please use the 'new' operator, the component can't be called as a function.");
									
									let component = document.importNode(Components.componentsDoc.querySelector(`*${Components.componentIds.Dialogs.Profile.InfoViewer.LINKS.LINK}`), true);
									
									let componentWrapper = DOM("ComponentWrapper");
										componentWrapper.appendChild(component);

										componentWrapper.firstElementChild.outerHTML = componentWrapper.firstElementChild.outerHTML.replaces([
											[/\${urlTitle}/g, urlTitle || url || "Untitled"],
											[/\${url}/g, url || ""]
										]);

										componentWrapper.querySelector('Img[UUID="Dialogs_Profile_InfoViewer_Content_Info_Links_Link_Icon"]').src = `${new URL(url).origin}/favicon.ico` || `${locaion.origin}/favicon.ico`;
										
									return componentWrapper.firstElementChild;
								} catch (error) {}
							}; Link.prototype = Object.create(null, {
								constructor: { value: Link }
							});
		
							return Link;
						})()
					}
				}
			}
		}
	}

	static get Threadlist () {
		return {
			Thread: (() => {
				function Thread (tid, title, isSecured) {
					try {
						if (!this.constructor) throw new TypeError("Please use the 'new' operator, the component can't be called as a function.");

						let component = document.importNode(Components.componentsDoc.querySelector(!isSecured ? `*${Components.componentIds.Threadlist.THREAD.ROOT}` : `*${Components.componentIds.Threadlist.THREAD.SECURED}`), true);

						let componentWrapper = DOM("ComponentWrapper");
							componentWrapper.appendChild(component);

							componentWrapper.firstElementChild.outerHTML = componentWrapper.firstElementChild.outerHTML.replaces([
								[/\${tid}/g, tid || ""],
								[/\${title}/g, title || ""]
							]);

						return componentWrapper.firstElementChild;
					} catch (error) {}
				}; Thread.prototype = Object.create(null, {
					constructor: { value: Thread }
				});

				return Thread;
			})()
		}
	}

	static get Thread () {
		return {
			Post: (() => {
				function Post (pid, uid, userName, content, createdAt) {
					try {
						if (!this.constructor) throw new TypeError("Please use the 'new' operator, the component can't be called as a function.");

						let component = document.importNode(Components.componentsDoc.querySelector(`*${Components.componentIds.Thread.POST}`), true);

						let componentWrapper = DOM("ComponentWrapper");
							componentWrapper.appendChild(component);

							componentWrapper.firstElementChild.outerHTML = componentWrapper.firstElementChild.outerHTML.replaces([
								[/\${pid}/g, pid + "" || ""],
								[/\${uid}/g, uid || ""],
								[/\${userName}/g, userName || ""],
								[/\${content}/g, content || ""],
								[/\${createdAt}/g, createdAt || ""]
							]);

						return componentWrapper.firstElementChild;
					} catch (error) {}
				}; Post.prototype = Object.create(null, {
					constructor: { value: Post }
				});

				return Post;
			})()
		}
	}
}