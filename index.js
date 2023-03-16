const start = document.querySelector(".button-1").addEventListener("click", function(){
   

    document.querySelector(".display_1").style.display = "none";
    document.querySelector("#display_2").style.display="none";
    document.querySelector("#display_3").style.display="block";
    // document.querySelector("#display_4").style.display="none";

    console.log("Ovo je samo test");

});


const pocetna = document.querySelector(".header-row-overlay-popis").addEventListener("click", ()=>{
    document.querySelector(".display_1").style.display = "grid";
    document.querySelector("#display_2").style.display="none";
    document.querySelector("#display_3").style.display="none";

})


// regular expression for validation
const strRegex =  /^[a-zA-Z\s]*$/; // containing only letters
const numberRegex = /^\d+$/;
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
/* supports following number formats - (123) 456-7890, (123)456-7890, 123-456-7890, 123.456.7890, 1234567890, +31636363634, 075-63546725 */
const digitRegex = /^\d+$/;

var dateRegex = /^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/;

// -------------------------------------------------- //
const container = document.querySelector("container-fluid");
const forma = document.querySelector("#display_2");
const form = document.querySelector(".forma");
const btnZapocni = document.querySelector(".button-1");
const btnDodajBroj= document.querySelector(".button-popis");
const urediListu = document.querySelector(".imenik-lista");
const btnSpremi = document.querySelector("#btnSpremi");
const osvjezi = document.querySelector(".button-forma-negativ");
const addrBookList = document.querySelector("#imenik-lista tbody");
const modalBtns = document.querySelector("#modal-btns");




let firstName = lastName= dateBirth= street =city = postCode  = email = phone = " ";

class Imenik {
    constructor( id, firstName,lastName,dateBirth,street,city,postCode,email,phone) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateBirth = dateBirth;
        this.street = street;
        this.city = city;
        this.postCode = postCode;
        this.email = email;
        this.phone = phone;

    }

    static getBrojevi(){
    
        let brojevi;
        if(localStorage.getItem('brojevi') == null){
            brojevi = [];
        } else {
            brojevi = JSON.parse(localStorage.getItem('brojevi'));
        }
        return brojevi;
    }

    
    static addKontakt(broj){
        const brojevi = Imenik.getBrojevi();
        brojevi.push(broj);
        localStorage.setItem('brojevi', JSON.stringify(brojevi));
        form.reset();

    }

    static deleteKontakt(id) {
        const brojevi=Imenik.getBrojevi();
        brojevi.forEach((broj, index) => {
            if(broj.id==id){
                brojevi.splice(index,1);
            }
        });
        localStorage.setItem("brojevi",JSON.stringify(brojevi));
        form.reset();
        UI.zatvoriModal();
        addrBookList.innerHTML ="";
        UI.showImenikList();
        form.reset();

    }

    static updateKontakt(item) {

        const brojevi = Imenik.getBrojevi();
        brojevi.forEach(broj => {
            if(broj.id==item.id){
                broj.firstName = item.firstName
                broj.lastName=item.lastName
                broj.dateBirth =item.dateBirth
                broj.street=item.street
                broj.city= item.city
                broj.postCode=item.postCode
                broj.email=item.email
                broj.phone=item.phone;

                localStorage.setItem("brojevi", JSON.stringify(brojevi));
                UI.zatvoriModal();
                form.reset();

                addrBookList.innerHTML="";
                UI.showImenikList();

            }
        });
        localStorage.setItem("brojevi",JSON.stringify(brojevi));
        form.reset();
        UI.zatvoriModal();
        addrBookList.innerHTML ="";
        UI.showImenikList();
        form.reset();

    }

}

//UI controller

class UI {




    static showImenikList(){
        const brojevi = Imenik.getBrojevi();
        brojevi.forEach(broj => UI.addToImenikList(broj));
        form.reset();


    }

static addToImenikList(broj){
    const tableRow = document.createElement('tr');
    tableRow.setAttribute('data-id', broj.id);
    tableRow.innerHTML = `
    <th scope="row"><span>${broj.id}</span></th>
      <td><span class = "imenik-ime">${broj.firstName} ${broj.lastName}</span></td>
      <td><span class = "imenik-adresa">${broj.street}</span><br><span class = "broj-1">${broj.city}  ${broj.postCode}</span></td>
      <td><span class="imenik-email">${broj.email}</span></td>
      <td><span class="imenik-broj">${broj.phone}</span></td>
      <td><span class="imenik-datum">${broj.dateBirth}</span></td>

    `;



    // <td><span>${broj.id}</span></td>
    // <td class="imadd>
    //     <span class = "imenik-ime">${broj.firstName} ${broj.lastName}</span><br>
    // </td>

    // <td class="iadd"><span class = "imenik-adresa">${broj.street}</span><br><span class = "broj-1">${broj.city}  ${broj.postCode}</span>
    // </td>
    // <td> <span>${broj.email}</span></td>
    // <td class="imenik-broj"><span>${broj.phone}</span></td>
    // <td class="datumR"> <span>${broj.dateBirth}</span></td>

    


    addrBookList.appendChild(tableRow);

}

