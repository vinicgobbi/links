function renderSocialLinks(socialLinks) {
	let obj = Object.keys(socialLinks)
	let section = document.querySelector("section")
	for (let i = 0; i < obj.length; i++){
		let social = document.createElement("div")
		function redirect(){
			social.style.background = '#fff'
			social.style.color = '#282828'
			open(`${socialLinks[obj[i]]}`)
		}
		social.setAttribute('class',`social`)
		social.onclick = redirect
		social.innerHTML = obj[i]
		section.appendChild(social)
	}
}

const xhr = new XMLHttpRequest()

// after the request was completed, it will parse the json and load the content normally

xhr.onload = () => {
	const socialLinks = JSON.parse(xhr.response)
	renderSocialLinks(socialLinks)

}

// send a get request to the links.json file

xhr.open("GET", "/links/assets/links.json")
xhr.send()
