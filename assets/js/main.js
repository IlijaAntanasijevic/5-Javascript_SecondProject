const BASEURL = "assets/data/";
const path = window.location.pathname;

//let productPagePath = path.includes('pages');
//let productLinks = getLocalStorage("productLinks");
let nav = document.getElementById('navMenu');
let navHamb = document.getElementById('hambNav');
// window.onload() = function () {
  
// }
window.addEventListener('load', function() {

  document.querySelector('.spinner').remove();
  this.document.getElementById('bodyBG').style.display = 'none';
 
});
window.onload = () => {

window.localStorage.removeItem("izfiltrirano");
ajax("menu.json",function(result){
  navMenuPrint(result);
  setLocalStorage("menu",result);
})


ajax("products.json",function(result){
  setLocalStorage("allProducts",result);
  productPage(result);
})

ajax("categories.json",function (result){
  setLocalStorage("categories",result);
})

ajax("brend.json",function (result){
  setLocalStorage("brend",result);
})

ajax("sort.json",function (result){
  sortPrintout(result);
  //setLocalStorage("sort",result);
})

ajax("filters.json",function (result){
  setLocalStorage("filters",result);
})

ajax("filterNames.json",function (result){
  filters(result);
  setLocalStorage("filterNames",result);
})
printCart()
 
  
  //#region Contact Form CHECK
  let sumbit = document.getElementById('submit');
  let name = document.getElementById('name')
  let email = document.getElementById('email');
  let message = document.getElementById('mess');
  
  let reName = /^[A-Zčćžšđ][a-zčćžšđ]{2,19}(\s[A-Zčćžšđ][a-zčćžšđ]{2,19})*$/;
  let reEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let reMess = /^([A-Zčćžšđ]|[a-zčćžšđ])+\s([A-Zčćžšđ]|[a-zčćžšđ])+(\s([A-Zčćžšđ]|[a-zčćžšđ])+)*$/;
  
  sumbit.addEventListener('click', function () {
    if (!reName.test(name.value)) {
      name.nextElementSibling.classList.remove('hide');
    }
    else {
      name.nextElementSibling.classList.add('hide');
    }
    if (!reEmail.test(email.value)) {
      email.nextElementSibling.classList.remove('hide');
    }
    else {
      email.nextElementSibling.classList.add('hide');
    }
    if (!reMess.test(message.value)) {
      message.nextElementSibling.classList.remove('hide');
    }
    else {
      message.nextElementSibling.classList.add('hide');
    }
  })
  //#endregion
  //#region Order Form Check
  let btnOrder = document.getElementById('btnOrder');
  let nameOrder = document.getElementById('nameOrderInput');
  let lastNameOrder = document.getElementById('lName');
  let phone = document.getElementById('phoneO');
  let addrOrder = document.getElementById('addr');
  let city = document.getElementById('city');
  let zipCode = document.getElementById('zipC');
  let pInfo = document.getElementById('infoUl');
  
  let reLastName = /^[A-Zčćžšđ][a-zčćžšđ]{3,20}(\s[A-Zčćžšđ][a-zčćžšđ]{3,20})?$/;
  let rePhone = /^(\+381|06)[0-9]{7,9}$/;
  let reCity = /^[A-Zčćžšđ][a-zčćžšđ]{5,10}(\s[A-Zčćžšđ][a-zčćžšđ]{5,15})?(\s[A-Zčćžšđ][a-zčćžšđ]{5,15})?$/;
  let reZipCode = /^[0-9]{5}$/;
  let reAddress = /^([A-Zčćžšđ][a-zčćžšđ]{2,15}|[0-9]|[0-9][0-9])(\s([A-Zčćžšđ][a-zčćžšđ]{1,15}|[0-9]|[0-9][0-9]))*$/;
  
  let tmp = "";
  btnOrder.addEventListener('click', function () {
    let err = true;
    var personalInfo = [];
  
    if (!reName.test(nameOrder.value)) {
      nameOrder.nextElementSibling.classList.remove('hide');
      err = false;
    }
    else {
      nameOrder.nextElementSibling.classList.add('hide');
      err = true
      personalInfo.push(nameOrder.value);
    }
    if (!reLastName.test(lastNameOrder.value)) {
      lastNameOrder.nextElementSibling.classList.remove('hide');
      err = false;
    }
    else {
      lastNameOrder.nextElementSibling.classList.add('hide');
      err = true;
      personalInfo.push(lastNameOrder.value);
    }
    if (!rePhone.test(phone.value)) {
      phone.nextElementSibling.classList.remove('hide');
      err = false;
    }
    else {
      phone.nextElementSibling.classList.add('hide');
      err = true;
      personalInfo.push(phone.value);
    }
    if (!reCity.test(city.value)) {
      city.nextElementSibling.classList.remove('hide');
      err = false;
    }
    else {
      city.nextElementSibling.classList.add('hide');
      err = true;
      personalInfo.push(city.value);
    }
    if (!reZipCode.test(zipCode.value)) {
      zipCode.nextElementSibling.classList.remove('hide');
      err = false;
    }
    else {
      zipCode.nextElementSibling.classList.add('hide');
      err = true;
      personalInfo.push(zipCode.value);
    }
    if (!reAddress.test(addrOrder.value)) {
      addrOrder.nextElementSibling.classList.remove('hide');
      err = false;
    }
    else {
      addrOrder.nextElementSibling.classList.add('hide');
      err = true;
      personalInfo.push(addrOrder.value);
    }
  
    /* Ispis inforimacija o porudzbini (korisniku) */
    if (err) {
      document.getElementById('infoText').classList.remove('hide');
      btnOrder.setAttribute('disabled','disabled');
      tmp += `<div>`;
      for (let i = 0; i < personalInfo.length; i++) {
        if (i < 2) {
          if (i == 0) {
            tmp += `<li>${personalInfo[i]} ${personalInfo[i + 1]} </li>`;
          }
          else if (i == 1) { continue }
          else {
            tmp += `<li>${personalInfo[i]} </li>`;
          }
        }
        else {
          tmp += `</div><div><li>${personalInfo[i]} </li>`;
        }
      }
      tmp += `</div>`;
      pInfo.innerHTML = tmp;
      personalInfo = [];
      nameOrder.value = "";
      lastNameOrder.value = "";
      phone.value = "";
      addrOrder.value = "";
      city.value = "";
      zipCode.value = "";
      tmp = "";
    }
  
  })
  //#endregion

  $(document).ready(function () {
 
  ispisTopPro();
    /*************Slick slider*********/
    if (path.includes('index')) { // Warning in console
      $('.custom-slider').slick({
        dots: true,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: true,
        prevArrow: `<button type='button' class='slick-prev pull-left'>
          <span class="iconify" data-icon="material-symbols:arrow-back-ios-new"></span></button>`,
        nextArrow: `<button button type='button' class= 'slick-next pull-right' >
            <span class="iconify" data-icon="material-symbols:arrow-back-ios-new" data-rotate="180deg"></span>
          </button> `
      });

      $('.promoSlider').slick({
        infinite: false,
        speed: 300,
        autoplay: true,
        infinite: true,
        autoplaySpeed: 800,
        slidesToShow: 4,
        prevArrow: ``,
        nextArrow: '',
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: true,
              
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      });
    }

    function ispisTopPro(){
      let html = "";
      let allProducts = getLocalStorage('allProducts');
      
      let topSell = [];
      for(let product of allProducts){
        if(product.topProdaja){
          topSell.push(product);
        }
      }
  
      for(let product of topSell){
        html += `  <div>
        <img src="${product.slika.src}" class="w-100" alt="${product.slika.alt}" />
        <p class='text-light text-center'>${product.cena} RSD</p>
      </div>`
      }
      $('.promoSlider').html(html);
    }
  
    /***********Cart ********/
    $('#cart').click(function () {
      openCart();
    })
    $('#cartClose').click(function () {
      openCart();
    })
  
    /************Hamburger**************/
    $('#open').click(function () {
      if ($('#cartProducts').css('display') == 'block') {
        $('#cartProducts').css('display', 'none');
      }
      if ($('#contentHamb').css('display') == 'none') { //X
        openHamburger();
        
      }
      else {
        closeHamburger();
      }
      $('#contentHamb').slideToggle(500);
    });
  
    /****************  Arrow*****************/
    $(document).scroll(function () {
      var scroll = window.scrollY;
      if (scroll > 800) {
        $('#arrow').fadeIn(600);
        $('#arrow').click(function () {
          window.scrollTo(0, 0);
        })
      }
      else {
        $('#arrow').fadeOut(600);
      }
    })
    /****************Index(page) Product Animation*****************/
    $(document).scroll(function () {
      var scroll = window.scrollY;
      if(scroll > 300){
        $('#firstTextPromo').show();
        $('#firstPromoImg').animate({'left':'0%'},500);
        $('#firstTextPromo').animate({'right':'0%'},500);
      }
      if(scroll > 1000){
        $('#secondPromoImg').show();
        $('#textSecondPromo').animate({'left':'0%'},500);
        $('#secondPromoImg').animate({'right':'0%'},500);
      }
      /*
      if(scroll == 0){
        $('#textSecondPromo').animate({'left':'-100%'},500);
        $('#secondPromoImg').animate({'right':'-170%'},500);
        $('#firstPromoImg').animate({'left':'-100%'},500);
        $('#firstTextPromo').animate({'right':'-170%'},500);
        
      }
      */
      //console.log(scroll);
    })
  
    /************Button Products***************/
  $(document).on("click","#orderCartBtn",function() {
    if ($('#order').css('display') == 'none') {
      $('#btnOrder').removeAttr("disabled","");
      $('#order').show();
      openCart();
      $('#order').dimBackground();
      $('html, body').css({
        'overflow': 'hidden'
      })
    }
  })
   // $('#orderCartBtn').click(function () {
     
    //})
    
    /*********Order product**********/
    $('#orderClose').click(function () {
      $('#order').hide();
      $('#order').undim();
      $('#infoText').addClass('hide');
      $('#infoUl').html("");
  
      $('html, body').css({
        'overflow': 'auto'
      })
    })
    /**********Product Filters Hamburger*****************/
    let click = 0;
    $('#filtersHamb').click(function () {
      click++;
      if(click % 2 != 0){
        $('#aside').animate({'left':'0%'},500);
      }
      else {
        $('#aside').animate({'left':'-100%'},500);
      }
    })
    $('#asideClose').click(function () {
       click++;
        $('#aside').animate({'left':'-100%'},500);
      
    })

 
    
  
  })
}


