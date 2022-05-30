require_relative './../ruby-scripts/task2/task2_1.rb'


describe "Solution" do
    it "Fixed tests" do
      expect(sum_of_digits(1234)).to eq 10
      expect(sum_of_digits(-123)).to eq 6  
    end
end