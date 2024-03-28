import init from '../init.js';
const generatePackageJson = init.generatePackageJson

describe('cmds', () => {
    it('Should generate string for updated package.json', () => {
        const packageString = generatePackageJson({});

        expect(packageString).toMatchSnapshot();
    })
})