/*******************FUNCTIONS********************************/

function ajax(jsonName,result) {
  //if(!productPagePath){
    $.ajax({
      url : BASEURL + jsonName,
      method : "get",
      dataType : "json",
      success : result,
      error: function(xhr){
        console.error(xhr);
      }
    })
  //}
}

//Funckija za ispisivanje navigacije(Nav)
function navMenuPrint (array){
  var html = "";
  for (let value of array) {
    //console.log(value.link);
      switch(value.name){
        case "Proizvodi" :  
        html += `<li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle text-light" href="#" id="navbarScrollingDropdown" 
        role="button" data-bs-toggle="dropdown" aria-expanded="false">${value.name}</a>
        <ul class="dropdown-menu" aria-labelledby="navbarScrollingDropdown">`;
        for (let product of value.link) {
          html += `<li><a class="dropdown-item" href="${product.href}">${product.name}</a></li>`;
        }
        html += ` </ul> </li>`;break;

        case "Autor" : 
        html += `<li class="nav-item">
        <a class="nav-link text-light" aria-current="page" href="${value.link}">${value.name}</a>
        </li>`; break;

        default:
        html += `<li class="nav-item">
        <a class="nav-link text-light" aria-current="page" href="${value.link}">${value.name}</a>
        </li>`;break;
      }
     
  }


    nav.innerHTML = html;
    navHamb.innerHTML = html;
}

