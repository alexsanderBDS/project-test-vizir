const express = require('express')
const path = require('path')
const percent = require('percent-value')
const { ddd, planos } = require('./db/static')
const chalk = require('chalk')

const app = express()
const port = process.env.PORT || 3000
let valor_total, origem_destino, valor_min, plano, valor_porcent, resto_valor
let totais = {
    origem: "",
    destino: "",
    tempo: "",
    plano: "",
    sem_falemais: "",
    com_falemais: ""
}

app.engine('ejs', require('ejs').renderFile)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './views'))
app.use(express.static(path.join(__dirname, './public')))
app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).render('index', { ddd, planos, totais })
})

app.get('/resultado', (req, res) => {
    resp = req.query
    
    try {origem_destino = req.query.origem_destino.split(' ')

    valor_min = ddd.find((one) => {

        totais.origem = origem_destino[0]
        totais.destino = origem_destino[2]

        return origem_destino[0] === one.origem && origem_destino[2] === one.destino
    })

    plano = planos.find((plano) => {
        totais.plano = resp.plano
        return plano.descricao === resp.plano
    })

    valor_min = valor_min.valor_min
    
    valor_total = parseInt(resp.tempo) * valor_min

    totais.tempo = resp.tempo

    if(resp.tempo > plano.fale_mais) {

        resto_valor = resp.tempo - plano.fale_mais

        resto_valor = resto_valor * valor_min

        valor_porcent = parseFloat(percent('10%').from(resto_valor).toFixed(2)) + resto_valor
    } else {
        valor_porcent = 0
    }

    const toLocaleStringBR = (valor) => {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    }

    valor_total = toLocaleStringBR(valor_total)
    valor_porcent = toLocaleStringBR(valor_porcent)

    totais.sem_falemais = valor_porcent
    totais.com_falemais = valor_total

    }catch(err) {
        console.log(chalk.red.inverse(err))
    }
    
    res.redirect('/')
})

app.get('*', (req, res) => {
    res.redirect('/')
})

app.listen(port, () => {
    console.log(chalk.rgb(Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256))('Server up! on port ' + port))
})


module.exports = app