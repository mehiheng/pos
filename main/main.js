'use strict';

const {loadAllItems,loadPromotions} = require('../spec/fixtures');

function printReceipt(collection) {
  let tagsSimple=tagSimple(collection);
  let itemcount=itemsCount(tagsSimple);
  let initReceipts=initReceipt(itemcount);
  let caculatePromotion=caculatePromotions(initReceipts);
  let sum=calculateSum(caculatePromotion);
  let save=calculateSave(caculatePromotion);
  let result=printReceipts(caculatePromotion,sum,save);
  console.log(result);
  
  console.info(tagsSimple);
  console.info(itemcount);
  console.info(initReceipts);
  console.info(caculatePromotion);
  console.info(sum);
  console.info(save);
}
//格式化输入 16行
function tagSimple(Tags){
  let tagsSimple=[];
  for(let cartItems of Tags)
  {
    if(cartItems.indexOf("-")!==-1)
    {
      let temp=cartItems.split("-");
      tagsSimple.push({"barcode":temp[0],"count":parseFloat(temp[1])});
    }
    else{
          tagsSimple.push({"barcode":cartItems,"count":1});
        }
  }
  return tagsSimple;
}
//计算数量 16行
function itemsCount(tagsSimple){
  let itemscount=[];
  let itemcount = [];
  for(let item of tagsSimple) {
    let barcode = item.barcode;
    let count = item.count;
    let index = itemcount.indexOf(barcode);
    if (index > -1) {
      itemscount[index].count += count;
    } else {
      itemscount.push(item);
      itemcount.push(barcode);
    }
}
  return itemscount;
}
//初始化小票 17行
function initReceipt(itemscount){
	let initReceipts=[];
	let allItems=loadAllItems();
	for(let item of itemscount){
	for (let items of allItems){
		if(items.barcode===item.barcode){
			initReceipts.push({
				barcode:items.barcode,
			    count:item.count,
				name:items.name,
				unit:items.unit,
				price:items.price});			
		}
	  } 
	}
	return initReceipts;
}
//计算优惠后小票 17行
function caculatePromotions(itemscount){
	let promotions=loadPromotions();
	for(let promotion of promotions){
		if (promotion.type === 'BUY_TWO_GET_ONE_FREE') {
            for (let item of itemscount) {
				for(let promotBarcode of promotion.barcodes){
					if(item.barcode===promotBarcode){
						item.total=(Math.ceil(item.count/3)*2)*item.price;
						break;
					}
				item.total=item.count*item.price;					
				}
			}
	    }
    }
return itemscount;
}
//计算总价 6行
function calculateSum(itemscount) {
  let sum=0;
  for (let item of itemscount){
    sum += item.total;
  }
  return sum.toFixed(2);
}
//计算优惠 12行
function calculateSave(itemscount) {
	let sum1=0;
	for (let item of itemscount){
    sum1+=item.total;
  }
    let sum2=0;
    for (let item of itemscount){
    sum2+=(item.price*item.count);
  }
	let save=sum2-sum1;
	return save.toFixed(2);
}
//打印小票 13行
function printReceipts(caculatePromotion,sum,save){
	let body = "";
    for(let item of caculatePromotion){
        body += "\n";
        body += `名称：${item.name}，数量：${item.count}${item.unit}，单价：${item.price.toFixed(2)}(元)，小计：${item.total.toFixed(2)}(元)`
    }
    const result = `***<没钱赚商店>收据***${body}
----------------------
总计：${sum}(元)
节省：${save}(元)
**********************`	
return 	result;
}	 

module.exports = {tagSimple,itemsCount,initReceipt,caculatePromotions,printReceipt}


