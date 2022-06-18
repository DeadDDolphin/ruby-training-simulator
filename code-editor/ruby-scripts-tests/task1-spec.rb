require_relative './../ruby-scripts/task1/task1_0.rb'

describe "Solution" do
    it "Fixed tests" do
      expect(sum_two_smallest_numbers([5, 8, 12, 18, 22])).to eq 13
      expect(sum_two_smallest_numbers([7, 15, 12, 18, 22])).to eq 19
      expect(sum_two_smallest_numbers([25, 42, 71, 12, 18, 22])).to eq 30
    end
end