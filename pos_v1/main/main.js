 'use strict';
 function printReceipt(collection) {
let tagsSimple=tagSimple(collection);

console.info(tagsSimple);


 }

 function tagSimple(Tags){
	 let tagsSimple=[];
	 for(let cartItems of Tags)
	 {		 
		 if(cartItems.indexOf("-")!==-1)
		 {
			 let temp=cartItems.split("-");
			 tagsSimple.push({"barcode":temp[0],"count":parseFloat(temp[1])});		 
	     }
		 else
		 {
			 tagsSimple.push({"barcode":cartItems,"count":1});	
		 }
	 }
	 return tagsSimple;
 }
 function itemsCount(tagsSimple){
	 let itemcount=[];
	 for(let item of tagsSimple)
	 {
		 
	 }
 }
 