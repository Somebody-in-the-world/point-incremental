export class Purchasable {
    constructor(repeatable, boughtAmountGetter, boughtAmountSetter, 
        formula, condition, effect, purchaseFunc, description = ""){
        this.repeatable = repeatable;
        this.boughtAmountGetter = boughtAmountGetter;
        this.boughtAmountSetter = boughtAmountSetter;
        this.formula = formula;
        this.condition = condition;
        this.effectObject = effect;
        this.purchaseFunc = purchaseFunc;
        this.description = description;
    }

    get boughtAmount(){
        return this.boughtAmountGetter();
    }

    set boughtAmount(amt){
        this.boughtAmountSetter(amt);
    }

    get cost(){
        return this.formula(this.boughtAmount);
    }

    get canAfford(){
        return this.condition(this.cost);
    }

    get canBuy(){
        if(this.repeatable) return this.canAfford;
        return this.boughtAmount > 0 ? false : this.canAfford;
    }

    get effect(){
        if(!this.effectObject){
            throw new Error("This Purchasable instance does not have an effect.");
        }
        return this.effectObject.formula(this.boughtAmount);
    }

    buy(){
        if(this.canBuy){
            if(this.purchaseFunc){
                this.purchaseFunc(this.cost);
            }
            const boughtAmountType = typeof this.boughtAmount;
            if(boughtAmountType == "number"){
                this.boughtAmount++;
            } else if(boughtAmountType == "boolean"){
                this.boughtAmount = true;
            }
        };
    }
}
