const ddd = [{
    origem: '011',
    destino: '016',
    valor_min: 1.90
},
{
    origem: '016',
    destino: '011',
    valor_min: 2.90
},
{
    origem: '011',
    destino: '017',
    valor_min: 1.70,
},
{
    origem: '017',
    destino: '011',
    valor_min: 2.70,
},
{
    origem: '011',
    destino: '018',
    valor_min: 0.90
},
{
    origem: '018',
    destino: '011',
    valor_min: 1.90
}]

const planos = [{
    
    fale_mais: 30,
    descricao: "FaleMais 30"
},
{
    fale_mais: 60,
    descricao: "FaleMais 60"
},
{
    fale_mais: 120,
    descricao: "FaleMais 120"
}]


module.exports = { ddd, planos }