    static showModalData(id) {
        const brojevi = Imenik.getBrojevi();
        brojevi.forEach(broj =>{
            if(broj.id == id) {
                form.ime.value = broj.firstName
                form.prezime.value=broj.lastName
                date.value =broj.dateBirth
                form.ulica.value=broj.street
                form.mjesto.value= broj.city
                form.postanskiBroj.value=broj.postCode
                form.email.value=broj.email
                form.brojMobitela.value=broj.phone;

                document.getElementById("modal-btns").innerHTML =`
                <button type="submit" id="update-btn" class="btn btn-success"  data-id = ${id}> Update </button>
                <button type="submit" id="delete-btn" class="btn btn-danger" data-id = ${id}> Delete </button>
                
                `

                console.log(event.target);
            }
        })

    }

    static prikaziModal() {
        forma.style.display="grid";
        document.querySelector(".container-fluid").style.backgroundColor="rgba(0, 0, 0, 0.162)";
        form.reset();


    }

    static zatvoriModal() {
        forma.style.display= "none";
        document.querySelector(".container-fluid").style.backgroundColor="rgba(0, 0, 0, 0.0)";
        form.reset();

    }
}btnDodajBroj.addEventListener("click", () =>{
    console.log("SAVE")
    
})

window.addEventListener('DOMContentLoaded', () => {
    eventListeners();
    UI.showImenikList();

    

});

//event listeneri

function eventListeners() {
    btnDodajBroj.addEventListener("click", () => {
        form.reset();
        UI.prikaziModal();
        document.getElementById('modal-btns').innerHTML = `
        <button type = "submit" id="btnSpremi" class="btn btn-success"> Spremi </button>        
        `;

        


    });

    //Add number
    modalBtns.addEventListener("click", (event) => {
        event.preventDefault();
        if (event.target.id === "btnSpremi") {

            let isFormValid = getFormData();
            if (!isFormValid) {
                form.querySelectorAll('input').forEach(input => {
                    setTimeout(() => {
                        input.classList.remove('errMsg');
                    }, 1500);
                });
            }
            else {
                let allItem = Imenik.getBrojevi();
                let lastItemId = (allItem.length > 0) ? allItem[allItem.length - 1].id : 0;
                lastItemId++;

                const brojItem = new Imenik(lastItemId, firstName, lastName, dateBirth, street, city, postCode, email, phone);
                Imenik.addKontakt(brojItem);
                UI.zatvoriModal();
                $('#myToast3').toast('show');  // << ovdje je dodan red za prikaz .toast-a

                UI.addToImenikList(brojItem);
                form.reset()

                console.log("RADI");



            }
        }
    });
        
    addrBookList.addEventListener('click', (event) => {
        UI.prikaziModal();
        let trElement;
        if(event.target.parentElement.tagName =="TD") {
            trElement= event.target.parentElement.parentElement;
        }

        if(event.target.parentElement.tagName=="TR") {
            trElement= event.target.parentElement;
        }

        let ID = trElement.dataset.id;
        console.log(ID);
        UI.showModalData(ID);
    
    });

        
    modalBtns.addEventListener('click', (event) => {
        if(event.target.id == 'delete-btn'){
            Imenik.deleteKontakt(event.target.dataset.id);
            $('#myToast1').toast('show');  // << ovdje je dodan red za prikaz .toast-a

        }
    });

    modalBtns.addEventListener('click', (event) => {
        event.preventDefault();
        if(event.target.id == "update-btn"){
            let id = event.target.dataset.id;
            let isFormValid = getFormData();
            if(!isFormValid){
                form.querySelectorAll('input').forEach(input => {
                    setTimeout(() => {
                        input.classList.remove('errMsg');
                    }, 1500);
                });
            } else {
                const brojItem = new Imenik(id, firstName, lastName, dateBirth, street, city, postCode, email, phone);
                Imenik.updateKontakt(brojItem);
                $('#myToast2').toast('show');  // << ovdje je dodan red za prikaz .toast-a
                UI.zatvoriModal();
                form.reset();

                

            }
        }
    });



}





    
const date = document.querySelector('input[type="date"]');

