const should = require('chai').should();
// const expect = require('chai').expect;
// const assert = require('chai').assert;

describe('test group 1', function() {

	const name = 'Hisheng';
	const age = 21;

	const user = {
		name,
		age,
		mobile: null
	}

  describe('check name', function() {
    it('name should be Hisheng', function() {
      name.should.be.eql('Hisheng');
    });
  });

  describe('check age', function() {
    it('age should be 21', function() {
      age.should.be.eql(21);
    });
  });

});

/*import test from 'ava';

const name = 'Hisheng';
const age = 21;

const user = {
	name,
	age,
	mobile: null
}

test('check name', t => {
	t.is(name,'Hisheng');
});

test('check age', t => {
	t.is(age,21);
});

test('check user', t => {
	t.plan(3);
	t.is(name,'Hisheng');
	t.is(age,21);
	t.falsy(!user.mobile);
});

test.skip('skip this',t => {
	t.is(name,'Hisheng');
});

test.todo('will do this later');*/