//Funkcija za ispisivanje nacina sortiranja
function sortPrintout(array){
    let sortHtml = `<option value = "0">Izaberite</option> `;
  let sortResponsive = `<option value="0">Sortiraj
                <span class="iconify text-light" data-icon="tabler:arrows-sort"></span>
              </option>`
  for(let data of array){
    sortHtml += `<option value = "${data.vrednost}">${data.naziv}</option>`;
    sortResponsive += `<option value = "${data.vrednost}">${data.naziv}</option>`;
  }
  document.getElementById("ddlSort").innerHTML = sortHtml;
  document.getElementById("ddlSortResponsive").innerHTML = sortResponsive;

  $('#ddlSort').click (() => {
    let check = $('#ddlSort').val();
    change(check)
  })
  
}

/*Funkcija za ispisvanje filtera, proverava stranicu/kategoriju i ispsuje filtere
samo za tu stranciu */
function filters(array){
  let filterNames = getLocalStorage("filters");
  let html = "";
  //console.log(filterNames)

  for(let i = 0;i<array.length;i++){
    let id = array[i].id; // ID od imena filtera
    let filters = filterNames[i].filterNaziv;
    let catId = array[i].kategorijaID;

    if(checkPath("laptop") && checkCategories(catId) == "Laptop"){
      html += filtersPrintout(array,filters,i,id);      
    }
    else if(checkPath("phone") && checkCategories(catId) == "Telefon") {
     html += filtersPrintout(array,filters,i,id);
    }
    else if(checkPath("monitor") && checkCategories(catId) == "Monitor"){
      html += filtersPrintout(array,filters,i,id);
    }
}
    
  html += `   <div id="rangePrice" class="mt-2">
              <label for="cena" class="text-light">Cena do: </label>
              <input type="range" id="cena" min="5000" max="200000" value="100">
              <p class="text-light" id="totalPrice"></p>
            </div>`;

  $(`#filtersPrintout`).html(html);
  rangePrice();
  
  let allFilters = document.querySelectorAll('input[type=checkbox],input[type=range]');
  filterProducts(allFilters);
}


