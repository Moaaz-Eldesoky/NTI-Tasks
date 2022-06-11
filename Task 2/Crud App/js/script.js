const addForm = document.querySelector("#addForm")
const editForm = document.querySelector("#editForm")
const contentWrap= document.querySelector("#contentWrap")
const taskHeads = ["username", "phone","age"]
// read from storage //union operator ||
const readFromStorage = (key, dataType = "") => {
    let data
    const myData = localStorage.getItem(key)
    if (dataType == "string") return myData
    try {
        data = JSON.parse(myData)
        if (!Array.isArray(data)) throw new Error("is not array")
    }
    catch (e) {
        data = []
    }
    return data
}
// write to storage
const writeDataToStorage = (key, value) =>{
    try{
        localStorage.setItem(key, JSON.stringify(value))
    }
    catch(e){
        localStorage.setItem(key, "[]")
    }
}
// add (create)
if(addForm){
    addForm.addEventListener("submit", function(e){
        e.preventDefault()
        const task = { status: false, id: Date.now() }
        taskHeads.forEach( h => task[h] = addForm.elements[h].value )
        const allTasks = readFromStorage("tasks")
        allTasks.push(task)
        writeDataToStorage("tasks", allTasks)
        addForm.reset()
        window.location.href = "index.html"
    })    
}
const createMyOwnElement = (parent, ele, text, classes) =>{
    const myEle = document.createElement(ele)
    if(text) myEle.textContent = text
    if(classes) myEle.classList=classes
    parent.appendChild(myEle)
    return myEle
}
const showAll = (allData) =>{
    contentWrap.innerHTML=""
    if(allData.length==0){
        const tr = createMyOwnElement(contentWrap, "tr", null, "alert alert-danger")
        const td = createMyOwnElement(tr, "td", "No Data Yet", "alert alert-danger")
        td.setAttribute("colspan", "3")
    }
    allData.forEach((task, i)=>{
        const tr = createMyOwnElement(contentWrap, "tr", null, null)
        createMyOwnElement(tr, "td", task.id, null)
        createMyOwnElement(tr, "td", task.username, null)
        createMyOwnElement(tr, "td", task.phone, null)
        createMyOwnElement(tr, "td", task.age, null)
        const td = createMyOwnElement(tr, "td", null, null)
        const showBtn = createMyOwnElement(td, "button", "show","btn btn-primary mx-3")
        const editBtn = createMyOwnElement(td, "button", "Edit","btn btn-warning mx-3")
        const delBtn = createMyOwnElement(td, "button", "Delete", "btn btn-danger mx-3")
        const statusBtn = createMyOwnElement(td, "button", "Activated", "btn btn-success mx-3")
        showBtn.addEventListener("click", function(e){
            window.alert(`${i}`)
        })    
        
        delBtn.addEventListener("click", (e)=>{
            allData.splice(i, 1)
            writeDataToStorage("tasks",allData)
            showAll(allData)
        }) 

        editBtn.addEventListener("click", (e) => editSingle(i))

        statusBtn.addEventListener("click", (e) => {
            if (!task.status) {
                statusBtn.classList = "btn btn-danger";
                statusBtn.textContent = "Inactivated"
                task.status = true;
                //the most important step to rewrite data in local storage with the new status;
                writeDataToStorage("tasks", allData)   
            }
            else {
                statusBtn.classList = "btn btn-success";
                statusBtn.textContent = "Activated";
                task.status = false;
                writeDataToStorage("tasks", allData)
        }})  
    })
}
if(contentWrap){
    const allData = readFromStorage('tasks')    
    showAll(allData)
}

// show single (read single)

// edit (update)
const editSingle = (i) => {
    localStorage.setItem("edit", i)
    window.location.href = "edit.html"
}

if (editForm) {
    const index = readFromStorage('edit', "string")
    const allData = readFromStorage("tasks")
    const task = allData[index]
    taskHeads.forEach(h => editForm.elements[h].value = task[h])
    editForm.addEventListener("submit", (e) => {
        e.preventDefault()
        taskHeads.forEach(h => allData[index][h] = editForm.elements[h].value)
        writeDataToStorage("tasks", allData)
        editForm.reset()
        window.location.href = "index.html"
    })
}
// delete (delete)
