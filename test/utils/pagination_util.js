const assert         = require('chai').assert;
const PaginationUtil = require(__dirname + '/../../lib/data/pagination_util.js');

describe('Pagination Util', function() {

  it('should return an object that correlates to the request params sent in (no defaults)', function() {
    var query = PaginationUtil.buildModelPagination({
      count: '10',
      index: '123',
      direction: 'desc',
      sort: 'status'
    });
    assert.strictEqual(query.limit, '10');
    assert.deepEqual(query.where, {id: {lte: '123'}});
    assert.strictEqual(query.order, 'status DESC');
  });

  it('should return an object that correlates to the request params sent in (no defaults, asc)', function() {
    var query = PaginationUtil.buildModelPagination({
      count: '10',
      index: '123',
      direction: 'asc',
      sort: 'status'
    });
    assert.strictEqual(query.limit, '10');
    assert.deepEqual(query.where, {id: {gte: '123'}});
    assert.strictEqual(query.order, 'status ASC');
  });

  it('should return an object that correlates to the request params sent in (default: direction)', function() {
    var query = PaginationUtil.buildModelPagination({
      count: '10',
      index: '123',
      sort: 'status'
    });
    assert.strictEqual(query.limit, '10');
    assert.deepEqual(query.where, {id: {lte: '123'}});
    assert.strictEqual(query.order, 'status DESC');
  });

  it('should return an object that correlates to the request params sent in (default: sort)', function() {
    var query = PaginationUtil.buildModelPagination({
      count: '10',
      index: '123',
      direction: 'desc'
    });
    assert.strictEqual(query.limit, '10');
    assert.deepEqual(query.where, {id: {lte: '123'}});
    assert.strictEqual(query.order, 'createdBy DESC');
  });

  it('should return an object that correlates to the request params sent in (default: direction,sort)', function() {
    var query = PaginationUtil.buildModelPagination({
      count: '10',
      index: '123'
    });
    assert.strictEqual(query.limit, '10');
    assert.deepEqual(query.where, {id: {lte: '123'}});
    assert.strictEqual(query.order, 'createdBy DESC');
  });

  it('should return an object that correlates to the request params sent in (just count)', function() {
    var query = PaginationUtil.buildModelPagination({
      count: '10'
    });
    assert.strictEqual(query.limit, '10');
    assert.strictEqual(query.order, 'createdBy DESC');
  });

  it('should return an object that is a combination of request and query objects excluding "count", "index", "direction" and "sort"', function() {
    var query = PaginationUtil.mergeQueryParams({
      count: '10',
      index: '123',
      direction: 'desc',
      state: 'outgoing',
      to_amount: 1.00
    }, {
      limit: '10',
      where: {
        id: {
          lte: '123'
        }
      },
      order: 'status DESC'
    });
    assert.deepEqual(query, {
      limit: '10',
      where: {
        id: {
          lte: '123'
        },
        state: 'outgoing',
        to_amount: 1.00
      },
      order: 'status DESC'
    })
  });

});