let priceChecked = false;
//Funkcija za cekirane filtere
function filterProducts(array){
  
  let ckeckedInput = [];
  array.forEach(input => {
    $(input).click(() => {
    let check = input.checked;
     if(check){

      ckeckedInput.push(input);
    }
    else if("cena" == input.id){
      priceChecked = true;
      if(priceChecked){
        //console.log(ckeckedInput.indexOf(cena))
        if(ckeckedInput.indexOf(cena) == -1){
          ckeckedInput.push(input);
        }
        else {
          let removeInput = ckeckedInput.indexOf(input);
          ckeckedInput.splice(removeInput, 1);
          ckeckedInput.push(input);
        }
      }
    }
    else{
      let removeInput = ckeckedInput.indexOf(input);
      ckeckedInput.splice(removeInput, 1);
    }
    
    change(ckeckedInput);
    })
  });
  
}


//Funkcija koja proverava SVE FILTERE i prosledjuje funkciji za ispisivanje proizvoda
function change(arrayOfChecked){
  let products = getLocalStorage("allProducts");

  if(typeof(arrayOfChecked) == 'object'){
    
     products = filterFnc(products,arrayOfChecked,"Model");    
     products = filterFnc(products,arrayOfChecked,"RAM");
     products = filterFnc(products,arrayOfChecked,"Dijagonala ekrana");
     products = filterFnc(products,arrayOfChecked,"SSD");
     products = filterFnc(products,arrayOfChecked,"Gaming");
     products = filterFnc(products,arrayOfChecked,"Memorija");
     products = filterFnc(products,arrayOfChecked,"Baterija");
     products = filterFnc(products,arrayOfChecked,"SIM");
     products = filterFnc(products,arrayOfChecked,"Kamera");
     //products = filterFnc(products,arrayOfChecked,"Model");
   
     products = filterFnc(products,arrayOfChecked,"Cena");
  }
  else {
    products = sortFnc(products,arrayOfChecked)
  }
  productPage(products);
}

//FUnkcija za sortiranje
function sortFnc(products,checkedType){
  let izfiltrirano = getLocalStorage("izfiltrirano");
  let sort = [];
  
  if(izfiltrirano != null){
    if(checkedType == "0"){
      sort = izfiltrirano;
    }
    else {
      sort = izfiltrirano.sort((a,b) => {
        if(checkedType == "cena-asc"){
          return a.cena - b.cena
        }
        if(checkedType == "cena-desc"){
          return b.cena - a.cena
        }
        if(checkedType == "naziv-asc"){
          if(a.naziv < b.naziv){
              return -1;
          }
          else if(a.naziv > b.naziv){
              return 1;
          }
          else{
              return 0;
          }
      }
      if(checkedType == "naziv-desc"){
          if(a.naziv > b.naziv){
              return -1;
          }
          else if(a.naziv < b.naziv){
              return 1;
          }
          else{
              return 0;
          }
      } 
      })
    }
  }
  else {
    if(checkedType == "0"){
      sort = products;
    }
    else {
      sort = products.sort((a,b) => {
        if(checkedType == "cena-asc"){
          return a.cena - b.cena
        }
        if(checkedType == "cena-desc"){
          return b.cena - a.cena
        }
        if(checkedType == "naziv-asc"){
          if(a.naziv < b.naziv){
              return -1;
          }
          else if(a.naziv > b.naziv){
              return 1;
          }
          else{
              return 0;
          }
      }
      if(checkedType == "naziv-desc"){
          if(a.naziv > b.naziv){
              return -1;
          }
          else if(a.naziv < b.naziv){
              return 1;
          }
          else{
              return 0;
          }
      } 
      })
    }
  }

 

  return sort;
}

//Funkcija koja proverava cekirane elemente filtera
function checkTypeFilters(allFilters,arrayOfChecked){
  let checkedInputID = [];
  
  for(let i = 0;i<arrayOfChecked.length;i++){
    for(let filter of allFilters){
     for(let filterType of filter.filterNaziv){
      if(arrayOfChecked[i].getAttribute('id') == filterType.id){
        checkedInputID.push(arrayOfChecked[i].getAttribute('id'));

      }
     }
    }
    
    if(arrayOfChecked[i].getAttribute('id') == "cena"){
      checkedInputID.push(arrayOfChecked[i].value);
    }
  }

  return checkedInputID;
}

