let notes = []
let certificates = []
let skills = []
let list = document.querySelectorAll('ul')
const EMPTY_CHAPTER = "Этот раздел пуст!!!"

function loadState() {
    // let list = document.querySelectorAll('ul')
    
    for (const item of list) {        
        // debugger;
        let li = document.createElement('li');
        if (!item.children.length) {            
            li.appendChild(document.createTextNode(EMPTY_CHAPTER));
            document.getElementById(item.id).appendChild(li);
        } 
    }    
}

loadState()


function addBtnFunc(t) {
        // debugger
        document.getElementById(t.parentNode.id.slice(0, t.parentNode.id.length - 1)).value = "";
        let div = document.createElement('div');
        let div1 = document.createElement('div');
        const txt = document.createTextNode("X");
        const txt1 = document.createTextNode("+");
        div.className = "close";
        div1.className = "add";
        div.appendChild(txt);
        div1.appendChild(txt1);
        t.appendChild(div);
        t.appendChild(div1);
}


for (const a of list) {
    a.addEventListener('click', function (ev) {
        debugger
        if(ev.target.tagName === "LI") {
           ev.target.classList.toggle('checked');
        } else if(ev.target.className === "close") {
           var div = ev.target.parentNode;
           div.remove();
           loadState()
        }
    }, false);
}

// let list = document.querySelector('ul');
// list.addEventListener('click', function (ev) {
//     debugger
//     if(ev.target.tagName === "LI") {
//        ev.target.classList.toggle('checked');
//     } else if(ev.target.tagName === "DIV") {
//        var div = ev.target.parentNode;
//        div.remove();
//     }
// }, false);

function addNote1() {
    let li = document.createElement('li');
    const inputValue = document.getElementById('note').value;
    const t = document.createTextNode(inputValue);
    li.appendChild(t);
    if(inputValue == "") {
       alert("Введите ваше дело!");
    } else {
       document.getElementById('notes').appendChild(li);
    }
    document.getElementById('note').value = "";
    let span = document.createElement('SPAN');
    const txt = document.createTextNode("X");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
}

function addNote() {
    // debugger
    for (const item of list) {
        if (item.id == 'notes') {
            if (item.children[0].innerHTML === EMPTY_CHAPTER) {
                // debugger
               item.removeChild(item.children[0])
            //    debugger
            }
        }
    }
    let li = document.createElement('li');
    const inputValue = document.getElementById('note').value; 
    // debugger   
    if (!inputValue) {
        return  
    } else {
        notes = [inputValue] 
        for (const i of notes) {
            const t = document.createTextNode(i);
            li.appendChild(t);
            if(t == "") {
                alert("Введите ваше дело!");
            } else {
                document.getElementById('notes').appendChild(li);
            }
            document.getElementById('note').value = "";
            addBtnFunc(li)        
        }
    }
    loadState()    
}

function addCertificate() {
    for (const item of list) {
        if (item.id == 'certificates') {
            if (item.children[0].innerHTML === EMPTY_CHAPTER) {
                // debugger
               item.removeChild(item.children[0])
            //    debugger
            }
        }
    }
    let li = document.createElement('li');
    const inputValue = document.getElementById('certificate').value; 
    // debugger   
    certificates = [inputValue] 
    for (const i of certificates) {
        const t = document.createTextNode(i);
        li.appendChild(t);
        if(t == "") {
            alert("Введите ваше дело!");
         } else {
            document.getElementById('certificates').appendChild(li);
         }
         document.getElementById('certificate').value = "";
         addBtnFunc(li)
    }

    loadState()     
}

function addSkill() {
    for (const item of list) {
        if (item.id == 'skills') {
            if (item.children[0].innerHTML === EMPTY_CHAPTER) {
                // debugger
               item.removeChild(item.children[0])
            //    debugger
            }
        }
    }
    let li = document.createElement('li');
    const inputValue = document.getElementById('skill').value; 
    // debugger   
    skills = [inputValue] 
    for (const i of skills) {
        const t = document.createTextNode(i);
        li.appendChild(t);
        if(t == "") {
            alert("Введите ваше дело!");
         } else {
            document.getElementById('skills').appendChild(li);
         }
         document.getElementById('skill').value = "";
         addBtnFunc(li)
    }

    loadState()    
}


