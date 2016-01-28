puts RubyVM::InstructionSequence.compile(':+.to_proc.curry.call(2)').disasm
puts "*" * 10
puts RubyVM::InstructionSequence.compile('proc { |x,y| x + y }.curry.call(2)').disasm
