const axios = require('axios');
const cheerio = require('cheerio');
const Book = require('../models/Book');

/**
 * 根据 url 得到对应的html
 * @param {String} url 路径
 */
async function getHtml(url) {
  const { data: html } = await axios.get(url);
  return html;
}

/**
 * 根据 html 字符串 分析出详情链接
 * @param {String} html
 * @return {Array} 返回 链接数组
 */
function getDetailLinks(html) {
  const $ = cheerio.load(html);
  const links = $('.chart-dashed-list .media .media__img a')
    .map((i, ele) => {
      return ele.attribs['href'];
    })
    .get(); // get 方法用于把伪数组转换为真数组
  return links;
}

/**
 * 根据 详情链接 组装书籍信息 并返回
 * @param {String} url 详情链接
 * @returns {Object} {name:"xxx",author:"xxx",image:"xxx",publishDate:"xxx"}
 */
async function getBookInfo(url) {
  const html = await getHtml(url);
  const $ = cheerio.load(html);
  const name = $('h1 span').text().trim();
  const author = $('.subject #info .pl')
    .filter((i, ele) => {
      return $(ele).text().includes('作者');
    })
    .next('a')
    .text()
    .trim();
  const publishDate = $('.subject #info .pl')
    .filter((i, ele) => {
      return $(ele).text().includes('出版年');
    })[0]
    .nextSibling.nodeValue.trim();
  const image = $('.subject #mainpic img').attr('src').trim();
  return {
    name,
    author,
    publishDate,
    image,
  };
}

/**
 * 爬取网页信息并组装
 * @returns {Array} [{name:"xxx",author:"xxx",image:"xxx",publishDate:"xxx"},{},...]
 */
async function spiderInfo() {
  const html = await getHtml(
    'https://book.douban.com/latest?subcat=%E5%85%A8%E9%83%A8&p=1'
  );
  const links = getDetailLinks(html);
  const infoList = links.map((link) => getBookInfo(link));
  return Promise.all(infoList);
}

spiderInfo().then((infoList) => {
  Book.bulkCreate(infoList);
});
