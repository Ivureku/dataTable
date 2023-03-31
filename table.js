
let nameinp = document.getElementById('name')
let yearinp = document.getElementById('year')
let courseinp = document.getElementById('course')
let sexinp //get avlue then ambot saon nako
let gradeinp = document.getElementById('grade')
let radio1 = document.getElementById('male')
let radio2 = document.getElementById('female')
let newRow


function validate(){
    event.preventDefault()
    
    let checkname = false
    let checkyear = false
    let checkcourse = false
    let checkgrade = false
    let radios = false

    if(nameinp.value == ""){
        let msgTemp = '<p class="text-red-600 mt-2 text-md">Name should not be blank</p>'
        document.getElementById("nameMsg").innerHTML = msgTemp
    }else{
        document.getElementById("nameMsg").innerHTML = ""
        checkname = true
    }
    if(yearinp.value == ""){
        let msgTemp = '<p class="text-red-600 mt-2 text-md">Year should not be blank</p>'
        document.getElementById("yearMsg").innerHTML = msgTemp
    }else{
        document.getElementById("yearMsg").innerHTML = ""
        checkyear = true
    }

    if(courseinp.value == ""){
        let msgTemp = '<p class="text-red-600 mt-2 text-md">Course should not be blank</p>'
        document.getElementById("courseMsg").innerHTML = msgTemp
    }else{
        document.getElementById("courseMsg").innerHTML = ""
        checkcourse = true
    }
    
    if(gradeinp.value === '') {
        document.getElementById('gradeMsg').innerHTML = '<p class="text-red-600 mt-2 text-md">Please enter a number</p>'
    }else {
        document.getElementById('gradeMsg').innerHTML = ''
        checkgrade = true
    }
   
    if (!radio1.checked && !radio2.checked) {
        let rmsg = '<p class="text-red-600 mt-2 text-md">Please choose an option</p>'
        document.getElementById("sexMsg").innerHTML = rmsg
      }else{
        document.getElementById("sexMsg").innerHTML = ""
        radios = true
      }

    if(checkname == true && checkyear == true && checkcourse == true && checkgrade == true && radios == true) {
        Table()
    }

   
}



function Table() {
    event.preventDefault()

    let studname = nameinp.value
    let studyear = yearinp.value
    let studcourse = courseinp.value
    let studsex = ""
    if(radio1.checked){
        studsex = radio1.value
    }else if(radio2.checked){
        studsex = radio2.value
    }
    let studgrade = gradeinp.value
  
    let table = document.getElementById("table")
  
    let row = table.insertRow( -1)
  
    let nameCell = row.insertCell(0)
    let yearCell = row.insertCell(1)
    let courseCell = row.insertCell(2)
    let sexCell = row.insertCell(3)
    let gradeCell = row.insertCell(4)
    let deleteCell = row.insertCell(5)

    row.classList.add("table-row")
  
    nameCell.innerHTML = studname
    nameCell.style.color = "black"
    nameCell.style.backgroundColor = "white"
    nameCell.style.paddingLeft = "0.25rem"
    nameCell.style.paddingRight = "0.25rem"

    yearCell.innerHTML = studyear
    yearCell.style.color = "black"
    yearCell.style.padding = "1px"
    yearCell.style.backgroundColor = "white"
    yearCell.style.textAlign = "center"

    courseCell.innerHTML = studcourse
    courseCell.style.color = "black"
    courseCell.style.padding = "1px"
    courseCell.style.textAlign = "center"
    courseCell.style.backgroundColor = "white"

    sexCell.innerHTML = studsex
    sexCell.style.color = "black"
    sexCell.style.padding = "1px"
    sexCell.style.textAlign = "center"
    sexCell.style.backgroundColor = "white"


    gradeCell.innerHTML = studgrade
    gradeCell.style.color = "black"
    gradeCell.style.padding = "1px"
    gradeCell.style.backgroundColor = "white" 
    gradeCell.style.textAlign = "center"

    let deleteButton = document.createElement("button")
    deleteButton.innerHTML = "Delete"
    deleteButton.classList.add("hover:text-red-700", "text-blue-700", "py-2", "px-4", "text-center")
    deleteCell.style.backgroundColor = "white"
    deleteCell.classList.add("pl-2", "pr-2")
    deleteButton.onclick = computeAverage()
    
    
     deleteButton.onclick = function() {
            let rowIndex = this.parentNode.parentNode.rowIndex 
            table.deleteRow(rowIndex)
        

            savedData.splice(rowIndex - 1, 1)
      
            localStorage.setItem("students", JSON.stringify(savedData))
            computeAverage()
        }
    deleteCell.appendChild(deleteButton)

    computeAverage()
    

    let rowData = {
        name: studname,
        year: studyear,
        course: studcourse,
        sex: studsex,
        grade: studgrade,
    }

    let savedData = JSON.parse(localStorage.getItem("students")) || []

    savedData.push(rowData)

    localStorage.setItem("students", JSON.stringify(savedData))
}

