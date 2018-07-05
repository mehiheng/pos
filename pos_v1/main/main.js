'use strict';

let sum = 0;
let save = 0;

/**
 * entrance
 */
function printReceipt(collection) {
  const buyedItems = getItemCount(collection);
  const itemDetails = findItemDetail(buyedItems, loadAllItems());
  getItemDetailLittlePriceSum(itemDetails, loadPromotions());
  let str = print(itemDetails);
  console.log(str);
}

/**
 * count item num
 */
function getItemCount(collection) {
  // const allitems = loadAllItems();
  const map = {};
  const buyedItems = [];
  for (let i = 0; i < collection.length; i++) {
    if (collection[i].indexOf("-") > 0) {
      let sp = collection[i].split("-");
      if (map.hasOwnProperty(sp[0])) {
        map[sp[0]] = map[sp[0]] + parseFloat(sp[1]);
      } else {
        map[sp[0]] = parseFloat(sp[1]);
      }
    } else {
      if (map.hasOwnProperty(collection[i])) {
        map[collection[i]] = map[collection[i]] + 1;
      } else {
        map[collection[i]] = 1;
      }
    }
  }
  for (let n in map) {
    buyedItems.push({"barcode": n, "count": map[n]});
  }
  return buyedItems;
}

/**
 * find item
 */
function findItemDetail(buyedItems, allItems) {
  const itemDetails = [];
  for (let item of buyedItems) {
    for (let i = 0; i < allItems.length; i++) {
      if (item.barcode === allItems[i].barcode) {
        itemDetails.push({
          "name": allItems[i].name,
          "barcode": allItems[i].barcode,
          "count": item.count,
          "price": allItems[i].price,
          "unit": allItems[i].unit,
          "littlePrice": item.count * parseFloat(allItems[i].price)
        });
        break;
      }
    }
  }
  return itemDetails;
}

/**
 * modify littlePrice and sum
 */
function getItemDetailLittlePriceSum(itemDetails, buyTweGetOneFree) {
  const barcodes = buyTweGetOneFree[0].barcodes;
  for (let item of itemDetails) {
    for (let i = 0; i < barcodes.length; i++) {
      if (item.barcode === barcodes[i]) {
        if (item.count / 2 > 0) {
          save += item.price;
          item.littlePrice -= (item.price);
        }
        break;
      }
    }
    sum += item.littlePrice;
  }
}

/**
 * print result
 */
function print(itemDetails) {
  let str = "***<没钱赚商店>收据***\n";
  // "名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)\n名称：荔枝，数量：2.5斤，单价：15.00(元)，小计：37.50(元)\n名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)\n----------------------\n总计：58.50(元)\n节省：7.50(元)\n**********************"
  for (let item of itemDetails) {
    let price = item.price.toFixed(2);
    let littlePrice = item.littlePrice.toFixed(2);
    str += "名称：" + item.name + "，数量：" + item.count + item.unit + "，单价：" + price + "(元)，小计：" + littlePrice + "(元)\n";
  }
  str += "----------------------\n总计：" + sum.toFixed(2) + "(元)\n节省：" + save.toFixed(2) + "(元)\n**********************";
  return str;
}