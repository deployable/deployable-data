require 'nanomsg'

socket1 = NanoMsg::PairSocket.new
socket1.bind('inproc://test')
  
socket1.send('test')
socket1.recv

