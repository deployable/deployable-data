require 'rubygems'
require 'ffi-rzmq'

if ARGV.length < 3
  puts "usage: ruby remote_lat.rb <connect-to> <message-size> <roundtrip-count>"
  exit
end

def assert(rc)
  raise "Last API call failed at #{caller(1)}" unless rc >= 0
end

connect_to = ARGV[0]
message_size = ARGV[1].to_i
roundtrip_count = ARGV[2].to_i

ctx = ZMQ::Context.new
s   = ctx.socket ZMQ::REQ
rc  = s.connect(connect_to)

msg = "#{ '3' * message_size }"

time_start = Time.now

roundtrip_count.times do
  assert(s.send_string(msg, 0))

  msg = ''
  assert(s.recv_string(msg, 0))

  raise "Message size doesn't match, expected [#{message_size}] but received [#{msg.size}]" if message_size != msg.size
end

time_end = Time.now
puts "Time #{( time_end - time_start )}"

