const addForm = document.querySelector('.add');
const list = document.querySelector('.todos');
const clearAll = document.querySelector('.bottomForm');
const containerList = document.querySelector('.containerList');
// salvato gli items dal local storage in una variabile
let storedItems = localStorage.getItem('tasks');

const generateTemplate = todo => {
    const html = `
    <li class="newList">
        <div class="tick">
            <input type="checkbox" id="" name="" value="">
        </div>
        <div class="content">
            <span>${todo}</span>
            <i class="fas fa-times delete"></i>
        </div>
    </li>`
    
    list.innerHTML += html;
}

if (!storedItems) {
    storedItems = [];
} else {
    storedItems = JSON.parse(storedItems);
    storedItems.forEach(item => {
        generateTemplate(item);
    });
}

addForm.addEventListener('submit', e => {
    const todo = addForm.add.value.trim();
    e.preventDefault();
    if (todo.length) {
        generateTemplate(todo); 
        storedItems.push(todo);
        localStorage.setItem('tasks', JSON.stringify(storedItems))
        addForm.reset();
        console.log(`${todo} has been added to html list`)
        console.log(`Local storage now contains ${storedItems}`)
        document.getElementById("numberItems").innerHTML = `${storedItems.length} item(s) `; //counting element when added
        console.log(`aftr adding, now the items are ${storedItems.length}`)

    }
});

/*Removing item*/
containerList.addEventListener('click', e => {
    console.log(e.target);
    if (e.target.classList.contains('delete')) {
        e.target.parentElement.parentElement.remove();
        let removedItem = e.target.parentElement.firstElementChild.innerText;
        //console.log(`${removedItem} has been removed from the html list`);
        //console.dir(e.target.parentElement.firstElementChild.innerText);
        //console.log(storedItems)
        const newArr = storedItems.filter(item => item !== removedItem)
        //console.log(newArr)
        storedItems = newArr
        localStorage.setItem('tasks', JSON.stringify(storedItems))
        document.getElementById("numberItems").innerHTML = `${storedItems.length} item(s) `; //counting element when deleted
        //console.log(`Local storage now contains ${storedItems} `)
        //console.log(`after removing, now the items are ${storedItems.length}`)
    }
    if (e.target.classList.contains('clears')){

        window.localStorage.removeItem('tasks');
        console.log('clear button has been pushed')
        //document.getElementsByClassName("newList").innerHTML = ''
        // for (const child of list.children) {
        //     child.remove()
        //   }
    
        for (let i= list.childNodes.length -1; i>=0; i--) {
            list.childNodes[i].remove()
            //list.removeChild(list.lastChild)
        }
        // const storeArray = [...list.children].forEach(child => child.remove())
        // storedItems = storeArray;
    }
    
    
    
})



/*buttom list functions*/

// function deleteAll() {
//     //list.removeAllChildNodes();
//     // document.getElementsByClassName("newList").innerHTML = 'ciao'
//     // console.log('it has been clicked');
//    //document.getElementsByTagName('li').remove()
//    console.log(list.remove())

// }

function myFunction() {

    console.log('it has been clicked');
}

// clearAll.addEventListener('click', e => {
// console.log(e.target);
// if (e.target.classList.contains('clears')){
//     //list.children.remove();
//     window.localStorage.removeItem('tasks');
//     console.log('clear button has been pushed')
// }
// })