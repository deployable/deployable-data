DataStoreMemory     = require '../lib/data_store_memory'
{StoreMissingError,
 EntityMissingError,
 EntityExistsError,
 StoreError,
 EntityError} = require('../lib/errors_data')

describe 'Unit::DataStoreMemory', ->

  it 'should create a DataStoreMemory instance', ()->
    expect( new DataStoreMemory() ).to.be.an.instanceOf(DataStoreMemory)


  describe 'instance', ()->

    data_store = null

    beforeEach ->
      data_store = new DataStoreMemory()

    xit 'should have .schema', ()->
      expect( data_store.schema('a') ).to.eventually.be.ok


    describe '.create', ->

      it 'should create an entity in a new store', ()->
        expect( data_store.create('a','b',{foo:1}) ).to.become({foo:1})

      it 'should creaty an entity in an existing store', ()->
        p = data_store
          .create 'a', 'c', {foo:1}
          .then -> data_store.create 'a', 'b', {foo:1}
        expect( p ).to.become({foo:1})

      it 'should fail to create an existing entity', ()->
        p = data_store
          .create 'a', 'b', {foo:1}
          .then -> data_store.create 'a', 'b', {foo:1}
        expect( p ).to.be.rejectedWith EntityExistsError, /Entity Exists/

      it 'should fail without store', ()->
        expect( data_store.create() ).to.be.rejectedWith StoreError, /No store/

      it 'should fail without entity', ()->
        expect( data_store.create('a') ).to.be.rejectedWith EntityError, 'No entity'


    describe '.exists', ->

      it 'should return false for an entity that doesnt exist', ()->
        expect( data_store.exists('a','b') ).to.become(false)

      it 'should return true for an entity that does exist', ()->
        data_store.create('a','b',{})
        expect( data_store.exists('a','b') ).to.become(true)

      it 'should fail without store', ()->
        expect( data_store.exists() ).to.be.rejectedWith StoreError, /No store/

      it 'should fail without entity', ()->
        expect( data_store.exists('a') ).to.be.rejectedWith EntityError, 'No entity'


    describe '.read', ->

      it 'should read an entity', ()->
        p = data_store
          .create('a','b',{foo:1})
          .then -> data_store.read('a','b')
        expect( p ).to.become foo:1

      it 'should fail to read a missing entity', ()->
        p = data_store
          .create 'a','c', {foo:1}
          .then -> data_store.read('a','b')
        expect( p ).to.be.rejectedWith EntityMissingError, /Entity Missing/

      it 'should fail to read an entity in a missing store', ()->
        expect( data_store.read('a','b') )
          .to.be.rejectedWith StoreMissingError, /Store Missing/

      it 'should fail without store', ()->
        expect( data_store.read() ).to.be.rejectedWith StoreError, /No store/

      it 'should fail without entity', ()->
        expect( data_store.read('a') ).to.be.rejectedWith EntityError, 'No entity'


    describe '.update', ->

      it 'should update an existing entity', ()->
        p = data_store
          .create 'a','b', {foo:1}
          .then -> data_store.update 'a', 'b', {bar:2}
        expect( p ).to.become foo:1, bar:2

      it 'should fail to update a missing entity', ()->
        p = data_store
          .create 'a','c', {foo:1}
          .then -> data_store.update 'a', 'b', {bar:2}
        expect( p ).to.be.rejectedWith EntityMissingError, /Entity Missing/

      it 'should fail to update an entity in a missing store', ()->
        p = data_store
          .create 'a','c', {foo:1}
          .then -> data_store.update 'b', 'b', {bar:2}
        expect( p ).to.be.rejectedWith StoreMissingError, /Store Missing/
      
      it 'should fail without store', ()->
        expect( data_store.update() ).to.be.rejectedWith StoreError, /No store/

      it 'should fail without entity', ()->
        expect( data_store.update('a') ).to.be.rejectedWith EntityError, 'No entity'


    describe '.replace', ->

      it 'should replace an entity', ()->
        data_store.create('a','b',{foo:1})
        expect( data_store.replace('a','b',{bar:2}) )
          .to.become({bar:2})

      it 'should fail to replace a missing entity', ()->
        p = data_store
          .create 'a','c', {foo:1}
          .then -> data_store.replace 'a', 'b', {bar:2}
        expect( p ).to.be.rejectedWith EntityMissingError, /Entity Missing/

      it 'should fail to replace an entity in a missing store', ()->
        p = data_store
          .create 'a','c', {foo:1}
          .then -> data_store.replace 'b', 'b', {bar:2}
        expect( p ).to.be.rejectedWith StoreMissingError, /Store Missing/

      it 'should fail without store', ()->
        expect( data_store.replace() ).to.be.rejectedWith StoreError, /No store/

      it 'should fail without entity', ()->
        expect( data_store.replace('a') ).to.be.rejectedWith EntityError, 'No entity'


    describe '.delete', ->

      it 'should delete an entity', ()->
        data_store.create('a','b',{foo:1})
        expect( data_store.delete('a','b') )
          .to.become(true)

      it 'should return false when deleting an missing entity', ()->
        data_store.create('a','b',{foo:1})
        expect( data_store.delete('a','c') )
          .to.become(false)

      it 'should fail to delete an entity in a missing store', ()->
        p = data_store
          .create 'a','c', {foo:1}
          .then -> data_store.delete 'b', 'b', {bar:2}
        expect( p ).to.be.rejectedWith StoreMissingError, /Store Missing/

      it 'should fail without store', ()->
        expect( data_store.delete() ).to.be.rejectedWith StoreError, /No store/

      it 'should fail without entity', ()->
        expect( data_store.delete('a') ).to.be.rejectedWith EntityError, 'No entity'
