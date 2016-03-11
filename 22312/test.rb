require "fiddle/import"
module M
  extend Fiddle::Importer
  dlload "libtest.dylib"
  extern "void example(int *a)"
end

hoge = [0] * 10
p hoge
hoge = hoge.pack('i*')
M.example(hoge)
p hoge.unpack('i*')
