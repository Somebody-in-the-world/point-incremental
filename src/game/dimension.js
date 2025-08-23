import { Purchasable } from "./purchasable";

export class Dimension extends Purchasable {
    constructor(boughtAmountGetter, boughtAmountSetter, 
        formula, condition, generatedAmountGetter, generatedAmountSetter,
        multiplier, purchaseFunc, cap){
        super(true, boughtAmountGetter, boughtAmountSetter, 
        formula, condition, multiplier, purchaseFunc, cap);
        this.generatedAmountGetter = generatedAmountGetter;
        this.generatedAmountSetter = generatedAmountSetter;
    }

    get generatedAmount(){
        return this.generatedAmountGetter();
    }

    set generatedAmount(val){
        this.generatedAmountSetter(val);
    }

    get totalAmount(){
        return this.generatedAmount.add(this.boughtAmount);
    }
}

