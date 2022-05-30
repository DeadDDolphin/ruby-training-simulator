require_relative './../ruby-scripts/task3/task3_0.rb'


describe "Solution" do
    it "Fixed tests" do
      expect(min([1,2,6,0,-4])).to eq -4
      expect(max([0, -23, 105])).to eq 105  
      expect(summ([0, 1, 2, 3])).to eq 6   
      expect(summ([-6, 1, 2, 3])).to eq 0  
      expect(mult([0, 1, 2, 3])).to eq 0       
      expect(mult([-1, 1, 2, 3])).to eq -6  
    end
end