const { generateJs, generateHTML } = require('../generateReactTemplate');
const generateUnitTest = require('../generateUnitTest');


describe('utils', () => {
    const name = 'TestComponent';
    it('Should generate react template', () => {

        const template = {
            JavaScript: generateJs(name),
            HTML: generateHTML(name)
        }
        expect(template).toMatchSnapshot();
    });

    it('Should generate unit test', () => {
        const template = generateUnitTest(name);
        expect(template).toMatchSnapshot();
    });
});