//Funckija za ispisivanje filtriranih proizvoda
function filterFnc(arrayProducts,arrayOfChecked,type){
  let izfiltrirano = getLocalStorage("izfiltrirano");
    let allFilters = getLocalStorage("filters");
    checkedInputID = checkTypeFilters(allFilters,arrayOfChecked);
    
    let filter = [];  //Niz za filtriranje
    let izfiltriranoNiz = []; // Niz za cenu(range)
    let checkArray = false;
     if(izfiltrirano != null){
      izfiltriranoNiz = izfiltrirano;
    }
    
            for(let checked of checkedInputID){
              
                for(let product of arrayProducts){
                  for(let spec of product.specifikacije){
                    if(type == "Model"){
                      let Modelvalue = spec.vrednost.toLowerCase();
                      let checkFilter = pushFIilter(Modelvalue,spec.naziv,type,checked,filter,product,checkArray);
                      filter = checkFilter.filter;
                      checkArray = checkFilter.check; 
                    }
                                                            
                      if(type == "Cena"){
                        let price = Number(checked);
                        let checkPrice = product.cena.toString().split('.').join("");
                        checkPrice = parseInt(checkPrice);
                        //AKo je samo cena filtrirana(oznacena) uzima originalne proizvode
                        /*
                        if(arrayOfChecked.indexOf(cena) != -1 && arrayOfChecked.length == 1){
                          let checkPrice = product.cena.toString().split('.').join("");
                          checkPrice = parseInt(checkPrice);
                          if(checkPrice < price){
                            if(filter.indexOf(product) == -1){
                             
                              filter.push(product)  
                            }
                            checkArray = true;
                          }
                      }
                      */
                      //Ako su filtirani proizvodi,dohvata ih iz LS
                        if(izfiltriranoNiz.length){
                          for(let productF of izfiltriranoNiz){
                           
                            let checkPrice = productF.cena.toString().split('.').join("");
                            checkPrice = parseInt(checkPrice);
                            if(checkPrice < price){
                            
                              if(filter.indexOf(productF) == -1){
                               
                                filter.push(productF)
                                
                              }
                              checkArray = true;
                            }
                          }
                        }
                        
                      }

                    if(checkCategories(product.kategorijaID) == "Laptop" && checkPath("laptop")){
                      if(type == "RAM"){
                        let ramValue = parseInt(spec.vrednost);
                        let ramChecked = parseInt(checked);
  
                        let checkFilter = pushFIilter(ramValue,spec.naziv,type,ramChecked,filter,product,checkArray);

                        filter = checkFilter.filter;
                        checkArray = checkFilter.check;              
                      }
                     
                      if(type == "Dijagonala ekrana"){
                        let screenValue = parseFloat(spec.vrednost);
                        let screenChecked = parseFloat(checked); 

                        let checkFilter = pushFIilter(screenValue,spec.naziv,type,screenChecked,filter,product,checkArray); 

                        filter = checkFilter.filter;
                        checkArray = checkFilter.check;            
                      }  
                    
                      if(type == "SSD"){                       
                        let ssdValue = parseInt(spec.vrednost);
                        let ssdChecked = parseInt(checked); 

                        let checkFilter = pushFIilter(ssdValue,spec.naziv,type,ssdChecked,filter,product,checkArray); 
                        filter = checkFilter.filter;
                        checkArray = checkFilter.check;                    
                      }
                      
                      if(type == "Gaming"){                       
                        let gamingChecked = checked.split("-")[1];
                        let gamingValue = spec.vrednost;  
                        let checkFilter = pushFIilter(gamingValue,spec.naziv,type,gamingChecked,filter,product,checkArray); 
                        filter = checkFilter.filter;
                        checkArray = checkFilter.check;                   
                      } 
                      
                    }
                  
                    if (checkCategories(product.kategorijaID) == "Telefon" && checkPath("phone")){
                        if(type == "Memorija"){
                          let memValue = parseInt(spec.vrednost);
                          let memChecked = parseInt(checked); 
                          let checkFilter = pushFIilter(memValue,spec.naziv,type,memChecked,filter,product,checkArray); 
                          filter = checkFilter.filter;
                          checkArray = checkFilter.check;
                        }

                        if(type == "Baterija"){
                           let batValue = parseInt(spec.vrednost);
                           let batChecked = parseInt(checked); 

                          let checkFilter = pushFIilter(batValue,spec.naziv,type,batChecked,filter,product,checkArray); 
                           filter = checkFilter.filter;
                           checkArray = checkFilter.check;
                        }
                        if(type == "SIM"){
                           let simValue = spec.vrednost.toLowerCase();
                           let simChecked = checked.toLowerCase(); 

                           let checkFilter = pushFIilter(simValue,spec.naziv,type,simChecked,filter,product,checkArray); 
                           filter = checkFilter.filter;
                           checkArray = checkFilter.check;
                       }
                       if(type == "Kamera"){
                        let cameraValue = parseInt(spec.vrednost);
                        let cameraChecked = parseInt(checked); 

                        let checkFilter = pushFIilter(cameraValue,spec.naziv,type,cameraChecked,filter,product,checkArray); 
                        filter = checkFilter.filter;
                        checkArray = checkFilter.check;
                      }
                    }
                    
                    if(checkCategories(product.kategorijaID) == "Monitor" && checkPath("monitor")){
                      
                    }
                                    
                  }
                }      
            }
           
            if(!checkArray){
              filter = arrayProducts;
            }
            
             if(!arrayOfChecked.length){
               filter = arrayProducts;
             }
            //  console.log(izfiltriranoNiz);
             // console.log(filter)
              setLocalStorage("izfiltrirano",filter);
             
             
            return filter;

}


