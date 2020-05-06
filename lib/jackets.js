const axios = require('axios')
const cheerio = require('cheerio')
const fs = require("fs")


exports.jackets = function(req, res) {
    const fetchData = async(url) => {
        const result = await axios.get(url)
        return result.data
    }

    const jackets = async() => {
        const content = await fetchData("https://www.kanui.com.br/jaqueta-corta-vento/")
        const $ = cheerio.load(content)

        $('div.product-box').each((i, e) => {
            const title = $(e).find('p.product-box-title').text().trim();
            const price = $(e).find('span.product-box-price-to').text().trim();


            fs.appendFile('texts/jaquetas.txt', `Produto: ${title} || Preço: ${price}` + '\n\n', function(err) {
                if (err) throw err;
                console.log('Arquivo salvo com sucesso!');
            });
        })
    }

    jackets()
}