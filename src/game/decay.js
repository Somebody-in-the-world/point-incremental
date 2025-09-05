export function calcDecayEnergyGain(){
    return Decimal.max(player.protons.sub(1e20), 0).add(
        Decimal.max(player.neutrons.sub(1e20), 0)).add(
            Decimal.max(player.electrons.sub(1e20), 0)
        ).div(1e20).pow(0.2);
}

export function particleDecayTick(deltaTime){
//    player.protons = player.protons.sub(
  //      Decimal.max(player.protons.sub(1e20).div(new Decimal(2).pow(1 / deltaTime)), 0));
}