/*Funkcija koja proverava uslove filtriranja i ubacuje u novi niz ako 
su uslovi ispunjeni*/
function pushFIilter(value,vrednost,type,checked,filter,product,checkArray){
 
  if(vrednost == type && value == checked){
    
    if(filter.indexOf(product) == -1){   
      
    filter.push(product);
  }
  checkArray = true;
  }
  
  //console.log(filter)
  return {
    "filter" : filter,
    "check" : checkArray
  };
}

//Ne koristim
function checkFilterID (checked,type){
  //console.log(checked)
  switch (type){
    case "Model":
      if(checked == "lenovo" || checked == "samsung" || checked == "apple"){
        return true;
      }
    case "RAM" :
      if(checked == "4Ram"|| checked == "8Ram" || checked == "32Ram" || checked == "16Ram"){
        return true;
      }
    case "Dijagonala ekrana" :
      if(checked == "13.3Screen" || checked == "14.2Screen" || checked == "14.5Screen" || checked == "15.6Screen")
      return true;
    case "SSD" :
      if(checked == "128ssd" || checked == "256ssd" || checked == "512ssd")
      return true;
    case "Gaming" :
      if(checked == "128ssd" || checked == "256ssd" || checked == "512ssd")
      return true;  
  }
 
   return false;
}




//funkcija za pretrazivanje proizvoda
//$('#search').blur(searchProductssss);


  let products = getLocalStorage("allProducts");
  let allSearch = []; 
  $('#search').keyup(function () {
    
    $('#searchProduct').html("");
    let value = $('#search').val();
    // console.log(value);
    for(let product of products){
      if(value == ""){
        allSearch = [];
        $('#searchProduct').hide();
        $('#searchProduct').html("");
      }
      else if(product.naziv.toLowerCase().startsWith(value)){
        showSearchProducts(product,product.naziv);
      }
    }
  })


function showSearchProducts(product,naziv){
  naziv = `<div class=' productSearch'><p class="nameSeacrh">${naziv}</p>`;
  naziv += `<img src = '${product.slika.src}' alt='${product.slika.alt}' class='w-50'/></div>`;
  $('#searchProduct').slideDown();
  $('#searchProduct').append(naziv);

}

//Funkcija za ispisivanje filtera (Aside)
function filtersPrintout(mainArray,filtersValue,i,id){
  let tmp = ""
       tmp = `<div id="${mainArray[i].naziv}">
              <p class = "text-light my-2">${mainArray[i].naziv}</p>`;
              for(let filter of filtersValue){
              if(filter.mainId == id){
              tmp += `<div><input type="checkbox" name="${filter.naziv}" id ="${filter.id}"/>
                        <label for = "${filter.id}" class = "text-light">${filter.naziv}</label></div>`;
                }
              }
      tmp += `</div>`; 

    return tmp;
}

//Funcija za ispisivanje cene(range),
function rangePrice (){
    let range = document.getElementById("cena");
    let rangeText = document.getElementById("totalPrice");
    range.addEventListener("input",() => {
      let tmp = "";
      let total = range.value;
      let value = "";
      
      if(total.length > 5){
        tmp = total.substring(0,3);
        value = tmp + '.' + total.substring(3);
      }
      else if(total.length > 4){
        tmp = total.substring(0,2);
        value = tmp + '.' + total.substring(2);
      }
      else {
        tmp = total.substring(0,1);
        value = tmp + '.' + total.substring(1);
      }
      
      
      rangeText.innerText = value + " RSD";
    })
}

