require "./../ruby-scripts/task1.rb"

describe "Solution" do
    it "Fixed tests" do
      Test.assert_equals(sum_two_smallest_numbers([5, 8, 12, 18, 22]), 13) 
      Test.assert_equals(sum_two_smallest_numbers([7, 15, 12, 18, 22]), 19) 
      Test.assert_equals(sum_two_smallest_numbers([25, 42, 71, 12, 18, 22]), 30) 
    end
  end