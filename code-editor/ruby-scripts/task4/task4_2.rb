=begin
    Выполнить все следующие задания. Методы называть в формате method1, .. , method4
    1. Дан целочесиленный массив, в котором лишь один элемент отличается от остальных. Найти его значение.
    2. Дан целочисленный массив. Необходимо найти два наименьших элемента. Вернуть в массиве
    3. Дано вещественное число R и массив вещественных чисел.
        Найти элемент массива, который наиболее близок к данному числу.
    4. Для списка положительных чисел построить список
        всех положительных делителей элементов списка без повторений.
=end

require "prime"

def method1(arr)
    arr.select{|el| arr.count(el) == 1}
end


def method2(arr)
    min1 = arr.min
    arr_copy = arr.clone
    arr_copy.delete(min1)
    min2 = arr_copy.min
    return [min1, min2]
end


def method3(arr, r)
    tmp = arr.reduce([]){|new_arr, el| new_arr.push((el-r).abs)}
    i = tmp.index(tmp.min)
    arr[i]
end


def divisors(n)
    return [n] if Prime.prime?(n)
    x = n
    arr = Array.new()
    until x == 1
        arr<<x if n%x == 0
        x-=1
    end
    arr
end

def method4(arr)
    new_arr = arr.reduce([]) do |new_arr, el|        
        new_arr = new_arr.concat(divisors(el))
    end
    new_arr.uniq.sort()
end

arr = [1,2,2,2,2]
puts "Method1 #{method1(arr)}"
puts "Method2 #{method2(arr)}"
puts "Method3 #{method3([0.23,1,0.239],0.234)}"
puts "Method4 #{method4([2,15,21])}"
