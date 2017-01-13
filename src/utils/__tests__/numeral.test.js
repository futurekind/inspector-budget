import { numeral } from '../numeral';

describe('Numeral localized', () => {

    it('uses the right localization', () => {
        const test = numeral(12345.67).format('0,0.00')
        expect(test).toBe('12 345,67')
    })

    it('applies the default format', () => {
        const test = numeral(12345.67).format()
        const test2 = numeral(1234).format()
        expect(test).toBe('12 345,67')
        expect(test2).toBe('1 234,00')
    })

    it('converts right', () => {
        const test = numeral('1 234,56').value()
        expect(test).toBe(1234.56)
    })

})