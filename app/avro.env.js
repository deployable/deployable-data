var avro = require('avsc')
module.exports = avro.parse({
  name: 'Environment',
  type: 'record',
  fields: [
    {name: 'kind', type: {name: 'Kind', type: 'enum', symbols: ['internal', 'provisioned']}},
    {name: 'name',  type: 'string'},
    {name: 'other', type: 'string'},
    {name: 'date',  type: {type: 'long', logicalType: 'timestamp-millis'}},
    {name: 'id',  type: {type: 'fixed', name: 'UUID', size: 16 }}
  ]
})