function getFormData() {
    let inputValidStatus = [];

    // console.log(form.ime.value, form.prezime.value,date.value, form.ulica.value, form.mjesto.value, form.postanskiBroj.value, form.email.value, form.brojMobitela.value )
    if (!strRegex.test(form.ime.value) || form.ime.value.trim().length == 0) {
        errMsg(form.ime);
        inputValidStatus[0] = false;
    }
    else {
        firstName = form.ime.value;
        positiveMsg(form.ime);
        inputValidStatus[0] = true;
    }



    if (!strRegex.test(form.prezime.value) || form.prezime.value.trim().length == 0) {
        errMsg(form.prezime);
        inputValidStatus[1] = false;
    }
    else {

        lastName = form.prezime.value;
        positiveMsg(form.prezime);

        inputValidStatus[1] = true;
    }


    if (date.value.trim().length == 0) {
        errMsg(date);
        inputValidStatus[2] = false;
    }
    else {

        dateBirth = date.value;
        positiveMsg(date);

        inputValidStatus[2] = true;
    }


    if (!strRegex.test(form.ulica.value) || form.ulica.value.trim().length == 0) {
        errMsg(form.ulica);
        inputValidStatus[3] = false;
    }
    else {

        street = form.ulica.value;
        positiveMsg(form.ulica);

        inputValidStatus[3] = true;
    }



    if (!strRegex.test(form.mjesto.value) || form.mjesto.value.trim().length == 0) {
        errMsg(form.mjesto);
        inputValidStatus[4] = false;
    }
    else {

        city = form.mjesto.value;
        positiveMsg(form.mjesto);

        inputValidStatus[4] = true;
    }


    if (!numberRegex.test(form.postanskiBroj.value) || form.postanskiBroj.value.trim().length == 0) {
        errMsg(form.postanskiBroj);
        inputValidStatus[5] = false;
    }
    else {

        postCode = form.postanskiBroj.value;
        positiveMsg(form.postanskiBroj);

        inputValidStatus[5] = true;
    }


    if(!emailRegex.test(form.email.value)){
        errMsg(form.email);
        inputValidStatus[6] = false;
    } else {
        email = form.email.value;
        positiveMsg(form.email);
        inputValidStatus[6] = true;
    }

    if(!phoneRegex.test(form.brojMobitela.value)){
        errMsg(form.brojMobitela);
        inputValidStatus[7] = false;
    } else {
        phone = form.brojMobitela.value;
        positiveMsg(form.brojMobitela);
        inputValidStatus[7] = true;
console.log(firstName,lastName,email,phone,street, postCode,city,dateBirth)
        return inputValidStatus.includes(false) ? false : true;
    }
}

function errMsg(input) {
    input.classList.add("errMsg")
}


function positiveMsg (input){
    input.classList.add("positiveMsg")

}

 
const updateBtn = modalBtns.closest('.update-btn');
console.log("ne radi");


// updateBtn.addEventListener("click", () => {
// console.log("Update");


//     // $(document).ready(function(){
//     //     $('.toast').toast('show');
//     //   });
// })












// const btnZapocni = document.querySelector(".button-1").addEventListener("click", function(){
   

//     document.querySelector(".display_1").style.display = "none";
//     document.querySelector("#display_2").style.display="none";
//     document.querySelector("#display_3").style.display="block";
//     document.querySelector("#display_4").style.display="none";

//     console.log("Ovo je samo test");

// })

// const btnDodajBroj= document.querySelector(".button-popis").addEventListener( "click", function() {
//     document.querySelector("#display_3").style.display="inline-bloc";
//     document.querySelector("container-fluid").style.backgroundColor="rgba(0, 0, 0, 0.162)";
//  document.querySelector("#display_2").style.display="flex";
//  document.querySelector("#display_4").style.display="none";


  
// })

// const btnUrediBroj = document.querySelector(".imenik-lista").addEventListener("click", function(){
//     document.querySelector("#display_3").style.display="grid";
//     document.querySelector("container-fluid").style.backgroundColor="rgba(0, 0, 0, 0.162)";
//  document.querySelector("#display_2").style.display="none";
//  document.querySelector("#display_4").style.display="flex";
// })