//Funckija za proveru stranice,na kojoj stranici se nalazimo
function checkPath (string){
  let check = path.lastIndexOf("/");
  let tmp = path.substring(check+1);
  return tmp.includes(string);
}



//Funkcija za ISPISIVANJE proizvoda
function productPrintout (value){
  let html =""; 
  html += `
  <div class="col-xxl-4 col-md-5 ia-mt ia-products">
    <div class="cards ia-samsung-laptop">${checkSell(value.topProdaja)}
      <div class = "imgProduct">
        <img src = "${value.slika.src}" alt ="${value.slika.alt}"/>
      </div>
      <h2>${value.naziv}</h2>
      <div class="price">
        <h3>${value.cena} RSD</h3>
      </div>
      <div class="info d-flex justify-content-evenly align-items-center">
        <img src="assets/images/info.png" class="mt-3"  alt="info" id = ${value.id} />
        <span class="iconify text-light addToCart" data-productid='${value.id}' data-icon="material-symbols:shopping-cart"></span>
      </div>
    </div>
  </div>`;
  return html;
}

//Funkcija koja provera na kojoj stranici se nalazimo i
//poziva funkciju za ispisivanje proizvoda
function productPage(array){
  //console.log(array)
  let html = ""
  if(array.length == 0){
    html += "";
    document.getElementById("products").innerHTML = html;
    $('#noneProduct').show();
  }
  else {
    for(let data of array){
      if(checkCategories(data.kategorijaID) == "Laptop" && checkPath("laptop")){
        html += productPrintout(data);
        
      }
      else if (checkCategories(data.kategorijaID) == "Telefon" && checkPath("phone")){
        html += productPrintout(data);
      }
      else if(checkCategories(data.kategorijaID) == "Monitor" && checkPath("monitor")){
        html += productPrintout(data);
      }
    }

    $('#noneProduct').hide();
    document.getElementById("products").innerHTML = html;
    productModal(array);
    //$(`${product.id}-cart`).click(addToCart);
    //printCart(array);
  }
  

}

$(document).on("click",".addToCart",function(e){
  let id = $(this).data('productid');
  addToCart(id)
})

function addToCart(id){
  let productCart = getLocalStorage("cart");

  if(productCart != null){
    if(updateOrCheck('check')){
 
      updateOrCheck("update");
    }
    else {
      addProductLS();
    }
  }
  
  else {
    addFirst();
  }

  function addFirst(){
    let products = [];
    products.push({
      id : id,
      qnty : 1
    });
    setLocalStorage("cart",products);
  }

  function updateOrCheck(type){
    if(type == "check"){
      for(let p of productCart){
        if(p.id == id){
          return true;
        }
      }
      return false;
    }
    if(type == "update"){
      for(let p of productCart){
        if(p.id == id){
          p.qnty++;
          break;
        }
      }
      setLocalStorage("cart",productCart);
    }
      
  }

  function addProductLS(){
    productCart.push({
      id : id,
      qnty : 1
    })
    setLocalStorage("cart",productCart);
  }
 
  printCart();
  modalAddToCart();
}

function modalAddToCart(){
  $('#succAdd').removeClass('d-none');


  setTimeout(() => {
    $('#succAdd').addClass('d-none');
  },1000)
}


function printCart(){
  let html = "";
  let allProducts = getLocalStorage("allProducts")
  let productsFromCart = getLocalStorage("cart");
  let productPrint = [];
  let numberOfProducts = productsFromCart.length;
  if(productsFromCart == null || productsFromCart.length == 0){
    html += `   <p id="cartNone">Trenutno nemate prozivda !</p>`;
    $('#cartProducts').html(html);
    $('#numberProducts').html(numberOfProducts);
    return;
  }
  else {
    for(let product of allProducts){
      for(let c of productsFromCart){
        if(c.id == product.id){
          productPrint.push(product);
        }
      }
    }
 
      for(let product of productPrint){
        html += ` <div class="productCart">
        <img src="${product.slika.src}" alt="${product.slika.alt}">
        <div class="cartText">
          <p>${product.naziv}</p>
          <p>${(kolicina(product.id)*product.cena).toFixed(2)}RSD</p>
          <div class='d-flex justify-content-center'>
            <label>Kolicina:${kolicina(product.id)}</label>
            <p></p>
          </div>
          <span class="iconify removeCart" data-icon="mdi:bin" data-flip="horizontal" data-removeid='${product.id}'></span>
        </div>
      </div>`
      }
 
      html += ` <div class="btnProducts">
      <form action="#" method="post">
        <input type="button" value="Naruci" class="btnCart" id="orderCartBtn">
      </form>
    </div>`
  
    $('#cartProducts').html(html);
  }
  $('#numberProducts').html(numberOfProducts);


    function kolicina(id){
      let html;
      for(let p of productsFromCart){
        if(p.id == id){
          html = p.qnty
        }
      }
      return html;
    }


 
    function ispisiCenu(id,price){
      let kol = kolicina(id);
      let cena = kol*price;
      cena = String(cena);
      let tmp = cena.indexOf('.');
     
      let ispis = cena.substring(0,tmp);
      return ispis;
    }
   
}


