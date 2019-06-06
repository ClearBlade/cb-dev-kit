module.exports = (name) => {
  return(
`// import ${name} from '../index';

describe('${name}', () => {
  it('Expect to have unit tests specified', () => {
    expect(false).toEqual(true);
  });
})`
  )
}