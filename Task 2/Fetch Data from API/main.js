ApiDataWrab = document.querySelector("#ApiDataWrab");

const fetchData = async (callback) => {                         //pregnant Function😂
    try {
        let data = await fetch('https://jsonplaceholder.typicode.com/users');
        let jsonData = await data.json();
        // console.log(jsonData);
        callback(jsonData, false);
    } catch (error) {
        // console.log(error);
        callback(false, error);
    }
}

// create element
const createMyOwnElement = (parent, ele, text, clas) => {
    const myEle = document.createElement(ele)
    if (text) myEle.textContent = text
    if (clas) myEle.classList = clas
    parent.appendChild(myEle)
    return myEle
}

// function to read from storage :
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

// function of write to storage :
const writeToStorage = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value))
    }
    catch (e) {
        localStorage.setItem(key, "[]")
    }
}

// function to callAPI and do some operations :
fetchData(dataHandling)

//using theis func as a callback function to callAPI data and store it in localHast storage
function dataHandling(res, err) {
    res ? writeToStorage("api", res) : console.log(err);
}
const localHostData = readFromStorage("api");
localHostData.forEach(el => {
    tr = createMyOwnElement(ApiDataWrab, "tr", null, null)
    createMyOwnElement(tr, "td", el.id, null)
    createMyOwnElement(tr, "td", el.name, null)
    createMyOwnElement(tr, "td", el.email, null)
})