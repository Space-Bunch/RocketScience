// Получить размер текста. scale - маштаб текста. is_big - новый стиль/старый стиль.
function get_font_size(scale=1.0,is_big=true){
    let font_size =`font-size: ${150*scale}%;`
    if(!is_big){font_size =`font-size: 20px;`}
    if(navigator.userAgent.search("Mobile") > 0 || 
        navigator.userAgent.search("AppleWebKit") > 0 ||
        navigator.userAgent.search("Android") > 0){
            font_size = ""
        }
    return font_size;
}

// Получить карточку. title - заголовок. desc - описание. date - дата. img - иконка. size - размер. json - название файла.
function html_card(title="",desc="",date="",img="",size="exstra",json="") {
    let html = `<div class="baner_card ${size} green">
        <div style="margin-left: 20%; margin-right: 20%; margin-bottom: 0;">
            <img src="../resources/${img}" class="green" style="height: calc(width * 0.779014); width: 53.542vw; border-radius: 5px; border-width: 5px; border-style: solid;"></img>
        </div>
        <div>
            <div class="history_card_description">
                <div style="height: 10px; display: grid; grid-template-columns: 1fr 1fr 1fr;">
                    <hr class="green" style="grid-column: 1;"></hr>
                    <p style="grid-column: 2; margin-left: 30px; margin-right: 30px; margin-top: 7px; text-align: center; font-size: large; text-wrap: nowrap;">
                        <button class="static green" popovertarget="${json+'_sourse'}"><b style="${get_font_size()}">${title}</b></button>
                    </p>
                    <hr class="green" style="grid-column: 3;"></hr>
                </div>
            <p style="margin-left: 10px; ${get_font_size()}">${desc}</p></div></div>
        </div>`
    const templete = document.createElement("template");
    templete.innerHTML = html.trim();
    return templete.content.firstElementChild;
}

// Получить html для исотчника. json - название файла. soures - источник (url ссылака).
function html_card_souse(json="",soures="") {
    let html = `
    <button id="${json+'_sourse'}" class="card_sourse static transperent_green" popover popovertarget="${json+'_sourse'}">
        <div class="green" style="top: 10%; height: 80%; border-radius: 2px; outline-width: 5px; outline-style: solid;">
            <iframe style="width: 100%; height: 100%;" src="${soures}"></iframe><br>
        </div>
    </button>`
    const templete = document.createElement("template");
    templete.innerHTML = html.trim();
    return templete.content.firstElementChild;
}

// Добавить карточку. json - название файла.
function add_card(json="test.json"){
    let root_element = window.root_tag;
    let file = fetch(`../resources/cards/${json}`)
        .then(response => {
            if (!response.ok){throw new Error(`HTTP error! Status: ${response.status}`);}
            return response.json();
        })
        .then(data => {root_element.appendChild(html_card(data.title,data.description,data.date,data.img,data.size,json)); return data})
        .then(data => root_element.appendChild(html_card_souse(json,data.sourse)));
}

// (функция запускается при загрузке страницы)
window.onload = function() {
    // ВСТЯВЛЯТЬ ИМЕНА СЮДА \/ \/
    const cards = ["engine_how_w","engine_how_w2","engine_history"].reverse()
    // добовление всех карточек.
    for (let card = cards.length; card--; card > 0){
        add_card(`${cards[card]}.json`)
    }
};