function computeAverage() {
let table = document.getElementById("table")
let rows = table.getElementsByTagName("tr")
let total = 0
let count = 0

for (let i = 1; i < rows.length; i++) {
    let row = rows[i]
    if (row.style.display !== "none") {
    let gradeCell = row.cells[4]
    let grade = parseFloat(gradeCell.innerHTML)
    if (!isNaN(grade)) {
        total += grade
        count++
    }
    }
}

let average = count > 0 ? total / count : 0
let averageDisplay = document.getElementById("avg")
averageDisplay.innerHTML = average.toFixed(2)
}
  

function search() {
event.preventDefault()


let name = document.getElementById("searchName").value.toLowerCase()
let year = document.querySelector('input[name="searchYear"]:checked')?.value
let course = document.querySelector('input[name="searchCourse"]:checked')?.value
let sex = document.querySelector('input[name="searchSex"]:checked')?.value
console.log(year)


let table = document.getElementById("table")
let rows = table.getElementsByTagName("tr")

for (let i = 1; i < rows.length; i++) {
    let row = rows[i]
    

    let nameCell = row.cells[0]
    let yearCell = row.cells[1]
    let courseCell = row.cells[2]
    let sexCell = row.cells[3]

    let nameMatch = name ? nameCell.innerHTML.toLowerCase().includes(name) : true
    let yearMatch = year ? yearCell.innerHTML === year : true
    let courseMatch = course ? courseCell.innerHTML === course : true
    let sexMatch = sex ? sexCell.innerHTML === sex : true
    

    if (nameMatch && yearMatch && courseMatch && sexMatch) {
    row.style.display = ""
    } else {
    row.style.display = "none"
    }
}
computeAverage()




}

document.getElementById("clear-button").addEventListener("click", function(event) {
event.preventDefault()
document.getElementById("searchform").reset() 
})


window.addEventListener('DOMContentLoaded', () => {

    let savedData = JSON.parse(localStorage.getItem("students")) || []
  

    let table = document.getElementById("table")
    for (let i = 0; i < savedData.length; i++) {
      let rowData = savedData[i]
      let row = table.insertRow(-1)
      let nameCell = row.insertCell(0)
      let yearCell = row.insertCell(1)
      let courseCell = row.insertCell(2)
      let sexCell = row.insertCell(3)
      let gradeCell = row.insertCell(4)
      let deleteCell = row.insertCell(5)
      nameCell.innerHTML = rowData.name
      nameCell.style.color = "black"
      nameCell.style.backgroundColor = "white"
      nameCell.style.paddingLeft = "0.25rem"
      nameCell.style.paddingRight = "0.25rem"

      yearCell.innerHTML = rowData.year
      yearCell.style.color = "black"
      yearCell.style.padding = "1px"
      yearCell.style.backgroundColor = "white"
      yearCell.style.textAlign = "center"

      courseCell.innerHTML = rowData.course
      courseCell.style.color = "black"
      courseCell.style.padding = "1px"
      courseCell.style.textAlign = "center"
      courseCell.style.backgroundColor = "white"

      sexCell.innerHTML = rowData.sex
      sexCell.style.color = "black"
      sexCell.style.padding = "1px"
      sexCell.style.textAlign = "center"
      sexCell.style.backgroundColor = "white"

      gradeCell.innerHTML = rowData.grade
      gradeCell.style.color = "black"
      gradeCell.style.padding = "1px"
      gradeCell.style.backgroundColor = "white" 
      gradeCell.style.textAlign = "center"
      
      let deleteButton = document.createElement("button")
      deleteButton.innerHTML = "Delete"
      deleteButton.classList.add("hover:text-red-700", "text-blue-700", "py-2", "px-4", "text-center")
      deleteCell.style.backgroundColor = "white"
      deleteCell.classList.add("pl-2", "pr-2")
        
        
      deleteButton.onclick = function() {
            let rowIndex = this.parentNode.parentNode.rowIndex 
            table.deleteRow(rowIndex)
        

            savedData.splice(rowIndex - 1, 1)
        
            localStorage.setItem("students", JSON.stringify(savedData))
            computeAverage()
        }
        deleteCell.appendChild(deleteButton)
    }
  
    computeAverage()
  })
  //maboang nako