window.addEventListener("DOMContentLoaded", () => {
	let querys = location.querySort();

	if (!querys.TID) {
		location.href = "/SimpleThread-Debug/Error/406/";
	}

	if (!base.user) {
		DOM("#FlowPanel_Btns_CreatePost").setAttribute("Disabled", "");
	}


	
	let doc = parent.document;
		doc.querySelector("#Dialogs_Thread_PasswordConfirmer_Link").value = location.href;
		doc.querySelector("#Dialogs_Thread_InfoViewer_TID").value = querys.TID;
		doc.querySelector("#Dialogs_Thread_Poster_TID").value = querys.TID;

	base.Database.get(base.Database.ONCE, "threads/" + querys.TID, (res) => {
		doc.querySelector("#Header_Title").textContent = `${res.title}`;

		if (res.password) {
			doc.querySelector("#Dialogs_Thread_PasswordConfirmer_Password").value = res.password;
			doc.querySelector("#Dialogs_Thread_PasswordConfirmer").showModal();
		}
	});

	base.Database.get(base.Database.ONCE, "users", (res) => {
		for (let uid in res) document.head.appendChild(new Components.Styles.ProfilePhotoManager(uid, res[uid].gplusPhoto));
	});

	base.Database.get(base.Database.INTERVAL, "threads/" + querys.TID + "/data", (res) => {
		resForIncrease = res, resForDecrease = res;

		resForIncrease = resForIncrease.filter((post, index, parent) => {
			if (post) {
				post.pid = index;
				return true;
			}
		});

		resForDecrease.forEach((post, index, parent) => {
			post.pid = index;
		});
		
		if (DOM("#Thread").children.length < resForIncrease.length) {
			for (let i = DOM("#Thread").children.length; i < resForIncrease.length; i++) {
				let post = new Components.Thread.Post(resForIncrease[i].pid, resForIncrease[i].uid, "", resForIncrease[i].content, new Date(resForIncrease[i].createdAt).toLocaleString());
					post.querySelector('A[UUID="Thread_Post_Header_ActorPhoto"]').addEventListener("click", () => {
						doc.querySelector("#Dialogs_Profile_InfoViewer_UID").value = resForIncrease[i].uid;
						doc.querySelector("#Dialogs_Profile_InfoViewer").showModal();
					});
					
				base.Database.get(base.Database.ONCE, "users/" + resForIncrease[i].uid, (userRes) => {
					post.querySelector('Span[UUID="Thread_Post_Header_Actor"]').textContent = userRes.userName;
				});

				URL.filter(post.querySelector('Div[UUID="Thread_Post_Content"]').textContent).forEach((urlString) => {
					post.querySelector('Div[UUID="Thread_Post_Content"]').innerHTML = post.querySelector('Div[UUID="Thread_Post_Content"]').innerHTML.replace(urlString, `<A Href = "${urlString}" Target = "_blank">${urlString}</A>`);
				});

				DOM("#Thread").appendChild(post);
			}
		} else {
			DOM('@Div[UUID="Thread_Post"]').forEach((post) => {
				if (!resForDecrease[post.dataset.pid]) post.remove();
			});
		}
	});



	DOM("#FlowPanel_Btns_CreatePost").addEventListener("click", () => {
		doc.querySelector("#Dialogs_Thread_Poster").showModal();

		DOM("#FlowPanel_Btns_CreatePost").setAttribute("Disabled", "");
	});

	DOM("#FlowPanel_Btns_ShowThreadInfo").addEventListener("click", () => {
		doc.querySelector("#Dialogs_Thread_InfoViewer").showModal();
	});
});