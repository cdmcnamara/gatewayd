const assert         = require('chai').assert;
const PaginationUtil = require(__dirname + '/../../lib/data/pagination_util.js');

describe('Pagination Util', function() {

  it('should return an object that correlates to the request params sent in (no defaults)', function() {
    var query = PaginationUtil.buildModelPagination({
      count: '10',
      index: '123',
      sort_direction: 'desc',
      sort_field: 'status'
    });
    assert.strictEqual(query.limit, '10');
    assert.deepEqual(query.where, {id: {lte: '123'}});
    assert.strictEqual(query.order, 'status DESC');
  });

  it('should return an object that correlates to the request params sent in (no defaults, asc)', function() {
    var query = PaginationUtil.buildModelPagination({
      count: '10',
      index: '123',
      sort_direction: 'asc',
      sort_field: 'status'
    });
    assert.strictEqual(query.limit, '10');
    assert.deepEqual(query.where, {id: {gte: '123'}});
    assert.strictEqual(query.order, 'status ASC');
  });

  it('should return an object that correlates to the request params sent in (default: sort_direction)', function() {
    var query = PaginationUtil.buildModelPagination({
      count: '10',
      index: '123',
      sort_field: 'status'
    });
    assert.strictEqual(query.limit, '10');
    assert.deepEqual(query.where, {id: {lte: '123'}});
    assert.strictEqual(query.order, 'status DESC');
  });

  it('should return an object that correlates to the request params sent in (default: sort_field)', function() {
    var query = PaginationUtil.buildModelPagination({
      count: '10',
      index: '123',
      sort_direction: 'desc'
    });
    assert.strictEqual(query.limit, '10');
    assert.deepEqual(query.where, {id: {lte: '123'}});
    assert.strictEqual(query.order, 'createdAt DESC');
  });

  it('should return an object that correlates to the request params sent in (default: sort_direction,sort_field)', function() {
    var query = PaginationUtil.buildModelPagination({
      count: '10',
      index: '123'
    });
    assert.strictEqual(query.limit, '10');
    assert.deepEqual(query.where, {id: {lte: '123'}});
    assert.strictEqual(query.order, 'createdAt DESC');
  });

  it('should return an object that correlates to the request params sent in (just count)', function() {
    var query = PaginationUtil.buildModelPagination({
      count: '10'
    });
    assert.strictEqual(query.limit, '10');
    assert.strictEqual(query.order, 'createdAt DESC');
  });

  it('should return an object that is a combination of request and query objects excluding "count", "index", "sort_direction" and "sort_field"', function() {
    var query = PaginationUtil.mergeQueryParams({
      count: '10',
      index: '123',
      sort_direction: 'desc',
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