//Funkcija za ispisivanje informacija o proizvodu klikom na info(i)
function productModal (data){
  let tmp = "";
  for(let product of data){
    $(`#${product.id}`).click(function (){
      $('#product').show();
      $('#imgProduct').html(`<img src="${product.slika.src}" alt = "${product.slika.alt}"/>`);
      tmp = `<table>
              <tbody class="text-light ">`
               for(let spec of product.specifikacije){
                tmp += `<tr>
                          <td>${spec.naziv} :</td>
                          <td>${spec.vrednost}</td>
                        </tr>`;
               }
     tmp += ` </tbody> </table>`;
     $('#productInfo').html(tmp);
     let html = `<div class="productPrice d-flex justify-content-evenly mb-4">
     <div id="productCart">
       <span class="iconify text-light" data-icon="material-symbols:shopping-cart"></span>
       <span class="text-light addToCartProduct" data-ppid='${product.id}'>Dodaj u korpu</span>
     </div>
     <div id="price">
     <h3>${product.cena} RSD</h3>
     </div>
   </div>`
   $('#infoProduct').html(html);

      $('#closeProduct').click(() => {
        $('#product').hide();
      })

      window.scrollTo(0, 0);
    })
    //console.log(product)

 
  }
 }

$(document).on("click",".addToCartProduct",function(){
  let id = $(this).data('ppid');
  addToCart(id);
})

 //Funkcija koja proverava popular proizvoda
function checkSell(data){
  let tmp = "";
  if(data){
    tmp += `<div class="popular"></div>`;
  }
  return tmp;
}

//Funckija koja proverava nazive kategorija, za ispisivanje proizvoda

function checkCategories(id){
  let categories = getLocalStorage("categories");
  for(let cat of categories){
    if(cat.id == id){
      return cat.naziv;
    }
  }
}


$(document).on('click','.removeCart',function(){
  let id = $(this).data('removeid');
  let products = getLocalStorage("cart");
  let del = products.filter(x => x.id != id);
  setLocalStorage("cart",del);
  printCart();
})


/*jQuery */
function closeHamburger() {
  $('#open span:eq(1)').fadeTo('slow', 1);
  $('#hamb').undim();
  $('#cart').undim();
  $('#main-nav h1').css('opacity', '1');
  $('html, body').css({
    'overflow': 'auto'
  })

  $('#cartHamb').css('display', 'none');
  $('#hamb').css('margin-top', '0px');

  $('#open span:eq(0)').css({
    transform: 'rotateZ(0deg)'
  })
  $('#open span:eq(2)').css({
    position: 'static',
    transform: 'rotateZ(0deg)',
    top: 0
  })
}

function openHamburger() {
   $('#hamb').dimBackground();
  $('#cart').dimBackground();
  $('#main-nav h1').css('opacity', '0.2');
  $('html, body').css({
    'overflow': 'hidden'
  })
  $('#open span:eq(1)').fadeTo('slow', 0);
  $('#cartHamb').fadeTo(1500, 1);
  $('#cartHamb').css('display', 'flex');
  $('#hamb').css('margin-top', '13px');


  $('#open span:eq(0)').css({
    transform: 'rotateZ(45deg)',
    transition: "0.5s ease-in-out"
  })
  $('#open span:eq(2)').css({
    position: 'absolute',
    transform: 'rotateZ(-45deg)',
    transition: "0.5s ease-in-out",
    top: 0
  })

}

function openCart() {
  if ($('#contentHamb').css('display') == 'block') {
    closeHamburger()
    $('#cartProducts').undim();
    $('#contentHamb').hide();
  }
  if ($('#cartProducts').css('display') == 'none') {
    $('#cartProducts').slideDown(250);
  }
  else {
    $('#cartProducts').slideUp(250);
  }
}



/**LocalStorage** */

function setLocalStorage (name,value) {
  localStorage.setItem(name,JSON.stringify(value));
}

function getLocalStorage (name) {
  return JSON.parse(localStorage.getItem(name));
}