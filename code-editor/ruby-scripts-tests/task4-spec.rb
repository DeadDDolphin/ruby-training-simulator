require_relative './../ruby-scripts/task4/task4_2.rb'


describe "Solution" do
    it "Fixed tests" do
      expect(method1([1,2,2,2,2])).to eq 1
      expect(method2([0, -23, 105])).to eq [-23, 0]
      expect(method3([0, 1.55555, -2.123, 3.0123232], 2.8943534)).to eq 3.0123232 
      expect(method4([2, 15, 28, 39]).sort).to eq [2, 3, 4, 5, 7, 13, 14, 15, 28, 39]  
    end
end