=begin
    Написать методы, которые находят минимальный(min),
    максимальный(max) элементы, сумму(summ) и произведение(mult) элементов списка.
=end

def min(arr)
    arr.min
  end
  
  def max(arr)
    arr.max
  end
  
  def summ(arr)
    arr.sum
  end
  
  def mult(arr)
    k=1
    arr.each{|el| k*=el}
    k
  end

  arr = [1, 2, 5, -2 ,-1 ,3]
  puts "Min:" + min(arr).to_s
  puts "Max:" + max(arr).to_s
  puts "Sum:" + summ(arr).to_s
  puts "Mult:" + mult(arr).to_s