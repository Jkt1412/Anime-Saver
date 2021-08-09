
let animeInfo = []
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
const testBtn = document.getElementById("test-btn")

const animeInfoFromLocalStorage = JSON.parse(localStorage.getItem("animeInfo"))


/* function render(animeInfo) {
    let listItems = ""
    for (let i = 0; i < animeInfo.length; i++) {
        listItems += `
            <li style="display:flex;">
                <a target='_blank' href=${animeInfo[i][1]}>
                    ${animeInfo[i][0]}
                </a>
				<div>${animeInfo[i][2]}</div>
            </li>
        `
    }
    ulEl.innerHTML = listItems  
}*/



function render(animeInfo) {
	ulEl.innerHTML = ''
	//<button class="trash-btn"><i class="fa fa-trash"></i></button>
    for (let i = 0; i < animeInfo.length; i++) {
		const li = document.createElement("li")
		li.setAttribute("style","display:flex;")
		const a = document.createElement("a")
		a.setAttribute("target", "_blank")
		a.setAttribute("href" , animeInfo[i][1])
		a.textContent = animeInfo[i][0]
		const div = document.createElement("div")
		div.textContent = animeInfo[i][2]
		const butEl = document.createElement("button")
		butEl.setAttribute("class" , "trash-btn")
		butEl.addEventListener("click" , function() {
			animeInfo.splice(i,1)
			localStorage.setItem("animeInfo", JSON.stringify(animeInfo) )
			render(animeInfo)
		})
		const icon = document.createElement("i")
		icon.setAttribute("class" , "fa fa-trash")
		butEl.append(icon)
		li.append(a)
		li.append(div)
		li.append(butEl)
		ulEl.append(li)
    }
}


//document.body.addEventListener( 'click', function ( event ) {
//  if( event.target.id == "test" ) {
//    console.log("Trash button bought me here")
//  }
//} )



if (animeInfoFromLocalStorage){
	animeInfo = animeInfoFromLocalStorage
	render(animeInfo)
}

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
		console.log(tabs)
        animeInfo.push([tabs[0].title , tabs[0].url , inputEl.value])
		inputEl.value = ''
        localStorage.setItem("animeInfo", JSON.stringify(animeInfo) )
        render(animeInfo)
    })
})


testBtn.addEventListener("click", function(){
	chrome.tabs.query({active: true, currentWindow: true}, function(tab){
		console.log(chrome)
		chrome.tabs.executeScript(tab.tabId , {code : `document.querySelector("video").currentTime`},
		results => {
			const time = results && results[0]
			console.log(time)
		})
	})
})





//inputBtn.addEventListener("click", function() {
//    myLeads.push(inputEl.value)
//    inputEl.value = ""
//	// push myLeads into local storage
//	localStorage.setItem("myLeads",JSON.stringify(myLeads))
//    render(myLeads)
//})

deleteBtn.addEventListener("dblclick", function(){
	//clear myLeads
	animeInfo = []
	//clear Local Storage
	localStorage.clear()
	//Render correct things
	render(animeInfo)
})
