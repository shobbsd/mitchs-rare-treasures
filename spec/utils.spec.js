const { expect } = require('chai');
const { formatData, createRef } = require('../db/utils');

describe('createRef', () => {
  const allInput = [
    { owner_id: 1, forename: 'Amaya', surname: 'Wunsch', age: 108 },
    { owner_id: 2, forename: 'Anita', surname: 'Kuhic', age: 85 },
    { owner_id: 3, forename: 'Genoveva', surname: 'West', age: 41 },
    { owner_id: 4, forename: 'Brice', surname: 'Thiel', age: 95 }
  ];
  it('Given an empty array returns an empty object', () => {
    const input = [];
    const actual = createRef(input, 'forename', 'owner_id');
    const expected = {};
    expect(actual).to.eql(expected);
  });
  it('Given an array with one element returns an object with a key equal to the owner name and the value equal to the owner id', () => {
    const input = [allInput[0]];
    const actual = createRef(input, 'forename', 'owner_id');
    const expected = { Amaya: 1 };
    expect(actual).to.eql(expected);
  });
  it('Given an array with multiple elements returns a reference object with keys equal to the owner names and the value equal to the owner ids', () => {
    const input = [...allInput];
    const actual = createRef(input, 'forename', 'owner_id');
    const expected = { Amaya: 1, Anita: 2, Genoveva: 3, Brice: 4 };
    expect(actual).to.eql(expected);
  });
  it('Given an array with multiple elements returns a reference object with any valid combination of key value pairs', () => {
    const input = [...allInput];
    const actual = createRef(input, 'surname', 'age');
    const expected = { Wunsch: 108, Kuhic: 85, West: 41, Thiel: 95 };
    expect(actual).to.eql(expected);
  });
  it("Doesn't mutate the input array", () => {
    const input = [...allInput];
    const actual = createRef(input, 'forename', 'owner_id');
    expect(input).to.eql(allInput);
    expect(actual).to.not.equal(input);
  });
});

describe('formatData', () => {
  const allInput = [
    {
      shop_name: 'Lynch and Sons',
      owner: 'Roger',
      slogan: 'Upgradable multi-state moratorium'
    },
    {
      shop_name: 'Gutmann, Kertzmann and Cruickshank',
      owner: 'Jessyca',
      slogan: 'Synergistic zero administration standardization'
    },
    {
      shop_name: 'Howe, Reichel and Robel',
      owner: 'Jeramy',
      slogan: 'Enhanced bandwidth-monitored data-warehouse'
    }
  ];
  const allExpected = [
    {
      shop_name: 'Lynch and Sons',
      owner_id: 40,
      slogan: 'Upgradable multi-state moratorium'
    },
    {
      shop_name: 'Gutmann, Kertzmann and Cruickshank',
      owner_id: 89,
      slogan: 'Synergistic zero administration standardization'
    },
    {
      shop_name: 'Howe, Reichel and Robel',
      owner_id: 82,
      slogan: 'Enhanced bandwidth-monitored data-warehouse'
    }
  ];
  const ref = {
    Roger: 40,
    Jessyca: 89,
    Jeramy: 82
  };
  it('Given an empty array returns an empty array', () => {
    const input = [];
    const actual = formatData(input, ref, 'owner_id', 'owner');
    const expected = [];
    expect(actual).to.eql(expected);
  });
  it('Given an array with one element returns that element with the owner name swapped with the owner id', () => {
    const input = [allInput[0]];
    const actual = formatData(input, ref, 'owner_id', 'owner');
    const expected = [allExpected[0]];
    expect(actual).to.eql(expected);
  });
  it('Given an array with multiple elements returns those elements with the owner name swapped with the owner id', () => {
    const input = [...allInput];
    const actual = formatData(input, ref, 'owner_id', 'owner');
    const expected = [...allExpected];
    expect(actual).to.eql(expected);
  });

  it("Doesn't mutate the input array", () => {
    const input = [...allInput];
    const actual = formatData(input, ref, 'owner_id', 'owner');
    expect(input).to.eql(allInput);
    expect(actual).to.not.equal(input);
  });
});
