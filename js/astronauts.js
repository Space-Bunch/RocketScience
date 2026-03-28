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

// Получить карточку со списком карточек. size - размер. entryes - список id якорей карточек.
function html_card_list(size="normal",entryes=[]) {
    let entryes_list = ""
    for(let line = entryes.length; line--; line > 0){
        entryes_list = entryes_list+`<a class="yellow link" href="#${entryes[line]}">${entryes[line].replaceAll(".json","")}</a><br>\n`
    }
    let html = `<div class="history_card ${size} yellow">
        <div style="grid-column: 1; grid-row: 2;">
            <h2> </h2>
            <div class="history_card_description">
                <div style="height: 10px; display: grid; grid-template-columns: 1fr 1.5fr 4fr;">
                    <hr class="yellow" style="grid-column: 1;"></hr>
                    <p style="grid-column: 2; margin-left: 30px; margin-right: 30px; margin-top: 7px; text-wrap: nowrap;"><b  style="${get_font_size()}">Лист карточек</b></p>
                    <hr class="yellow" style="grid-column: 3;"></hr>
                </div>
            <p style="margin-left: 10px; ${get_font_size()}">${entryes_list}</p></div></div>
        <div style="grid-column: 2; grid-row: 2; width: 100%; height: 100%;">
            <img src="../resources/list.png" class="yellow" style="height: 200px; border-radius: 5px; border-width: 5px; border-style: solid;"></img>
        </div></div>`
    const templete = document.createElement("template");
    templete.innerHTML = html.trim();
    return templete.content.firstElementChild;
}

// Получить карточку. title - заголовок. desc - описание. date - дата. img - иконка. size - размер. json - название файла.
function html_card(title="",desc="",date="",img="",size="static_normal",json="") {
    let html = `
    <div class="astronauts_card ${size} yellow">
        <a class="card_anchor" name="${json}" style="grid-column: 1; grid-row: 2;"></a>
        <div style="grid-column: 1; grid-row: 2;">
            <div>
                <button class="static yellow" popovertarget="${json+'_sourse'}"><h2>${title}</h2></button>
            </div>
            <div class="history_card_description">
                <div style="height: 10px; display: grid; grid-template-columns: 1fr 1fr 4fr;">
                    <hr class="yellow" style="grid-column: 1;"></hr>
                    <p style="grid-column: 2; margin-left: 30px; margin-right: 30px; margin-top: 7px; font-size:105%; text-wrap: nowrap; ${get_font_size()}"><b>${date}</b></p>
                    <hr class="yellow" style="grid-column: 3;"></hr>
                </div>
            <p style="margin-left: 10px; ${get_font_size()}">${desc}</p></div></div>
        <div style="grid-column: 2; grid-row: 2; width: 100%; height: 100%;">
            <img src="../resources/${img}" class="yellow" style="height: 200px; border-radius: 5px; border-width: 5px; border-style: solid;"></img>
        </div></div>`
    const templete = document.createElement("template");
    templete.innerHTML = html.trim();
    return templete.content.firstElementChild;
}

// Получить html для исотчника. json - название файла. soures - источник (url ссылака).
function html_card_souse(json="",soures="") {
    let html = `
    <button id="${json+'_sourse'}" class="card_sourse static transperent_yellow" popover popovertarget="${json+'_sourse'}">
        <div class="yellow" style="top: 10%; height: 80%; border-radius: 2px; outline-width: 5px; outline-style: solid;">
            <iframe style="width: 100%; height: 100%;" src="${soures}"></iframe><br>
        </div>
    </button>`
    const templete = document.createElement("template");
    templete.innerHTML = html.trim();
    return templete.content.firstElementChild;
}

// Добавить карточку со списком карточек. entryes - список id якорей карточек.
function add_card_list(entryes=[]){
    let root_element = window.root_tag;
    root_element.append(html_card_list("normal",entryes))
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
    const cards = ["Юрий Алексеевич Гагарин", "Нил Олден Армстронг","Франко Малерба","Зигмунд Йен","Харрисон Шмит","Александр Михайлович Самокутяев","Алексей Леонов","Герман Титов","Валентина Терешкова"].reverse()
    let entryes = []
    // состовляет спикок для add_card_list().
    for (let entry = cards.length; entry--; entry > 0){
        entryes.push(`${cards[entry]}.json`)
    }
    // добовление всех карточек.
    add_card_list(entryes)
    for (let card = cards.length; card--; card > 0){
        add_card(`${cards[card]}.json`)
    }
};