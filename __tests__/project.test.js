const request = require('supertest')
const app = require("../src/index")
const { ddd, planos } = require("../src/db/static")

describe('Testes principais.', () => {

    it('Status 200 applicação rodando correto!', async () => { 
        await request(app).get('/').expect(200)
    })
    
    it('Renderização HTML.', async () => {
        await request(app).get('/').expect('Content-type', /html/)
    })
    
    it('Não acessa "/resultado" diretamente. Erro com split!', async () => {
        await request(app).get('/resultado').expect(302)
    })

    it('O campo valor_min do banco de dados estático "ddd" deve ser do tipo "number"', async () => {
        await expect(typeof(ddd[0].valor_min)).toBe('number')
    })

    it('O campo fale_mais do banco de dados estático "planos" deve ser do tipo "number"', async () => {
        await expect(typeof(planos[0].fale_mais)).toBe('number')
    })

})