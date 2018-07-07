'use strict';
const {tagSimple,itemsCount,initReceipt,caculatePromotions,printReceipt} = require('../main/main');
describe('pos', () => {

  it('should print text', () => {

    const tags = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2.5',
      'ITEM000005',
      'ITEM000005-2',
    ];

    spyOn(console, 'log');

    printReceipt(tags);
    const expectText = `***<没钱赚商店>收据***
名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
名称：荔枝，数量：2.5斤，单价：15.00(元)，小计：37.50(元)
名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
----------------------
总计：58.50(元)
节省：7.50(元)
**********************`;

    expect(console.log).toHaveBeenCalledWith(expectText);
  });
});

//1
describe('#1unit test', () => {

  it('tagSimple', () => {

    const tags = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2.5',
      'ITEM000005',
      'ITEM000005-2',
    ];
    const test1=JSON.stringify(tagSimple(tags));
    const expectText1 = JSON.stringify([
	{barcode: "ITEM000001", count: 1},{barcode: "ITEM000001", count: 1},{barcode: "ITEM000001", count: 1},{barcode: "ITEM000001", count: 1},{barcode: "ITEM000001", count: 1},{barcode: "ITEM000003", count: 2.5},
{barcode: "ITEM000005", count: 1},{barcode: "ITEM000005", count: 2}]);

    expect(expectText1).toBe(test1);
  });
});

//2
describe('#2unit test', () => {

  it('itemsCount', () => {

    const tags = [
	{barcode: "ITEM000001", count: 1},
	{barcode: "ITEM000001", count: 1},
	{barcode: "ITEM000001", count: 1},
	{barcode: "ITEM000001", count: 1},
	{barcode: "ITEM000001", count: 1},
	{barcode: "ITEM000003", count: 2.5},
    {barcode: "ITEM000005", count: 1},
	{barcode: "ITEM000005", count: 2}];

    const test2=JSON.stringify(itemsCount(tags));
    const expectText1 = JSON.stringify([{barcode: "ITEM000001", count: 5},{barcode: "ITEM000003", count: 2.5},{barcode: "ITEM000005", count: 3}]);
    expect(expectText1).toBe(test2);
  });
});

//3
describe('#3unit test', () => {

  it('initReceipt', () => {

    const tags = [
	{barcode: "ITEM000001", count: 5},
	{barcode: "ITEM000003", count: 2.5},
	{barcode: "ITEM000005", count: 3}]

    const test3=JSON.stringify(initReceipt(tags));
    const expectText1 = JSON.stringify([{barcode: "ITEM000001", count: 5, name: "雪碧", unit: "瓶", price: 3},{barcode: "ITEM000003", count: 2.5, name: "荔枝", unit: "斤", price: 15},{barcode: "ITEM000005", count: 3, name: "方便面", unit: "袋", price: 4.5}]);
    expect(expectText1).toBe(test3);
  });
});

//4
describe('#4unit test', () => {

  it('initReceipt', () => {

    const tags =[{barcode: "ITEM000001", count: 5, name: "雪碧", unit: "瓶", price: 3},
	{barcode: "ITEM000003", count: 2.5, name: "荔枝", unit: "斤", price: 15},
	{barcode: "ITEM000005", count: 3, name: "方便面", unit: "袋", price: 4.5}]

    const test4=JSON.stringify(caculatePromotions(tags));
    const expectText1 = JSON.stringify([{barcode: "ITEM000001", count: 5, name: "雪碧", unit: "瓶", price: 3 ,total: 12},{barcode: "ITEM000003", count: 2.5, name: "荔枝", unit: "斤", price: 15, total: 37.5},{barcode: "ITEM000005", count: 3, name: "方便面", unit: "袋", price: 4.5, total: 9}]);
    expect(expectText1).toBe(test4);
  });
});