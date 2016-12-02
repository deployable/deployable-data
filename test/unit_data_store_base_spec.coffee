DataStoreBase     = require '../lib/data_store_base'


describe 'Unit::DataStoreBase', ->

  it 'should create a DataStoreBase instance', ()->
    expect( new DataStoreBase() ).to.be.an.instanceOf(DataStoreBase)


  describe 'instance', ()->

    data_store_base = null

    beforeEach ->
      data_store_base = new DataStoreBase()


    it 'should have and fail .exists', ()->
      fn = data_store_base.exists
      expect( fn ).to.throw Error, /Not implemented/

    it 'should have and fail .schema', ()->
      fn = data_store_base.schema
      expect( fn ).to.throw Error, /Not implemented/
    
    it 'should have and fail .create', ()->
      fn = data_store_base.create
      expect( fn ).to.throw Error, /Not implemented/
    
    it 'should have and fail .read', ()->
      fn = data_store_base.read
      expect( fn ).to.throw Error, /Not implemented/
    
    it 'should have and fail .update', ()->
      fn = data_store_base.update
      expect( fn ).to.throw Error, /Not implemented/
    
    it 'should have and fail .replace', ()->
      fn = data_store_base.replace
      expect( fn ).to.throw Error, /Not implemented/
    
    it 'should have and fail .delete', ()->
      fn = data_store_base.delete
      expect( fn ).to.throw Error, /Not implemented/
    