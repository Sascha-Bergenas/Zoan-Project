export function useLocalStorage(data = null) {
    let storedData = null

    typeof data === "object" && data ? saveToLS(data) : readFromLS()
    
    // Save function
    function saveToLS(newData) {
        data = JSON.parse(localStorage.getItem("zoanSessions"))
        if(!data) data = []
        data.push(newData)
        localStorage.setItem("zoanSessions", JSON.stringify(data))
    }
    
    // Read function
    function readFromLS() {
        storedData = JSON.parse(localStorage.getItem("zoanSessions"))
    }

    return storedData
}

