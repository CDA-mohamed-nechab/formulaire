
var jsonUrl = 'http://127.0.0.1:1991/articles' ;//json-server --watch data.json -p 1991

var itemRefref = '';
var prixU = '0';
var items = '';

function init() {
    var list = document.querySelectorAll('.custom-select');
    var qty = document.querySelectorAll('.qt');
    document.getElementById('ajouterHtml').addEventListener('click', createElementHtml);
    list.forEach(function(liste) {
        liste.addEventListener('change',onListeChange);
    });
    qty.forEach(function(qty){
        qty.addEventListener('change',onQuantityChange );
    })

    var deleteElm = document.querySelectorAll('.removeElm');
    deleteElm.forEach(function(deleteElm){
        deleteElm.addEventListener('click',function(){
            var elmToDEl = this.parentNode;
            elmToDEl.parentNode.removeChild(elmToDEl);
        });

    });
}

function onListeChange() {
    var laDivParent = this.parentNode.parentNode
    var id = this.value;
    items = getArticles(id)
    ref = items.reference
    prixU = items.prix
    laDivParent.querySelectorAll('.col-2')[0].firstElementChild.attributes[1].value = ref
    laDivParent.querySelectorAll('.col-1')[0].firstElementChild.attributes[1].value  = prixU
     var qty = laDivParent.getElementsByClassName('qt')[0].value
        var prixU = laDivParent.getElementsByClassName('prU')[0].value
        var prix = laDivParent.getElementsByClassName('pr')[0]
        prix.value = parseFloat(qty) * parseFloat(prixU);
    calculTotal()
    init()
}
function onQuantityChange() {
     
        var laDivParent = this.parentNode.parentNode
        var qty = laDivParent.getElementsByClassName('qt')[0].value
        var prixU = laDivParent.getElementsByClassName('prU')[0].value
        var prix = laDivParent.getElementsByClassName('pr')[0]
        prix.value = parseFloat(qty) * parseFloat(prixU);
        calculTotal()
    }

function getArticles(id) {
    request = new XMLHttpRequest();
    request.open('GET', jsonUrl, false);  // `false` makes the request synchronous
    request.send(null);
    if (request.status === 200) {
        return JSON.parse(request.responseText)[parseInt(id)-1];
    }
}
function createElementHtml() {
    var html = '<div class="form-row"><div class="col-4 "><select class="custom-select" id="liste"><option selected enable value="">Choose...</option><option value="1">Le grand livre de JavaScript</option><option value="2">HTML encore plus vite</option><option value="3">Windows NT4.0</option><option value="4">Le kit de Ressource technique de NT</option><option value="5">Formation Java</option><option value="6">Comment créer son site Web</option></select></div><div class="col-2"><input class="form-control" value = "" type="text" placeholder="Références" readonly></div><div class="col-2"><input class="qt form-control qt" type="number" name="quantity[]" value="0" placeholder="Quantité" ></div><div class="col-1"><input class="prU form-control" value = "0" type="text" id="prixU" placeholder="PrixU" readonly></div><div class="col-1"><input class="pr form-control" value = "0" type="text" name="prix" placeholder="Prix" readonly> </div><input type="button" value="-" class="removeElm btn btn-danger" ></button></div></div>'
    var httml = document.createElement('div')
    httml.setAttribute( 'class','form-group' )
    httml.innerHTML = html
    document.getElementById('newDiv').appendChild(httml)
    init()
}

function calculTotal() {
    var total = 0;
    var prix = document.querySelectorAll('.pr')
    console.log(prix)
    prix.forEach(element => {
        total += parseInt(element.value)
    });
    console.log(total)
    document.getElementById('total').value = total + ' €'
}